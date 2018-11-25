import React from 'react';
import _ from 'lodash';

import Whiteboard from '../Components/CurrentSession/Whiteboard'
import SessionInfoContainer from '../Containers/CurrentSession/SessionInfoContainer';

class CurrentSessionPage extends React.Component {
    constructor(props) {
      super(props);

      this.state = props.location.state;
    }

    render () {
        console.log("PROPS");
        console.log(this.state);
    return (<div className="row bg-light full-height">
                <div className="col-md-9">
                    <Whiteboard session_info={this.state}/>
                </div>
                <div className="col-md-3">
                    <SessionInfoContainer/>
                </div>                                
            </div>);
    }
}

export default CurrentSessionPage;