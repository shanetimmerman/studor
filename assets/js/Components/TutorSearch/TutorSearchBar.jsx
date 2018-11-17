import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';



class TutorSearchBar extends React.Component {
    constructor(props) {
      super(props);
  
    }

    render () {
    return (
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <button className="btn btn-outline-primary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Course</button>
                    <div className="dropdown-menu">
                    <a className="dropdown-item" href="#">Course</a>
                    <a className="dropdown-item" href="#">Subject Area</a>
                    </div>
                </div>
                <input type="text" className="form-control" aria-label="Text input with dropdown button"/>
                <div className="input-group-append">
                    <button className="btn btn-outline-warning" type="button">Search</button>
                </div>
            </div>);
    }
}
  

  function mapStateToProps(state) {
      return {

      }
  }

  export default connect(mapStateToProps)(TutorSearchBar);