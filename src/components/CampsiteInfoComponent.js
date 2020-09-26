import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label, Col, Row } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';

const minLength = len => val => val && (val.length >= len);
const maxLength = len => val => !val || (val.length <= len);

function RenderCampsite({campsite}) {
    return (
        <div className="col-md-5 m-1">
            <Card>
                <CardImg top src={campsite.image} alt={campsite.name} />
                <CardBody>
                    <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card>
        </div>
    );
}

function RenderComments({comments}) {
    if (comments) {
        return (
            <div className="col-md-5 m-1">
                <h4>Comments</h4>
                    {comments.map(comment => <div key={comment.id}>
                        <div>
                            {comment.text}
                        </div>
                        <p>
                            --{comment.author} {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                        </p>
                    </div>)}
                <CommentForm />
            </div>
        );
    }
    return (<div></div>);
}

function CampsiteInfo(props) {
    if (props.campsite) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>
                <div className="row" >
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments comments={props.comments} />
                </div>
            </div>
        );
    } else {
        return (
        <div></div>
        );
    }
}

class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rating: '1',
            author: '',
            text: '',
            isModalOpen: false,
            touched: {
                author: false
            }
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        alert("Current state is: " + JSON.stringify(values));
        console.log("Current state is: " + JSON.stringify(values));

    }

    render() {
        return(
            <React.Fragment>
                <Button className="fa fa-pencil fa-lg" outline onClick={this.toggleModal}>
                    Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                            <LocalForm onSubmit={values => this.handleSubmit(values)}>
                                <Row className="form-group">
                                    <Label htmlFor="rating" md={2}>Rating</Label>
                                    <Col md={{size: 10, offset: 2}}>
                                        <Control.select model=".rating" name="rating" className="form-control">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Control.select>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="author" md={2}>Your Name</Label>
                                    <Col md={10}>
                                        <Control.text model=".author" id="author" name="author" placeholder="Your Name" className="form-control"
                                            validators={{
                                                minLength: minLength(2),
                                                maxLength: maxLength(15)
                                            }}/>
                                            <Errors 
                                            className="text-danger"
                                            model=".author"
                                            show="touched"
                                            component="div"
                                            messages={{
                                                minLength: 'Must be at least 2 characters',
                                                maxLength: 'Must be 15 characters or less'
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="text" md={2}>Comment</Label>
                                    <Col md={10}>
                                        <Control.textarea model=".text" id="text" name="text" rows="6" className="form-control"/>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col md={{size: 10, offset: 2}}>
                                        <Button type="submit" value="submit" color="primary">Submit</Button>
                                    </Col>
                                </Row>
                            </LocalForm>
                    </ModalBody>
                </Modal>
            
            </React.Fragment>
        );
    }
}

export default CampsiteInfo;