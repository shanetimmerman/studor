import { connect } from 'react-redux';
import { fetchUserInfo } from '../../Actions/users';

import ProfilePage from '../../Pages/ProfilePage';

const mapStateToProps = (state) => {
    return {
        user: state.currentUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUserInfo: (user_id, user_type) => {
            fetchUserInfo(user_id, user_type);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)