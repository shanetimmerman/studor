import React from 'react';
import { connect } from 'react-redux';
import createUser from '../../Actions/users'
import SignUpForm from '../../Components/Login/SignUpForm'

function mapStateToProps(state) {
    return { user: state.currentUser }
}

function mapDispatchToProps(state) {
    return {
        createUser: (userInfo, type) => {
            createUser(userInfo, type);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);