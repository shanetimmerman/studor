import React from 'react';
import _ from 'lodash';


class SessionList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.fetchSessions();
    }

    render() {
        let sessions1 = _.map(this.props.sessionsList, (session) => <SessionInfo sessionInfo={session} key={session.id} />);

        let activeSessions = _.map(_.filter(this.props.sessionsList, (session) => {
            return new Date(session.start) <= new Date() && new Date(session.end) >= new Date();
        }), (session) => <ActiveSession sessionInfo={session} key={session.id}/>);

        let current = activeSessions.length > 0 ? activeSessions : <p>No active sessions</p>

        return <div>
            <div className="mb-5 mt-5">
                <h3 className="text-primary">Active Sessions</h3>
                {current}
            </div>
        
            <form className="form-inline">
                <div className="form-group mb-3">
                    <label>Viewing</label>
                    <div className="dropdown">
                        <a className="btn dropdown-toggle text-primary" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            upcoming sessions
                            </a>

                        <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                            <a className="dropdown-item" onClick={() => { alert("Show upcoming sessions") }}>upcoming sessions</a>
                            <a className="dropdown-item" onClick={() => { alert("Show past sessions") }}>past sessions</a>
                            <a className="dropdown-item" onClick={() => { alert("Show pending session requests") }}>pending requests</a>
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
        let info = this.props.sessionInfo;
        let start = new Date(info.start);
        let end = new Date(info.end);

        return (
            <div className="card shadow p-3 mb-4 bg-white rounded padding border-0">
                <div className="card-body">
                    <div className="d-flex ">

                        <div className="col pl-0 d-flex justify-content-start">
                            <h5 className="card-title">{info.tutor}</h5>
                        </div>

                        <div className="col pr-0 d-flex justify-content-end">
                            <button onClick={this.toggleMenu} className="btn-sm btn-outline-primary"> Edit Task </button>
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


class ActiveSession extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let info = this.props.sessionInfo;
        let start = new Date(info.start);
        let end = new Date(info.end);

        return (
            <div className="card shadow p-3 mb-4 bg-white rounded padding border-0">
                <div className="card-body">
                    <div className="d-flex ">

                        <div className="col pl-0 d-flex justify-content-start">
                            <h5 className="card-title">{info.tutor}</h5>
                        </div>

                        <div className="col pr-0 d-flex justify-content-end">
                            <button onClick={this.toggleMenu} className="btn-sm btn-outline-primary"> Join Session </button>
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