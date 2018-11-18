import React from 'react';
import _ from 'lodash';

import SessionListContainer from '../Containers/Sessions/SessionListContainer';

class SessionsPage extends React.Component {
    constructor(props) {
      super(props);
  
    }

    render () {
        return ( <div className="bg-light">
            <div className="row padding">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <h1 className="text-center"> My Sessions</h1>
                    <h5 className="text-center text-secondary">Find your upcoming, pending, and past sessions here.</h5>
                </div>
                <div className="col-md-3"></div>
            </div>

            <div className="row padding">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <form className="form-inline">
                        <div className="form-group mb-2">
                            <label>Viewing</label>
                            <div className="dropdown">
                                <a className="btn dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Upcoming
                                </a>

                                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                    <a className="dropdown-item" href="#">upcoming sessions</a>
                                    <a className="dropdown-item" href="#">pending requests</a>
                                    <a className="dropdown-item" href="#">past sessions</a>
                                </div>
                            </div>
                        </div>
                    </form>
                    <SessionListContainer />
                </div>
                <div className="col-md-2"></div>
            </div>

        </div>);
    }

}

export default SessionsPage;