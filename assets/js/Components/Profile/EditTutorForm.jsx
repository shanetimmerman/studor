import { Formik } from 'formik';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { STUDENT, TUTOR } from "../../Constants/userTypes";
import AccountInformationFieldset from './AccountInformationFieldset';
import PaymentInformationFieldset from './PaymentInformationFieldset';
import TutorSkillsFieldsetContainer from '../../Containers/Profile/TutorSkillsFieldsetContainer'
import { Persist } from 'formik-persist'
import { Typeahead } from 'react-bootstrap-typeahead';


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
        let options = _.map(this.props.subjectAreas, (subjectArea) => { return { id: subjectArea.id, label: subjectArea.subject_area } });
        return options;
    }

    formatCourseOptions(university_id) {
        console.log(university_id)

        let courseOptions = [];

        _.each(this.props.courses,
            (course) => {
                if (course.university_id == university_id) {
                    courseOptions.push({ id: course.id, label: course.course_no + ": " + course.course_name });
                }
            });

        return courseOptions;
    }


    render() {
        console.log(this.props)
        return (
            <Formik
                intialValues={{ account: this.props.account, tutorSkills: this.props.tutorSkills, payment: this.props.payment }}
                onSubmit={(values) => { props.onSubmit(values) }}>
                {({ values, handleChange, handleSubmit, setValues }) => (
                    <form onSubmit={handleSubmit}>
                        {console.log("okay these are values")}
                        {console.log(values)}


                        {/* Account stuff */}
                        <div className="card shadow p-3 mb-5 bg-white rounded padding border-0">
                            <div className="card-body">
                                <h3 className="card-title text-primary">Account Information</h3>
                                <label htmlFor="accountname">Name:</label>
                                <input
                                    type="text"
                                    name="account.name"
                                    id="accountname"
                                    className="form-control bg-light border-0"
                                    onChange={handleChange}
                                    value={values.account.name} />

                                <label htmlFor="accountemail">Email:</label>
                                <input
                                    type="email"
                                    name="account.email"
                                    id="accountemail"
                                    className="form-control bg-light border-0"
                                    onChange={handleChange}
                                    value={values.account.email}
                                />

                                <label htmlFor="accountpassword">Password:</label>
                                <input
                                    type="password"
                                    name="account.password"
                                    id="accountpassword"
                                    className="form-control bg-light border-0"
                                    onChange={handleChange}
                                    value={values.account.password}
                                />
                            </div>
                        </div>

                        {/* Tutor information stuff */}

                        <div className="card shadow p-3 mb-5 bg-white rounded padding border-0">
                            <div className="card-body">
                                <h3 className="card-title text-primary">Tutoring Profile</h3>

                                <label className="mt-2" htmlFor="uni">University:</label>
                                <select
                                    id="univeristy"
                                    name="tutorSkills.univeristy"
                                    onChange={handleChange}
                                    value={values.university}
                                    className="form-control border-0 bg-light">
                                    {this.renderUniversityOptions()}
                                </select>

                                <div className="mb-1 mt-3">
                                    <label htmlFor="gpa">GPA:</label>
                                    <input
                                        type="number"
                                        name="tutorSkills.gpa"
                                        id="gpa"
                                        min="0"
                                        max="5"
                                        step='.1'
                                        className="form-control bg-light border-0"
                                        onChange={handleChange}
                                        value={values.gpa} />
                                </div>

                                <div className="mb-1 mt-3">
                                    <label htmlFor="tutor_courses">Courses:</label>
                                    <Typeahead
                                        id="tutor_courses"
                                        name="tutorSkills.tutor_courses"
                                        placeholder="Search for courses at your university..."
                                        selectHintOnEnter={true}
                                        multiple
                                        selected={values.display}
                                        onChange={(selected) => {
                                            console.log("values")
                                            console.log(values)
                                            // Alias for source values
                                            let source = values;

                                            // Convert to list of ids
                                            let ids = _.map(selected, (selected) => selected.id);

                                            // Get the difference
                                            let diffSelected = _.reduce(ids, (id) => source.display.has(id));

                                            // Figure out the target change list ( If the list of selected items is bigger, this means we added, so just add this to toAdd, otherwise use toDelete)
                                            let target = selected.length > source.display.length ? source.toAdd : source.toDelete;

                                            // Make changes to target
                                            target = target.concat(diffSelected)

                                            // Update display
                                            setValues(_.assign(source.display, ids));

                                            console.log(source);
                                        }}
                                        options={this.formatCourseOptions(1)} />
                                </div>
                            </div>
                        </div>

                        {/* <div className="mb-1 mt-3">
                                <label htmlFor="tutor_subject_areas">Subject Areas:</label>
                                <Typeahead
                                    id="tutor_subject_areas"
                                    name="tutorSkills.tutor_subject_areas"
                                    placeholder="Search for subjects..."
                                    selectHintOnEnter={true}
                                    multiple
                                    onChange={(selected) => {
                                        let ids = _.map(selected, (selected) => selected.id);
                                        setValues(_.assign(values, { tutor_subject_areas: ids }));
                                        this.props.onChange(_.assign(this.props.parentValues, { tutorSkills: values }))
                                    }}
                                    options={this.formatSubjectOptions()} />
                            </div>

                            <div className="mb-3 mt-3">
                                <AvailabilitySelectSubform onSubmit={(timeblock) => {
                                    setValues(_.assign(values, { tutor_availabilities: values.tutor_availabilities.concat(timeblock) }));
                                    this.props.onChange(_.assign(this.props.parentValues, { tutorSkills: values }))
                                }} />

                                <TimeblockList values={values} removeTimeblock={(timeblock) => {
                                    setValues(_.assign(values, { tutor_availabilities: _.without(values.tutor_availabilities, timeblock) }));
                                    this.props.onChange(_.assign(this.props.parentValues, { tutorSkills: values }))
                                }} />
                            </div>
                        </div>
                    </div> */}


                        {/* Payment */}
                        <PaymentInformationFieldset onChange={setValues} parentValues={values} />
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
//         tutor_courses: PropTypes.array,
//         tutor_subject_areas: PropTypes.array,
//         tutor_availabilities: PropTypes.array,
//     }),

//     onSubmit: PropTypes.func.isRequired
// }

EditTutorForm.defaultProps = {
    account: {
        email: '',
        name: '',
        password: '',
    },

    payment: {
        paypal_email: '',
        paypal_password: '',
    },

    tutorSkills: {
        university: 1,
        gpa: 4.0,
        tutor_courses: {
            display: [1],
            toAdd: [],
            toDelete: [],
        },

        tutor_subject_areas: {
            display: [],
            toAdd: [],
            toDelete: [],
        },

        tutor_availabilities: {
            display: [],
            toAdd: [],
            toDelete: [],
        },
    },
}

class TimeblockList extends React.Component {
    constructor(props) {
        super(props)
        this.removeTimeblock = this.removeTimeblock.bind(this);
    }

    removeTimeblock(timeblock) {
        this.props.removeTimeblock(timeblock)
    }

    render() {
        let timeblockList = _.map(this.props.values.tutor_availabilities,
            (timeblock) => {
                return (<Timeblock key={uuidv4()} removeTimeblock={this.removeTimeblock} timeblock={timeblock} />)
            });

        return (timeblockList);
    }
}

function Timeblock(props) {
    return (
        <div className="row">
            <p> Start: {props.timeblock.start_time.toLocaleString()}</p>
            <p> End: {props.timeblock.end_time.toLocaleString()}</p>
            <button type="button" onClick={() => { props.removeTimeblock(props.timeblock) }} className="btn btn-danger"> Remove timeblock </button>
        </div>
    )
}

export default EditTutorForm;