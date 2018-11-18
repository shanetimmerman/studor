import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Formik } from 'formik';


class SignInForm extends React.Component {
    constructor(props) {
      super(props);
  
    }

    render () {
    return (<Formik
        initialValues={{ email: '', password: '', user_type: 'student' }}
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
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
        }) => (
            <form onSubmit={handleSubmit}>
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
                        className="form-control border-0 bg-light">
                            <option>Student</option>
                            <option>Tutor</option>
                        </select>
                    </div>
                    <div className="col-md-8"></div>
                </div>
            </div>
    
            <div className="row vertical-padding">
                <div className="col-md-4">
                <div className="row">
                    <button type="submit" className="btn btn-primary">Log in</button>
                    <button type="button" class="btn btn-outline-primary">Sign up</button>
                </div>
                </div>
            </div>
            </form>
        )}
      </Formik>);
    }
}
  

  function mapStateToProps(state) {
      return {

      }
  }

  export default connect(mapStateToProps)(SignInForm);