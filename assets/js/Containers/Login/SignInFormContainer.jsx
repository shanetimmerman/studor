import { connect } from 'react-redux';
import SignInForm from '../../Components/Login/SignInForm.jsx'
import { loginUser } from '../../Actions/users'

function mapStateToProps(state) {
    return {
        user: state.currentUser
    }
}

function mapDispatchToProps(state) {
    return {
        loginUser: (email, password, type) => {
            loginUser(email, password, type);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);