import React from 'react';
import _ from 'lodash';
import { STUDENT, TUTOR } from '../Constants/userTypes';
import EditTutorFormContainer from '../Containers/Profile/Editing/TutorEditing/EditTutorFormContainer'
import TutorInformationEditAreaContainer from '../Containers/Profile/Editing/TutorEditing/TutorInformationEditAreaContainer'
import EditStudentFormContainer from '../Containers/Profile/Editing/StudentEditing/EditStudentFormContainer';
import TutorAccountInfoDisplayContainer from '../Containers/Profile/Display/TutorDisplay/TutorAccountInfoDisplayContainer'
import StudentAccountInfoDisplayContainer from '../Containers/Profile/Display/StudentDisplay/StudentAccountInfoDisplayContainer'

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false
        }

        this.toggleEdit = this.toggleEdit.bind(this);

    }

    toggleEdit() {
        this.setState({ edit: !this.state.edit })
    }

    componentWillMount() {
        console.log(this.props.user.user_type)
        this.props.fetchUserInfo(this.props.user.user_id, this.props.user.user_type);
    }

    renderProfile() {
        let userType = this.props.user.user_type;

        switch (userType) {
            case STUDENT: return this.state.edit ? <EditStudentFormContainer /> : <StudentAccountInfoDisplayContainer />
            case TUTOR: return this.state.edit ? <div><EditTutorFormContainer /> <TutorInformationEditAreaContainer /> </div> : <div> <TutorAccountInfoDisplayContainer /> <TutorInformationEditAreaContainer /> </div>
            default: new Error("Unsupported user type")
        }
    }

    render() {
        if (this.props.user.user_info) {
            return (<div className="bg-light">
                <div className="row padding">
                    <div className="col-md-3"></div>
                    <div className="col-md-6 mt-5 mb-3">
                        <h1 className="text-center"> My Profile</h1>
                    </div>
                    <div className="col-md-3"></div>
                </div>

                <div className="row padding">
                    <div className="col-md-2"></div>
                    <div className="col-md-8">
                        {!this.state.edit && <button onClick={this.toggleEdit}>Edit profile</button>}
                        {this.renderProfile()}
                        {this.state.edit && <button onClick={this.toggleEdit}>cancel</button>}
                    </div>
                    <div className="col-md-2"></div>
                </div>

            </div>);
        } else {
            return null;
        }
    }
}

export default ProfilePage;