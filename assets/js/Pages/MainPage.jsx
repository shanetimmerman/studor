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
                <div className="vertical-padding">
                    <div className="vertical-padding">
                        <h1>Render this if user is not logged in:</h1>
                        <LoginRegisterPage />
                    </div>
                </div>

                <div className="vertical-padding">
                    <div className="vertical-padding">
                        <h1>Render this if student is logged in:</h1>
                        <TutorSearchPage />
                    </div>
                </div>


                <div className="vertical-padding">
                    <div className="vertical-padding">
                        <h1>Render this if tutor is logged in:</h1>
                        <SessionsPage />
                    </div>
                </div>                                  

            </div>);
    }
}

export default MainPage;