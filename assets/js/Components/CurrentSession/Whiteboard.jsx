import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';



class Whiteboard extends React.Component {
    constructor(props) {
      super(props);
  
    }

    render () {
    return (<div className="card shadow p-3 mb-5 bg-white full-height border-0 rounded"></div>);
    }
}
  

  function mapStateToProps(state) {
      return {

      }
  }

  export default connect(mapStateToProps)(Whiteboard);