import React from 'react';
import { connect } from 'react-redux';
import ProfilePage from '../../Pages/ProfilePage';

const mapStateToProps = (state) => {
    return {
        user: state.currentUser
    }
}

export default connect(mapStateToProps)(ProfilePage)