import { connect } from 'react-redux';
import TutorSearchBar from '../../Components/TutorSearch/TutorSearchBar.jsx'
import { fetchSubjectSearch, fetchCourseSearch } from '../../Actions/search'
import { fetchUniversities, fetchSubjects, fetchSubjectAreas, } from '../../Actions/api'

const mapStateToProps = (state) => {
    return {
        universities: state.apiData.universities, // to populate the dropdowns in the search bar
        subjects: state.apiData.subjects,
        subjectAreas: state.apiData.subjectAreas,
        user: state.currentUser,
        searchResults: state.searchPage.searchResults, // list of tutors
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUniversities: () => {
            fetchUniversities();
        },

        fetchSubjects: () => {
            fetchSubjects();
        },

        fetchSubjectAreas: () => {
            fetchSubjectAreas();
        },

        fetchCourseSearch: (university_id, query) => {
            fetchCourseSearch(university_id, query);
        },

        fetchSubjectSearch: (subject_area_id) => {
            fetchSubjectSearch(subject_area_id);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TutorSearchBar);