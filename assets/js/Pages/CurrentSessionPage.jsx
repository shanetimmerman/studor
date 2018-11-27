import React from 'react';
import _ from 'lodash';
import {Socket} from "phoenix"

import Whiteboard from '../Components/CurrentSession/Whiteboard'
import SessionInfoContainer from '../Containers/Sessions/SessionInfoContainer'
class CurrentSessionPage extends React.Component {
    constructor(props) {
      super(props);

      let socket1 = new Socket("/socket", {params: {token: window.userToken}})
      socket1.connect()
      this.socket = socket1;
      this.state = props.location.state;
    }

    render () {
        console.log("PROPS");
        console.log(this.state);
    return (<div className="row bg-light full-height">
                <div className="col-md-8">
                    <Whiteboard socket={this.socket} session_info={this.state}/>
                </div>
                <div className="col-md-4">
                    <SessionInfoContainer socket={this.socket} session_info={this.state}/>
                </div>                                
            </div>);
    }
}

export default CurrentSessionPage;