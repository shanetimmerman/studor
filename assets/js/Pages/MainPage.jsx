import React from 'react';
import _ from 'lodash';

import LoginRegisterPage from './LoginRegisterPage'
import TutorSearchPage from './TutorSearchPage'

class MainPage extends React.Component {
    constructor(props) {
      super(props);
  
    }

    render () {
    return (<div>
                <LoginRegisterPage />
                <TutorSearchPage />
            </div>);
    }
}

export default MainPage;