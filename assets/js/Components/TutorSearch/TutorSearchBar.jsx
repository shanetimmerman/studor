import React from 'react';
import _ from 'lodash';
import { Formik } from 'formik';
import { Typeahead } from 'react-bootstrap-typeahead';


// Constants for the dropdown menu
const COURSE_MODE = 'COURSE_MODE';
const SUBJECT_MODE = 'SUBJECT_MODE';

/*
TODO:
- Add ability to actually search

- Populate university dropdown with university data and add TypeAhead
    - Disabled until the above is chosen | populate course dropdown with courses related to the university add TypeAhead

- Populate subject name dropdown with subject data and add TypeAhead
    - Disabled until the above is chosen |  populate topic dropdown with topic data and add TypeAhead

*/
class TutorSearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchMode: COURSE_MODE,
        }
        this.changeMode = this.changeMode.bind(this);
        this.getInitialValues = this.getInitialValues.bind(this);

    }
    componentWillMount() {
        this.props.fetchUniversities();
        this.props.fetchSubjects();
        this.props.fetchSubjectAreas();
        this.props.fetchCourseSearch(1, '');
    }

    changeMode(resetForm) {
        let newMode = this.state.searchMode == COURSE_MODE ? SUBJECT_MODE : COURSE_MODE;

        this.setState({ searchMode: newMode }, () => { resetForm(this.getInitialValues()) });
    }

    getInitialValues() {
        return this.state.searchMode == COURSE_MODE ? { mode: 'Course', university: 1, name_query: '' } : { mode: 'Subject Area', subject_id: 1, topic_id: 1 }
    }

    renderCourseBar(values, handleChange, handleSubmit, resetForm) {
        let universities = _.map(this.props.universities, (university) => { return (<option key={university.id} value={university.id}> {university.name} </option>) });

        return (
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <select name="mode" onChange={() => { this.changeMode(resetForm) }} defaultValue={values.mode} className="form-control border-0">
                        <option>Course</option>
                        <option>Subject Area</option>
                    </select>
                </div>

                <select name="university" onChange={handleChange} value={values.university} className="form-control rounded-0 border-0">
                    {universities}
                </select>

                <input type="text" name="name_query" onChange={handleChange} defaultValue={values.name_query} className="form-control" placeholder="Enter course name or number..." aria-label="Text input with dropdown button" />
                <div className="input-group-append">
                    <button type="submit" onClick={handleSubmit} className="btn btn-warning" type="button">Search</button>
                </div>
            </div>
        );
    }

    renderSubjectSearch(values, handleChange, handleSubmit, resetForm) {
        let subjectOptions = _.map(this.props.subjects, (subject) => { return (<option key={subject.id} value={subject.id} > {subject.subject} </option >) });
        let topicOptions = [];
        _.each(this.props.subjectAreas, (area) => { if (area.subject == values.subject_id) topicOptions.push(<option key={area.id} value={area.id} > {area.subject_area} </option >) });

        return (
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <select name="mode" onChange={() => { this.changeMode(resetForm) }} defaultValue={values.mode} className="form-control border-0">
                        <option>Course</option>
                        <option>Subject Area</option>
                    </select>
                </div>

                <select name="subject_id" onChange={handleChange} value={values.subject_id} className="form-control rounded-0 border-0">
                    {subjectOptions}
                </select>

                <select name="topic_id" onChange={handleChange} value={values.topic_id} className="form-control rounded-0 border-0">
                    {topicOptions}
                </select>

                <div className="input-group-append">
                    <button type="submit" onClick={handleSubmit} className="btn btn-warning" type="button">Search</button>
                </div>
            </div>
        );
    }

    render() {
        return (
            <Formik
                initialValues={this.getInitialValues()}
                onSubmit={(values, { setSubmitting }) => {
                    console.log(this.state.searchMode)
                    console.log(values);
                    this.state.searchMode == COURSE_MODE ? this.props.fetchCourseSearch(values.university, values.name_query) : this.props.fetchSubjectSearch(values.topic_id)
                }}>
                {({ values, handleChange, handleSubmit, resetForm, }) => (
                    <form onSubmit={handleSubmit}>
                        {this.state.searchMode == COURSE_MODE ? this.renderCourseBar(values, handleChange, handleSubmit, resetForm) : this.renderSubjectSearch(values, handleChange, handleSubmit, resetForm)}
                    </form>
                )}
            </Formik>);
    }
}

export default TutorSearchBar;
