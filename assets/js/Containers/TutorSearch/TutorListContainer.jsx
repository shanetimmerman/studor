import { connect } from 'react-redux';
import TutorList from '../../Components/TutorSearch/TutorList.jsx'

function mapStateToProps(state) {
    return {
        searchResults: state.searchPage.searchResults,
    }
}

export default connect(mapStateToProps)(TutorList);