import React from 'react';
import { Stage, Layer, Rect, Line } from 'react-konva';
import deepFreeze from 'deep-freeze';
import _ from 'lodash';
import store from '../../store';

class Whiteboard extends React.Component {
    constructor(props) {
      super(props);
      window.addEventListener('resize', this.scaleCanvas.bind(this));
      this.btn_down = false;
      let socket = props.socket;
      this.channel = socket.channel("whiteboards:" + props.session_info.id, {active: props.session_info.id});;
      this.state = {
          width: window.innerWidth * 2 / 3,
          draw: true,
          whiteboard: { lines: [],
                        points: [] }
      };

    let user = store.getState().currentUser

    let newUser = null
    if (user.user_type == "TUTOR") {
      newUser = "t" + this.props.session_info.tutor_id;
    } else {
      newUser = "s" + this.props.session_info.student_id;
    }

    this.channel.join()
    .receive("ok", () => {
      this.channel.push("add_user", {name: newUser});
      this.gotView.bind(this);
    })
    .receive("error", resp => { console.log("Unable to join", resp) });

    this.channel.on("draw", ({x, y}) => {this.draw(x, y);});

    this.channel.on("erase", ({x, y}) => {this.erase(x, y);});

    this.channel.on("line_done", ({points}) => {this.line_done(points);});

    this.channel.on("erase_line_done", ({erase_points}) => {this.erase_line_done(erase_points);});

    this.channel.on("clear", (_payload) => {this.update_whiteboard({ points: [], lines: [] });});
}

    gotView(view) {
        console.log("join successful");
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
        let points1 = _.concat(this.state.whiteboard.points, [{x: x, y: y, color: "black"}]);
        this.update_whiteboard({points: points1});
      }

      erase(x, y) {
        let points1 = _.concat(this.state.whiteboard.points, [{x: x, y: y, color: "white"}]);
        this.update_whiteboard({points: points1});
      }

      flatten_points(points) {
        let points1 = _.map(points, (point) => [point.x, point.y])
        let flatten_points = _.flattenDeep(points1);

        return flatten_points;
      }

      line_done(_points) {
        let whiteboard = this.state.whiteboard;
        let lines1 = whiteboard.lines;
        if (whiteboard.points.length > 0) {
          lines1 = _.concat(whiteboard.lines, [{points: this.flatten_points(whiteboard.points), color: "black"}]);
        }
        this.update_whiteboard({ lines: lines1, points: [] });
      }

      erase_line_done(_points) {
        let whiteboard = this.state.whiteboard;
        let lines1 = whiteboard.lines;
        if (whiteboard.points.length > 0) {
          lines1 = _.concat(whiteboard.lines, [{points: this.flatten_points(whiteboard.points), color: "white"}]);
        }
        this.update_whiteboard({ lines: lines1, points: [] });
      }

      mouse_down(ev) {
          this.setState(_.assign(this.state.whiteboard, { points: [] }));
          this.btn_down = true;
      }

      mouse_move(ev) {
        if ((ev.evt.buttons & 1) === 0) {
          return;
        }

        if (this.state.draw) {
          let local_draw = () => {
            if (this.btn_down) {
              let x = ev.evt.layerX;
              let y = ev.evt.layerY;
              this.draw(x, y);
              this.channel.push("draw", {id: 1, x: x, y: y});
            }
          }
          _.debounce(local_draw, 50)();
        } else {
          let local_erase = () => {
            if (this.btn_down) {
              let x = ev.evt.layerX;
              let y = ev.evt.layerY;
              this.erase(x, y);
              this.channel.push("erase", {id: 1, x: x, y: y});
            }
          }
          _.debounce(local_erase, 50)();
        }

      }

      mouse_up(ev) {
        let points1 = this.state.whiteboard.points;
        if (this.state.draw == true) {
          this.line_done();
          this.channel.push("line_done", {points: points1});
        } else {
          this.erase_line_done();
          this.channel.push("erase_line_done", {erase_points: points1});
        }

        this.btn_down = false;
      }


    send_clear(_ev) {
        this.channel.push("clear", {})
            .receive("ok", (msg) => console.log("clear ok", msg))
            .receive("error", (err) => console.log("clear err", err));
        this.update_whiteboard({ points: [], lines: [] });
    }

    draw_mode() {
      this.setState(_.assign(this.state, {draw: true}));
    }

    erase_mode() {
      this.setState(_.assign(this.state, {draw: false}));
    }

    scaleCanvas () {
      this.setState({width: window.innerWidth * 2 / 3})
    }

    render () {

      let ww = this.state.width;
      let hh = 550;

    let controls = <div className="controls draw-controls row">
        <div className="column">
            <button onClick={this.send_clear.bind(this)}>Clear</button>
        </div>
        <div className="column">
            <button onClick={this.draw_mode.bind(this)}>Pen</button>
        </div>
        <div className="column">
            <button onClick={this.erase_mode.bind(this)}>Eraser</button>
        </div>
    </div>;

    let lines = _.map(this.state.whiteboard.lines, (line, ii) => {
      if(line.color == "black") {
        return <Line key={ii} points={line.points} tension={0} stroke="black" strokeWidth={4} />
      } else {
        return <Line key={ii} points={line.points} tension={0} stroke="white" strokeWidth={25} />
      }
    });

    let currentLine = null;

    if (this.state.whiteboard.points.length > 0) {
      let strokeWidth = this.state.whiteboard.points[0].color == "black" ? 4 : 25
      currentLine = <Line points={this.flatten_points(this.state.whiteboard.points)} tension={0} stroke={this.state.whiteboard.points[0].color} strokeWidth={strokeWidth} />
    }

    return (<div id="whiteboard" className="card shadow p-3 mb-5 bg-white full-height border-0 rounded">
              <div>
                { controls }
                <div className="row">
                  <div className="drawbox column">
                    <Stage width={ww} height={hh}
                          onContentMousemove={this.mouse_move.bind(this)}
                          onContentMouseUp={this.mouse_up.bind(this)}
                          onContentMouseDown={this.mouse_down.bind(this)}>
                      <Layer>
                        <Rect width={ww} height={hh} x={0} y={0}/>
                        { lines }
                        { currentLine }
                      </Layer>
                    </Stage>
                  </div>
                </div>
              </div>

    </div>);
    }
}

  export default Whiteboard;
