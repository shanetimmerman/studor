import React from 'react';
import _ from 'lodash';
import UserInformationForm from '../Components/Login/UserInformationForm';
import { STUDENT } from '../Constants/userTypes';
import EditStudentForm from '../Components/Profile/EditStudentForm';
import EditTutorFormContainer from '../Containers/Profile/EditTutorFormContainer';
import TutorInformationEditAreaContainer from '../Containers/Profile/TutorEditing/TutorInformationEditAreaContainer';

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.fetchUserInfo(this.props.user.user_id, this.props.user.user_type);
    }

    render() {
        console.log(this.props.user)
        let form = this.props.user.user_type == STUDENT ? <EditStudentForm /> : <div><EditTutorFormContainer /> <TutorInformationEditAreaContainer /> </div>
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
                        {form}
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