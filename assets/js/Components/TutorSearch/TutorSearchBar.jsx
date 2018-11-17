import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';



class TutorSearchBar extends React.Component {
    constructor(props) {
      super(props);
  
    }

    render () {
    return (
        <div className="row padding">
            <div className="col-md-3"></div>
            <div className="col-md-6">
                <nav className="card card-light">
                    <form className="form-inline">
                        <div className="dropdown show">
                            <a className="btn btn-inline text-primary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Course
                            </a>

                            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                <a className="dropdown-item" href="#">Course</a>
                                <a className="dropdown-item" href="#">Subject Area</a>
                            </div>
                        </div>
                        <input className="form-control mr-sm-4" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-warning my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </nav>
            </div>
            <div className="col-md-3"></div>
        </div>
    );
    }
}
  

  function mapStateToProps(state) {
      return {

      }
  }

  export default connect(mapStateToProps)(TutorSearchBar);