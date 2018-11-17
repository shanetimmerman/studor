import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';



class TutorSearchBar extends React.Component {
    constructor(props) {
      super(props);
  
    }

    render () {
    return (<div>Search Bar</div>);
    }
}
  

  function mapStateToProps(state) {
      return {

      }
  }

  export default connect(mapStateToProps)(TutorSearchBar);