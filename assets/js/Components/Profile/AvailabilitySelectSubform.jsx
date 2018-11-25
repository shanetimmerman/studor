import React from 'react';
import { Formik } from 'formik';
import _ from 'lodash';

import DateTimePicker from 'react-datetime-picker'

class AvailabilitySelectSubform extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        this.props.onSubmit(values);
    }

    render() {
        return (
            <Formik initialValues={{ start_time: new Date(), end_time: new Date() }}>
                {({ values, setValues, resetForm }) => (
                    <div className="row">
                        <DateTimePicker
                            name="start_time"
                            value={values.start_time}
                            onChange={(value) => setValues(_.assign(values, { start_time: value }))} />
                        to
                        <DateTimePicker
                            name="end_time"
                            value={values.end_time}
                            onChange={(value) => setValues(_.assign(values, { end_time: value }))} />

                        <button type="button" onClick={() => { this.handleSubmit(values); resetForm() }} className="btn btn-primary"> Add availability block </button>
                    </div>)}
            </Formik>
        )
    }
}

export default AvailabilitySelectSubform;