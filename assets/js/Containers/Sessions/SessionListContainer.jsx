import { connect } from 'react-redux';
import SessionList from '../../Components/Sessions/SessionList.jsx'
import { fetchSessions, cancelSession, approveSession } from '../../Actions/sessions'

const mapStateToProps = (state) => {
    return {
        sessionsList: state.sessionPage.sessionsList,
        user: state.currentUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchSessions: () => {
            fetchSessions();
        },

        cancelSession: (id) => {
            cancelSession(id);
        },

        approveSession: (id, session) => {
            approveSession(id, session)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionList);