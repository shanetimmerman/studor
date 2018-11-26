
import { connect } from 'react-redux'
import TutorAccountInfoDisplay from '../../../../Components/Profile/Display/TutorDisplay/TutorAccountInfoDisplay';

function mapStateToProps(state) {
    return {
        user: state.currentUser,
    }
}

export default connect(mapStateToProps)(TutorAccountInfoDisplay)