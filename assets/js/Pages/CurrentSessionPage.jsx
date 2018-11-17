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
    return (<div>
                <DrawToolsContainer />
                <WhiteBoardContainer />
                <SessionInfoContainer />
            </div>);
    }
}

export default CurrentSessionPage;