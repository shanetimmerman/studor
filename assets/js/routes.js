import React from 'react';
import { Route } from 'react-router-dom'
import SessionsPage from './Pages/SessionsPage';
import LoginRegisterPage from './Pages/LoginRegisterPage';
import ProfilePage from './Pages/ProfilePage';
import TutorSearchPage from './Pages/TutorSearchPage';
import RootPage from './Pages/RootPage';

export default (
    <Route path="/" component={RootPage}>
        <Route path="sessions" component={SessionsPage}/>
        <Route path="signin" component={LoginRegisterPage}/>
        <Route path="profile" component={ProfilePage}/>
        <Route path="find-tutors" component={TutorSearchPage}/>
    </Route>
);