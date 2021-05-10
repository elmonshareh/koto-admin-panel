import React, { Component } from 'react'
import Cart from './../variables/cart'
import { Card } from './../login/Card'

import LineChart from './../Charts/llineChart';
import MultiAxisLine from './../Charts/maxCharts';
import StackedBar from './../Charts/chartsLiner';

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div className="container pt-5">
        <div className="row pr-5">
          <div className="col-sm-12  col-md-6 col-lg-3">
            <Cart
              cartIcon={<i class="far fa-copy"></i>}
              cartState="kkkkkk"
              title="hghvfhp"
              SubTitle="njj"
            />
          </div>
          <div className="col-sm-12 col-md-6 col-lg-3">
            <Cart
              cartIcon={<i class="far fa-copy"></i>}
              cartState="kkkkkk"
              title="manar"
              SubTitle="njj"
            />
          </div>
          <div className="col-sm-12 col-md-6 col-lg-3">
            <Cart
              cartIcon={<i class="far fa-copy"></i>}
              cartState="kkkkkk"
              title="manar"
              SubTitle="njj"
            />
          </div>
          <div className="col-sm-12 col-md-6 col-lg-3">
            <Cart
              cartIcon={<i class="far fa-copy"></i>}
              cartState="kkkkkk"
              title="manar"
              SubTitle="njj"
            />
          </div>
          <div className=" col-12 d-md-flex d-sm-block justify-content-between py-5">
            
            <div className="col-sm-12 col-md-4">
              <Card
                content={
                  <div className="px-3">
 
                    <div className="col-12 hader-chart bg-success"> < MultiAxisLine/></div>
                    <div className="col-12">mmmmmm</div>
                  </div>
                }
              />
            </div>
            <div className="col-sm-12 col-md-4">
              <Card  content={
                  <div className="px-3">
                    <div className="col-12 hader-chart bg-warning"> <LineChart/></div>
                    <div className="col-12">mmmmmm</div>
                  </div>
                }/>
            </div>
            <div className="col-sm-12 col-md-4 ">
              <Card  content={
                  <div className="px-3">
                    <div className="col-12 hader-chart bg-success">  < StackedBar/></div>
                    <div className="col-12">mmmmmm</div>
                  </div>
                } />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Main
