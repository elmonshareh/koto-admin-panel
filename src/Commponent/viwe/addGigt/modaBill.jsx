import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import addIcon from "../../../Img/Icon/plus.svg"
class ModalBill extends Component {
    state = {  show:false}
    handleClose = () => {this.setState({show:false})};
handleShow = () => {this.setState({show:true})};
    render() { 
        const {show}=this.state
        return (  <div>
            <div onClick={this.handleShow}>
            <img src={addIcon} width="20px" />  اضافه اختيار اخري
      </div>
  <Modal show={show} onHide={this.statehandleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={ this.handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal></div>);
    }
}
 
export default ModalBill;