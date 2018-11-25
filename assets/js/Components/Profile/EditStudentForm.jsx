import { Formik } from 'formik';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { STUDENT, TUTOR } from "../../Constants/userTypes";
import AccountInformationFieldset from './AccountInformationFieldset';
import PaymentInformationFieldset from './PaymentInformationFieldset';
import TutorSkillsFieldsetContainer from '../../Containers/Profile/TutorSkillsFieldsetContainer'
import { Persist } from 'formik-persist'


/**
 * TEMPORARY ABSTRACTION-LESS WORKAROUND, TODO: ABSTRACT FROM USERINFORMATIONFORM
 * @param {*} props 
 */
function EditStudentForm(props) {
    return (
        <Formik
            intialValues={props}
            onSubmit={(values) => { props.onSubmit(values) }}>
            {({ values, handleChange, handleSubmit, setValues }) => (
                <form onSubmit={handleSubmit}>

                    {/* Account stuff */}
                    <div className="card shadow p-3 mb-5 bg-white rounded padding border-0">
                        <div className="card-body">
                            <h3 className="card-title text-primary">Account Information</h3>
                            <label htmlFor="accountname">Name:</label>
                            <input
                                type="text"
                                name="account.name"
                                id="accountname"
                                className="form-control bg-light border-0"
                                onChange={handleChange}
                                value={values.name} />

                            <label htmlFor="accountemail">Email:</label>
                            <input
                                type="email"
                                name="account.email"
                                id="accountemail"
                                className="form-control bg-light border-0"
                                onChange={handleChange}
                                value={values.email}
                            />

                            <label htmlFor="accountpassword">Password:</label>
                            <input
                                type="password"
                                name="account.password"
                                id="accountpassword"
                                className="form-control bg-light border-0"
                                onChange={handleChange}
                                value={values.password}
                            />
                        </div>
                    </div>

                    <PaymentInformationFieldset onChange={setValues} parentValues={values} />
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            )}
        </ Formik>
    )
}


// EditUserForm.propTypes = {
//     account: PropTypes.shape({
//         email: PropTypes.string,
//         name: PropTypes.string,
//         password: PropTypes.string,
//         user_type: PropTypes.string.isRequired,
//     }).isRequired, // gotta have that userType babyyy

//     payment: PropTypes.shape({
//         email: PropTypes.string,
//         password: PropTypes.string,
//     }).isRequired,

//     tutorSkills: PropTypes.shape({
//         university: PropTypes.number,
//         gpa: PropTypes.number,
//         tutor_courses: PropTypes.array,
//         tutor_subject_areas: PropTypes.array,
//         tutor_availabilities: PropTypes.array,
//     }),

//     onSubmit: PropTypes.func.isRequired
// }

EditStudentForm.defaultProps = {
    account: {
        email: '',
        name: '',
        password: '',
    },

    payment: {
        paypal_email: '',
        paypal_password: '',
    },
}

export default EditStudentForm;