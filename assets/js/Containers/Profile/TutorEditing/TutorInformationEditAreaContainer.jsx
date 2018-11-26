import { connect } from 'react-redux'
import TutorInformationEditArea from '../../../Components/Profile/TutorEditing/TutorInformationEditArea';
import { deleteTutorCourse, deleteTutorSubjectArea } from '../../../Actions/users'

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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TutorInformationEditArea)