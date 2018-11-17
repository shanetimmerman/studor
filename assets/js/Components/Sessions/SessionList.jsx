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

        return (<div>
                    Session Info Card
                 </div>);
        }
  }

  function mapStateToProps(state) {
      return {

      }
  }

  export default connect(mapStateToProps)(SessionList);