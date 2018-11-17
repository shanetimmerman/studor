import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';


class SignInForm extends React.Component {
    constructor(props) {
      super(props);
  
    }

    render () {
    return (<div>
               Sign/Register In Form
            </div>);
    }
}
  

  function mapStateToProps(state) {
      return {

      }
  }

  export default connect(mapStateToProps)(SignInForm);