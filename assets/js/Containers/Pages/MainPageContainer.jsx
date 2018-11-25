import React from 'react';
import { connect } from 'react-redux';
import MainPage from '../../Pages/MainPage'
import { fetchSession } from '../../Actions/users'

const mapStateToProps = (state) => {
    return {
        user: state.currentUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchSession: () => {
            fetchSession();
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)