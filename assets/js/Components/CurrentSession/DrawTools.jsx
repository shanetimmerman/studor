import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

class DrawTools extends React.Component {
    constructor(props) {
      super(props);
  
    }

    render () {
    return (<div>
               <button className="mb-3">Draw pen</button>
               <button className="mb-3">Eraser</button>
               <button className="mb-3">Image</button>
               <button className="mb-3">Text</button>
            </div>);
    }
}
  

  function mapStateToProps(state) {
      return {

      }
  }

  export default connect(mapStateToProps)(DrawTools);