import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

class SessionList extends React.Component {
    constructor(props) {
      super(props);
  
    }

    render () {
        let sessions1 = _.map([{id:1}, {id:2}, {id:3}, {id:4}, {id:5}], (session) => <SessionInfo key={session.id}/>);
        return <div>
                <form className="form-inline">
                    <div className="form-group mb-3">
                        <label>Viewing</label>
                        <div className="dropdown">
                            <a className="btn dropdown-toggle text-primary" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                upcoming sessions
                            </a>

                            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                <a className="dropdown-item" onClick={() => {alert("Show upcoming sessions")}}>upcoming sessions</a>
                                <a className="dropdown-item" onClick={() => {alert("Show past sessions")}}>past sessions</a>
                                <a className="dropdown-item" onClick={() => {alert("Show pending session requests")}}>pending requests</a>
                            </div>
                        </div>
                    </div>
                </form>
                {sessions1}
            </div>;
    }
}
  
class SessionInfo extends React.Component {
    constructor(props) {
      super(props);
     
    }

    render() {

        return (
            <div className="card shadow p-3 mb-4 bg-white rounded padding border-0">
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