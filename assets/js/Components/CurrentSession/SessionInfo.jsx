import React from 'react';
import _ from 'lodash';
import Peer from 'peerjs';
import store from '../../store';
import RatingForm from '../CurrentSession/RatingForm'

class SessionInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    timeConversion(milliseconds) {
        var hours = milliseconds / (1000 * 60 * 60);
        var absoluteHours = Math.floor(hours);
        var h = absoluteHours > 9 ? absoluteHours : '0' + absoluteHours;

        var minutes = (hours - absoluteHours) * 60;
        var absoluteMinutes = Math.floor(minutes);
        var m = absoluteMinutes > 9 ? absoluteMinutes : '0' + absoluteMinutes;

        var seconds = (minutes - absoluteMinutes) * 60;
        var absoluteSeconds = Math.floor(seconds);
        var s = absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds;

        return h + 'h:' + m + 'm:' + s + 's';
    }

    render() {
        let user = store.getState().currentUser;
        let rating = null;
        if (user.user_type == "STUDENT") {
            rating = <RatingForm rateTutor={this.props.rateTutor} session={this.props.session_info} />
        }

        return (
            <div className="mt-3">
                <h2 className="text-primary mb-2"> Session Details</h2>
                {rating}
                <h5>Description:</h5>
                <p className="text-secondary">{this.props.session_info.description}</p>
                <CurrentMembers socket={this.props.socket} session_info={this.props.session_info} />
            </div>
        );
    }
}

class CurrentMembers extends React.Component {
    constructor(props) {
        super(props);
        let socket = props.socket;
        this.channel = socket.channel("whiteboards:" + props.session_info.id, { active: props.session_info.id });;
    }

    render() {
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

        let user = store.getState().currentUser
        let tid = "t" + this.props.session_info.tutor_id;
        let sid = "s" + this.props.session_info.student_id;

        let onCall = false;
        let peer = null;
        let other_id = null;

        if (user.user_type == "TUTOR") {
            peer = new Peer(tid, { key: 'lwjd5qra8257b9', port: 443, config: { 'iceServers': [{ 'url': 'stun:stun.l.google.com:19302' }] } });
            other_id = sid;
        } else {
            peer = new Peer(sid, { key: 'lwjd5qra8257b9', port: 443, config: { 'iceServers': [{ 'url': 'stun:stun.l.google.com:19302' }] } });
            other_id = tid;
        }

        this.channel.on("new_user", ({ user }) => {
            if (user == other_id) {
                console.log("Second user joined")
                navigator.getUserMedia({ video: true, audio: true }, function (stream) {
                    let call = peer.call(other_id, stream);
                    call.on('stream', function (remoteStream) {
                        console.log(remoteStream);
                        document.querySelector('#other-a').srcObject = remoteStream;
                        document.querySelector('#other-v').srcObject = remoteStream;
                    });
                }, function (err) {
                    console.log('Failed to get local stream', err);
                });
            }
        });

        peer.on('call', function (call) {
            onCall = true;
            navigator.getUserMedia({ video: true, audio: true }, function (stream) {
                call.answer(stream);
                console.log("answered call")
                call.on('stream', function (remoteStream) {
                    console.log(remoteStream)
                    document.querySelector('#other-a').srcObject = remoteStream;
                    document.querySelector('#other-v').srcObject = remoteStream;
                });
            }, function (err) {
                console.log('Failed to get local stream', err);
            });
        });

        return (<div className="mt-3">
            <h5>Members:</h5>
            <div className="text-secondary">Tutor: {this.props.session_info.tutor}</div>
            <div className="text-secondary mb-4">Student: {this.props.session_info.student}</div>
            <video id='other-v' width={window.innerWidth * 1 / 3} autoPlay></video>
            <audio id='other-a' width={window.innerWidth * 1 / 3} controls autoPlay></audio>
        </div>);
    }
}

class UploadedFiles extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        let uploadedFiles = _.map([{ id: 0, file_name: "graph image" }, { id: 1, file_name: "hw3 assignment questions" }],
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