import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';


function Header(props) {
      console.log("rendering header")
      console.log(props)
      return (
            <div className="row mb-2 mt-4 p-3 bg-primary">

                  <div className="col-6 pt-1">
                        <h3><Link to={"/"} className="text-white">Stutor</Link></h3>
                  </div>

                  <div className="col-2 pt-2">
                        <p><Link to={"/sessions"} className="text-white">My Sessions</Link></p>
                  </div>

                  <div className="col-2 pt-2">
                        <p><Link to={"/profile"} className="text-white">My Profile</Link></p>
                  </div>

                  <div className="col-2 pt-2">
                        <p><Link to={"/currentSession"} className="text-white">Current Session</Link></p>
                        {props.user.token && <button className="btn btn-danger-outline" onClick={props.logoutUser}> Logout </button>}
                  </div>
            </div>);
}


export default Header;