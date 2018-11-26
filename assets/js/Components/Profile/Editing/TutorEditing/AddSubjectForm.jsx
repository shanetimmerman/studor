import { Formik } from 'formik';
import _ from 'lodash';
import React from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';


class AddSubjectForm extends React.Component {
    constructor(props) {
        super(props);
        // Should receieve a list of available courses
        // And a university

        this.state = {
            isOpen: false,
        }

        this.toggleOpen = this.toggleOpen.bind(this);
    }

    componentWillMount() {
        this.props.fetchSubjects();
    }

    toggleOpen() {
        this.setState({ isOpen: !this.state.isOpen });
    }

    formatSubjectOptions() {
        console.log(this.props)
        let options = _.map(this.props.subjectAreas, (subjectArea) => { return { id: subjectArea.id, label: subjectArea.subject_area } });
        return options;
    }

    render() {
        if (this.state.isOpen) {
            return (
                <Formik
                    initialValues={{ tutor_id: this.props.user.user_id, subject_area_id: 1 }}
                    onSubmit={(values) => {
                        this.toggleOpen();
                        this.props.addSubject(values)
                    }}>
                    {({ values, handleSubmit, setValues }) => (
                        <form onSubmit={handleSubmit}>
                            <Typeahead
                                id="tutor_subject_areas"
                                name="tutor_subject_areas"
                                placeholder="Search for subjects..."
                                selectHintOnEnter={true}

                                onChange={(selected) => {
                                    console.log(selected)
                                    if (selected[0]) { setValues(_.assign(values, { subject_area_id: selected[0].id })); }
                                }}
                                options={this.formatSubjectOptions()} />

                            <button type="submit"> add subject area </button>
                        </form>
                    )}
                </Formik>
            )
        } else {
            return (<button onClick={this.toggleOpen} className="btn btn-primary">Add Subject Area</button>)
        }
    }
}

export default AddSubjectForm;