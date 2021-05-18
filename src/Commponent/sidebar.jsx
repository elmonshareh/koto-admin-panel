import React, { Component } from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { Route } from 'react-router'
import { Link, NavLink } from 'react-router-dom'
import logoImg from '../Img/logo.png'
import Main from './viwe/main'
import AddVideo from './viwe/addVedio'
import AddSurvay from './viwe/addSurvay'
import AddApp from './viwe/addApp'
import AddADS from './viwe/Ads';
import { Card } from './login/Card';
class Sidebar extends Component {
  state = {}

  render() {
    return (
      <div className="side">
        <div className="d-block">
          <Navbar
            collapseOnSelect
            expand="lg"
            className="sidebar d-sm-flex d-md-block  justify-content-around text-center "
          >
            <Navbar.Brand
              href="#home"
              className=" d-sm-bolck-inline d-md-block text-center pt-3"
            >
              <img src={logoImg} class="logo" alt="" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <hr />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav
                className="sidebar-wrapper px-4 pt-4 "
                variant="pills"
                defaultActiveKey="0"
              >
                <Nav.Link
                  eventKey="0"
                  as={Link}
                  className="navbar-nav py-3"
                  to="/admin/Dashboard"
                >
                  <i className="fas fa-chart-pie px-2"></i> الصفحه الرئيسيه
                </Nav.Link>
              
                
                <Nav.Link
                  eventKey="1"
                  as={Link}
                  className=" navbar-nav py-3"
                  to="/admin/Category"
                >
                  <i class="fab fa-adn px-2"></i> تصنيف الاعلانات 
                </Nav.Link>

              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
       
        <div className=" main float-sm-none float-md-left ">
          <Route path="/admin/Dashboard" component={Main} />
          <Route path="/admin/Category" component={AddADS} />
           <Route path="/admin/AddSurvay" component={AddSurvay} />
          <Route path="/admin/AddApp" component={AddApp} />
          <Route path="/admin/AddADS" component={ AddADS} /> 
         
        </div>
      </div>
    )
  }
}

export default Sidebar
