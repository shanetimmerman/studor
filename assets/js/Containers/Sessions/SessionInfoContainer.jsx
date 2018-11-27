import { connect } from 'react-redux';
import SessionInfo from '../../Components/CurrentSession/SessionInfo'
import { rateTutor } from '../../Actions/sessions'

const mapDispatchToProps = (dispatch) => {
    return {

        rateTutor: (rating) => {
            rateTutor(rating)
        }
    }
}

export default connect(mapDispatchToProps)(SessionInfo);