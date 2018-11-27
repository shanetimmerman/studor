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
                <h4> Name: </h4>
                <p>{info.name}</p>
                <h4> Email: </h4>
                <p>{info.email}</p>
                <h4> Bio: </h4>
                <p>{info.bio}</p>
                <h4> University: </h4>
                <p>{info.university.name}</p>
                <h4> GPA: </h4>
                <p>{info.gpa}</p>
                <h4> Paypal Email: </h4>
                <p>{info.paypal_email}</p>
            </div>
        </div>
    )
}

export default TutorAccountInfoDisplay;
