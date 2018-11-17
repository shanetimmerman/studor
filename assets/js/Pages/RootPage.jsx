import React from 'react';
import _ from 'lodash';

import RootContainer from '../Containers/RootContainer';
import { log } from 'util';

class RootPage extends React.Component {
    constructor(props) {
      super(props);
    console.log("rootpage constructor")
  
    }

    render () {
        console.log(this.props.children);
    return (<RootContainer>
                {this.props.children}
            </RootContainer>);
    }
}

export default RootPage;