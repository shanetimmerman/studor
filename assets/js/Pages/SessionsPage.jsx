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
                        <div className="col-md-6 mt-5 mb-3">
                            <h1 className="text-center"> My Sessions</h1>
                            <h5 className="text-center text-secondary">Find your upcoming, pending, and past sessions here.</h5>
                        </div>
                        <div className="col-md-3"></div>
                    </div>

                    <div className="row padding">
                        <div className="col-md-2"></div>
                        <div className="col-md-8">
                            <SessionListContainer />
                        </div>
                        <div className="col-md-2"></div>
                    </div>
                </div>);
    }
}

export default SessionsPage;