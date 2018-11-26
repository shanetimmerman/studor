import { connect } from 'react-redux';
import SignupPage from '../../Pages/SignupPage';

function mapStateToProps(state) {
    return {
        user: state.currentUser
    }
}

export default connect(mapStateToProps)(SignupPage);