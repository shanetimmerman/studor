import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';



class TutorList extends React.Component {
    constructor(props) {
      super(props);
  
    }

    render () {
        let tutors1 = _.map([{id:1}, {id:2}, {id:3}, {id:4}, {id:5}], (tutor) => <TutorInfo key={tutor.id}/>);
        return <div>
                <div className="row mb-3">
                    <div className="col-md-3">
                        X results
                    </div>
                    <div className="col-md-6">

                    </div>

                    <div className="col-md-3">
                        <form className="form-inline">
                            <div className="text-right form-group">
                                <label>sort by:</label>
                                <div className="dropdown">
                                    <a className="btn dropdown-toggle text-primary" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        popularity
                                    </a>

                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                        <a className="dropdown-item" onClick={() => {alert("Show best match")}}>best match</a>
                                        <a className="dropdown-item" onClick={() => {alert("Show most popular")}}>popularity</a>
                                        <a className="dropdown-item" onClick={() => {alert("Show highest gpa")}}>gpa</a>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                {tutors1}
               </div>;
    }
}
  
class TutorInfo extends React.Component {
    constructor(props) {
      super(props);
     
    }

    render() {

        return (
                <div className="card shadow p-3 mb-4 bg-white rounded padding border-0">
                    <div className="card-body">
                    <h5 className="card-title">Tutor Name</h5>
                    <h6 className="card-subtitle mb-2 text-primary">tutor subject area</h6>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" className="card-link">Request Session</a>
                    </div>
                </div>);
        }
  }

  function mapStateToProps(state) {
      return {

      }
  }

  export default connect(mapStateToProps)(TutorList);