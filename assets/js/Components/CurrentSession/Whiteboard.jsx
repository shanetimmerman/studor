import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';



class Whiteboard extends React.Component {
    constructor(props) {
      super(props);
  
    }

    render () {
    return (<div>
               Whiteboard
            </div>);
    }
}
  

  function mapStateToProps(state) {
      return {

      }
  }

  export default connect(mapStateToProps)(Whiteboard);