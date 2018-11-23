import React from 'react';
import { Stage, Layer, Rect, Line } from 'react-konva';
import deepFreeze from 'deep-freeze';
import { connect } from 'react-redux';
import _ from 'lodash';
import {Socket} from "phoenix"


class Whiteboard extends React.Component {
    constructor(props) {
      super(props);
      this.btn_down = false;
      let socket = new Socket("/socket", {params: {token: window.userToken}})
      socket.connect();
      this.channel = socket.channel("whiteboards:1", {active: 1});;
      this.state = {
          whiteboard: { active: 1, //tutorid
                        lines: [], 
                        points: [] }
      };

    this.channel.join()
    .receive("ok", this.gotView.bind(this))
    .receive("error", resp => { console.log("Unable to join", resp) });

    this.channel.on("draw", ({x, y}) => {this.draw(x, y);});
  
    this.channel.on("line_done", ({points}) => {this.line_done(points);});
  
    this.channel.on("clear", (_payload) => {this.update_whiteboard({ points: [], lines: [] });});
}

    gotView(view) {
        console.log("join successful");
        console.log(view.whiteboard);
        this.setState(view.whiteboard);
    }

    update_state(pairs) {
        let state1 = _.assign({}, this.state, pairs);
        this.setState(deepFreeze(state1));
      }
    
      update_whiteboard(pairs) {
        let whiteboard1 = _.assign({}, this.state.whiteboard, pairs);
        this.update_state({whiteboard: whiteboard1});
      }
    
      draw(x, y) {
        let points1 = _.concat(this.state.whiteboard.points, [x, y]);
        this.update_whiteboard({points: points1});
      }
    
      line_done(_points) {
        let whiteboard = this.state.whiteboard;
        let lines1 = whiteboard.lines;
        if (whiteboard.points.length > 0) {
          lines1 = _.concat(whiteboard.lines, [whiteboard.points]);
        }
        this.update_whiteboard({ lines: lines1, points: [] });
      }

      mouse_down(ev) {
        this.setState(_.assign(this.state, { points: [] }));
        this.btn_down = true;
      }
    
      mouse_up(ev) {
        let points1 = this.state.whiteboard.points;
        this.line_done();
        this.channel.push("line_done", {points: points1});
        this.btn_down = false;
      }
    
    mouse_move(ev) {
        if ((ev.evt.buttons & 1) === 0) {
          return;
        }
    
        let local_draw = () => {
          if (this.btn_down) {
            let x = ev.evt.layerX;
            let y = ev.evt.layerY;
            this.draw(x, y);
            this.channel.push("draw", {id: 1, x: x, y: y});
          }
        }
        _.debounce(local_draw, 50)();
    }

    send_clear(_ev) {
        this.channel.push("clear", {})
            .receive("ok", (msg) => console.log("clear ok", msg))
            .receive("error", (err) => console.log("clear err", err));
        this.update_whiteboard({ points: [], lines: [] });
    }
    render () {

        let ww = 1024;
        let hh = 768;

    let controls = <div className="controls draw-controls row">
        <div className="column">
            <button onClick={this.send_clear.bind(this)}>Clear</button>
        </div>
    </div>;

    let lines = _.map(this.state.whiteboard.lines, (line, ii) =>
    <Line key={ii} points={line} tension={0} stroke="black" strokeWidth={2} />);

    return (<div className="card shadow p-3 mb-5 bg-white full-height border-0 rounded">
    <div>
      { controls }
      <div className="row">
        <div className="drawbox column">
          <Stage width={ww} height={hh}
                 onContentMousemove={this.mouse_move.bind(this)}
                 onContentMouseUp={this.mouse_up.bind(this)}
                 onContentMouseDown={this.mouse_down.bind(this)}>
            <Layer>
              <Rect x={0} y={0} width={ww} height={hh} />
              <Line points={this.state.whiteboard.points} tension={0}
                    stroke="black" strokeWidth={2} />
              { lines }
            </Layer>
          </Stage>
        </div>
      </div>
    </div>;
    
    </div>);
    }
}
  

  function mapStateToProps(state) {
      return {

      }
  }

  export default connect(mapStateToProps)(Whiteboard);