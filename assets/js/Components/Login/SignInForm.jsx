import React from 'react';
import _ from 'lodash';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import { STUDENT, TUTOR } from '../../Constants/userTypes'



class SignInForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let error = this.props.user.error;
    return (
      <div>
        <Formik
          initialValues={{ email: '', password: '', user_type: STUDENT }}
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
          }}
          onSubmit={(values, actions) => {
            this.props.loginUser(values.email, values.password, values.user_type);
            actions.resetForm();
          }}>
          {({ values, errors, touched, handleChange, handleSubmit }) => (
            <form>

              {error && <p className="text-danger"> {error.responseText} </p>}

              <div className="card shadow p-3 mb-5 bg-white rounded padding border-0">
                <label htmlFor="loginemail">Email:</label>
                <input
                  type="email"
                  name="email"
                  id="loginemail"
                  className="form-control bg-light border-0"
                  onChange={handleChange}
                  value={values.email}
                />
                {errors.email && touched.email && errors.email}

                <label htmlFor="loginpassword">Password:</label>
                <input
                  type="password"
                  name="password"
                  id="loginpassword"
                  className="form-control bg-light border-0"
                  onChange={handleChange}
                  value={values.password}
                />
                {errors.password && touched.password && errors.password}

                <div className="row vertical-padding">
                  <div className="col-md-4">
                    <label htmlFor="studentTutorSelect">I am a:</label>
                    <select
                      id="studentTutorSelect"
                      name="user_type"
                      onChange={handleChange}
                      value={values.user_type}
                      className="form-control border-0 bg-light">
                      <option value={STUDENT}>Student</option>
                      <option value={TUTOR}>Tutor</option>
                    </select>
                  </div>
                  <div className="col-md-8"></div>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-12">
                  <button type="submit" className="btn rounded btn-primary" onClick={handleSubmit}>Log in</button>
                  <Link to={{ pathname: "/signup", state: values }} className="btn ml-2 rounded btn-outline-primary">Sign up</Link>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>);

  }
}

export default SignInForm;