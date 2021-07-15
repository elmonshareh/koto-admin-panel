import React, { Component } from 'react'
import { Card } from './../../login/Card'
import Dropdown from 'react-bootstrap/Dropdown'
import food from '../../../Img/Icon/fast-food.svg'
import game from '../../../Img/Icon/games.svg'
import shopping from '../../../Img/Icon/shopping-cart.svg'
import { SketchPicker } from 'react-color'
import axios from 'axios'
import Toast from 'react-bootstrap/Toast'
import Delete from './../../variables/delete';
import Loader from './../../variables/loaderModal';
class Bill extends Component {
  state = {
    date: new Date().toISOString().split('T')[0],
    type: 'اختر النوع',
    discount: '',
    points: '',
    name: '',
    backgroundHex: '#8080808a',
    showHide: false,
    showHideBtn: true,
    colorarry: [],
    colorarryHex: ['#8080808a'],
    token: localStorage.getItem('token'),
    showToast: false,
    apiMsg: '',
    isLoading: false,
    toastColor: '',
    allBill: [],
    id: '',
    title: '',
    allgift: [],
    disCode: '',
    errors: '',
    showToast: false,
    apiMsg: '',
    toastColor: '',
    show: false,
    status:"",isLoading:false
  }
  handleChangeComplete = async (color) => {
    const { colorarry,  backgroundHex, colorarryHex } = this.state

    if (colorarryHex.length === 2) {
    } else {
      colorarryHex.push(color.hex)
    }
    this.setState({
      background: color.rgb,
      backgroundHex: colorarryHex[0],
      colorarryHex,
      showHide: !this.state.showHide,
      showHideBtn: !this.state.showHideBtn,
    })
    if (backgroundHex === '') {
      console.log('emty')
    } else {
      if (colorarry.length === 2) {
      } else {
        colorarry.push(backgroundHex)
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
    colorarryHex.length === 1 &&
      this.setState({ backgroundHex: colorarryHex[0] })

    if (colorarryHex.length === 0) {
      this.setState({
        backgroundHex: 'gray',
      })
      colorarryHex.push('gray')
    }

    this.setState({
      colorarryHex: colorarryHex,
      showHide: !this.state.showHide,
      showHideBtn: !this.state.showHideBtn,
    })
  }
  getAllBill = async () => {
    try {
      const { token } = this.state
      const resp = await axios({
        method: 'get',
        url: 'https://koto2020.herokuapp.com/api/Category/all',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      await this.setState({ allBill: resp.data.categories.data })
    } catch (err) {
      console.log(err)
    }
  }
   delete = async (status) => {
    try {
      const { token,show} = this.state
      const resp = await axios({
        method: 'delete',
        url: `https://koto2020.herokuapp.com/api/category/${status}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(resp)
      this.setState(prevState => ({
        allBill: prevState. allBill.filter(row => (
          row._id !== status
        ))
      }))
      this.setState({show:!show, type: 'اختر النوع',
      })
    } catch (err) {
      console.log(err)
    }
  }

  addBillApi = async () => {
    const { date, discount, points, id, name, token, colorarryHex,disCode } = this.state
    this.setState({ isLoading: true })
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
          title: name,
          expireDate: date,
          value: discount,
          points: points,
          color: colorarryHex,
          type: 'BILL',
          code:  disCode,
        
        },
      })
      console.log(resp.data.message)
      this.setState({
        date: new Date().toISOString().split('T')[0],
        name: '',
        id: '',
        discount: '',
        disCode: '',
        showToast: true,
        points: '',
        apiMsg: resp.data.message,
        toastColor: 'success',
        type: 'اختر النوع',isLoading:false
      })
    } catch (err) {
      // Handle Error
      console.log(err.response)
      if (err.response) {
        console.log(err.response.data.error)
        errorAPI = err.response.data.error
        this.setState({
          showToast: true,
          apiMsg: err.response.data.error,
          toastColor: 'error',
          isLoading:false
        
        })
      }
    }
  }

  handleValidation = () => {
    const { type, discount, name, disCode, points, date } = this.state
    let errors = {}
    let formIsValid = true
    if (type === 'اختر النوع') {
      formIsValid = false
      errors['type'] = <i className=" mr-2 fas fa-exclamation-circle"></i>
    }

    if (!name) {
      formIsValid = false
      errors['name'] = <i className=" mr-2 fas fa-exclamation-circle"></i>
    }
    if (!discount) {
      formIsValid = false
      errors['discount'] = <i className=" mr-2 fas fa-exclamation-circle"></i>
    }
    if (!disCode) {
      formIsValid = false
      errors['disCode'] = <i className=" mr-2 fas fa-exclamation-circle"></i>
    }
    if (!points) {
      formIsValid = false
      errors['point'] = <i className=" mr-2 fas fa-exclamation-circle"></i>
    }
    if (date === new Date().toISOString().split('T')[0]) {
      formIsValid = false
      errors['date'] = <i className=" mr-2 fas fa-exclamation-circle"></i>
    }

    this.setState({ errors: errors })
    return formIsValid
  }
  addBill = () => {
    if (this.handleValidation()) {
      this.addBillApi()
    }
  }

  componentDidMount() {
    this.getAllBill()
    
   
  }
  handleShow = (item) => {
    const { show } = this.state
    this.setState({ show: !show ,status:item._id})
  }
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
      allBill,
      disCode,
      errors,
      showToast,
      apiMsg,
      toastColor,
      show,
      status,isLoading
    } = this.state

    const mycolor = {
      background:
        colorarryHex.length === 1 || colorarryHex.length === 0
          ? `${backgroundHex}`
          : `linear-gradient(40deg, ${colorarryHex[0]},${colorarryHex[1]})`,
      color: 'white',
    }
    return (
      <div>
          <Loader show={isLoading} />
         <Delete show={show} handleShow={this.handleShow} status={type} delete={()=>this.delete(status)}  />
        <Toast
          onClose={() => {
            this.setState({ showToast: false })
          }}
          show={showToast}
          delay={3000}
          autohide
        >
          <Toast.Body className={toastColor}>{apiMsg}</Toast.Body>
        </Toast>
        <Card
          title=" كوبون مطعم او لعبه"
          content={
            <div className="container text-right mb-3">
              <div className="row mt-3">
                <div className="col-md-6 col-sm-12">
                  <div className="d-md-flex my-3  d-block">
                    <span className="addAds text-nowrap"> نوع الكوبون :</span>
                    <div>
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
                              this.setState({ id: x._id, type: ( <span >  <img src={x.icon} alt="" width="20" /> {x.name} </span>) })
                            }}
                          >
                            <img src={x.icon} alt="" width="20" /> {x.name}
                            <button
                              className="addBtn"
                              onClick={() =>this.handleShow(x)}
                            >
                              <i className="fas fa-minus-circle"></i>
                            </button>
                          </Dropdown.Item>
                        ))}
                       
                       
                      </Dropdown.Menu>
                    </Dropdown>
                    </div>
                    <span className="mt-2 error">{errors['type']}</span>
                  </div>
                  <div className="d-md-flex my-3  d-block">
                    <div className="addAds text-nowrap">الاسم :</div>
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
                    <span className="mt-2 error">{errors['name']}</span>
                  </div>
                  <div className="d-md-flex my-3  d-block">
                    <div className="addAds text-nowrap">قيمه الخصم :</div>
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
                    <span className="mt-2 error">{errors['discount']}</span>
                  </div>
                  <div className="d-md-flex my-3  d-block">
                    <div className="addAds text-nowrap">كود الخصم :</div>
                    <input
                      className="p-1  inputCrat "
                      type="number"
                      id="disCode"
                      name="disCode"
                      value={disCode}
                      onChange={(event) =>
                        this.setState({ disCode: event.target.value })
                      }
                    />
                    <span className="mt-2 error">{errors['disCode']}</span>
                  </div>

                  <div className="d-md-flex my-3  d-block">
                    <div className="addAds text-nowrap">قيمه النقاط :</div>
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
                    <span className="mt-2 error">{errors['point']}</span>
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
                    <span className="mt-2 error">{errors['date']}</span>
                  </div>
                  <div className="d-md-flex my-3 d-block">
                    <div className="text-nowrap addAds"> لون الخلفيه:</div>
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
                          )}

                          {colorarryHex[1] && (
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
                          )}
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
                    <button onClick={this.addBill} className="addQuestion w-75">
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
