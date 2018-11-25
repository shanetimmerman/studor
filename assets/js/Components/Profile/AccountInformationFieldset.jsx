import React from 'react';
import { Formik } from 'formik';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { STUDENT, TUTOR } from '../../Constants/userTypes';

class AccountInformationFieldset extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<Formik
      initialValues={this.props.account}
      validate={values => {
        let errors = {};
        if (!values.email) {
          errors.email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }
        return errors;
      }}>
      {({ values, errors, touched, setValues }) => (
        <div>
          <div className="card shadow p-3 mb-5 bg-white rounded padding border-0">
            <div className="card-body">
              <h3 className="card-title text-primary">Account Information</h3>
              <label htmlFor="accountname">Name:</label>
              <input
                type="text"
                name="name"
                id="accountname"
                className="form-control bg-light border-0"
                onChange={(event) => {
                  setValues(_.assign(values, { name: event.target.value }));
                  this.props.onChange(_.assign(this.props.parentValues, { account: values }));
                }}
                value={values.name} />

              <label htmlFor="accountemail">Email:</label>
              <input
                type="email"
                name="email"
                id="accountemail"
                className="form-control bg-light border-0"
                onChange={(event) => {
                  setValues(_.assign(values, { email: event.target.value }));
                  this.props.onChange(_.assign(this.props.parentValues, { account: values }));
                }}
                value={values.email}
              />
              {errors.email && touched.email && errors.email}

              <label htmlFor="accountpassword">Password:</label>
              <input
                type="password"
                name="password"
                id="accountpassword"
                className="form-control bg-light border-0"
                onChange={(event) => {
                  setValues(_.assign(values, { password: event.target.value }));
                  this.props.onChange(_.assign(this.props.parentValues, { account: values }));
                }}
                value={values.password}
              />
              {errors.password && touched.password && errors.password}

              <div className="row mb-3 mt-3">
                <div className="col-md-4">
                  <label htmlFor="studentTutorSelect">I am a:</label>
                  <select
                    id="studentTutorSelect"
                    name="user_type"
                    onChange={(event) => {
                      setValues(_.assign(values, { user_type: event.target.value }));
                      this.props.onChange(_.assign(this.props.parentValues, { account: values }));
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
        </div>
      )}
    </Formik>);
  }
}

AccountInformationFieldset.propTypes = {
  account: PropTypes.shape({
    email: PropTypes.string,
    name: PropTypes.string,
    password: PropTypes.string,
    user_type: PropTypes.string,
  }).isRequired,

  onChange: PropTypes.func.isRequired,
  parentValues: PropTypes.object.isRequired,

}

AccountInformationFieldset.defaultProps = {
  account: {
    email: '',
    name: '',
    password: '',
    user_type: STUDENT
  }
}

export default AccountInformationFieldset;