import React from 'react';
import EditStudentForm from '../../Editing/StudentEditing/EditStudentForm';


/**
 * TEMPORARY ABSTRACTION-LESS WORKAROUND, TODO: ABSTRACT FROM USERINFORMATIONFORM
 * @param {*} props
 */
function StudentAccountInfoDisplay(props) {
    let info = props.user.user_info;

    return (
        <div className="card shadow p-3 mb-5 bg-white rounded padding border-0">
            <div className="card-body">
                <h3 className="card-title text-primary">Account Information</h3>
                <h4> Name: </h4>
                <p>{info.name}</p>
                <h4> Email: </h4>
                <p>{info.email}</p>
                <button onClick={props.onEditButton} className="btn-sm btn-primary">Edit profile</button>
            </div>
        </div>
    )
}

export default StudentAccountInfoDisplay;
