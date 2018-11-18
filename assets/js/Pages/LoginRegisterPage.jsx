import React from 'react';

import SignInFormContainer from '../Containers/SignIn/SignInFormContainer';

class LoginRegisterPage extends React.Component {
    constructor(props) {
      super(props);
  
    }

    render () {
    return (<div className="row padding vertical-padding bg-light">
                <div className="col-md-6">
                    <div className="vertical-padding">
                        <h1 className="text-primary">Hi there, welcome to Stutor</h1>
                        <h5 className="text-secondary"> This is a short description of the app</h5>
                    </div>
                    <SignInFormContainer />
                </div>
                <div className="col-md-6">
                    <img src="http://myivyexperience.com/fabivy/wp-content/uploads/2017/04/my-ivy-experience-online-tutoring.jpg" className="img-fluid" alt="Responsive image"/>
                </div>
            </div>);
    }
}

export default LoginRegisterPage;