import React from 'react';
import _ from 'lodash';
import StarRatingComponent from 'react-star-rating-component';
import SessionRequestFormContainer from '../../Containers/TutorSearch/SessionRequestFormContainer'

class TutorList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mode: "rating",
        }
    }

    sort_rating(tutors) {
        let sorted_tutors = _.orderBy(tutors, ['average_rating'], ['desc'])
        return sorted_tutors;
    }

    sort_gpa(tutors) {
        let sorted_tutors = _.orderBy(tutors, ['gpa'], ['desc'])
        return sorted_tutors;
    }

    rating_sort() {
        this.setState({ mode: "rating" });
    }

    gpa_sort() {
        this.setState({ mode: "gpa" });
    }

    render() {
        let sorted = this.props.searchResults;

        if(this.state.mode == "rating") {
            sorted = this.sort_rating(sorted);
        } else {
            sorted = this.sort_gpa(sorted);
        }

        let tutors1 = _.map(sorted, (tutor) => <TutorInfo tutorInfo={tutor} key={tutor.id} />);

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
                                    {this.state.mode}
                                    </a>

                                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                    <a className="dropdown-item" onClick={this.rating_sort.bind(this)}>rating</a>
                                    <a className="dropdown-item" onClick={this.gpa_sort.bind(this)}>gpa</a>
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
                        <h3 className="d-inline card-title">{info.name}</h3>
                        <div className="d-inline ml-3 pt-3">
                            <StarRatingComponent className="align-bottom" name="rating_stars" starCount={5} value={info.average_rating}/>
                        </div>
                        <div className="d-inline mb-3">{"( " + info.num_ratings + " ratings )"}</div>
                        <h5 className="card-subtitle mt-2 mb-2 text-secondary">{info.gpa + " GPA | " + info.university.name}</h5>
                        <h6 className="card-subtitle mt-2 mb-2 text-primary">{_.map(info.subject_areas, (area) => area.name).join(", ")}</h6>
                        <p className="card-text text-secondary mt-2">{info.bio}</p>
                        {/* <a href="#" className="card-link">Request Session</a> */}
                        <SessionRequestFormContainer tutorInfo={info} />
                    </div>
                </div>

            </div>);
    }
}

export default TutorList;