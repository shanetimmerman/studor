import React from 'react';
import { Formik } from 'formik';
import ReactModal from 'react-modal';
import StarRatingComponent from 'react-star-rating-component';
import _ from 'lodash';

class RatingForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isOpen: false, submitted: false }
        this.toggleModal = this.toggleModal.bind(this);
        this.submit = this.submit.bind(this)
    }

    toggleModal() {
        this.setState({ isOpen: !this.state.isOpen });
    }

    submit() {
        this.setState({ isOpen: !this.state.isOpen, submitted: true});
    }

    render() {
        if (this.state.isOpen) {
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
                            zIndex: 1000,
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
                    <Formik initialValues={{ stars: 0, description: "", tutor_id: this.props.session.tutor_id}}
                        onSubmit={(values) => {
                            let now = new Date();
                            let values1 = values;
                            values1.date = now;
                            console.log(values1);
                            this.props.rateTutor(values1);
                            this.submit();
                        }}>
                        {({ values, handleChange, handleSubmit, setValues }) => (
                            <form onSubmit={handleSubmit}>
                                <div className="card shadow p-3 mb-5 bg-white rounded padding border-0">
                                    <div className="card-body">
                                        <div className="d-flex ">

                                            <div className="col pl-0 d-flex justify-content-start">
                                                <h3 className="card-title">Rate {this.props.session.tutor_name}</h3>
                                            </div>

                                            <div className="col pr-0 d-flex justify-content-end">
                                                <button onClick={this.toggleModal} className="btn-sm  btn-outline-danger"> x </button>
                                            </div>

                                        </div>


                                        <StarRatingComponent 
                                        name="stars" 
                                        starCount={5}
                                        value={values.stars}
                                        onStarClick={(event) => {
                                            setValues(_.assign(values, { stars: event }));
                                        }}
                                        />

                                        <div className="form-group mb-4">
                                            <label htmlFor="ratingComment">Leave a comment:</label>
                                            <textarea name="description" id="ratingComment" rows="3" className="form-control bg-light border-0" onChange={handleChange} value={values.description} />
                                        </div>

                                        <button type="submit" className="btn rounded mt-3 btn-primary" onClick={handleSubmit}>Rate</button>
                                    </div>
                                </div>
                            </form>
                        )}
                    </Formik>
                </ReactModal>);
        } else {
            if (this.state.submitted) {
                return null;
            } else {
                return (<button className="btn btn-outline-primary" onClick={this.toggleModal}> Rate This Tutor </button>);
            }
        }
    }
}




export default RatingForm;