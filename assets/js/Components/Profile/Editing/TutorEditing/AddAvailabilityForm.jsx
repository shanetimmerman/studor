import { Formik } from 'formik';
import _ from 'lodash';
import React from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import DateTimePicker from 'react-datetime-picker';

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
                    onSubmit={(values) => {
                        this.props.addAvailability(values);
                        this.setState({isOpen: false});
                }}>
                    {({ values, setValues, handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <div className="col">
                                <div className="p-1">
                                <label htmlFor="start-time-picker" >Start:</label>
                                <DateTimePicker
                                    id="start-time-picker"
                                    name="start_time"
                                    value={values.start_time}
                                    onChange={(value) => setValues(_.assign(values, { start_time: value }))}
                                    />
                                </div>
                                <div className="p-1">
                                <label htmlFor="end-time-picker" >End:</label>
                                <DateTimePicker
                                    id="end-time-picker"
                                    name="end_time"
                                    value={values.end_time}
                                    onChange={(value) => setValues(_.assign(values, { end_time: value }))}
                                    />
                                </div>

                                <div className="row">
                                    <div className="p-1">
                                        <button type="submit" className="btn-primary btn-sm"> Add Availability </button>
                                    </div>
                                    <div className="p-1">
                                        <button onClick={this.toggleOpen} className="btn-danger btn-sm"> Cancel </button>
                                    </div>
                                </div>
                            </div>
                        </form>)}
                </Formik>
            )
        } else {
            return (<button onClick={this.toggleOpen} className="btn btn-primary">Add availability</button>)
        }
    }
}

export default AddAvailabilityForm;
