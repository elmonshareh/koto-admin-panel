import React, { Component } from 'react'
import { Card } from './../../login/Card'
import Dropdown from 'react-bootstrap/Dropdown'
import food from '../../../Img/Icon/fast-food.svg'
import game from '../../../Img/Icon/games.svg'
import shopping from '../../../Img/Icon/shopping-cart.svg'

import ModalBill from './modaBill';
class Bill extends Component {
  state = {
    date: new Date().toISOString().split('T')[0],
    type: 'اختر النوع',
    discount:"",
     points:"",
     disCode:"",
name:""
  }
  render() {
    const { type, date, name,discount , points,disCode} = this.state
    return (
      <div>
        {' '}
        <Card
          content={
            <div className="container ">
              <div className="row mt-3">

                <div className="col-md-6 col-sm-12">
                  <div className="d-flex my-3">
                    <Dropdown>
                      <label className="ml-3"> نوع الكبون :</label>
                      <Dropdown.Toggle
                        id="dropdown-basic"
                        className="dropCart"
                        name="dropCart"
                      >
                        {type}
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="dropdownCart text-center">
                        <Dropdown.Item
                          eventKey="game"
                          onSelect={(e) => {
                            this.setState({
                              type: (
                                <span>
                              
                                  <i class="fas fa-gamepad"></i> العاب
                                </span>
                              ),
                            })
                          }}
                        >
                          <img src={game} width="20px" /> العاب
                        </Dropdown.Item>
                        <Dropdown.Item eventKey=" shopping"  onSelect={(e) => {
                            this.setState({
                              type: (
                                <span>
                              
                              <i class="fas fa-shopping-cart"></i> سوبر مركت
                                </span>
                              ),
                            })
                          }}>
                          <img src={shopping} width="20px" /> سوبر مركت
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="food" onSelect={(e) => {
                            this.setState({
                              type: (
                                <span>
                              
                              <i class="fas fa-hamburger"></i> مطاعم
                                </span>
                              ),
                            })
                          }}>
                          <img src={food} width="20px" /> مطاعم
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item eventKey="add"
                      
                         >
                      
                        <ModalBill/>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  <div className="d-flex my-3">
                    <label htmlFor="valueCart" className="ml-5">
                    
                      الاسم  :
                    </label>
                    <input
                      className="p-1 inputCrat "
                      type="text"
                      name="name"
                      value={name}
                      onChange={(event)=>this.setState({name:event.target.value})}
                    />
                  </div>
                  <div className="d-flex my-3">
                    <label htmlFor="valueCart" className="ml-1">
                    
                      قيمه الخصم :
                    </label>
                    <input
                      className="p-1 inputCrat "
                      type="number"
                      id="discount"
                      name="discount"
                      value={discount}
                      onChange={(event)=>this.setState({discount:event.target.value})}
                    />
                  </div>
                  {/* <div className="d-flex my-3">
                    <label htmlFor="valueCart" className="ml-2">
                    
                      كود الخصم  :
                    </label>
                    <input
                      className="p-1 mr-1 inputCrat "
                      type="number"
                      id="disCode"
                      name="disCode"
                      value={disCode}
                      onChange={(event)=>this.setState({disCode:event.target.value})}
                    />
                  </div> */}
                  <div className="d-flex my-3">
                    <label htmlFor="point" className="ml-2">
                      قيمه النقاط :
                    </label>
                    <input
                      className="p-1 inputCrat "
                      type="number"
                      id="point"
                      name="point"
                      value={points}
                      onChange={(e)=>this.setState({points:e.target.value})}
                    />
                  </div>
                  <div className="d-flex my-3">
                    <label className="ml-1">تاريخ الانتهاء :</label>
                    <input
                      type="date"
                      id="start"
                      name="date"
                      className="inputCrat px-2 p-1"
                      value={date}
                      min={new Date().toISOString().split('T')[0]}
                      max="2022-12-31"
                      onChange={(event) =>
                        this.setState({ date: event.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="col-md-6 col-sm-12">
              <div className="shape mb-3 p-3"> <div className="d-flex justify-content-between">
              <div> <h5>فاتورة </h5> </div>
                  <h3> {discount}%</h3>
              </div>
              <h5 className="d-flex">خصم {name}</h5> 
            <hr class="new2"/>
            <h5 className="pointPostionCart mb-3">تبديل ب {points} نقطه</h5>
            </div>
           
              </div>
              </div>
              
            </div>
          }
        />
      </div>
    )
  }
}

export default Bill
