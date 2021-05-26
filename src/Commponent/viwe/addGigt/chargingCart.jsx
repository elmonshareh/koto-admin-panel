import React, { Component } from 'react'
import { Card } from './../../login/Card'
import Dropdown from 'react-bootstrap/Dropdown'
import { SketchPicker } from 'react-color'
import vodfone from '../../../Img/Icon/vodafone-icon.svg'
import etislate from '../../../Img/Icon/etisalat-1.svg'
import orange from '../../../Img/Icon/orange-3.svg'
import we from '../../../Img/Icon/we.png'
import AddNetwork from './modaleNetWork'
class ChargingCart extends Component {
  state = {
    background: '#6b18ff',
    backgroundHex: '#6b18ff',
    showHide: false,
    showHideBtn: true,
    name: 'اختار الشركه',
    icon: '',
    key: '',
    point: '',
    valueCart: '',
    modelname: '',
    modelkeys: '',
    modleIcon: '',
    date: new Date().toISOString().split('T')[0],
    showModle:false,
  }
  handleChangeComplete = (color, event) => {
    this.setState({ background: color.rgb, backgroundHex: color.hex })
    console.log(this.state.background, this.state.backgroundHex)
  }
  hideComponent = () => {
    this.setState({
      showHide: !this.state.showHideDemo1,
      showHideBtn: !this.state.showHideBtn,
    })
  }
  handleModal=(event)=>{this.setState({ name: (
    <span>
      {this.state.modelname}
      <img src={this.state.modleIcon} width="20px" />
    </span>
  ), 
  icon: (
    <img
      src={this.state.modleIcon}
      width="50px"
    />
  )  ,key: <h5 className="text-center">{this.state.modelkeys}</h5> } ,this.showModleChange())}
  showModleChange=()=>{this.setState({showModle:!this.state.showModle})}
  
  render() {
    const {
      showHide,
      showHideBtn,
      backgroundHex,
      name,
      key,
      icon,
      point,
      valueCart,
      modelname,
      modelkeys,  
      date
    } = this.state
    const mystyle = {
      color: 'white',
      backgroundColor: backgroundHex,
      padding: '10px',
      height: '230px',
      'border-radius': '17px',
      position: 'relative',
    }

    return (
      <div>
        <Card
          content={
            <div className="container ">
              <div className="row  mt-3">
                <div className="col-md-6 col-sm-12">
                  <div className="d-flex my-3">
                    <Dropdown>
                      <label className="ml-2"> اسم الشبكه:</label>
                      <Dropdown.Toggle
                        id="dropdown-basic"
                        className="dropCart"
                        name="dropCart"
                      >
                        {name}
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="dropdownCart">
                        <Dropdown.Item
                          eventKey="Vodafone"
                          onSelect={(e) => {
                            this.setState({
                              name: (
                                <span>
                                  Vodfone <img src={vodfone} width="20px" />
                                </span>
                              ),
                              key: (
                                <h5 className="text-center">
                                  {' '}
                                  "#كود الشحن #858*"
                                </h5>
                              ),
                              icon: <img src={vodfone} width="50px" />,
                            })
                          }}
                        >
                          Vodafone <img src={vodfone} alt="" width="20" />
                        </Dropdown.Item>
                        <Dropdown.Item
                          eventKey="Etislate"
                          onSelect={(e) => {
                            this.setState({
                              name: (
                                <span>
                                  {' '}
                                  Etislate <img src={etislate} width="20px" />
                                </span>
                              ),
                              key: (
                                <h5 className="text-center">
                                  {' '}
                                  #كود الشحن *555*
                                </h5>
                              ),
                              icon: <img src={etislate} width="50px" />,
                            })
                          }}
                        >
                          Etislate <img src={etislate} alt="" width="20" />
                        </Dropdown.Item>
                        <Dropdown.Item
                          eventKey=" Orange"
                          onSelect={(e) => {
                            this.setState({
                              name: (
                                <span>
                                  {' '}
                                  Orange <img src={orange} width="20px" />
                                </span>
                              ),
                              key: (
                                <h5 className="text-center">
                                  {' '}
                                  #كود الشحن *102#{' '}
                                </h5>
                              ),
                              icon: <img src={orange} width="80px" />,
                            })
                          }}
                        >
                          Orange <img src={orange} alt="" width="20" />
                        </Dropdown.Item>
                        <Dropdown.Item
                          eventKey=" We"
                          onSelect={(e) => {
                            this.setState({
                              name: (
                                <span>
                                  We <img src={we} width="20px" />
                                </span>
                              ),
                              key: (
                                <h5 className="text-center">
                                  {' '}
                                  #كود الشحن *555*
                                </h5>
                              ),
                              icon: <img src={we} width="50px" />,
                            })
                          }}
                        >
                          We <img src={we} alt="" width="20" />
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  <div className="d-flex my-3">
                    <label className="ml-1">اضافه شبكه: </label>
                    <AddNetwork
                    showModle={this.state.showModle}
                     showModleChange={this.showModleChange}
                      name={modelname}
                      handleName={(event) =>
                        this.setState({
                          modelname: event.target.value,
                         
                        })
                      }
                      modelkeys={modelkeys}
                      inputModalKeys={(event) => {
                        this.setState({
                          modelkeys: event.target.value,
                         
                        })
                      }}
                      uplodIcon={(event) =>
                        this.setState({
                          modleIcon: URL.createObjectURL(event.target.files[0]),
                        })
                      }
                      handleModal={this.handleModal}
                    />
                  </div>

                  <div className="d-flex my-3">
                    <label htmlFor="valueCart" className="ml-1">
                      {' '}
                      قيمه الكارت :
                    </label>
                    <input
                      className="p-1 inputCrat "
                      type="number"
                      id="valueCart"
                      name="valueCart"
                      value={valueCart}
                      onChange={(event) =>
                        this.setState({ valueCart: event.target.value })
                      }
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
                      value={point}
                      onChange={(event) =>
                        this.setState({ point: event.target.value })
                      }
                    />
                  </div>
                  <div className="d-flex my-3">
                  <label  className="ml-1">
                      تاريخ الانتهاء:
                    </label>
                    <input
                      type="date"
                      id="start"
                      name="date"
                      className=" inputCrat px-2 p-1"
                      value={date}
                      min={new Date().toISOString().split('T')[0]}
                      max="2022-12-31"
                      onChange={(event) =>
                        this.setState({ date: event.target.value })
                      }
                    />
                  
                  </div>
                  <div className="d-flex my-3">
                    <label htmlFor="descrption" className="ml-4 text-nowrap">
                      الوصف :
                    </label>
                    <textarea
                      id="descrption"
                      className="mr-1"
                      name="descrption"
                      rows="3"
                      cols="45"
                    />
                  </div>

                  <div className="d-flex  my-3">
                    <label className="text-nowrap ml-2"> لون الخلفيه:</label>
                    {showHide && (
                      <SketchPicker
                        color={this.state.background}
                        onChangeComplete={this.handleChangeComplete}
                        width="312px"
                      />
                    )}
                    {showHideBtn && (
                      <button
                        className="btnColor border border-light rounded-pill p-2"
                        onClick={() => this.hideComponent()}
                      >
                        اضغط لي اختيار اللون
                      </button>
                    )}
                  </div>
                </div>

                <div className="col-md-6 col-sm-12">
                  <div className="exampleCrat" style={mystyle}>
                    <div className="d-flex justify-content-between">
                      <div className="m-2"> {icon}</div>
                      <h3 className="mt-2">{valueCart} جنيه</h3>
                    </div>
                    <div className="my-4"> {key}</div>
                    <h5 className="pointPostionCart">تبديل ب {point} نقطه</h5>
                  </div>
                  <div className="  d-flex my-3 justify-content-around">
                    <button className=" addcatrbtn   rounded-pill p-2">
                      اضافه اكسل شيت
                    </button>
                    <button className=" addcatrbtn  border-light rounded-pill p-2">
                      اضافه الكارت
                    </button>
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

export default ChargingCart
