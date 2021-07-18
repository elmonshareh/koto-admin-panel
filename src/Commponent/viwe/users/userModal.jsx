import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
class ModaleUser extends Component {

    render() { 
        return ( 
        <div>
             {/* <Button variant="primary" onClick={ this.props.handleShow}>
             Launch demo modal
           </Button> */}

      <Modal show={ this.props.show} onHide={this.props.handleShow} className="text-right">
        <Modal.Header>
          <Modal.Title>تاكيد{this.props.status}</Modal.Title>
        </Modal.Header>
        <Modal.Body>    هل تريد  {this.props.status} المستخدم</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={this.props.delete}>
            لا
          </Button>
          <Button variant="danger" onClick={ this.props.handleShow}>
           نعم
          </Button>
        </Modal.Footer>
      </Modal></div> );
    }
}
 
export default ModaleUser;