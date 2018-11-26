import { connect } from 'react-redux'
import { addTutorAvailability } from '../../../../Actions/users'
import AddAvailabilityForm from '../../../../Components/Profile/Editing/TutorEditing/AddAvailabilityForm';

function mapStateToProps(state) {
    return {
        user: state.currentUser,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addAvailability: (values) => {
            addTutorAvailability(values);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddAvailabilityForm)