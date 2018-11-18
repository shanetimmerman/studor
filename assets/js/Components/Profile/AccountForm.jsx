import React from 'react';
import { connect } from 'react-redux';
import {Formik} from 'formik';
import _ from 'lodash';



class AccountForm extends React.Component {
    constructor(props) {
      super(props);
  
    }

    render () {
    return (<Formik
        initialValues={{ name:'', email: '', password: '', user_type: 'student' }}
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
            <form>
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
                    />

                    <label htmlFor="accountemail">Email:</label>
                    <input
                    type="email"
                    name="email"
                    id="accountemail"
                    className="form-control bg-light border-0"
                    onChange={handleChange}
                    value={values.email}
                    />
                    {errors.email && touched.email && errors.email}
                    
                    <label htmlFor="accountpassword">Password:</label>
                    <input
                    type="password"
                    name="password"
                    id="accountpassword"
                    className="form-control bg-light border-0"
                    onChange={handleChange}
                    value={values.password}
                    />
                    {errors.password && touched.password && errors.password}

                    <div className="row mb-3 mt-3">
                        <div className="col-md-4">
                            <label htmlFor="studentTutorSelect">I am a:</label>
                            <select 
                            id="studentTutorSelect"
                            name="user_type"
                            onChange={handleChange}
                            value={values.user_type}
                            className="form-control border-0 bg-light">
                                <option>Student</option>
                                <option>Tutor</option>
                            </select>
                        </div>
                        <div className="col-md-8"></div>
                    </div>

                    <button type="submit" className="btn circle btn-primary" onClick={handleSubmit}>Save Changes</button>
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

  export default connect(mapStateToProps)(AccountForm);