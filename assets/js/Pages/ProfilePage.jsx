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
    return (<div className="bg-light">
            <div className="row padding">
                <div className="col-md-3"></div>
                <div className="col-md-6 mt-5 mb-3">
                    <h1 className="text-center"> My Profile</h1>
                </div>
                <div className="col-md-3"></div>
            </div>

            <div className="row padding">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <AccountFormContainer />
                    <PaymentFormContainer />
                    <TutorSkillsFormContainer />
                </div>
                <div className="col-md-2"></div>
            </div>

            </div>);
    }
}
  
export default ProfilePage;