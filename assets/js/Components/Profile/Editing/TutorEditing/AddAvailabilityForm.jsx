import { Formik } from 'formik';
import _ from 'lodash';
import React from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import DateTimePicker from 'react-datetime-picker/dist/DateTimePicker';


class AddAvailabilityForm extends React.Component {
    constructor(props) {
        super(props);
        // Should receieve a list of available courses
        // And a university

        this.state = {
            isOpen: false,
        }

        this.toggleOpen = this.toggleOpen.bind(this);

    }

    toggleOpen() {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        if (this.state.isOpen) {
            return (
                <Formik initialValues={{ start_time: new Date(), end_time: new Date() }}
                    onSubmit={(values) => { this.props.addAvailability(values) }}>
                    {({ values, setValues, handleSubmit }) => (
                        <form onSubmit={handleSubmit}>

                            <DateTimePicker
                                name="start_time"
                                value={values.start_time}
                                onChange={(value) => setValues(_.assign(values, { start_time: value }))} />
                            to

                        <DateTimePicker
                                name="end_time"
                                value={values.end_time}
                                onChange={(value) => setValues(_.assign(values, { end_time: value }))} />

                            <button type="submit"> add availability </button>
                        </form>)}
                </Formik>
            )
        } else {
            return (<button onClick={this.toggleOpen} className="btn btn-primary">Add availability</button>)
        }
    }
}

export default AddAvailabilityForm;