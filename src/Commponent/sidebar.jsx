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
import Notification from './addNotification'
import jwt_decode from 'jwt-decode'

import NotificationTables from './viwe/showTables/notificationTables'
import Users from './viwe/users/users'
import UserInfo from './viwe/users/userImfo'
import SpinnerNav from './viwe/spinner/spinnerNav';
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
    } = this.state
    let arrow,
      arrowAD,
      button,
      arrowVedio,
      arrowSurvey,
      arrowApp,
      arrowNotification,
      arrowBill,
      arrowCobone
    var decoded = jwt_decode(token)
    decoded.exp === data && this.props.history.replace('/login')
    openCrited
      ? (button = <i className="fas fa-chevron-up mr-2 navIcon"></i>)
      : (button = <i className="fas fa-chevron-down mr-2 navIcon "></i>)
    open
      ? (arrow = <i className="fas fa-chevron-up mr-2 navIcon"></i>)
      : (arrow = <i className="fas fa-chevron-down mr-2 navIcon "></i>)
    openAds
      ? (arrowAD = <i className="fas fa-chevron-up mr-2 navIcon"></i>)
      : (arrowAD = <i className="fas fa-chevron-down mr-2 navIcon"></i>)
    arrowVedioOpen
      ? (arrowVedio = <i className="fas fa-chevron-up mr-2 navIcon"></i>)
      : (arrowVedio = <i className="fas fa-chevron-down mr-2 navIcon "></i>)
    arrowSurveyOpen
      ? (arrowSurvey = <i className="fas fa-chevron-up mr-2 navIcon"></i>)
      : (arrowSurvey = <i className="fas fa-chevron-down mr-2 navIcon "></i>)
    arrowAppOpen
      ? (arrowApp = <i className="fas fa-chevron-up mr-2 navIcon"></i>)
      : (arrowApp = <i className="fas fa-chevron-down mr-2 navIcon "></i>)
    notificationOpen
      ? (arrowNotification = <i className="fas fa-chevron-up mr-2 navIcon"></i>)
      : (arrowNotification = (
          <i className="fas fa-chevron-down mr-2 navIcon "></i>
        ))
    arrowBillOpen
      ? (arrowBill = <i className="fas fa-chevron-up mr-2 navIcon"></i>)
      : (arrowBill = <i className="fas fa-chevron-down mr-2 navIcon "></i>)
    arrowCoboneOpen
      ? (arrowCobone = <i className="fas fa-chevron-up mr-2 navIcon"></i>)
      : (arrowCobone = <i className="fas fa-chevron-down mr-2 navIcon "></i>)
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
                defaultActiveKey="0"
              >
                <Nav.Link
                  eventKey="0"
                  as={Link}
                  className="navbar-nav py-3 pr-0"
                  to="/admin/Dashboard"
                >
                  <i className="fas fa-chart-pie px-2 navIcon"></i> الصفحه
                  الرئيسيه
                </Nav.Link>
                <Nav.Item
                  eventKey="1"
                  className=" navbar-nav py-3"
                  onClick={() => this.setState({ openAds: !openAds })}
                >
                  <i className="fab fa-adn px-2 navIcon"></i> تصنيف الاعلانات{' '}
                  {arrowAD}
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
                          eventKey="1.1"
                          as={Link}
                          className=" d-block  py-1 px-4"
                          to="/admin/AddADS/AddVedio"
                        >
                           اضافه فيديو
                        </Nav.Link>
                        <Nav.Link
                          eventKey="1.2"
                          as={Link}
                          className=" d-block  py-1 px-4"
                          to="/admin/AddADS/VedioTable"
                        >
                          عرض فيديوهات
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
                          اضافه استبيان
                        </Nav.Link>
                        <Nav.Link
                          eventKey="2.2"
                          as={Link}
                          className=" d-block  py-1 px-4"
                          to="/admin/AddADS/SurveyTable"
                        >
                          عرض الاستبيانات
                        </Nav.Link>
                        <Nav.Link
                          eventKey="2.3"
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
                          eventKey="3.1"
                          as={Link}
                          className=" d-block  py-1 px-4"
                          to="/admin/AddADS/AddApp"
                        >
                          اضافه تطبيق
                        </Nav.Link>
                        <Nav.Link
                          eventKey="3.2"
                          as={Link}
                          className=" d-block  py-1 px-4"
                          to="/admin/AddADS/ApTable"
                        >
                           عرض التطبيقات
                        </Nav.Link>
                      </div>
                    )}
                  </div>
                )}
                <Nav.Item
                  eventKey="2"
                  className="navbar-nav py-3 "
                  onClick={() => this.setState({ open: !open })}
                  aria-controls="example-fade-text"
                  aria-expanded={open}
                >
                  <i className="fas fa-gifts px-2 navIcon"></i> اضافه هدايا
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
                            eventKey="5.1"
                            as={Link}
                            className=" d-block  py-1 px-4"
                            to="/admin/gift/carts"
                          >
                            اضافه كرت شحن
                          </Nav.Link>
                          <Nav.Link
                            eventKey="5.2"
                            as={Link}
                            className=" d-block  py-1 px-4"
                            to="/admin/gift/AddNetwork"
                          >
                            اضافه شبكه
                          </Nav.Link>
                          <Nav.Link
                            eventKey="5.3"
                            as={Link}
                            className=" d-block  py-1 px-4"
                            to="/admin/AddADS/ChargingTable"
                          >
                     عرض كروت الشحن
                          </Nav.Link>
                        </div>
                      )}

                      <Nav.Item
                        className="d-block  py-1 px-3"
                        onClick={() =>
                          this.setState({ arrowBillOpen: !arrowBillOpen })
                        }
                      >
                        فاتوره خصم {arrowBill}
                      </Nav.Item>

                      {arrowBillOpen && (
                        <div>
                          <Nav.Link
                            eventKey="6.1"
                            as={Link}
                            className=" d-block  py-1 px-4"
                            to="/admin/gift/billCategory"
                          >
                            اضافه نوع الفاتوره
                          </Nav.Link>
                          <Nav.Link
                            eventKey="6.2"
                            as={Link}
                            className=" d-block  py-1 px-4"
                            to="/admin/gift/bill"
                          >
                            اضافه الفاتوره
                          </Nav.Link>

                          <Nav.Link
                            eventKey="6.3"
                            as={Link}
                            className=" d-block  py-1 px-4"
                            to="/admin/gift/billTables"
                          >
                            عرض الفواتير
                          </Nav.Link>
                        </div>
                      )}
                      <Nav.Item
                        className="d-block  py-1 px-3"
                        onClick={() =>
                          this.setState({ arrowCoboneOpen: !arrowCoboneOpen })
                        }
                      >
                        كوبون خصم{arrowCobone}
                      </Nav.Item>
                      {arrowCoboneOpen && (
                        <div>
                          <Nav.Link
                            eventKey="7.1"
                            as={Link}
                            className="d-block  py-1 px-4"
                            to="/admin/gift/cobone"
                          >
                            اضافه كوبون
                          </Nav.Link>
                          <Nav.Link
                            eventKey="7.2"
                            as={Link}
                            className="d-block  py-1 px-4"
                            to="/admin/gift/coubonTable"
                          >
                            عرض كوبونات
                          </Nav.Link>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                <Nav.Item
                  className="navbar-nav py-3 pr-0"
                  onClick={() =>
                    this.setState({ notificationOpen: !notificationOpen })
                  }
                >
                  <i className="fas fa-bell px-2 navIcon"></i> الاشعارات{' '}
                  {arrowNotification}
                </Nav.Item>
                {notificationOpen && (
                  <div>
                    <Nav.Link
                      eventKey="8.1"
                      as={Link}
                      to="/admin/Notification"
                      className="d-block  py-1 px-3"
                    >
                      اضافه
                    </Nav.Link>

                    <Nav.Link
                      eventKey="8.2"
                      as={Link}
                      to="/admin/Notificationtables"
                      className="d-block  py-1 px-3"
                    >
                      عرض
                    </Nav.Link>
                  </div>
                )}

                <Nav.Link
                  eventKey="9"
                  as={Link}
                  className="navbar-nav py-3 pr-0"
                  to="/admin/Users"
                >
                  <i class="fas fa-user-friends px-2 navIcon"></i> المستخدمين
                </Nav.Link>
                <Nav.Link
                  eventKey="10"
                  as={Link}
                  className="navbar-nav py-3 pr-0"
                  to="/admin/Spinner"
                >
                  <i class="fas fa-user-friends px-2 navIcon"></i> spinner
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
          <Route path="/admin/UserInfo:id" render={(props) => <UserInfo {...props} />}
          
          />
           <Route path="/admin/Spinner" component={SpinnerNav} />
        </div>
      </div>
    )
  }
}

export default Sidebar
