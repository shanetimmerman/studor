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
        return (
        <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8 mt-5">
                <div className="row">
                    <div className="col-md-4"></div>
                    <h2 className="p-3 col-md-4 text-center">Create an Account</h2>
                    <div className="col-md-4"></div>
                </div>

                <NewUserFormContainer onSubmit={(values) => {
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
                }} />
            </div>
            <div className="col-md-2"></div>
        </div>)
    }
}

export default SignupPage;