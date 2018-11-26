import { Formik } from 'formik';
import _ from 'lodash';
import React from 'react';
import { STUDENT, TUTOR } from "../../Constants/userTypes";
import PaymentInformationFieldset from './PaymentInformationFieldset';
import { Typeahead } from 'react-bootstrap-typeahead';
import AvailabilitySelectSubform from './AvailabilitySelectSubform'
import { v4 as uuidv4 } from 'uuid';


/**
 * TEMPORARY ABSTRACTION-LESS WORKAROUND, TODO: ABSTRACT FROM USERINFORMATIONFORM
 * @param {*} props 
 */
class EditTutorForm extends React.Component {
    constructor(props) {
        super(props);

        this.formatSubjectOptions = this.formatSubjectOptions.bind(this);
        this.formatCourseOptions = this.formatCourseOptions.bind(this);
        this.renderUniversityOptions = this.renderUniversityOptions.bind(this);
    }

    componentWillMount() {
        this.props.fetchUniversities();
        this.props.fetchSubjectAreas();
        this.props.fetchCourses();
    }

    renderUniversityOptions() {
        return (_.map(this.props.universities, (university) => { return (<option key={university.id} value={university.id}> {university.name} </option>) }));
    }

    formatSubjectOptions() {
        let options = _.map(this.props.subjectAreas, (subjectArea) => { return { id: subjectArea.id, name: subjectArea.subject_area } });
        return options;
    }

    formatCourseOptions(university_id) {
        let courseOptions = [];

        _.each(this.props.courses,
            (course) => {
                if (course.university_id == university_id) {
                    courseOptions.push({ id: course.id, name: course.course_no + ": " + course.course_name });
                }
            });

        return courseOptions;
    }
    // Do diffing at the end
    // Save the original list
    // if it's in the new list and not the old list, it's an add
    // if it's in the old list but not the new list, it's a remove

    render() {
        console.log('user info')
        console.log(this.props.user.user_info)
        // console.log(this.props)
        return (
            <Formik
                initialValues={_.clone(this.props.user.user_info)}
                onSubmit={(values) => { this.props.onSubmit(values) }}>

                {({ values, handleChange, handleSubmit, setValues }) => (
                    <form onSubmit={handleSubmit}>
                        {console.log("values")}
                        {console.log(values)}


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

                                {/* <label htmlFor="accountpassword">Password:</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="accountpassword"
                                    className="form-control bg-light border-0"
                                    onChange={handleChange}
                                    value={values.password}
                                /> */}
                            </div>
                        </div>

                        {/* Tutor information stuff */}

                        <div className="card shadow p-3 mb-5 bg-white rounded padding border-0">
                            <div className="card-body">
                                <h3 className="card-title text-primary">Tutoring Profile</h3>

                                <label className="mt-2" htmlFor="uni">University:</label>
                                <select
                                    id="university"
                                    name="university"
                                    onChange={handleChange}
                                    value={values.university.id}
                                    className="form-control border-0 bg-light">
                                    {this.renderUniversityOptions()}
                                </select>

                                <div className="mb-1 mt-3">
                                    <label htmlFor="gpa">GPA:</label>
                                    <input
                                        type="number"
                                        name="gpa"
                                        id="gpa"
                                        min="0"
                                        max="5"
                                        step='.1'
                                        className="form-control bg-light border-0"
                                        onChange={handleChange}
                                        value={values.gpa} />
                                </div>

                                <div className="mb-1 mt-3">
                                    <label htmlFor="courses">Courses:</label>
                                    <Typeahead
                                        id="courses"
                                        name="courses"
                                        placeholder="Search for courses at your university..."
                                        selectHintOnEnter={true}
                                        multiple
                                        selected={values.courses}
                                        labelKey="name"
                                        onChange={(selected) => {
                                            setValues(_.assign(values, { courses: selected }));
                                        }}
                                        options={this.formatCourseOptions(values.university)} />
                                </div>

                                <div className="mb-1 mt-3">
                                    <label htmlFor="subject_areas">Subject Areas:</label>
                                    <Typeahead
                                        id="subject_areas"
                                        name=".subject_areas"
                                        placeholder="Search for subjects..."
                                        selectHintOnEnter={true}
                                        selected={values.subject_areas}
                                        multiple
                                        labelKey="name"
                                        onChange={(selected) => {
                                            console.log(selected)
                                            // Update form values
                                            setValues(_.assign(values, { subject_areas: selected }));

                                        }}
                                        options={this.formatSubjectOptions()} />
                                </div>

                                <div className="mb-3 mt-3">
                                    <AvailabilitySelectSubform onSubmit={(timeblock) => {
                                        setValues(_.assign(values, { availabilities: values.availabilities.concat(timeblock) }));
                                    }} />

                                    <TimeblockList values={values.availabilities} removeTimeblock={(timeblock) => {
                                        setValues(_.assign(values, { availabilities: _.without(values.availabilities, timeblock) }));
                                    }} />
                                </div>
                            </div>
                        </div>


                        {/* Payment */}
                        {/* <PaymentInformationFieldset onChange={setValues} parentValues={values} /> */}
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                )}
            </ Formik>
        )
    }
}


// EditTutorForm.propTypes = {
//     account: PropTypes.shape({
//         email: PropTypes.string,
//         name: PropTypes.string,
//         password: PropTypes.string,
//         user_type: PropTypes.string.isRequired,
//     }).isRequired, // gotta have that userType babyyy

//     payment: PropTypes.shape({
//         email: PropTypes.string,
//         password: PropTypes.string,
//     }).isRequired,

//     tutorSkills: PropTypes.shape({
//         university: PropTypes.number,
//         gpa: PropTypes.number,
//         courses: PropTypes.array,
//         subject_areas: PropTypes.array,
//         availabilities: PropTypes.array,
//     }),

//     onSubmit: PropTypes.func.isRequired
// }

// EditTutorForm.defaultProps = {
//     user_info: {
//         email: '',
//         name: '',
//         // password: '', cutting out editing passwords for now
//         // paypal_email: '',
//         // paypal_password: '', not sure how we're authenticating this
//         university: 1,
//         gpa: 4.0,
//         courses: [],
//         subject_areas: [],
//         availabilities: [],
//     }
// }

class TimeblockList extends React.Component {
    constructor(props) {
        super(props)
        this.removeTimeblock = this.removeTimeblock.bind(this);
    }

    removeTimeblock(timeblock) {
        this.props.removeTimeblock(timeblock)
    }

    render() {
        let timeblockList = _.map(this.props.values,
            (timeblock) => {
                return (<Timeblock key={uuidv4()} removeTimeblock={this.removeTimeblock} timeblock={timeblock} />)
            });

        return (timeblockList);
    }
}

function Timeblock(props) {
    return (
        <div className="row">
            <p> Start: {props.timeblock.start.toLocaleString()}</p>
            <p> End: {props.timeblock.end.toLocaleString()}</p>
            <button type="button" onClick={() => { props.removeTimeblock(props.timeblock) }} className="btn btn-danger"> Remove timeblock </button>
        </div>
    )
}

export default EditTutorForm;