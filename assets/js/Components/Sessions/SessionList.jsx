import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

class SessionList extends React.Component {
    constructor(props) {
      super(props);
  
    }

    render () {
        let sessions1 = _.map([{id:1}, {id:2}, {id:3}, {id:4}, {id:5}], (session) => <SessionInfo key={session.id}/>);
        return <div>{sessions1}</div>;
    }
}
  
class SessionInfo extends React.Component {
    constructor(props) {
      super(props);
     
    }

    render() {

        return (
            <div className="card padding">
                <div className="card-body">
                <h5 className="card-title">Tutor Name</h5>
                <h6 className="card-subtitle mb-2 text-primary">date 11/25/2018 time 3:00pm-4:00pm</h6>
                <p className="card-text">Your message to the tutor about what you want the session to be about.</p>
                </div>
            </div>);
        }
  
  }

  function mapStateToProps(state) {
      return {

      }
  }

  export default connect(mapStateToProps)(SessionList);