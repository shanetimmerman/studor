import React from 'react';
import _ from 'lodash';

import AccountFormContainer from '../Containers/Profile/AccountFormContainer';
import PaymentFormContainer from '../Containers/Profile/PaymentFormContainer';
import TutorSkillsFormContainer from '../Containers/Profile/TutorSkillsFormContainer';

class ProfilePage extends React.Component {
    constructor(props) {
      super(props);
  
    }

    render () {
    return (<div>
                <AccountFormContainer />
                <PaymentFormContainer />
                <TutorSkillsFormContainer />
            </div>);
    }
}
  
export default ProfilePage;