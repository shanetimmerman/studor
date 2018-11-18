import React from 'react';
import { connect } from 'react-redux';
import {Formik} from 'formik';
import _ from 'lodash';



class PaymentForm extends React.Component {
    constructor(props) {
      super(props);
  
    }

    render () {
    return (<Formik
        initialValues={{ paypal_email: '', paypal_password: '' }}
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
            <div class="card-body">
            <h3 class="card-title text-primary">Payment Information</h3>

            <h5>Paypal Account</h5>
            <p className="text-secondary">This is the Paypal account that will be used to pay for tutoring sessions</p>

            <div className="vertical-padding">
            <label htmlFor="paypalemail">Email:</label>
                <input
                type="email"
                name="email"
                id="paypalemail"
                className="form-control bg-light border-0"
                onChange={handleChange}
                value={values.paypal_email}
                />
            </div>
                {errors.email && touched.email && errors.email}
                
            <div className="vertical-padding">
                <label htmlFor="paypalpassword">Paypal Password:</label>
                <input
                type="password"
                name="password"
                id="paypalpassword"
                className="form-control bg-light border-0"
                onChange={handleChange}
                value={values.paypal_password}
                />
            </div>
                {errors.password && touched.password && errors.password}

                <button type="submit" className="btn btn-primary">Change Account</button>
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

  export default connect(mapStateToProps)(PaymentForm);