import React from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { Typeahead } from 'react-bootstrap-typeahead';
import _ from 'lodash';
import PropTypes from 'prop-types';
import AvailabilitySelectSubform from './AvailabilitySelectSubform'
import { v4 as uuidv4 } from 'uuid';



class TutorSkillsFieldset extends React.Component {
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
        return (<Formik
            initialValues={this.props.tutorSkills}>
            {({ values, setValues }) => (
                <div>
                    <div className="card shadow p-3 mb-5 bg-white rounded padding border-0">
                        <div className="card-body">
                            <h3 className="card-title text-primary">Tutoring Profile</h3>

                            <label className="mt-2" htmlFor="uni">University:</label>
                            <select
                                id="univeristy"
                                name="user_type"
                                onChange={(event) => {
                                    setValues(_.assign(values, { univeristy: event.target.value }));
                                    this.props.onChange(_.assign(this.props.parentValues, { tutorSkills: values }));
                                }}
                                value={values.university}
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
                                    onChange={(event) => {
                                        setValues(_.assign(values, { gpa: event.target.value }));
                                        this.props.onChange(_.assign(this.props.parentValues, { tutorSkills: values }));
                                    }}
                                    value={values.gpa} />
                            </div>

                            <div className="mb-1 mt-3">
                                <label htmlFor="tutor_courses">Courses:</label>
                                <Typeahead
                                    id="tutor_courses"
                                    name="tutor_courses"
                                    placeholder="Search for courses at your university..."
                                    selectHintOnEnter={true}
                                    multiple
                                    onChange={(selected) => {
                                        let ids = _.map(selected, (selected) => selected.id);
                                        setValues(_.assign(values, { tutor_courses: ids }));
                                        this.props.onChange(_.assign(this.props.parentValues, { tutorSkills: values }))
                                    }}
                                    options={this.formatCourseOptions(values.university)} />
                            </div>

                            <div className="mb-1 mt-3">
                                <label htmlFor="tutor_subject_areas">Subject Areas:</label>
                                <Typeahead
                                    id="tutor_subject_areas"
                                    name="tutor_subject_areas"
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
                    </div>
                </div>
            )}
        </Formik>);
    }
}

TutorSkillsFieldset.propTypes = {
    university: PropTypes.number, // university id
    gpa: PropTypes.number,
    tutor_courses: PropTypes.array,
    tutor_subject_areas: PropTypes.array,
    tutor_availabilities: PropTypes.array,
    onChange: PropTypes.func.isRequired,
    parentValues: PropTypes.object.isRequired,
}

TutorSkillsFieldset.defaultProps = {
    university: 1,
    gpa: 4.0,
    tutor_courses: [],
    tutor_subject_areas: [],
    tutor_availabilities: [],
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

export default TutorSkillsFieldset;