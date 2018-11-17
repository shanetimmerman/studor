import React from 'react';
import _ from 'lodash';

import LoginRegisterPage from './LoginRegisterPage'
import TutorSearchPage from './TutorSearchPage'
import SessionsPage from './SessionsPage'

class MainPage extends React.Component {
    constructor(props) {
      super(props);
  
    }

    render () {
    return (<div>
                <LoginRegisterPage />
                <TutorSearchPage />
                <SessionsPage />
            </div>);
    }
}

export default MainPage;