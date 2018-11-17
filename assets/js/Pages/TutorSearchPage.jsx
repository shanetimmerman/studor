import React from 'react';
import _ from 'lodash';

import TutorSearchBarContainer from '../Containers/TutorSearch/TutorSearchBarContainer';
import TutorListContainer from '../Containers/TutorSearch/TutorListContainer';
import SessionRequestFormContainer from '../Containers/TutorSearch/SessionRequestFormContainer';

class TutorSearchPage extends React.Component {
    constructor(props) {
      super(props);
  
    }

    render () {
    return (<div>
                <TutorSearchBarContainer />
                <TutorListContainer />
                <SessionRequestFormContainer />
            </div>);
    }
}

export default TutorSearchPage;