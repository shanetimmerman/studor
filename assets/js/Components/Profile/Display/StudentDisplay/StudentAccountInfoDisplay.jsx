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
                <div className="p-2">
                    <h5 className="d-inline"> Name: </h5>
                    <p className="d-inline">{info.name}</p>
                </div>

                <div className="p-2">
                    <h5 className="d-inline"> Email: </h5>
                    <p className="d-inline">{info.email}</p>
                </div>

                <div className="mt-2 p-2">
                    <button onClick={props.onEditButton} className="btn-sm btn-primary">Edit profile</button>
                </div>
            </div>
        </div>
    )
}

export default StudentAccountInfoDisplay;
