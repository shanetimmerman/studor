import { connect } from 'react-redux'
import TutorInformationEditArea from '../../../Components/Profile/TutorEditing/TutorInformationEditArea';
import { addTutorCourse } from '../../../Actions/users'
import AddCourseForm from '../../../Components/Profile/TutorEditing/AddCourseForm';

function mapStateToProps(state) {
    return {
        user: state.currentUser,
        courses: state.apiData.courses,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addCourse: (values) => {
            addTutorCourse(values);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCourseForm)