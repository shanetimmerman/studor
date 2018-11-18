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
          handleChange,
          handleSubmit,
        }) => (
            <form>
                <div className="card shadow p-3 mb-5 bg-white rounded padding border-0">
                    <div className="card-body">
                        <h3 className="card-title text-primary">Tutoring Profile</h3>
                        
                        <label  className="mt-2" htmlFor="uni">University:</label>
                        <select 
                        id="uni"
                        name="user_type"
                        onChange={handleChange}
                        value={values.university}
                        className="form-control border-0 bg-light">
                            <option>Northeastern</option>
                            <option>Boston University</option>
                            <option>Harvard University</option>
                            <option>Massachusetts Institute</option>
                        </select>

                        <div className="mb-1 mt-3">
                            <label htmlFor="gpa">GPA:</label>
                            <input
                            type="text"
                            name="gpa"
                            id="gpa"
                            className="form-control bg-light border-0"
                            onChange={handleChange}
                            value={values.gpa}
                            />
                        </div>

                        <div className="mb-1 mt-3">
                            <label htmlFor="courses">Courses:</label>
                            <Typeahead
                            id="courses"
                            name="courses"
                            multiple
                            className="bg-light border-0"
                            onChange={(selected) => {
                                values.courses = selected;
                              }}
                            value={values.courses}
                            options={["Course1", "Course2", "Course3", "Course4"]}
                            />
                        </div>

                        <div className="mb-1 mt-3">
                            <label htmlFor="subject_areas">Subject Areas:</label>
                            <Typeahead
                            id="subject_areas"
                            name="subject_areas"
                            multiple
                            onChange={(selected) => {
                                values.subject_areas = selected
                              }}
                            value={values.subject_areas}
                            options={["Anthropology", "Astrology", "Biology", "Calculus"]}
                            />
                        </div>

                        <div className="mb-3 mt-3">
                            <label htmlFor="avail">Availability:</label>
                            <input 
                            onChange={handleChange}
                            value={values.availability}
                            id="avail"></input>
                        </div>

                        <button type="submit" className="btn rounded mt-3 btn-primary" onClick={handleSubmit}>Save Changes</button>
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