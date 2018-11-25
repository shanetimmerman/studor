import { Formik } from 'formik';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { STUDENT, TUTOR } from "../../Constants/userTypes";
import AccountInformationFieldset from '../Profile/AccountInformationFieldset';
import PaymentInformationFieldset from '../Profile/PaymentInformationFieldset';
import TutorSkillsFieldsetContainer from '../../Containers/Profile/TutorSkillsFieldsetContainer'
import { Persist } from 'formik-persist'


/**
 * TEMPORARY ABSTRACTION-LESS WORKAROUND, TODO: ABSTRACT FROM USERINFORMATIONFORM
 * @param {*} props 
 */
function NewUserForm(props) {
    return (
        <Formik
            intialValues={props.account.user_type == TUTOR ? { account: props.account, tutorSkills: props.tutorSkills } : { account: props.account }}
            onSubmit={(values) => { props.onSubmit(values) }}>
            {({ values, handleSubmit, setValues }) => (
                <form onSubmit={handleSubmit}>
                    <AccountInformationFieldset account={props.account} onChange={setValues} parentValues={values} />
                    {props.account.user_type == TUTOR && <TutorSkillsFieldsetContainer tutorSkills={props.tutorSkills} onChange={setValues} parentValues={values} />}
                    <PaymentInformationFieldset onChange={setValues} parentValues={values} />
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            )}
        </ Formik>
    )
}


NewUserForm.propTypes = {
    account: PropTypes.shape({
        email: PropTypes.string,
        name: PropTypes.string,
        password: PropTypes.string,
        user_type: PropTypes.string.isRequired,
    }).isRequired, // gotta have that userType babyyy

    payment: PropTypes.shape({
        email: PropTypes.string,
        password: PropTypes.string,
    }).isRequired,

    tutorSkills: PropTypes.shape({
        university: PropTypes.number,
        gpa: PropTypes.number,
        tutor_courses: PropTypes.array,
        tutor_subject_areas: PropTypes.array,
        tutor_availabilities: PropTypes.array,
    }),

    onSubmit: PropTypes.func.isRequired
}

NewUserForm.defaultProps = {
    account: {
        email: '',
        name: '',
        password: '',
        user_type: STUDENT
    },

    payment: {
        paypal_email: '',
        paypal_password: '',
    },

    tutorSkills: {
        university: 1,
        gpa: 4.0,
        tutor_courses: [],
        tutor_subject_areas: [],
        tutor_availabilities: [],
    },
}

export default NewUserForm;