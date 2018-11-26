import { connect } from 'react-redux';
import { updateStudentProfile } from '../../../../Actions/users';
import EditStudentForm from '../../../../Components/Profile/Editing/StudentEditing/EditStudentForm';


const mapStateToProps = (state) => {
    return {
        user: state.currentUser,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: (newValues) => {
            updateStudentProfile(newValues);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditStudentForm);