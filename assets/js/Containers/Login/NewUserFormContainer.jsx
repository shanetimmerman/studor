import { connect } from 'react-redux';
import { fetchUniversities, } from '../../Actions/api'
import NewUserForm from '../../Components/Login/NewUserForm';

function mapStateToProps(state) {
    return {
        universities: state.apiData.universities
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchUniversities: () => {
            fetchUniversities();
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewUserForm)