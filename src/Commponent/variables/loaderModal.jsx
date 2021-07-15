import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import loaderImg from '../../Img/koto.svg'
class Loader extends Component {
  render() {
    return (
      <div  className="modal-loder">
        <Modal
          show={this.props.show}
          className="d-flex justify-content-center"
          aria-labelledby="contained-modal-title-vcenter"
          centered 
         
        >
         <div class = "centered">
	<div class = "blob-1"></div>
	<div class = "blob-2"></div>
</div>
        </Modal>
      </div>
    )
  }
}

export default Loader
