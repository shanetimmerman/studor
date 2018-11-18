import React from 'react';
import { connect } from 'react-redux';
import {Formik} from 'formik';

import _ from 'lodash';



class SessionRequestForm extends React.Component {
    constructor(props) {
      super(props);
  
    }

    render () {
        return (<Formik
            initialValues={{ message:'', date: '', start_time: '', end_time: '' }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
            }}
          >
            {({
              values,
              handleChange,
              handleSubmit,
            }) => (
                <form onSubmit={handleSubmit}>
                <div className="card shadow p-3 mb-5 bg-white rounded padding border-0">
                    <div className="card-body">
                        <h3 className="card-title">Request a Session</h3>
                        <p className="text-secondary">You are requesting a session with [Tutor]. You will be notified with their response.</p>

                            <div className="form-group mb-4">
                                <label htmlFor="requestmessage">Message to [Tutor]:</label>
                                <textarea
                                name="message"
                                id="requestmessage"
                                rows="3"
                                className="form-control bg-light border-0"
                                onChange={handleChange}
                                value={values.message}
                                />
                            </div>

                            <div className="form-inline mb-4">
                                <div className="form-group mr-3">
                                    <label htmlFor="date">Date:</label>
                                    <select 
                                    id="date"
                                    name="date"
                                    onChange={handleChange}
                                    value={values.date}
                                    className="form-control border-0 bg-light ml-2">
                                        <option>Date Picker</option>
                                    </select>
                                </div>
                                <div className="form-group mr-3 ">
                                    <label htmlFor="start">from</label>
                                    <select 
                                    id="start"
                                    name="start_time"
                                    onChange={handleChange}
                                    value={values.start_time}
                                    className="form-control border-0 bg-light ml-2">
                                        <option>5:00am</option>
                                        <option>6:00am</option>
                                        <option>7:00am</option>
                                        <option>8:00am</option>
                                        <option>9:00am</option>
                                        <option>10:00am</option>
                                        <option>11:00am</option>
                                        <option>12:00pm</option>
                                        <option>1:00pm</option>
                                        <option>2:00pm</option>
                                        <option>3:00pm</option>
                                        <option>4:00pm</option>
                                        <option>5:00pm</option>
                                        <option>6:00pm</option>
                                        <option>7:00pm</option>
                                        <option>8:00pm</option>                                        
                                        <option>9:00pm</option>
                                        <option>10:00pm</option>
                                        <option>11:00pm</option>
                                    </select>                                    
                                </div>  
                                <div className="form-group mr-3">
                                    <label htmlFor="end">to</label>
                                    <select 
                                    id="end"
                                    name="end_time"
                                    onChange={handleChange}
                                    value={values.end_time}
                                    className="form-control border-0 bg-light ml-2">
                                        <option>5:00am</option>
                                        <option>6:00am</option>
                                        <option>7:00am</option>
                                        <option>8:00am</option>
                                        <option>9:00am</option>
                                        <option>10:00am</option>
                                        <option>11:00am</option>
                                        <option>12:00pm</option>
                                        <option>1:00pm</option>
                                        <option>2:00pm</option>
                                        <option>3:00pm</option>
                                        <option>4:00pm</option>
                                        <option>5:00pm</option>
                                        <option>6:00pm</option>
                                        <option>7:00pm</option>
                                        <option>8:00pm</option>                                        
                                        <option>9:00pm</option>
                                        <option>10:00pm</option>
                                        <option>11:00pm</option>
                                    </select>    
                                </div>  
                            </div>                            

    
                        <button type="submit" className="btn rounded mt-3 btn-primary" onClick={handleSubmit}>Submit request</button>
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

  export default connect(mapStateToProps)(SessionRequestForm);