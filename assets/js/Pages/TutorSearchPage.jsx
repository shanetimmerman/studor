import React from 'react';
import _ from 'lodash';

import TutorSearchBarContainer from '../Containers/TutorSearch/TutorSearchBarContainer';
import TutorListContainer from '../Containers/TutorSearch/TutorListContainer';

class TutorSearchPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div className="bg-light">
            <div className="row padding">
                <div className="col-md-3"></div>

                <div className="col-md-6">
                    <div className="mt-5 mb-5">
                        <h1 className="text-center"> Find Tutors</h1>
                        <h5 className="text-center text-secondary">Search by course or subject.</h5>
                    </div>
                    <TutorSearchBarContainer />
                </div>
                <div className="col-md-3"></div>
            </div>

            <div className="row padding">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <TutorListContainer />
                </div>
                <div className="col-md-2"></div>
            </div>
        </div>);
    }
}

export default TutorSearchPage;