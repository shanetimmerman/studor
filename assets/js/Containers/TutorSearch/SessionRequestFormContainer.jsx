import { connect } from 'react-redux';
import SessionRequestForm from '../../Components/TutorSearch/SessionRequestForm.jsx'
import { requestSession } from '../../Actions/sessions'

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser
    }
}

function mapDispatchToProps(state) {
    return {
        requestSession: (info) => {
            requestSession(info);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionRequestForm);