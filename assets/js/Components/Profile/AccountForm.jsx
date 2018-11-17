import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';



class AccountForm extends React.Component {
    constructor(props) {
      super(props);
  
    }

    render () {
    return (<div>
                Account Form
            </div>);
    }
}
  

  function mapStateToProps(state) {
      return {

      }
  }

  export default connect(mapStateToProps)(AccountForm);