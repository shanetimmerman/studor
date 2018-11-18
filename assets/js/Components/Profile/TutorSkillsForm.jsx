import React from 'react';
import { connect } from 'react-redux';
import {Formik} from 'formik';
import {Typeahead} from 'react-bootstrap-typeahead'; 
import _ from 'lodash';



class TutorSkillsForm extends React.Component {
    constructor(props) {
      super(props);
  
    }

    render () {
    return (<Formik
        initialValues={{ university:'', gpa: '', subject_areas: [], courses: [], availability: [] }}
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
            <h3 class="card-title text-primary">Tutoring Profile</h3>
            <label htmlFor="uni">University:</label>
            <select 
            id="uni"
            name="user_type"
            className="form-control border-0 bg-light">
                <option>Northeastern</option>
                <option>Boston University</option>
                <option>Harvard University</option>
                <option>Massachusetts Institute</option>
            </select>

            <div className="vertical-padding">
            <label htmlFor="gpa">GPA:</label>
                <input
                type="text"
                name="gpa"
                id="gpa"
                className="form-control bg-light border-0"
                onChange={handleChange}
                value={values.email}
                />
            </div>

            <div className="vertical-padding">
            <label htmlFor="courses">Courses:</label>
             <Typeahead
             id="courses"
             multiple
            onChange={(selected) => {
                this.setState({selected});
            }}
            options={["Course1", "Course2", "Course3", "Course4"]}
            />
            </div>

            <div className="vertical-padding">
                <label htmlFor="subject_areas">Subject Areas:</label>
                <Typeahead
                id="subject_areas"
                multiple
                onChange={(selected) => {
                    this.setState({selected});
                }}
                options={["Anthropology", "Astrology", "Biology", "Calculus"]}
                />
            </div>

            <div className="vertical-padding">
            <label htmlFor="avail">Availability:</label>
            <input id="avail"></input>
            </div>

            <button type="submit" className="btn btn-primary">Save Changes</button>
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

  export default connect(mapStateToProps)(TutorSkillsForm);