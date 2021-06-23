import React, { Component } from 'react'
import Cart from './../variables/cart'
import { Card } from './../login/Card'
import Chartfff from './../Charts/charts';
import VedioChart from './../Charts/vesioChat';
import ChargingChart from './../Charts/chargingChart';
import BillChats from './../Charts/bailChart';
import AppChart from './../Charts/appChart';

class Main extends Component {
  constructor(props) {
    super(props)
 

  }
 
  render() {
   
    return (
      <div className="container pt-3">
        <div className="row">
          
          <div className="col-12  d-md-flex d-sm-block">
            <div className="col-sm-12 col-md-6 col-lg-3">
              <Cart
              cart="pink cart"
                cartIcon={<i class="fas fa-users"></i>}
                cartIconStyle=" cartIcon"
                title="عدد المستخدمين"
           
                SubTitle="150"
              />
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3  ">
              <Cart
              cart=" babybule  cart"
                cartIcon={<i class="fas fa-poll-h"></i>}
                title=" عدد الاستبيانات"
                SubTitle="8885"
              />
            </div>
           
            <div className="col-sm-12 col-md-6 col-lg-3 ">
              <Cart
                cart="lightgreen cart"
                cartIcon={<i class="far fa-credit-card"></i>}
                cartIconStyle=" cartIcon bg-success bg-gradient"
                title="عددالكروت "
                SubTitle="9645"
              />
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3">
              <Cart
                cart=" lightred cart"
                cartIcon={<i class="fas fa-money-check-alt"></i>}
          
                title="عدد الكوبونات"
                SubTitle="450"
              />
            </div>
          
          </div>
          <div className="col-12  d-md-flex d-sm-block">
          <div className="col-sm-12 col-md-6 col-lg-3 ">
              <Cart
                cart=" lightblue cart"
                cartIcon={<i class="fas fa-receipt"></i>}
               
                title="عدد الفواتير"
                SubTitle="189"
              />
            </div>
          <div className="col-sm-12 col-md-6 col-lg-3">
              <Cart
                cart="lightorang cart"
                cartIcon={<i class="fas fa-audio-description"></i>}
                cartIconStyle=" cartIcon bg-success bg-gradient"
                title=" فديوهات
                 Admob"
                SubTitle="150"
              />
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3">
              <Cart
              cart="lightpurple  cart"
                cartIcon={<i class="fas fa-photo-video"></i>}
                title="   الفيديوهات koto"
                SubTitle="2536"
              />
            </div>
            
            <div className="col-sm-12 col-md-6 col-lg-3">
              <Cart
              cart="lightblue cart"
                cartIcon={<i class="fas fa-film"></i>}
                title="   الفيديوهات utility"
                SubTitle="2536"
              />
            </div>
            
           
          
          </div>
          <div className=" col-12 d-md-flex d-sm-block justify-content-between mt-5">
           
            <div className="col-sm-12 col-md-12">
              <Card
               title="عدد المستخدمين"
                content={
                  <div className="px-3 py-3 ">
                    <div className="col-12 hader-chart bg-white">
                    <Chartfff />
                     
                    </div>
                    
                  </div>
                }
              />
            </div>
          </div>
          <div className=" col-12 d-md-flex d-sm-block justify-content-between mt-3">
            <div className="col-sm-12 col-md-6  " >
              <Card
              
              title="فيديوهات"
                content={
                
                  <div className="px-3 py-3">
                    <div className="col-12 hader-chart bg-white cardHeight">
                      <VedioChart/>
                    </div>
                  
                  </div>
                }
              />
            </div>
            <div className="col-sm-12 col-md-6">
              <Card
              title=" كروت الشحن"
                content={
                
                  <div className="p-3" >
                    <div className="col-12 hader-chart bg-white cardHeight">
                    <ChargingChart/>
                    </div>
                   
                  </div>
                }
              />
            </div> 
        
          </div>
          <div className=" col-12 d-md-flex d-sm-block justify-content-between mt-3">
            <div className="col-sm-12 col-md-5" >
              <Card
              title="الكوبونات"
                content={
                
                  <div className="p-3">
                    <div className="col-12 hader-chart bg-white cardHeight"> 
                    <BillChats/>
                    </div>
                 
                  </div>
                }
              />
            </div>
            <div className="col-sm-12 col-md-7">
              <Card
              title="التطبيقات"
                content={
                
                  <div className="p-3">
                    <div className="col-12 hader-chart bg-white cardHeight">
                      <AppChart/>
                    </div>
                  
                  </div>
                }
              />
            </div> 
        
          </div>
        </div>
      </div>
    )
  }
}

export default Main
