import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import _ from 'lodash';

import SessionsPage from "../Pages/SessionsPage.jsx"
import ProfilePage from "../Pages/ProfilePage.jsx"
import HeaderContainer from '../Containers/HeaderContainer.jsx';
import MainPage from '../Pages/MainPage.jsx';
import CurrentSessionPage from '../Pages/CurrentSessionPage.jsx';

export default function root_init(node, store) {
    ReactDOM.render(
      <Provider store={store}>
        <Root />
      </Provider>, node);
}


class Root extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>
          <Router>
            <div>
              <HeaderContainer />
              <div className="row">
                <div className="col-12">
                  <Route path="/" exact={true} render={() =>
                    <MainPage />
                  } />
                  <Route path="/sessions" exact={true} render={() =>
                    <SessionsPage />
                  } />
                  <Route path="/profile" exact={true} render={() =>
                    <ProfilePage />
                  } />
                  <Route path="/currentSession" exact={true} render={() =>
                    <CurrentSessionPage />
                  } />
                </div>
              </div>
            </div>
          </Router>
        </div>;
    }
}
