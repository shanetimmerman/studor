import { connect } from 'react-redux'
import TutorInformationEditArea from '../../../../Components/Profile/Editing/TutorEditing/TutorInformationEditArea'
import { deleteTutorCourse, deleteTutorSubjectArea, deleteTutorAvailability, fetchUserInfo } from '../../../../Actions/users'
import { TUTOR } from '../../../../Constants/userTypes';

function mapStateToProps(state) {
    return {
        user: state.currentUser,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        removeCourse: (course_id) => {
            deleteTutorCourse(course_id);
        },

        removeSubjectArea: (subject_id) => {
            deleteTutorSubjectArea(subject_id);
        },

        removeTutorAvailability: (availability_id) => {
            deleteTutorAvailability(availability_id);
        },

        fetchUserInfo: (id) => {
            fetchUserInfo(id, TUTOR);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TutorInformationEditArea)