import React, { Component } from 'react'
import { Nav } from 'react-bootstrap'
import { Link} from 'react-router-dom'
import { Route } from 'react-router'
import imgCobone from '../../Img/Icon/coupon.png'
import imgcredit from "../../Img/Icon/credit-card.png"
import imginvoice from "../../Img/Icon/invoice.png"
import ChargingCart from './addGigt/chargingCart';
import Bill from './addGigt/bill';
import Cobone from './addGigt/cobone';
class AddGift extends Component {
  state = {}
  render() {
    return (
      <div className="container">
        <div className="row mt-5 ">
          <Nav className=" col-12  pl-none " defaultActiveKey="0">
            <Nav.Link
              eventKey="0"
              as={Link}
              className=" navbar-nav col-sm-12 col-md-4 px-2 "
              to="/admin/gift/carts"
            >
              <div className="chargingcart d-flex">
                <div className="py-1 px-4 mx-3 my-2 d-flex align-items-center coboneImg">
                  <img src={ imgcredit} width="30" />
                </div>
                <div className="py-3 px-2">
                  <h4>كروت الشحن</h4>
                  <p>اضافه كروت الشحن</p>
                </div>{' '}
              </div>
            </Nav.Link>

            <Nav.Link
              eventKey="1"
              as={Link}
              className=" navbar-nav col-sm-12 col-md-4 px-2"
              to="/admin/gift/bill"
            >
              <div className="bill d-flex">
                {' '}
                <div className="py-1 px-4 mx-3 my-2 d-flex align-items-center coboneImg">
                  <img src={imginvoice } width="30" />
                </div>
                <div className="py-3 px-2">
                  <h4>فاتوره مطعم أو لعبه</h4>
                  <p>mmmm</p>
                </div>
              </div>
            </Nav.Link>
            <Nav.Link
              eventKey="2"
              as={Link}
              className=" navbar-nav col-sm-12 col-md-4 px-2"
              to="/admin/gift/cobone"
            >
              <div className="cobone d-flex">
            
                <div className="py-1 px-4 mx-3 my-2 d-flex align-items-center coboneImg">
                  <img src={imgCobone} width="30" />
                </div>
                <div className="py-3 px-2">
                  <h4>كود كوبون</h4>
                  <p>mmmm</p>
                </div>
              </div>
            </Nav.Link>
          </Nav>
        </div>
        <div>
        <Route path="/admin/gift/carts" component={ChargingCart} />
          <Route path="/admin/gift/bill" component={Bill} />
          <Route path="/admin/gift/cobone" component={Cobone} /> </div>
      </div>
    )
  }
}

export default AddGift
