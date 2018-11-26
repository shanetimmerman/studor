import { Formik } from 'formik';
import _ from 'lodash';
import React from 'react';

/**
 * TEMPORARY ABSTRACTION-LESS WORKAROUND, TODO: ABSTRACT FROM USERINFORMATIONFORM
 * @param {*} props 
 */
function EditStudentForm(props) {
    let info = props.user.user_info;

    return (
        <Formik
            initialValues={{ name: info.name, email: info.email }}
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
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary">Save changes</button>
                </form>
            )}
        </ Formik>
    )
}

export default EditStudentForm;