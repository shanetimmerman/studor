import { connect } from 'react-redux';
import { fetchUniversities, } from '../../../../Actions/api';
import { udpateTutorProfile } from '../../../../Actions/users';
import EditTutorForm from '../../../../Components/Profile/Editing/TutorEditing/EditTutorForm'


const mapStateToProps = (state) => {
    return {
        universities: state.apiData.universities,
        user: state.currentUser,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUniversities: () => {
            fetchUniversities();
        },

        onSubmit: (newValues) => {
            udpateTutorProfile(newValues);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditTutorForm);