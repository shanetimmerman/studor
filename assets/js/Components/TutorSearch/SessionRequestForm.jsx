import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';



class SessionRequestForm extends React.Component {
    constructor(props) {
      super(props);
  
    }

    render () {
        return (
            <div>Session request form</div>
        );
    }
}

  function mapStateToProps(state) {
      return {

      }
  }

  export default connect(mapStateToProps)(SessionRequestForm);