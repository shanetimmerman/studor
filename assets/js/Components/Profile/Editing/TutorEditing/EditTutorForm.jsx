import { Formik } from 'formik';
import _ from 'lodash';
import React from 'react';
import TutorAccountInfoDisplayContainer from '../../../../Containers/Profile/Display/TutorDisplay/TutorAccountInfoDisplayContainer';

/**
 * TEMPORARY ABSTRACTION-LESS WORKAROUND, TODO: ABSTRACT FROM USERINFORMATIONFORM
 * @param {*} props
 */
class EditTutorForm extends React.Component {
    constructor(props) {
        super(props);
        this.renderUniversityOptions = this.renderUniversityOptions.bind(this);

        this.state = {
            edit: false
        }

        this.toggleEdit = this.toggleEdit.bind(this);
    }

    toggleEdit() {
        this.setState({ edit: !this.state.edit })
    }

    componentWillMount() {
        this.props.fetchUniversities();
    }

    renderUniversityOptions() {
        return (_.map(this.props.universities, (university) => { return (<option key={university.id} value={university.id}> {university.name} </option>) }));
    }

    render() {
        let info = this.props.user.user_info;

        if (this.state.edit) {
            return (
                <Formik
                    initialValues={{ name: info.name, email: info.email, bio: info.bio, university_id: info.university.id, gpa: info.gpa, paypal_email: info.paypal_email }}
                    onSubmit={(values) => {
                        this.toggleEdit();
                        this.props.onSubmit(values)
                    }}
                    validate={(values) => {
                        let errors = {};
                        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                            errors.email = 'Email addresses must include a . before a domain name.';
                        }

                        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.paypal_email)) {
                            errors.paypal_email = 'Email addresses must include a . before a domain name.';
                        }
                        return errors;
                    }}>

                    {({ values, handleChange, handleSubmit, errors, touched, setValues }) => (
                        <form onSubmit={handleSubmit}>
                            {console.log("values")}
                            {console.log(values)}

                            {/* Account stuff */}
                            <div className="card shadow p-3 mb-5 bg-white rounded padding border-0">
                                <div className="card-body">
                                    <h3 className="card-title text-primary">Account Information</h3>
                                    <label htmlFor="accountname">Name:</label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="accountname"
                                        className="form-control bg-light mb-3 border-0"
                                        onChange={handleChange}
                                        value={values.name}
                                        required />

                                    <label htmlFor="accountemail">Email:</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="accountemail"
                                        className="form-control bg-light mb-3 border-0"
                                        onChange={handleChange}
                                        value={values.email}
                                        required
                                    />
                                    {errors.email && touched.email && <p className="text-danger"> {errors.email} </p>}

                                    <label htmlFor="tutor_bio">Bio:</label>
                                    <textarea
                                        name="bio"
                                        id="tutor_bio"
                                        className="form-control bg-light mb-3 border-0"
                                        onChange={handleChange}
                                        value={values.bio}
                                    />

                                    <label className="mt-2" htmlFor="university">University:</label>
                                    <select
                                        id="univeristy"
                                        name="university_id"
                                        onChange={handleChange}
                                        value={values.university_id}
                                        className="form-control border-0 mb-3 bg-light">
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
                                            className="form-control bg-light mb-3 border-0"
                                            onChange={handleChange}
                                            value={values.gpa}
                                            required />
                                    </div>

                                    <label htmlFor="paypalemail">Paypal Email:</label>
                                    <input
                                        type="email"
                                        name="paypal_email"
                                        id="paypalemail"
                                        className="form-control bg-light mb-3 border-0"
                                        onChange={handleChange}
                                        value={values.paypal_email}
                                        required
                                    />
                                    {errors.paypal_email && touched.paypal_email && <p className="text-danger"> {errors.paypal_email} </p>}

                                    <div className="row">
                                        <div className="p-1">
                                            <button type="submit" className="btn btn-sm btn-primary"> Save changes </button>
                                        </div>
                                        <div className="p-1">
                                            <button onClick={this.toggleEdit} className="btn btn-sm btn-danger">Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            </div>



                        </form>
                    )}
                </ Formik>
            )
        } else {
            return (
                <div>
                    <TutorAccountInfoDisplayContainer onEditButton={this.toggleEdit} />
                </div>)
        }
    }
}

export default EditTutorForm;
