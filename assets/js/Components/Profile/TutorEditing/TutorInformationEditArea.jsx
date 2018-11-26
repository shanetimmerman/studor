import { Formik } from 'formik';
import _ from 'lodash';
import React from 'react';
import { STUDENT, TUTOR } from "../../../Constants/userTypes";
import { v4 as uuidv4 } from 'uuid';
import AddCourseFormContainer from '../../../Containers/Profile/TutorEditing/AddCourseFormContainer';
import AddSubjectFormContainer from '../../../Containers/Profile/TutorEditing/AddSubjectFormContainer';

class TutorInformationEditArea extends React.Component {
    constructor(props) {
        super(props);
        this.removeCourse = this.removeCourse.bind(this);
        this.removeSubjectArea = this.removeSubjectArea.bind(this);
        this.removeTutorAvailability = this.removeTutorAvailability.bind(this);

    }

    removeCourse(course) {
        this.props.removeCourse(course.tutor_course_id);
    }

    removeSubjectArea(subjectArea) {
        this.props.removeSubjectArea(subjectArea.id);
    }

    removeTutorAvailability(timeblock) {

    }

    render() {
        console.log(this.props)
        let info = this.props.user.user_info;
        // console.log(info)
        return (
            <div className="card shadow p-3 mb-5 bg-white rounded padding border-0">
                <div className="card-body">
                    <h3 className="card-title text-primary">Tutoring Information</h3>
                    <div className="col">

                        <h2> Courses: </h2>
                        <CourseList removeItem={this.removeCourse} values={info.courses} />
                        <AddCourseFormContainer />

                        <h2> Subjects: </h2>
                        <SubjectList removeItem={this.removeSubjectArea} values={info.subject_areas} />
                        <AddSubjectFormContainer />

                        <h2> Availability: </h2>
                        <AvailabilityList removeItem={this.removeTutorAvailability} values={info.availabilities} />

                    </div>
                </div>
            </div>
        )
    }
}

class CourseList extends React.Component {
    constructor(props) {
        super(props)
        this.removeItem = this.removeItem.bind(this);
    }

    removeItem(course) {
        this.props.removeItem(course)
    }

    render() {
        let itemList = _.map(this.props.values,
            (item) => {
                return (<Course key={uuidv4()} removeItem={this.removeItem} item={item} label="course" />)
            });

        return (itemList);
    }
}

function Course(props) {
    return (
        <div className="row">
            <p> {props.item.name} </p>
            <button type="button" onClick={() => { props.removeItem(props.item) }} className="btn btn-danger"> Remove {props.label} </button>
        </div>
    )
}


class SubjectList extends React.Component {
    constructor(props) {
        super(props)
        this.removeItem = this.removeItem.bind(this);
    }

    removeItem(course) {
        this.props.removeItem(course)
    }

    render() {

        let itemList = _.map(this.props.values,
            (item) => {
                return (<Subject key={uuidv4()} removeItem={this.removeItem} item={item} label="subject" />)
            });

        return (itemList);
    }
}

function Subject(props) {
    return (
        <div className="row">
            <p> {props.item.name} </p>
            <button type="button" onClick={() => { props.removeItem(props.item) }} className="btn btn-danger"> Remove {props.label} </button>
        </div>
    )
}

class AvailabilityList extends React.Component {
    constructor(props) {
        super(props)
        this.removeItem = this.removeItem.bind(this);
    }

    removeItem(course) {
        this.props.removeItem(course)
    }

    render() {
        let itemList = _.map(this.props.values,
            (item) => {
                return (<Availability key={uuidv4()} removeItem={this.removeItem} item={item} label="time" />)
            });

        return (itemList);
    }
}

function Availability(props) {
    return (
        <div className="row">
            <p> Start: {props.item.start.toLocaleString()}</p>
            <p> End: {props.item.end.toLocaleString()}</p>
            <button type="button" onClick={() => { props.removeItem(props.timeblock) }} className="btn btn-danger"> Remove {props.label} </button>
        </div>
    )
}

export default TutorInformationEditArea;