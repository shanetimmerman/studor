import React from 'react';
import _ from 'lodash';

import LoginRegisterPage from './LoginRegisterPage'
import TutorSearchPage from './TutorSearchPage'
import SessionsPage from './SessionsPage'
import { STUDENT, TUTOR } from '../Constants/userTypes';

class MainPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.fetchSession();
    }

    render() {
        let user = this.props.user;

        if (user.logged_in) {
            // If they're a student, return the search page
            switch (user.user_type) {
                case STUDENT: return (<TutorSearchPage />);
                case TUTOR: return (<SessionsPage />);
                default: new Error("Illegal state: unsupported user type.");
            }

        } else {
            // Not logged in, return login page
            return (<LoginRegisterPage />)
        }
    }
}

export default MainPage;