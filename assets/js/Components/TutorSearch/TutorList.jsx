import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';



class TutorList extends React.Component {
    constructor(props) {
      super(props);
  
    }

    render () {
        let tutors1 = _.map([{id:1}, {id:2}, {id:3}, {id:4}, {id:5}], (tutor) => <TutorInfo key={tutor.id}/>);
        return <div>{tutors1}</div>;
    }
}
  
class TutorInfo extends React.Component {
    constructor(props) {
      super(props);
     
    }

    render() {

        return (<div>
                    Tutor Info Card
                 </div>);
        }
  }

  function mapStateToProps(state) {
      return {

      }
  }

  export default connect(mapStateToProps)(TutorList);