import React, { Component } from 'react';
import { Card } from './../../login/Card';
import Dropdown from 'react-bootstrap/Dropdown'
import food  from "../../../Img/Icon/fast-food.svg"
import  game from "../../../Img/Icon/games.svg"
import shopping  from "../../../Img/Icon/shopping-cart.svg"
class Bill extends Component {
    state = {type: "kkk", date: new Date().toISOString().split('T')[0], type:"اختر النوع"}
    render() { 
        const{type,date,name}=this.state
        return (<div> <Card
            content={ <div className="container ">
             <div className="row mt-3">
             <div className="col-md-6 col-sm-12">
             <div className="d-flex my-3">
             <Dropdown>
                      <label className="ml-2"> نوع الكبون:</label>
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
                                  {' '}
                                  <i class="fas fa-gamepad"></i> العاب
                                </span>
                              ),
                              
                              
                            })
                          }}
                        >
                       <img src={game} width="20px" />  العاب
                        </Dropdown.Item>
                        <Dropdown.Item
                          eventKey=" Orange"
                          
                        >
                          <img src={shopping} width="20px" />  سوبر مركت
                        </Dropdown.Item>
                        <Dropdown.Item
                          eventKey=" We"
                         
                        >
      <img src={food} width="20px" /> مطاعم  
                </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
             </div>
             <div className="d-flex my-3">
                    <label htmlFor="valueCart" className="ml-1">
                      {' '}
                      قيمه الخصم :
                    </label>
                    <input
                      className="p-1 inputCrat "
                      type="number"
                      id="valueCart"
                      name="valueCart"
                     
                     
                    />
                  </div>
                  <div className="d-flex my-3">
                    <label htmlFor="point" className="ml-1">
                      قيمه النقاط :
                    </label>
                    <input
                      className="p-1 inputCrat "
                      type="number"
                      id="point"
                      name="point"
                      
                    />
                  </div>
                  <div className="d-flex my-3">
                  <label  className="ml-1">
                      تاريخ الانتهاء  :
                    </label>
                    <input
                      type="date"
                      id="start"
                      name="date"
                      className="imputservary px-2 p-1"
                      value={date}
                      min={new Date().toISOString().split('T')[0]}
                      max="2022-12-31"
                      onChange={(event) =>
                        this.setState({ date: event.target.value })
                      }
                    />
                  
                  </div>

             </div>
             </div>
         </div>}/> </div>  );
    }
}
 
export default Bill;