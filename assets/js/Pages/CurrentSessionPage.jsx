import React from 'react';
import _ from 'lodash';

import DrawToolsContainer from '../Containers/CurrentSession/DrawToolsContainer';
import WhiteBoardContainer from '../Containers/CurrentSession/WhiteBoardContainer';
import SessionInfoContainer from '../Containers/CurrentSession/SessionInfoContainer';

class CurrentSessionPage extends React.Component {
    constructor(props) {
      super(props);
  
    }

    render () {
    return (<div className="row bg-light full-height">
                <div className="col-md-1">
                    <DrawToolsContainer />
                </div>
                <div className="col-md-9">
                    <WhiteBoardContainer />
                </div>
                <div className="col-md-2">
                    <SessionInfoContainer />
                </div>                                
            </div>);
    }
}

export default CurrentSessionPage;