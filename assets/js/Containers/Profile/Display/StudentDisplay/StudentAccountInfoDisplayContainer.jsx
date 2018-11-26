import { connect } from 'react-redux'
import StudentAccountInfoDisplay from '../../../../Components/Profile/Display/StudentDisplay/StudentAccountInfoDisplay';

function mapStateToProps(state) {
    return {
        user: state.currentUser,
    }
}

export default connect(mapStateToProps)(StudentAccountInfoDisplay)