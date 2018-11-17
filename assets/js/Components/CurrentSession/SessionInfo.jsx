import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';



class SessionInfo extends React.Component {
    constructor(props) {
      super(props);
  
    }

    render () {
        return (
            <div>
                <CurrentMembers />
                <p>Time Remaining</p>
                <UploadedFiles />
            </div>
        );
    }
}
  
class CurrentMembers extends React.Component {
    constructor(props) {
      super(props);
     
    }

    render() {

        return (<div>
                    Current Members
                 </div>);
        }
  }

  class UploadedFiles extends React.Component {
    constructor(props) {
      super(props);
     
    }

    render() {

        return (<div>
                    Uploaded Files
                 </div>);
        }
  }

  function mapStateToProps(state) {
      return {

      }
  }

  export default connect(mapStateToProps)(SessionInfo);