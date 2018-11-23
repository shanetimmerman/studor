import React from 'react';
import _ from 'lodash';

import LoginRegisterPage from './LoginRegisterPage'
import TutorSearchPage from './TutorSearchPage'
import SessionsPage from './SessionsPage'

class MainPage extends React.Component {
    constructor(props) {
        super(props);
        console.log("rendering main")

    }

    render() {
        return (<div>
            <div className="mt-3 mb-3">
                <div className="mt-3 mb-3">
                    <h1>Render this if user is not logged in:</h1>
                    <LoginRegisterPage />
                </div>
            </div>

            <div className="mt-3 mb-3">
                <div className="mt-3 mb-3">
                    <h1>Render this if student is logged in:</h1>
                    <TutorSearchPage />
                </div>
            </div>


            <div className="mb-3 mt-3">
                <div className="mb-3 mt-3">
                    <h1>Render this if tutor is logged in:</h1>
                    <SessionsPage />
                </div>
            </div>

        </div>);
    }
}

export default MainPage;