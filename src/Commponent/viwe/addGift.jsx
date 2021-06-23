import React, { Component } from 'react'
import { Route } from 'react-router'
import ChargingCart from './addGigt/chargingCart'
import Bill from './addGigt/bill'
import Cobone from './addGigt/cobone'
import AddNetwork1 from './addGigt/addNetwork'
import AddBillCategory from './addGigt/addBillCategory';
class AddGift extends Component {
  state = {}

  render() {
    return (
      <div className="container py-5">
        <div className="mx-3">
          <Route path="/admin/gift/carts" component={ChargingCart} />
          <Route path="/admin/gift/bill" component={Bill} />
          <Route path="/admin/gift/cobone" component={Cobone} />
          <Route path="/admin/gift/AddNetwork" component={AddNetwork1} />
          <Route path="/admin/gift/bail/Category" component={AddBillCategory} />
        </div>
      </div>
    )
  }
}

export default AddGift
