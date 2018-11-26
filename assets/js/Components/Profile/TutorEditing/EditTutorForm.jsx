import { Formik } from 'formik';
import _ from 'lodash';
import React from 'react';
import { STUDENT, TUTOR } from "../../../Constants/userTypes";
import PaymentInformationFieldset from '../PaymentInformationFieldset';
import { Typeahead } from 'react-bootstrap-typeahead';
import AvailabilitySelectSubform from '../AvailabilitySelectSubform'
import { v4 as uuidv4 } from 'uuid';


/**
 * TEMPORARY ABSTRACTION-LESS WORKAROUND, TODO: ABSTRACT FROM USERINFORMATIONFORM
 * @param {*} props 
 */
class EditTutorForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        // console.log('user info')
        // console.log(this.props.user.user_info)
        // console.log(this.props)
        return (
            <Formik
                initialValues={_.clone(this.props.user.user_info)}
                onSubmit={(values) => { this.props.onSubmit(values) }}>

                {({ values, handleChange, handleSubmit, setValues }) => (
                    <form onSubmit={handleSubmit}>
                        {/* {console.log("values")}
                        {console.log(values)} */}

                        {/* Account stuff */}
                        <div className="card shadow p-3 mb-5 bg-white rounded padding border-0">
                            <div className="card-body">
                                <h3 className="card-title text-primary">Account Information</h3>
                                <label htmlFor="accountname">Name:</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="accountname"
                                    className="form-control bg-light border-0"
                                    onChange={handleChange}
                                    value={values.name} />

                                <label htmlFor="accountemail">Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="accountemail"
                                    className="form-control bg-light border-0"
                                    onChange={handleChange}
                                    value={values.email}
                                />
                                {/* <label htmlFor="accountpassword">Password:</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="accountpassword"
                                    className="form-control bg-light border-0"
                                    onChange={handleChange}
                                    value={values.password}
                                /> */}
                            </div>
                        </div>

                        {/* Payment */}
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                )}
            </ Formik>
        )
    }
}

export default EditTutorForm;