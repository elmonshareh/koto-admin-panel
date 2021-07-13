import React, { Component } from 'react'
import { Route } from 'react-router'
import ChargingCart from './addGigt/chargingCart'
import Bill from './addGigt/bill'
import Cobone from './addGigt/cobone'
import AddNetwork1 from './addGigt/addNetwork'
import AddBillCategory from './addGigt/addBillCategory';
import BillTables from './showTables/billTable';
import BillDetailes from './details/billDetails';
import CoubonTable from './showTables/coubonTable';
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
          <Route path="/admin/gift/billCategory" component={AddBillCategory} />
          <Route path="/admin/gift/billTables" component={BillTables} />
          <Route path="/admin/gift/billDetailes:id" component={BillDetailes} />
          <Route path="/admin/gift/coubonTable" component={CoubonTable} />

        </div>
      </div>
    )
  }
}

export default AddGift
