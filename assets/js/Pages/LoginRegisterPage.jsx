import React from 'react';

import SignInFormContainer from '../Containers/Login/SignInFormContainer';

class LoginRegisterPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div className="row p-0 mb-3 bg-light">
            <div className="col-md-6 p-5">
                <div className="mt-2 mb-5">
                    <h1 className="text-primary">Hi there, welcome to Stutor</h1>
                    <h5 className="text-secondary"> Find students to tutor you, or tutor others.</h5>
                </div>
                <SignInFormContainer />
            </div>
            <div className="col-md-6">
                {/* Attribution: https://dribbble.com/shots/3832528-Hello-DRIBBBLE */}
                <img className="img-fluid" src="https://cdn.dribbble.com/users/1973532/screenshots/5059462/attachments/1124110/illustration_students.png" alt="Responsive image" />
            </div>
        </div>);
    }
}

export default LoginRegisterPage;