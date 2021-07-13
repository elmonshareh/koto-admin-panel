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

      <Modal show={ this.props.show} onHide={this.props.handleShow}>
        <Modal.Header>
          <Modal.Title>تاكيد{this.props.status}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.handleShow}>
            Close
          </Button>
          <Button variant="primary" onClick={ this.props.handleShow}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal></div> );
    }
}
 
export default ModaleUser;