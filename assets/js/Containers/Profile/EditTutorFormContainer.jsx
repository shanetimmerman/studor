import { connect } from 'react-redux';
import { fetchCourses, fetchUniversities, fetchSubjectAreas, } from '../../Actions/api'
import { fetchUserInfo, udpateTutorProfile } from '../../Actions/users';
import EditTutorForm from '../../Components/Profile/EditTutorForm';


const mapStateToProps = (state) => {
    return {
        universities: state.apiData.universities,
        subjectAreas: state.apiData.subjectAreas,
        courses: state.apiData.courses,
        user: state.currentUser,
        searchResults: state.searchPage.searchResults,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUniversities: () => {
            fetchUniversities();
        },

        fetchSubjectAreas: () => {
            fetchSubjectAreas();
        },

        fetchCourses: () => {
            fetchCourses();
        },

        fetchUserInfo: (user_id, user_type) => {
            fetchUserInfo(user_id, user_type);
        },

        onSubmit: (newValues) => {
            udpateTutorProfile(newValues);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditTutorForm);