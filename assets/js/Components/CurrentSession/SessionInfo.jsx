import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';



class SessionInfo extends React.Component {
    constructor(props) {
      super(props);
  
    }

    render () {
        return (
            <div className="mt-5">
                <h2 className="text-primary"> Session Details</h2>
                <CurrentMembers />
                <h5 className="mt-3">Time Remaining:</h5>
                <p className="text-secondary"> [00:00:00]</p>
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

        return (<div className="mt-3">
                    <h5>Members:</h5>
                    <div className="text-secondary">[Tutor]</div>
                    <div className="text-secondary">[Student]</div>
                 </div>);
        }
  }

  class UploadedFiles extends React.Component {
    constructor(props) {
      super(props);
     
    }

    render() {

        let uploadedFiles = _.map([{id: 0, file_name: "graph image"}, {id: 1, file_name: "hw3 assignment questions"}], 
        (file) => <p className="text-secondary" key={file.id}>{file.file_name}</p>)

        return (<div className="card shadow mt-5 mb-5 bg-white border-0 ounded">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-10">
                                <h5 className="card-title text-primary">Uploaded Files</h5>
                            </div>
                            <div className="col-md-2">
                             +
                            </div>
                        </div>
                        <div className="row ml-2">
                        {uploadedFiles}
                        </div>
                    </div>
                </div>);
        }
  }

  function mapStateToProps(state) {
      return {

      }
  }

  export default connect(mapStateToProps)(SessionInfo);