import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
class Delete extends Component {

  render() {
    return (
      <div>
        <Modal show={this.props.show} onHide={this.props.handleShow} className="text-right">
          <Modal.Header>
            <Modal.Title> تاكيد المسح</Modal.Title>
          </Modal.Header>
          <Modal.Body>   هل تريد مسح {this.props.status} ؟   </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.props.handleShow}>
              لا
            </Button>
            <Button variant="success" onClick={this.props.delete}>
              نعم
            </Button>
          </Modal.Footer>
        </Modal></div>);
  }
}

export default Delete;