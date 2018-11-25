import React from 'react';
import _ from 'lodash';
import { STUDENT, TUTOR } from '../Constants/userTypes';
import { createStudent, createTutor } from '../Actions/users';
import NewUserForm from '../Components/Login/NewUserForm';

function SignupPage(props) {
    return (<NewUserForm onSubmit={(values) => {
        switch (values.account.user_type) {
            case STUDENT:
                createStudent(values.account, values.payment);
                break;
            case TUTOR:
                createTutor(values.account, values.tutorData, values.payment);
                break;
            default: new Error("Invalid user type.");
        }}} />)
}

export default SignupPage;