import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';



class PaymentForm extends React.Component {
    constructor(props) {
      super(props);
  
    }

    render () {
    return (<div>
                Payment Form
            </div>);
    }
}
  

  function mapStateToProps(state) {
      return {

      }
  }

  export default connect(mapStateToProps)(PaymentForm);