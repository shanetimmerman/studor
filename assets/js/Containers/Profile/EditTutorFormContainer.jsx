import { connect } from 'react-redux';
import { fetchCourses, fetchUniversities, fetchSubjectAreas, } from '../../Actions/api'
import EditTutorForm from '../../Components/Profile/EditTutorForm';


const mapStateToProps = (state) => {
    return {
        universities: state.apiData.universities, // to populate the dropdowns in the search bar
        subjectAreas: state.apiData.subjectAreas,
        courses: state.apiData.courses,
        user: state.currentUser,
        searchResults: state.searchPage.searchResults, // list of tutors
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditTutorForm);