import { connect } from 'react-redux'
import { addTutorSubjectArea } from '../../../../Actions/users'
import AddSubjectForm from '../../../../Components/Profile/Editing/TutorEditing/AddSubjectForm';
import { fetchSubjectAreas } from '../../../../Actions/api'

function mapStateToProps(state) {
    return {
        user: state.currentUser,
        subjectAreas: state.apiData.subjectAreas,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addSubject: (values) => {
            addTutorSubjectArea(values);
        },

        fetchSubjects: () => {
            fetchSubjectAreas();
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddSubjectForm)