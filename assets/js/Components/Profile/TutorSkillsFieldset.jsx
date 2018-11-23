import React from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { Typeahead } from 'react-bootstrap-typeahead';
import _ from 'lodash';
import PropTypes from 'prop-types';



class TutorSkillsFieldset extends React.Component {
    constructor(props) {
        super(props);

        this.formatSubjectOptions = this.formatSubjectOptions.bind(this);
        this.renderUniversityOptions = this.renderUniversityOptions.bind(this);
    }

    componentWillMount() {
        this.props.fetchUniversities();
        this.props.fetchSubjectAreas();
    }

    renderUniversityOptions() {
        return (_.map(this.props.universities, (university) => { return (<option key={university.id} value={university.id}> {university.name} </option>) }));
    }

    formatSubjectOptions() {
        let options = _.map(this.props.subjectAreas, (subjectArea) => { return { id: subjectArea.id, label: subjectArea.subject_area } });
        return options;
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
                                        console.log(event.target.value)
                                        setValues(_.assign(values, { gpa: event.target.value }));
                                        this.props.onChange(_.assign(this.props.parentValues, { tutorSkills: values }));
                                        console.log(event.target.value)

                                    }}
                                    value={values.gpa}
                                />
                            </div>

                            <div className="mb-1 mt-3">
                                <label htmlFor="tutor_courses">Courses:</label>
                                <Typeahead
                                    id="tutor_courses"
                                    name="tutor_courses"
                                    multiple
                                    className="bg-light border-0"
                                    selectHintOnEnter="true"
                                    placeholder="Type to find subjects..."
                                    onChange={(event) => {
                                        setValues(_.assign(values, { tutor_courses: event.target.value }));
                                        this.props.onChange(_.assign(this.props.parentValues, { tutorSkills: values }));
                                    }}
                                    value={values.tutor_courses}
                                    options={["Course1", "Course2", "Course3", "Course4"]}
                                />
                            </div>

                            <div className="mb-1 mt-3">
                                <label htmlFor="tutor_subject_areas">Subject Areas:</label>
                                <Typeahead
                                    id="tutor_subject_areas"
                                    name="tutor_subject_areas"
                                    multiple
                                    onChange={(selected) => {
                                        let ids = _.map(selected, (selected) => selected.id);
                                        setValues(_.assign(values, { tutor_subject_areas: ids }));
                                        this.props.onChange(_.assign(this.props.parentValues, { tutorSkills: values }))
                                    }}
                                    options={this.formatSubjectOptions()}
                                />
                            </div>

                            <div className="mb-3 mt-3">
                                <label htmlFor="tutor_availabilities">Availability:</label>
                                <input
                                    onChange={(options) => {
                                        setValues(_.assign(values, { tutor_availabilities: options }));
                                        this.props.onChange(_.assign(this.props.parentValues, { tutorSkills: values }));
                                    }}
                                    value={values.tutor_availabilities}
                                    id="tutor_availabilities"></input>
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

export default TutorSkillsFieldset;