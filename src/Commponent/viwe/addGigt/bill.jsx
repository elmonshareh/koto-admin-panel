import React, { Component } from 'react'
import { Card } from './../../login/Card'
import Dropdown from 'react-bootstrap/Dropdown'
import food from '../../../Img/Icon/fast-food.svg'
import game from '../../../Img/Icon/games.svg'
import shopping from '../../../Img/Icon/shopping-cart.svg'
import { SketchPicker } from 'react-color'
import axios from 'axios'
class Bill extends Component {
  state = {
    date: new Date().toISOString().split('T')[0],
    type: 'اختر النوع',
    discount: '',
    points: '',
    name: '',
    background: 'rgba(52, 52, 52, 0.8)',
    backgroundHex: 'linear-gradient(40deg,rgb(140 124 247), #86e2de)',
    showHide: false,
    showHideBtn: true,
    colorarry: [],
    colorarryHex: [],
    token: localStorage.getItem('token'),
    allBill:[],
    id:"", title:"",
    allgift:[],
    disCode:""
  }
  handleChangeComplete = async (color, event) => {
    const { colorarry, background, colorarryHex } = this.state

    if (colorarryHex.length === 2) { 
    } else {
      colorarryHex.push(color.hex)
    }
    this.setState({
      background: color.rgb,
      backgroundHex: colorarryHex[0],
      colorarryHex,
      showHide:!this.state.showHide,
      showHideBtn: !this.state.showHideBtn,
    })
    if (background === '') {
      console.log('emty')
    } else {
      if (colorarry.length === 2) {
      } else {
        colorarry.push(background)
      }
    }

    console.log(colorarryHex)
  }
  hideComponent = () => {
    this.setState({
      showHide: !this.state.showHide,
      showHideBtn: !this.state.showHideBtn,
    })
  }
  removecolor = (key) => {
    var { colorarryHex } = this.state

    colorarryHex.splice(key, 1)
    colorarryHex.length === 1
      && this.setState({ backgroundHex: colorarryHex[0] })
      
    colorarryHex.length === 0
      &&this.setState({
          backgroundHex: 'linear-gradient(40deg,rgb(140 124 247), #86e2de)',
        })
      
    this.setState({ colorarryHex: colorarryHex })
  }
  getAllBill = async () => {
    try {
      const { token, allBill } = this.state
      const resp = await axios({
        method: 'get',
        url: 'https://koto2020.herokuapp.com/api/Category/all',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(resp.data.categories )
      await this.setState({ allBill:resp.data.categories })
    } catch (err) {
      console.log(err)
    }
  }
  deleteApp = async (x) => {
    const allBill = [...this.state.allBill]
    try {
      const { token } = this.state
      const resp = await axios({
        method: 'delete',
        url: `https://koto2020.herokuapp.com/api/Category/${x._id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(resp)
      allBill.splice(x._id, 1)
      this.setState({   allBill })
    } catch (err) {
      console.log(err)
    }
  }

addBillApi = async () => {
  const { date,  discount,  points, id, name, token, colorarryHex } = this.state
  // let fields = this.state.fields;
  let errorAPI = ''
  try {
    const resp = await axios({
      method: 'post',
      url: 'https://koto2020.herokuapp.com/api/gift/add',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        category: id,
        description: 'mm',
        title: name,
        expireDate: date,
        value: discount,
        points:  points, 
        color: colorarryHex,
        type:"BILL"

      },
    })
    console.log(resp.data.message)
    this.setState({
     
      date: new Date().toISOString().split('T')[0],
      name: '',
      showToast: true,
      apiMsg: resp.data.message
      ,toastColor:"success"
    })
  } catch (err) {
    // Handle Error
    console.log(err.response)
    if (err.response) {
      console.log(err.response.data.error[0].msg)
      errorAPI = err.response.data.error
      this.setState({
        showToast: true,
        apiMsg: err.response.data.error[0].msg,
      toastColor:"error"
      })
    }
  }}
  getbills= async () => {
    try {
      const { token, allgift } = this.state
      const resp = await axios({
        method: 'get',
        url: 'https://koto2020.herokuapp.com/api/gift/all',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(resp.data )
      // await this.setState({ allgift:resp.data })
    } catch (err) {
      console.log(err)
    }
  }

  componentDidMount(){this.getAllBill() 
    this.getbills()}
  render() {
 
    const {
      type,
      date,
      name,
      discount,
      points,
      background,
      showHide,
      showHideBtn,
      backgroundHex,
      colorarryHex,
      allBill,disCode
    } = this.state
    console.log(allBill)

    const mycolor = {
      background:
      (  colorarryHex.length === 1 || colorarryHex.length === 0)
          ? `${backgroundHex}`
          : `linear-gradient(40deg, ${colorarryHex[0]},${colorarryHex[1]})`,
      color: 'white',
    }
    return (
      <div>
        {' '}
        <Card
          title=" كوبون مطعم او لعبه"
          content={
            <div className="container text-right mb-3">
              <div className="row mt-3">
                <div className="col-md-6 col-sm-12">
                  <div className="d-md-flex my-3  d-block">
                    <span  className="addAds text-nowrap"> نوع الكوبون :</span>
                    <Dropdown>
                      <Dropdown.Toggle
                        id="dropdown-basic"
                        className="dropCart"
                        name="dropCart"
                      >
                        {type}
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="dropdownCartbill text-right">
                      {allBill.map((x) => (
                          <Dropdown.Item
                            key={x._id}
                            onSelect={(e) => {
                              console.log(x._id)
                             this.setState({id:x._id})
                          }}
                          >
                        
                     <img src={x.icon} alt="" width="20" />  {x.name}
                      <button className="addBtn"   onClick ={()=> this.deleteApp(x)}>
                      <i className="fas fa-minus-circle"></i>
                        </button> 
                          </Dropdown.Item>
                        ))}
                        <Dropdown.Item
                          eventKey="game"
                          onSelect={(e) => {
                            this.setState({
                              type: (
                                <span>
                                  <i className="fas fa-gamepad"></i> العاب
                                </span>
                              ),
                            })
                          }}
                        >
                          <img src={game} width="20px"  alt="" /> العاب
                        </Dropdown.Item>
                        <Dropdown.Item
                          eventKey=" shopping"
                          onSelect={(e) => {
                            this.setState({
                              type: (
                                <span>
                                  <i className="fas fa-shopping-cart"></i> سوبر
                                  مركت
                                </span>
                              ),
                            })
                          }}
                        >
                          <img src={shopping} width="20px"  alt=""/> سوبر مركت
                        </Dropdown.Item>
                        <Dropdown.Item
                          eventKey="food"
                          onSelect={(e) => {
                            this.setState({
                              type: (
                                <span>
                                  <i className="fas fa-hamburger"></i> مطاعم
                                </span>
                              ),
                            })
                          }}
                        >
                          <img src={food} width="20px"   alt=""/> مطاعم
                        </Dropdown.Item>
                      
                        
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  <div className="d-md-flex my-3  d-block">
                    <div   className="addAds text-nowrap">
                      الاسم :
                    </div>
                    <input
                      className="p-1 inputCrat "
                      type="text"
                      name="name"
                      value={name}
                      maxlength="100"
                            
                      onChange={(event) =>
                        this.setState({ name: event.target.value })
                      }
                    />
                  </div>
                  <div className="d-md-flex my-3  d-block">
                    <div className="addAds text-nowrap">
                      قيمه الخصم :
                    </div>
                    <input
                      className="p-1 inputCrat "
                      type="number"
                      id="discount"
                      name="discount"
                      value={discount}
                      onChange={(event) =>
                        this.setState({ discount: event.target.value })
                      }
                    />
                  </div>
                  <div className="d-md-flex my-3  d-block">
                        <div className="addAds text-nowrap">
                        
                          كود الخصم  :
                        </div>
                        <input
                          className="p-1  inputCrat "
                          type="number"
                          id="disCode"
                          name="disCode"
                          value={disCode}
                          onChange={(event)=>this.setState({disCode:event.target.value})}
                        />
                      </div>

                  <div className="d-md-flex my-3  d-block">
                    <div  className="addAds text-nowrap">
                      قيمه النقاط :
                    </div>
                    <input
                      className="p-1 inputCrat "
                      type="number"
                      id="point"
                      name="point"
                      value={points}
                      onChange={(e) =>
                        this.setState({ points: e.target.value })
                      }
                    />
                  </div>
                  <div className="d-md-flex my-3  d-block">
                    <div className="addAds text-nowrap">تاريخ الانتهاء :</div>
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
                  <div className="d-md-flex my-3 d-block">
                   <div  className="text-nowrap addAds"> لون الخلفيه:</div>
                    {showHide && (
                      <div className="d-md-flex d-block">
                        <div className="col-sm-12 col-md-8">
                          <SketchPicker
                            color={background}
                            onChangeComplete={this.handleChangeComplete}
                            width="100%"
                            height="100%"
                          />
                        </div>
                        <div className="d-flex d-md-block">
                          {colorarryHex[0] && (
                            <div className="d-flex ">
                              <div
                                className="mr-4 mt-3"
                                style={{
                                  background: `${colorarryHex[0]}`,
                                  height: '46px',
                                  width: '38px',
                                }}
                              ></div>
                              <div
                                className="error"
                                onClick={() =>
                                  this.removecolor(colorarryHex[1])
                                }
                              >
                                
                                <i className="fas fa-minus-circle pt-3 mt-3 mx-2"></i>
                              </div>
                            </div>
                          ) }

                          {colorarryHex[1] &&(
                            <div className="d-flex">
                              <div
                                className="mr-4 mt-3"
                                style={{
                                  background: `${colorarryHex[1]}`,
                                  height: '46px',
                                  width: '38px',
                                }}
                              ></div>
                              <div
                                className="error"
                                onClick={() =>
                                  this.removecolor(colorarryHex[0])
                                }
                              >
                                <i className="fas fa-minus-circle pt-3 mt-3 mx-2"></i>
                              </div>
                            </div>
                          ) }
                        </div>
                      </div>
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
                  <div className="shape mb-3 p-3  mt-3" style={mycolor}>
                    {' '}
                    <div className="d-flex justify-content-between">
                      <div>
                        {' '}
                        <h5>فاتورة </h5>{' '}
                      </div>
                      <h3> {discount}%</h3>
                    </div>
                    <h5 className="d-flex">خصم {name}</h5>
                    <hr className="new2" />
                    <h5 className="pointPostionCart mb-3">
                      تبديل ب {points} نقطه
                    </h5>
                  </div>
                  <div className="d-flex justify-content-center  mb-4 ">
                    <button
                      onClick={this.addBillApi}
                      className="addQuestion w-75"
                    >
                      اضافه الكوبون
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

export default Bill
