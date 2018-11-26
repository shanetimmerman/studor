import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import store from '../../store'

class SessionList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mode: "upcoming sessions",
        }
    }

    componentWillMount() {
        this.props.fetchSessions();
    }

    get_active() {
        let user = store.getState().currentUser;
        let active = _.map(_.filter(this.props.sessionsList, (session) => {
            return session.approved && new Date(session.start) <= new Date() && new Date(session.end) >= new Date();
        }), (session) => <SessionInfo
            currentUser={user}
            sessionInfo={session}
            key={session.id}
            mode={"active"}
            cancel={this.props.cancelSession} />);

        let activeSessions = active.length > 0 ? active : <p>No active sessions</p>
        return activeSessions;
    }

    get_upcoming() {
        let user = store.getState().currentUser;
        let upcoming = _.map(_.filter(this.props.sessionsList, (session) => {
            return session.approved && new Date(session.start) > new Date();
        }), (session) => <SessionInfo
            currentUser={user}
            sessionInfo={session}
            key={session.id}
            mode={"upcoming"}
            cancel={this.props.cancelSession} />);

        let upcomingSessions = upcoming.length > 0 ? upcoming : <p>No upcoming sessions</p>
        return upcomingSessions;
    }

    get_past() {
        let user = store.getState().currentUser;
        let past = _.map(_.filter(this.props.sessionsList, (session) => {
            return session.approved && new Date(session.end) < new Date();
        }), (session) => <SessionInfo
            currentUser={user}
            sessionInfo={session}
            key={session.id}
            mode={"past"}
            cancel={this.props.cancelSession} />);

        let pastSessions = past.length > 0 ? past : <p>No past sessions</p>
        return pastSessions;
    }

    get_pending() {
        let user = store.getState().currentUser;
        let pending = _.map(_.filter(this.props.sessionsList, (session) => {
            return !session.approved;
        }), (session) => <SessionInfo
            currentUser={user}
            sessionInfo={session}
            key={session.id}
            mode={"pending"}
            cancel={this.props.cancelSession}
            approve={this.props.approveSession} />);

        let pendingSessions = pending.length > 0 ? pending : <p>No pending session requests</p>
        return pendingSessions;
    }

    upcoming_sessions() {
        this.setState({ mode: "upcoming sessions" });
    }

    past_sessions() {
        this.setState({ mode: "past sessions" });
    }

    pending_sessions() {
        this.setState({ mode: "pending requests" });
    }

    render() {
        let active_sessions = this.get_active();

        let sessions1 = null
        if (this.state.mode == "upcoming sessions") {
            sessions1 = this.get_upcoming()
        } else if (this.state.mode == "past sessions") {
            sessions1 = this.get_past()
        } else {
            sessions1 = this.get_pending()
        }

        return <div>
            <div className="mb-5 mt-5">
                <h3 className="text-primary">Active Sessions</h3>
                {active_sessions}
            </div>

            <form className="form-inline">
                <div className="form-group mb-3">
                    <label>Viewing</label>
                    <div className="dropdown">
                        <a className="btn dropdown-toggle text-primary" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {this.state.mode}
                        </a>

                        <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                            <a className="dropdown-item" onClick={this.upcoming_sessions.bind(this)}>upcoming sessions</a>
                            <a className="dropdown-item" onClick={this.past_sessions.bind(this)}>past sessions</a>
                            <a className="dropdown-item" onClick={this.pending_sessions.bind(this)}>pending requests</a>
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
        this.state = { menuOpen: false }

        this.toggleMenu = this.toggleMenu.bind(this);
    }

    toggleMenu() {
        this.setState({ menuOpen: !this.state.menuOpen })
    }

    render() {
        let currentUser = this.props.currentUser;
        let info = this.props.sessionInfo;
        let start = new Date(info.start);
        let end = new Date(info.end);

        let join = null;
        let approve = null;
        let cancel = null;

        if (this.props.mode == "active") {
            join = <Link to={{ pathname: "/currentSession", state: info }} className="btn ml-2 rounded btn-outline-primary">Join Session</Link>;
        } else if (this.props.mode == "pending" && currentUser.user_type == "TUTOR") {
            approve = <button onClick={() => this.props.approve(info.id, info)} className="btn-sm btn-outline-success"> Approve Session </button>;
        } else if (this.props.mode == "upcoming" || this.props.mode == "pending") {
            console.log(info.id)
            cancel = <button onClick={() => this.props.cancel(info.id)} className="btn-sm btn-outline-danger"> Cancel Session </button>;
        }



        let cardTitle = currentUser.user_type == "STUDENT" ? <h5 className="card-title">Tutor: {info.tutor}</h5> : <h5 className="card-title">Student: {info.student}</h5>
        return (
            <div className="card shadow p-3 mb-4 bg-white rounded padding border-0">
                <div className="card-body">
                    <div className="d-flex ">

                        <div className="col pl-0 d-flex justify-content-start">
                            {cardTitle}
                        </div>

                        <div className="col pr-0 d-flex justify-content-end">
                            {join}
                            {approve}
                            {cancel}
                        </div>

                    </div>
                    <h6 className="card-subtitle mb-2 text-primary"> {"date: " + start.toLocaleDateString() + "time: " + start.toLocaleTimeString() + " - " + end.toLocaleTimeString()}</h6>
                    <p className="card-subtitle mb-2 text-secondary"> {info.approved ? "approved" : "pending"}</p>
                    <p className="card-text">{info.description}</p>
                </div>
            </div>
        );
    }
}

export default SessionList;