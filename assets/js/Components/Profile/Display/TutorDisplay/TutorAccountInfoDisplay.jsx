import React from 'react';

/**
 * TEMPORARY ABSTRACTION-LESS WORKAROUND, TODO: ABSTRACT FROM USERINFORMATIONFORM
 * @param {*} props
 */
function TutorAccountInfoDisplay(props) {
    let info = props.user.user_info;

    return (
        <div className="card shadow p-3 mb-5 bg-white rounded padding border-0">
            <div className="card-body">
                <h3 className="card-title text-primary">Account Information</h3>
                <div className="p-2">
                    <h5 className="d-inline"> Name: </h5>
                    <p className="d-inline">{info.name}</p>
                </div>

                <div className="p-2">
                    <h5 className="d-inline"> Email: </h5>
                    <p className="d-inline">{info.email}</p>
                </div>

                <div className="p-2">
                    <h5 className="d-inline"> Bio: </h5>
                    <p className="d-inline">{info.bio}</p>
                </div>

                <div className="p-2">
                    <h5 className="d-inline"> University: </h5>
                    <p className="d-inline">{info.university.name}</p>
                </div>

                <div className="p-2">
                    <h5 className="d-inline"> GPA: </h5>
                    <p className="d-inline">{info.gpa}</p>
                </div>

                <div className="p-2">
                    <h5 className="d-inline"> Paypal Email: </h5>
                    <p className="d-inline">{info.paypal_email}</p>
                </div>

                <div className="p-2">
                    <button onClick={props.onEditButton} className="btn btn-primary">Edit profile</button>
                </div>
            </div>
        </div>
    )
}

export default TutorAccountInfoDisplay;
