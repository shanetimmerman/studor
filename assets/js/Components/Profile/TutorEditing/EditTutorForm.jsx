import { Formik } from 'formik';
import _ from 'lodash';
import React from 'react';
import { STUDENT, TUTOR } from "../../../Constants/userTypes";
import PaymentInformationFieldset from '../PaymentInformationFieldset';
import { Typeahead } from 'react-bootstrap-typeahead';
import AvailabilitySelectSubform from '../AvailabilitySelectSubform'
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
                    courseOptions.push({ id: course.id, name: course.course_name, number: course.course_no });
                }
            });

        return courseOptions;
    }


    render() {
        // console.log('user info')
        // console.log(this.props.user.user_info)
        // console.log(this.props)
        return (
            <Formik
                initialValues={_.clone(this.props.user.user_info)}
                onSubmit={(values) => { this.props.onSubmit(values) }}>

                {({ values, handleChange, handleSubmit, setValues }) => (
                    <form onSubmit={handleSubmit}>
                        {/* {console.log("values")}
                        {console.log(values)} */}

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

                        {/* Payment */}
                        {/* <PaymentInformationFieldset onChange={setValues} parentValues={values} /> */}
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                )}
            </ Formik>
        )
    }
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