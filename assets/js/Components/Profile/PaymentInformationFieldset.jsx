import React from 'react';
import { Formik } from 'formik';
import _ from 'lodash';
import PropTypes from 'prop-types';

class PaymentInformationFieldset extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<Formik
      initialValues={{ paypal_email: '', paypal_password: '' }}
      validate={values => {
        let errors = {};
        if (!values.paypal_email) {
          errors.paypal_email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.paypal_email)
        ) {
          errors.paypal_email = 'Invalid email address';
        }
        return errors;
      }}>
      {({ values, errors, touched, setValues }) => (
        <div className="card shadow p-3 mb-5 bg-white rounded padding border-0">
          <div className="card-body">
            <h3 className="card-title text-primary">Payment Information</h3>
            <h5>Paypal Account</h5>
            <p className="text-secondary">This is the Paypal account that will be used to pay for tutoring sessions</p>
            <div>
              <div className="mb-1">
                <label htmlFor="paypalemail">Email:</label>
                <input
                  type="email"
                  name="paypal_email"
                  id="paypalemail"
                  className="form-control bg-light border-0"
                  onChange={(event) => {
                    setValues(_.assign(values, { paypal_email: event.target.value }));
                    this.props.onChange(_.assign(this.props.parentValues, { payment: values }));
                  }}
                  value={values.paypal_email}
                />
              </div>
              {errors.email && touched.email && errors.email}

              <div className="mb-4">
                <label htmlFor="paypalpassword">Paypal Password:</label>
                <input
                  type="password"
                  name="paypal_password"
                  id="paypalpassword"
                  className="form-control bg-light border-0"
                  onChange={(event) => {
                    setValues(_.assign(values, { paypal_password: event.target.value }));
                    this.props.onChange(_.assign(this.props.parentValues, { payment: values }));
                  }}
                  value={values.paypal_password}
                />
              </div>
              {errors.password && touched.password && errors.password}
            </div>
          </div>
        </div>
      )}
    </Formik>);
  }
}

PaymentInformationFieldset.propTypes = {
  onChange: PropTypes.func.isRequired,
  parentValues: PropTypes.object.isRequired,
}

export default PaymentInformationFieldset;