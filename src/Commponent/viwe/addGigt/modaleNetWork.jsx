
import React, { Component } from 'react';
import { Button, Modal } from "react-bootstrap"
class AddNetwork extends Component {
   
    render() { 
      console.log(this.props.showModle) 
     
        const {name,handleName,modelkeys,inputModalKeys,uplodIcon,icon,handleModal,showModle,showModleChange}=this.props
  
        return (<div>

      <Button  className="network " onClick={showModleChange}>
اضافه شبكه اخري</Button>

      <Modal show={showModle} onHide={showModleChange}>
        <Modal.Header >
          <Modal.Title> اضافه شبكه اخري</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="my-2 d-flex text-nowrap"> <lable>اسم الشبكه:</lable><input type="text" className="p-1 mr-3 inputModalNet"  name="name" value={name} onChange={handleName}/></div>
         <div className="my-2 d-flex text-nowrap"><lable>مفتاح الشحن:</lable> <input type="text" className="p-1 mr-2 inputModalKey" value={modelkeys} onChange={inputModalKeys}/></div>
         <div className="my-2 d-flex text-nowrap"> <lable> شعار الشركه:</lable> <input type="file" className="p-1 mr-1 border-white" value={icon} onChange={uplodIcon}/></div>
       </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={showModleChange}>
            Close
          </Button>
          <Button variant="primary" onClick={handleModal}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
   
        </div>  );
    }
}
 
export default AddNetwork;