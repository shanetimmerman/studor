import _ from 'lodash';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import AddCourseFormContainer from '../../../../Containers/Profile/Editing/TutorEditing/AddCourseFormContainer'
import AddSubjectFormContainer from '../../../../Containers/Profile/Editing/TutorEditing/AddSubjectFormContainer';
import AddAvailabilityFormContainer from '../../../../Containers/Profile/Editing/TutorEditing/AddAvailabilityFormContainer';

class TutorInformationEditArea extends React.Component {
    constructor(props) {
        super(props);
        this.removeCourse = this.removeCourse.bind(this);
        this.removeSubjectArea = this.removeSubjectArea.bind(this);
        this.removeTutorAvailability = this.removeTutorAvailability.bind(this);

    }

    componentWillMount() {
        this.props.fetchUserInfo(this.props.user.user_id);
    }

    removeCourse(course) {
        this.props.removeCourse(course.tutor_course_id);
    }

    removeSubjectArea(subjectArea) {
        this.props.removeSubjectArea(subjectArea.id);
    }

    removeTutorAvailability(timeblock) {
        console.log("deleting timeblock")
        console.log(timeblock)

        this.props.removeTutorAvailability(timeblock.tutor_availability_id)
    }

    render() {
        console.log(this.props)
        let info = this.props.user.user_info;
        console.log(info)
        return (
            <div className="card shadow p-3 mb-5 bg-white rounded padding border-0">
                <div className="card-body">
                    <h3 className="card-title text-primary">Tutoring Information</h3>
                    <div className="row">
                    <div className="col-md-3">
                        <h5 className="mt-2"> Courses: </h5>
                        <CourseList removeItem={this.removeCourse} values={info.courses} />
                        <AddCourseFormContainer />
                    </div>

                    <div className="col-md-3">
                        <h5 className="mt-2"> Subjects: </h5>
                        <SubjectList removeItem={this.removeSubjectArea} values={info.subject_areas} />
                        <AddSubjectFormContainer />                    
                    </div>

                    <div className="col-md-6">
                        <h5 className="mt-2"> Availability: </h5>
                        <AvailabilityList removeItem={this.removeTutorAvailability} values={info.availabilities} />
                        <AddAvailabilityFormContainer />
                    </div>
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
        <div>
            <p className="d-inline"> {props.item.name} </p>
            <button onClick={() => { props.removeItem(props.item) }} className="btn btn-link text-danger d-inline"> x </button>
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
        <div >
            <p className="d-inline"> {props.item.name} </p>
            <button type="button" onClick={() => { props.removeItem(props.item) }} className="btn btn-link text-danger d-inline"> x </button>
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
        <div>
            <p className="d-inline"> {props.item.start.toLocaleString()}</p>
            <p className="d-inline"> to {props.item.end.toLocaleString()}</p>
            <button type="button" onClick={() => { props.removeItem(props.item) }} className="btn btn-link text-danger d-inline"> x </button>
        </div>
    )
}

export default TutorInformationEditArea;