import { Formik } from 'formik';
import _ from 'lodash';
import React from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';


class AddCourseForm extends React.Component {
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

    formatCourseOptions(university_id) {
        let courseOptions = [];

        _.each(this.props.courses,
            (course) => {
                if (course.university_id == university_id) {
                    courseOptions.push({ id: course.id, name: course.course_name, number: course.course_no });
                }
            });

        return courseOptions;
    }

    render() {
        if (this.state.isOpen) {
            return (
                <Formik
                    initialValues={{ tutor_id: this.props.user.user_id, course_id: 1 }}
                    onSubmit={(values) => { this.props.addCourse(values) }}>
                    {({ values, handleSubmit, setValues }) => (
                        <form onSubmit={handleSubmit}>
                            <Typeahead
                                id="courses"
                                name="courses"
                                placeholder="Search for courses at your university..."
                                selectHintOnEnter={true}
                                labelKey="name"
                                onChange={(selected) => {
                                    console.log(selected)
                                    if (selected[0]) { setValues(_.assign(values, { course_id: selected[0].id })); }
                                }}
                                options={this.formatCourseOptions(this.props.user.user_info.university.id)}
                            />

                            <button type="submit"> add course </button>
                        </form>
                    )}
                </Formik>
            )
        } else {
            return (<button onClick={this.toggleOpen} className="btn btn-primary">Add Course</button>)
        }
    }
}

export default AddCourseForm;