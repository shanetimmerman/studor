import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

class DrawTools extends React.Component {
    constructor(props) {
      super(props);
  
    }

    render () {
    return (<div>
               DrawTools
            </div>);
    }
}
  

  function mapStateToProps(state) {
      return {

      }
  }

  export default connect(mapStateToProps)(DrawTools);