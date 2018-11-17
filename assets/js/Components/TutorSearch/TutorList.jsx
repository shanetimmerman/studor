import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';



class TutorList extends React.Component {
    constructor(props) {
      super(props);
  
    }

    render () {
        let tutors1 = _.map([{id:1}, {id:2}, {id:3}, {id:4}, {id:5}], (tutor) => <TutorInfo key={tutor.id}/>);
        return <div>{tutors1}</div>;
    }
}
  
class TutorInfo extends React.Component {
    constructor(props) {
      super(props);
     
    }

    render() {

        return (
            <div className="row padding">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                        <h5 className="card-title">Tutor Name</h5>
                        <h6 className="card-subtitle mb-2 text-primary">tutor subject area</h6>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" className="card-link">Request Session</a>
                        </div>
                    </div>
                </div>
                <div className="col-md-2"></div>
            </div>
                
                );
        }
  }

  function mapStateToProps(state) {
      return {

      }
  }

  export default connect(mapStateToProps)(TutorList);