import React, { Component } from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { Route } from 'react-router'
import { Link } from 'react-router-dom'
import logoImg from '../Img/logo.png'
import Main from './viwe/main'
import AddSurvay from './viwe/addSurvay'
import AddApp from './viwe/addApp'
import AddADS from './viwe/Ads'
import AddGift from './viwe/addGift'
import Notification from './viwe/addNotification'
import jwt_decode from 'jwt-decode'
import NotificationTables from './viwe/showTables/notificationTables'
import Users from './viwe/users/users'
import UserInfo from './viwe/users/userImfo'
import SpinnerNav from './viwe/spinner/spinnerNav';
import InviteFriends from './viwe/invite';
class Sidebar extends Component {
  state = {
    open: false,
    openCrited: false,
    openAds: false,
    token: localStorage.getItem('token'),
    date: Math.round(new Date().getTime() / 1000),
    arrowVedioOpen: false,
    arrowSurveyOpen: false,
    arrowAppOpen: false,
    notificationOpen: false,
    arrowBillOpen: false,
    arrowCoboneOpen: false,
    arrowSpinnerOpen:false,key:0
  }

  render() {
    const {
      open,
      openCrited,
      openAds,
      token,
      data,
      arrowVedioOpen,
      arrowSurveyOpen,
      notificationOpen,
      arrowAppOpen,
      arrowBillOpen,
      arrowCoboneOpen,
      arrowSpinnerOpen,key
    } = this.state
  
    let arrow,
      arrowAD,
      button,
      arrowVedio,
      arrowSurvey,
      arrowApp,
      arrowNotification,
      arrowBill,
      arrowCobone,  arrowSpinner
    var decoded = jwt_decode(token)
    decoded.exp === data && this.props.history.replace('/login')
    openCrited
      ? (button = <i className="fas fa-window-minimize mr-2 navIcon"></i>)
      : (button = <i className="fas fa-plus mr-2 navIcon "></i>)
    open
      ? (arrow = <i className="fas fa-chevron-up mr-5 navIcon"></i>)
      : (arrow = <i className="fas fa-chevron-down mr-5 navIcon "></i>)
    openAds
      ? (arrowAD = <i className="fas fa-chevron-up mr-3 navIcon"></i>)
      : (arrowAD = <i className="fas fa-chevron-down mr-3 navIcon"></i>)
    arrowVedioOpen

      ? (arrowVedio = <i className="  fas fa-window-minimize mr-2 navIcon"></i>)
      : (arrowVedio = <i className="fas fa-plus mr-2 navIcon "></i>)
    arrowSurveyOpen
      ? (arrowSurvey = <i className="fas fa-window-minimize mr-2 navIcon"></i>)
      : (arrowSurvey = <i className="fas fa-plus mr-2 navIcon "></i>)
    arrowAppOpen
      ? (arrowApp = <i className="fas fa-window-minimize mr-2 navIcon"></i>)
      : (arrowApp = <i className="fas fa-plus mr-2 navIcon "></i>)
    notificationOpen
      ? (arrowNotification = <i className="fas fa-chevron-up mr-5 navIcon"></i>)
      : (arrowNotification = (
          <i className="fas fa-chevron-down mr-5 navIcon "></i>
        ))
    arrowBillOpen
  
      ? (arrowBill = <i className="fas fa-window-minimize mr-3 navIcon"></i>)
      : (arrowBill = <i className="fas fa-plus mr-3 navIcon "></i>)
    arrowCoboneOpen
      ? (arrowCobone = <i className="fas fa-window-minimize mr-3 navIcon"></i>)
      : (arrowCobone = <i className="fas fa-plus mr-3 navIcon "></i>)
      arrowSpinnerOpen?  (arrowSpinner = <i className="fas fa-chevron-up mr-5 navIcon"></i>)
      : (arrowSpinner = <i className="fas fa-chevron-down mr-5 navIcon "></i>)
       
    return (
      <div className="side">
        <div className="d-block">
          <Navbar
            collapseOnSelect
            expand="lg"
            className="sidebar d-sm-flex d-md-block  justify-content-around "
          >
            <Navbar.Brand
              href="#home"
              className=" d-sm-bolck-inline d-md-block text-center pt-3"
            >
              <img src={logoImg} className="logo" alt="" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <hr className="d-none d-md-block" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <hr />
              <Nav
                className="sidebar-wrapper px-4 "
                variant="pills"
                defaultActiveKey={this.props.location.pathname}
               
                
              >
                <Nav.Link
                  eventKey="/admin/Dashboard"
                  as={Link}
                  className="navbar-nav py-3 pr-0"
                  to="/admin/Dashboard"
                >
                  <i className="fas fa-chart-pie px-2 navIcon"></i> الصفحه
                  الرئيسيه
                </Nav.Link>
                <Nav.Item
                  eventKey="1"
                  className="navbar-nav py-3"
                  onClick={(e) => {
                    this.setState({ openAds: !openAds ,open: false,notificationOpen:false,arrowSpinnerOpen:false })}}
                >
                  
            <i className="fab fa-adn px-2 navIcon"></i> تصنيف الاعلانات {arrowAD} 
                </Nav.Item>
                {openAds && (
                  <div>
                    <Nav.Item
                      className=" d-block  py-1 px-3"

                      onClick={() =>
                        this.setState({ arrowVedioOpen: !arrowVedioOpen })
                      }
                    >
                      فيديوهات {arrowVedio}
                    </Nav.Item>
                    {arrowVedioOpen && (
                      <div>
                        <Nav.Link
                          eventKey="/admin/AddADS/AddVedio"
                          as={Link}
                          className=" d-block  py-1 px-4"
                          to="/admin/AddADS/AddVedio"
                        >
                           اضافه 
                        </Nav.Link>
                        <Nav.Link
                          eventKey="/admin/AddADS/VedioTable"
                          as={Link}
                          className=" d-block  py-1 px-4"
                          to="/admin/AddADS/VedioTable"
                        >
                          عرض 
                        </Nav.Link>
                      </div>
                    )}
                    <Nav.Item
                      className=" d-block  py-1 px-3"
                      onClick={() =>
                        this.setState({ arrowSurveyOpen: !arrowSurveyOpen })
                      }
                    >
                      استبيانات {arrowSurvey}
                    </Nav.Item>
                    {arrowSurveyOpen && (
                      <div>
                        <Nav.Link
                          eventKey="2.1"
                          as={Link}
                          className=" d-block  py-1 px-4"
                          to="/admin/AddADS/AddSurvay"
                        >
                          اضافه 
                        </Nav.Link>
                        <Nav.Link
                          eventKey="/admin/AddADS/SurveyTable"
                          as={Link}
                          className=" d-block  py-1 px-4"
                          to="/admin/AddADS/SurveyTable"
                        >
                          عرض 
                        </Nav.Link>
                        <Nav.Link
                          eventKey="/admin/AddADS/SolvedSurvey"
                          as={Link}
                          className=" d-block  py-1 px-4"
                          to="/admin/AddADS/SolvedSurvey"
                        >
                          الاستبيانات المحلوله
                        </Nav.Link>
                      </div>
                    )}
                    <Nav.Item
                      className=" d-block  py-1 px-3"
                      onClick={() =>
                        this.setState({ arrowAppOpen: !arrowAppOpen })
                      }
                    >
                      تطبيقات {arrowApp}
                    </Nav.Item>
                    {arrowAppOpen && (
                      <div>
                        <Nav.Link
                          eventKey="/admin/AddADS/AddApp"
                          as={Link}
                          className=" d-block  py-1 px-4"
                          to="/admin/AddADS/AddApp"
                        >
                          اضافه 
                        </Nav.Link>
                        <Nav.Link
                          eventKey="/admin/AddADS/ApTable"
                          as={Link}
                          className=" d-block  py-1 px-4"
                          to="/admin/AddADS/ApTable"
                        >
                           عرض 
                        </Nav.Link>
                      </div>
                    )}
                  </div>
                )}
                <Nav.Item
                  eventKey="2"
                  className="navbar-nav py-3 "
                  onClick={() => this.setState({ open: !open,openAds: false ,notificationOpen:false,arrowSpinnerOpen:false })}
                  aria-controls="example-fade-text"
                  aria-expanded={open}
                >

                  <i className="fas fa-gifts px-2 navIcon"></i>   اضافه هدايا 
                  {arrow}
                </Nav.Item>
                {open && (
                  <div>
                    <div id="example-fade-text">
                      <Nav.Item
                        className=" d-block  py-1 px-3 "
                        onClick={() =>
                          this.setState({ openCrited: !openCrited })
                        }
                      >
                        كروت الشحن {button}
                      </Nav.Item>
                      {openCrited && (
                        <div>
                          <Nav.Link
                            eventKey="/admin/gift/carts"
                            as={Link}
                            className=" d-block  py-1 px-4"
                            to="/admin/gift/carts"
                          >
                            اضافه  
                          </Nav.Link>
                          <Nav.Link
                            eventKey="/admin/gift/AddNetwork"
                            as={Link}
                            className=" d-block  py-1 px-4"
                            to="/admin/gift/AddNetwork"
                          >
                            اضافه شبكه
                          </Nav.Link>
                          <Nav.Link
                            eventKey="/admin/AddADS/ChargingTable"
                            as={Link}
                            className=" d-block  py-1 px-4"
                            to="/admin/AddADS/ChargingTable"
                          >
                     عرض  
                          </Nav.Link>
                        </div>
                      )}

                      <Nav.Item
                        className="d-block  py-1 px-3"
                        onClick={() =>
                          this.setState({ arrowBillOpen: !arrowBillOpen })
                        }
                      >فاتوره خصم&nbsp;{arrowBill}
                      </Nav.Item>

                      {arrowBillOpen && (
                        <div>
                          <Nav.Link
                            eventKey="/admin/gift/billCategory"
                            as={Link}
                            className=" d-block  py-1 px-4"
                            to="/admin/gift/billCategory"
                          >
                            اضافه نوع 
                          </Nav.Link>
                          <Nav.Link
                            eventKey="/admin/gift/bill"
                            as={Link}
                            className=" d-block  py-1 px-4"
                            to="/admin/gift/bill"
                          >
                            اضافه 
                          </Nav.Link>

                          <Nav.Link
                            eventKey="/admin/gift/billTables"
                            as={Link}
                            className=" d-block  py-1 px-4"
                            to="/admin/gift/billTables"
                          >
                            عرض 
                          </Nav.Link>
                        </div>
                      )}
                      <Nav.Item
                        className="d-block  py-1 px-3"
                        onClick={() =>
                          this.setState({ arrowCoboneOpen: !arrowCoboneOpen })
                        }
                      >كوبون خصم{arrowCobone}
                      </Nav.Item>
                      {arrowCoboneOpen && (
                        <div>
                          <Nav.Link
                            eventKey="/admin/gift/cobone"
                            as={Link}
                            className="d-block  py-1 px-4"
                            to="/admin/gift/cobone"
                          >
                            اضافه 
                          </Nav.Link>
                          <Nav.Link
                            eventKey="/admin/gift/coubonTable"
                            as={Link}
                            className="d-block  py-1 px-4"
                            to="/admin/gift/coubonTable"
                          >
                            عرض 
                          </Nav.Link>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                <Nav.Item
                  className="navbar-nav py-3 pr-0"
                  onClick={() =>
                    this.setState({ notificationOpen: !notificationOpen,openAds: false, open:false, arrowSpinnerOpen:false })
                  }
                >
                  <i className="fas fa-bell px-2 navIcon"></i> الاشعارات  &nbsp;&nbsp;
                     {arrowNotification}
                </Nav.Item>
                {notificationOpen && (
                  <div>
                    <Nav.Link
                      eventKey="/admin/Notification"
                      as={Link}
                      to="/admin/Notification"
                      className="d-block  py-1 px-3"
                    >
                      اضافه 
                    </Nav.Link>

                    <Nav.Link
                      eventKey="/admin/Notificationtables"
                      as={Link}
                      to="/admin/Notificationtables"
                      className="d-block  py-1 px-3"
                    >
                      عرض 
                    </Nav.Link>
                  </div>
                )}

                <Nav.Link
                  eventKey="/admin/Users"
                  as={Link}
                  className="navbar-nav py-3 pr-0"
                  to="/admin/Users"
                >
                  <i className="fas fa-user-friends px-2 navIcon"></i> المستخدمين
                </Nav.Link>
                <Nav.Item
                  className="navbar-nav py-3 pr-0"
                  onClick={() =>
                    this.setState({ arrowSpinnerOpen: !arrowSpinnerOpen  ,open: false,openAds: false ,notificationOpen:false })
                  }
                >
                  <i className="fas fa-dharmachakra px-2 navIcon"></i> العجله &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; { arrowSpinner}
                </Nav.Item>
               { arrowSpinnerOpen&& <div>
                <Nav.Link
                      eventKey="/admin/Spinner/add"
                      as={Link}
                    to="/admin/Spinner/add"
                      className="d-block  py-1 px-3"
                    >
                       اضافه قيمه
                    </Nav.Link>
                    <Nav.Link
                      eventKey="/admin/Spinner/Tables"
                      as={Link}
                    to="/admin/Spinner/Tables"
                      className="d-block  py-1 px-3"
                    >
                     عرض القيم
                    </Nav.Link>
                 </div>}
                 {/* <Nav.Link
                      eventKey="11"
                      as={Link}
                    to="/admin/InviteFriends"
                    className="navbar-nav py-3 pr-0"
                    >
                
  <i className="fas fa-list-ol px-2 navIcon"></i> الارقام
                    </Nav.Link> */}
                    <Nav.Link
                      eventKey="12"
                      as={Link}
                    to="/"
                    className="navbar-nav py-3 pr-0"
                    >
                
  <i className="fas fa-sign-out-alt px-2 navIcon"></i> خروج
                    </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>

        <div className=" main float-sm-none float-md-left ">
          <Route path="/admin/Dashboard" component={Main} />
          <Route path="/admin/Category" component={AddADS} />
          <Route path="/admin/gift" component={AddGift} />
          <Route path="/admin/AddSurvay" component={AddSurvay} />
          <Route path="/admin/AddApp" component={AddApp} />
          <Route path="/admin/AddADS" component={AddADS} />
          <Route path="/admin/Notification" component={Notification} />
          <Route path="/admin/Users" component={Users} />
          <Route path="/admin/Notificationtables" component={NotificationTables} />
          <Route path="/admin/UserInfo:id" render={(props) => <UserInfo {...props} />} />
           <Route path="/admin/Spinner" component={SpinnerNav} />
           <Route path="/admin/InviteFriends" component={InviteFriends} />
          
        </div>
      </div>
    )
  }
}

export default Sidebar
