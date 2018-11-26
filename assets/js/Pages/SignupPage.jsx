import React from 'react';
import _ from 'lodash';
import { STUDENT, TUTOR } from '../Constants/userTypes';
import { createStudent, createTutor } from '../Actions/users';
import NewUserFormContainer from '../Containers/Login/NewUserFormContainer'
import { Redirect } from 'react-router'

function SignupPage(props) {
    if (props.user.logged_in) {
        return (<Redirect to="/" />)
    } else {
        return (<NewUserFormContainer onSubmit={(values) => {
            switch (values.user_type) {
                case STUDENT:
                    delete values.user_type
                    createStudent(values);
                    break;
                case TUTOR:
                    delete values.user_type
                    createTutor(values);
                    break;
                default: new Error("Invalid user type.");
            }
        }} />)
    }
}

export default SignupPage;