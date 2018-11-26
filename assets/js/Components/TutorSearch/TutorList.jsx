import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import SessionRequestFormContainer from '../../Containers/TutorSearch/SessionRequestFormContainer'

class TutorList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log("search results")
        console.log(this.props.searchResults)
        let tutors1 = _.map(this.props.searchResults, (tutor) => <TutorInfo tutorInfo={tutor} key={tutor.id} />);

        return <div>
            <div className="row mb-3">
                <div className="col-md-3">
                    {this.props.searchResults.length + " results"}
                </div>
                <div className="col-md-6">

                </div>

                <div className="col-md-3">
                    <form className="form-inline">
                        <div className="text-right form-group">
                            <label>sort by:</label>
                            <div className="dropdown">
                                <a className="btn dropdown-toggle text-primary" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    popularity
                                    </a>

                                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                    <a className="dropdown-item" onClick={() => { alert("Show best match") }}>best match</a>
                                    <a className="dropdown-item" onClick={() => { alert("Show most popular") }}>popularity</a>
                                    <a className="dropdown-item" onClick={() => { alert("Show highest gpa") }}>gpa</a>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            {tutors1}
        </div>;
    }
}

class TutorInfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = { showRequest: false };
    }

    render() {
        let info = this.props.tutorInfo;
        console.log(info)

        return (
            <div>
                <div className="card shadow p-3 mb-4 bg-white rounded padding border-0">
                    <div className="card-body">
                        <h5 className="card-title">{info.name + " | " + info.university.name}</h5>
                        <h6 className="card-subtitle mb-2 text-primary">{_.map(info.subject_areas, (area) => area.name).join(", ")}</h6>
                        <p className="card-text">Forgot to add tutor default messages to database :^).</p>
                        {/* <a href="#" className="card-link">Request Session</a> */}
                        <SessionRequestFormContainer tutorInfo={info} />
                    </div>
                </div>

            </div>);
    }
}

export default TutorList;