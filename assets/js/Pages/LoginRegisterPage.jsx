import React from 'react';
import _ from 'lodash';

import SignInFormContainer from '../Containers/SignIn/SignInFormContainer';

class LoginRegisterPage extends React.Component {
    constructor(props) {
      super(props);
  
    }

    render () {
    return (<div>
                <SignInFormContainer />
            </div>);
    }
}

export default LoginRegisterPage;