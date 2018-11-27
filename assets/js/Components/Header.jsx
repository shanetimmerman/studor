import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { Redirect } from 'react-router'
import Cookie from 'js-cookie';


function Header(props) {
      if (props.user.logged_in) {
            return (
                  <div className="row p-3 bg-primary">
                        <div className="col-7 pt-1 pl-5">
                              <h3><Link to={"/"} className="text-white">Stutor</Link></h3>
                        </div>

                        <div className="col-2 pt-2">
                              <p><Link to={"/sessions"} className="text-white">My Sessions</Link></p>
                        </div>

                        <div className="col-2 pt-2">
                              <p><Link to={"/profile"} className="text-white">My Profile</Link></p>
                        </div>

                        <div className="col-1 pt-1">
                              <button className="btn btn-danger-outline" onClick={props.logoutUser}> Logout </button>
                        </div>
                  </div>);
      } else {
            return (
                  <div className="row p-3 bg-primary">

                        <div className="col-12 pt-1">
                              <h3><Link to={"/"} className="text-white">Stutor</Link></h3>
                        </div>

                        <Redirect to="/" />
                  </div>
            )
      }
}


export default Header;