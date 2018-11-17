import React from 'react';
import _ from 'lodash';

import SessionListContainer from '../Containers/Sessions/SessionListContainer';

class SessionsPage extends React.Component {
    constructor(props) {
      super(props);
  
    }

    render () {
    return (<div>
                <SessionListContainer />
            </div>);
    }
}

export default SessionsPage;