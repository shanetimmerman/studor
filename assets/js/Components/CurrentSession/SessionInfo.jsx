import React from 'react';
import _ from 'lodash';

class SessionInfo extends React.Component {
    constructor(props) {
      super(props);
    }

    timeConversion(milliseconds){
        var hours = milliseconds / (1000*60*60);
        var absoluteHours = Math.floor(hours);
        var h = absoluteHours > 9 ? absoluteHours : '0' + absoluteHours;
      
        var minutes = (hours - absoluteHours) * 60;
        var absoluteMinutes = Math.floor(minutes);
        var m = absoluteMinutes > 9 ? absoluteMinutes : '0' +  absoluteMinutes;
      
        var seconds = (minutes - absoluteMinutes) * 60;
        var absoluteSeconds = Math.floor(seconds);
        var s = absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds;
      
        return h + 'h:' + m + 'm:' + s + 's';
    }

    render () {
        return (
            <div className="mt-5">
                <h2 className="text-primary"> Session Details</h2>
                <CurrentMembers session_info={this.props.session_info}/>
                <h5 className="mt-3">Time Remaining:</h5>
                <p className="text-secondary"> {this.timeConversion(new Date(this.props.session_info.end) - new Date())}</p>
                {/*<UploadedFiles />*/}
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
                    <div className="text-secondary">Tutor: {this.props.session_info.tutor}</div>
                    <div className="text-secondary">Student: {this.props.session_info.student}</div>
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

  export default SessionInfo;