import { connect } from 'react-redux'
import { addTutorSubjectArea } from '../../../Actions/users'
import AddSubjectForm from '../../../Components/Profile/TutorEditing/AddSubjectForm';

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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddSubjectForm)