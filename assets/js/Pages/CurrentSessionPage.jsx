import React from 'react';
import _ from 'lodash';

import Whiteboard from '../Components/CurrentSession/Whiteboard'
import SessionInfoContainer from '../Containers/Sessions/SessionInfoContainer'
class CurrentSessionPage extends React.Component {
    constructor(props) {
      super(props);

      this.state = props.location.state;
    }

    render () {
        console.log("PROPS");
        console.log(this.state);
    return (<div className="row bg-light full-height">
                <div className="col-md-8">
                    <Whiteboard session_info={this.state}/>
                </div>
                <div className="col-md-4">
                    <SessionInfoContainer session_info={this.state}/>
                </div>                                
            </div>);
    }
}

export default CurrentSessionPage;