import { Formik } from 'formik';
import _ from 'lodash';
import React from 'react';
import { STUDENT, TUTOR } from "../../Constants/userTypes";



/**
 * TEMPORARY ABSTRACTION-LESS WORKAROUND, TODO: ABSTRACT FROM USERINFORMATIONFORM
 * @param {*} props 
 */
class NewUserForm extends React.Component {
    constructor(props) {
        super(props);

        this.renderAccountInfo = this.renderAccountInfo.bind(this);
    }

    componentWillMount() {
        this.props.fetchUniversities();
    }

    renderUniversityOptions() {
        return (_.map(this.props.universities, (university) => { return (<option key={university.id} value={university.id}> {university.name} </option>) }));
    }

    renderAccountInfo(values, errors, touched, handleChange, setValues) {
        return (
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
                        value={values.name}
                        required />

                    <label htmlFor="accountemail">Email:</label>
                    <input
                        type="email"
                        name="email"
                        id="accountemail"
                        className="form-control bg-light border-0"
                        onChange={handleChange}
                        value={values.email}
                        required
                    />
                    {errors.email && touched.email && <p className="text-danger"> {errors.email} </p>}

                    <label htmlFor="accountpassword">Password:</label>
                    <input
                        type="password"
                        name="password_hash"
                        id="accountpassword"
                        className="form-control bg-light border-0"
                        onChange={handleChange}
                        value={values.password_hash}
                        required
                    />
                    {/* {errors.password && touched.password && errors.password} */}

                    <div className="row mb-3 mt-3">
                        <div className="col-md-4">
                            <label htmlFor="studentTutorSelect">I am a:</label>
                            <select
                                id="studentTutorSelect"
                                name="user_type"
                                onChange={(event) => {
                                    switch (values.user_type) {
                                        // If it was previously student, add relevant fields to the values
                                        case STUDENT: setValues(_.assign(values, { user_type: event.target.value, paypal_email: '', gpa: 4.0, university_id: 1 })); break;
                                        // If they were previously a tutor, remove those values
                                        case TUTOR: setValues({ name: values.name, email: values.email, password: values.password, user_type: STUDENT }); break;
                                        default: new Error("Invalid user type");
                                    }
                                }}
                                value={values.user_type}
                                className="form-control border-0 bg-light">
                                <option value={STUDENT}>Student</option>
                                <option value={TUTOR}>Tutor</option>
                            </select>
                        </div>
                        <div className="col-md-8"></div>
                    </div>
                </div>
            </div>
        )
    }

    renderTutorInfo(values, handleChange) {
        return (
            <div>
                <div className="card shadow p-3 mb-5 bg-white rounded padding border-0">
                    <div className="card-body">
                        <h3 className="card-title text-primary">Tutoring Profile</h3>

                        <label className="mt-2" htmlFor="uni">University:</label>
                        <small className="text-muted">You will later be able to add courses at your university that you tutor to your tutoring profile.</small>

                        <select
                            id="univeristy"
                            name="univeristy_id"
                            onChange={handleChange}
                            value={values.university_id}
                            className="form-control border-0 bg-light">
                            {this.renderUniversityOptions()}
                        </select>

                        <div className="mb-1 mt-3">
                            <label htmlFor="gpa">GPA:</label>
                            <input
                                type="number"
                                name="gpa"
                                id="gpa"
                                min="0"
                                max="5"
                                step='.1'
                                className="form-control bg-light border-0"
                                onChange={handleChange}
                                value={values.gpa}
                                required />
                        </div>
                    </div>
                </div>

                <div className="card shadow p-3 mb-5 bg-white rounded padding border-0">
                    <div className="card-body">
                        <h3 className="card-title text-primary">Payment Information</h3>
                        <div className="col">
                            <label htmlFor="paypal_email">Paypal Email:</label>
                            <small className="text-muted">Payment for sessions is handled through PayPal. Please include an email associated with a PayPal account.</small>

                            <input
                                type="email"
                                name="paypal_email"
                                id="paypal_email"
                                className="form-control bg-light border-0"
                                onChange={handleChange}
                                value={values.paypal_email}
                                required
                            />
                            {errors.paypal_email && touched.paypal_email && <p className="text-danger"> {errors.paypal_email} </p>}

                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <Formik
                initialValues={{ name: '', email: '', password_hash: '', user_type: STUDENT }}
                onSubmit={(values) => {
                    console.log('submitting')
                    console.log(values)
                    this.props.onSubmit(values)
                }}
                validate={values => {
                    let errors = {};
                    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                        errors.email = 'Email addresses must include a . before a domain name.';
                    }

                    if (values.paypal_email) {
                        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.paypal_email)) {
                            errors.paypal_email = 'Email addresses must include a . before a domain name.';
                        }
                    }
                    return errors;
                }}>
                {({ values, handleSubmit, handleChange, setValues }) => (
                    < form onSubmit={handleSubmit}>
                        {console.log(values)}
                        {this.renderAccountInfo(values, handleChange, setValues, errors, touched)}
                        {values.user_type == TUTOR && this.renderTutorInfo(values, handleChange, errors, touched)}
                        <button type="submit" className="btn btn-primary">Create account</button>
                    </form>
                )
                }
            </ Formik>
        )
    }
}

export default NewUserForm;