import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';



class TutorSkillsForm extends React.Component {
    constructor(props) {
      super(props);
  
    }

    render () {
    return (<div>
                Tutor Skills Form
            </div>);
    }
}
  

  function mapStateToProps(state) {
      return {

      }
  }

  export default connect(mapStateToProps)(TutorSkillsForm);