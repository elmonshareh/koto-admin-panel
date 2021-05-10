import React, { Component } from 'react'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Route } from 'react-router'
import { Card } from './../login/Card'
import Main from './main'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import { Link } from 'react-router-dom'
import AddVideo from './addVideo'
import AddSurvay from './addSurvay'
import AddApp from './addApp'

class AddADS extends Component {
  state = {}
  handleSelect = (eventKey) => alert(`selected ${eventKey}`)

  render() {
    return (
      <div className="container">
        <div className="row m-3">
          <div className="p-0 mt-3">
            <div className="pt-3 ">
              <Card
                content={
               
                  <div  className="container">
                  <div className="p-3 d-md-flex d-sm-block addtype row">
                    <div className="d-felx addAds text-right col-md-6 col-sm-12 ">
                     <span className="pt-5">اضافه الاعلان : </span>
                      <input type="text" className=" addAdsText w-50" />
                    </div>
                    <div className="d-flex  text-right addAds col-md-6 col-sm-12 ">
                      <span className="mt-2"> نوع الاعلان :</span>
                      <DropdownButton className="py-1"
                        id="dropdown-item-button"
                        title="نوع الاعلان"
                      >
                        <Dropdown.Item as={Link} to="/admin/AddADS/addVedio">
                         اضافه فيديوهات 
                        </Dropdown.Item>
                        <Dropdown.Item as={Link} to="/admin/AddADS/AddSurvay" >
                        اضافه استبيان 
                        </Dropdown.Item>
                        <Dropdown.Item as={Link} to="/admin/AddADS/AddApp" >
                          اضافه  تطبيقات  
                        </Dropdown.Item>
                        <Dropdown.Item as={Link} to="/admin/AddADS/AddApp" >
                          اضافه  اخري  
                        </Dropdown.Item>
                      </DropdownButton>
                    </div>
                  </div>
                  </div>
                }
              />
            </div>
          </div>
          
        </div>

        <div className="mx-3">
          <Route path="/admin/AddADS/addVedio" component={AddVideo} />
          <Route path="/admin/AddADS/AddSurvay" component={AddSurvay} />
          <Route path="/admin/AddADS/AddApp" component={AddApp} />
        
        </div>
      </div>
    )
  }
}

export default AddADS
