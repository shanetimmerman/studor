import React from 'react';
import { Formik } from 'formik';
import ReactModal from 'react-modal';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';

class SessionRequestForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isOpen: false }
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        if (this.state.isOpen) {
            let info = this.props.tutorInfo;
            console.log("info")
            console.log(info)

            let availability = _.map(info.availabilities,
                (availability) => {
                    let start = new Date(availability.start).toLocaleString();
                    let end = new Date(availability.end).toLocaleTimeString();
                    return (<option key={availability.tutor_availability_id} value={availability.time_block_id}>
                        {start + " to " + end}
                    </option>);
                });



            return (
                <ReactModal
                    isOpen={this.state.isOpen}
                    ariaHideApp={false}
                    contentLabel="Request Modal"
                    shouldCloseOnOverlayClick={true}
                    shouldCloseOnEsc={true}
                    onRequestClose={() => { this.toggleModal() }}

                    style={{
                        overlay: {
                            backgroundColor: '#96969680',
                            zIndex: 1000, // fuck you,
                            display: 'flex',
                            alignItems: 'center',
                        },
                        content: {
                            backgroundColor: '#96969600',
                            border: 'none',
                            zIndex: 1000,
                            position: 'relative',
                            overflow: 'auto',
                            outline: 'none',
                            margin: 'auto',
                            top: '0px',
                            left: '0px',
                            right: '0px',
                            bottom: '0px',
                        }
                    }}>
                    <Formik initialValues={{ tutor_id: info.id, student_id: this.props.currentUser.user_id, description: null, time_block_id: info.availabilities[0].time_block_id, session_files: [] }}
                        onSubmit={(values, { setSubmitting }) => {
                            let session = { tutor_id: values.tutor_id, student_id: values.student_id, description: values.description, time_block_id: values.time_block_id, approved: false }
                            console.log(session)
                            this.props.requestSession(session);
                            this.toggleModal();
                        }}
                        validate={values => {
                            let errors = {};
                            if (!values.description) {
                                errors.description = 'Required';
                            }
                            return errors;
                        }}>
                        {({ values, errors, touched, handleChange, handleSubmit, setValues }) => (
                            <form onSubmit={handleSubmit}>
                                {console.log(values)}
                                <div className="card shadow p-3 mb-5 bg-white rounded padding border-0">
                                    <div className="card-body">
                                        <div className="d-flex ">

                                            <div className="col pl-0 d-flex justify-content-start">
                                                <h3 className="card-title">Request a Session</h3>
                                            </div>

                                            <div className="col pr-0 d-flex justify-content-end">
                                                <button onClick={this.toggleModal} className="close" aria-label="Close"> X </button>
                                            </div>

                                        </div>
                                        <p className="text-secondary">You are requesting a session with {info.name}. You will be notified with their response.</p>

                                        <div className="form-group mb-4">
                                            <label htmlFor="requestmessage">Message to {info.name.substr(0, info.name.indexOf(' '))}:</label>
                                            <textarea name="description" id="requestmessage" rows="3" className="form-control bg-light border-0" onChange={handleChange} value={values.message} />
                                            {errors.description && touched.description && errors.description}

                                        </div>

                                        <div className="form-inline mb-4">
                                            <div className="form-group mr-3">
                                                <label htmlFor="time_block">Session Time:</label>
                                                <select id="time_block" name="time_block_id" onChange={handleChange} value={values.date} className="form-control border-0 bg-light ml-2"> {availability}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <div className="custom-file">
                                                <label className="custom-file-label" htmlFor="File upload">Click to upload pngs for your session</label>
                                                <input type="file" className="custom-file-input" name="session_files"
                                                    onChange={(event) => {
                                                        setValues(_.assign(values, { session_files: _.concat(values.session_files, (event.currentTarget.files[0])) }));
                                                    }}
                                                />
                                                <small className="text-muted">Supported formats: png</small>
                                            </div>
                                        </div>

                                        <AttachmentList values={values} setValues={setValues} />
                                        <button type="submit" className="btn rounded mt-3 btn-primary" onClick={handleSubmit}>Submit request</button>
                                    </div>
                                </div>
                            </form>
                        )}
                    </Formik>
                </ReactModal>);
        } else {
            return (<button className="btn btn-outline-primary mt-3" onClick={this.toggleModal}> Request Session </button>);
        }
    }
}

class AttachmentList extends React.Component {
    constructor(props) {
        super(props)
        this.removeAttachment = this.removeAttachment.bind(this);
    }

    removeAttachment(attachment) {
        this.props.setValues(_.assign(this.props.values, { session_files: _.without(this.props.values.session_files, attachment) }));
    }

    render() {
        let attachmentList = _.map(this.props.values.session_files,
            (attachment) => {
                return (<Attachment key={uuidv4()} removeAttachment={this.removeAttachment} attachment={attachment} />)
            });

        return (attachmentList);
    }
}

function Attachment(props) {
    return (
        <div className="row">
            <p> {props.attachment.name} </p>
            <button type="button" onClick={() => { props.removeAttachment(props.attachment) }} className="btn btn-danger"> Remove attachment </button>
        </div>
    )
}
export default SessionRequestForm;
