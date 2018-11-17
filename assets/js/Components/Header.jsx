import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';


function Header(props) {
        return (
        <div className="row my-2">
        <div className="col-4">
        <h1><Link to={"/tutor-search"} >Stutor</Link></h1>
        </div>
        <div className="col-4">
        <p><Link to={"/sessions"} >My Sessions</Link></p>
        </div>
        <div className="col-4">
        <p><Link to={"/profile"} >Profile</Link></p>
        </div>
        </div>);
  }

  export default Header;