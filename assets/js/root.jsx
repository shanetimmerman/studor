import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import _ from 'lodash';
import $ from 'jquery';

import api from './api';

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
        </div>;
    }
}
