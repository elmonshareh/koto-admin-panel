import React, { Component } from 'react'
import { Card } from './../../login/Card'
import Dropdown from 'react-bootstrap/Dropdown'
import { SketchPicker } from 'react-color'
import axios from 'axios'
import  Toast  from 'react-bootstrap/Toast'

class ChargingCart extends Component {
  state = {
    background: '#6b18ff',
    backgroundHex: '#6b18ff',
    showHide: false,
    showHideBtn: true,
    name: 'اختار الشركه',
    icon: '',
    keys: '',
    point: '',
    valueCart: '',
    token: localStorage.getItem('token'),
    massagerror: {},
    showModle: false,
    allNetwork: [],
    id: '',
    code: 'كود الشحن',
    errors: {},
    startcode: '',
    endcode: '',
    showToast: false,
    apiMsg: '',
    toastColor:"",
    descraption:""
  }
  handleChangeComplete = (color, event) => {
    this.setState({
      background: color.rgb,
      backgroundHex: color.hex,
      showHide: !this.state.showHide,
      showHideBtn: !this.state.showHideBtn,
    })
  }
  hideComponent = () => {
    this.setState({
      showHide: !this.state.showHide,
      showHideBtn: !this.state.showHideBtn,
    })
  }

  getAllNetwork = async () => {
    try {
      const { token, allNetwork } = this.state
      const resp = await axios({
        method: 'get',
        url: 'https://koto2020.herokuapp.com/api/Network?page=2',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(resp.data.networks)
      await this.setState({ allNetwork: resp.data.networks })
      console.log(allNetwork)
    } catch (err) {
      console.log(err)
    }
  }
  handleValidation = () => {
  
    const { valueCart, code, id, point } = this.state
    let errors = {}
    let formIsValid = true
    if (!id) {
      formIsValid = false
      errors['dropCart'] = <i className=" mr-2 fas fa-exclamation-circle"></i>
    }
    if (!valueCart) {
      formIsValid = false
      errors['valueCart'] = <i className=" mr-2 fas fa-exclamation-circle"></i>
    }
    if (!point) {
      formIsValid = false
      errors['point'] = <i className=" mr-2 fas fa-exclamation-circle"></i>
    }
    if (!code) {
      formIsValid = false
      errors['code'] = <i className=" mr-2 fas fa-exclamation-circle"></i>
    }

    this.setState({ errors: errors })
    return formIsValid
  }
  addCard = async () => {
    if (this.handleValidation()) {
      const { valueCart, point, code, id, token, backgroundHex,descraption } = this.state
      let errorAPI = ''
      try {
        const resp = await axios({
          method: 'post',
          url: 'https://koto2020.herokuapp.com/api/Card/add',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            network: id,
            chargeCode: code,
            points: point,
            description: descraption,
            value: valueCart,
            color: backgroundHex,
          },
        })
        this.setState({  name: 'اختار الشركه', code:" ", point:'',valueCart:'' ,backgroundHex:"#6b18ff", showToast: true, id:'',
        apiMsg: resp.data.message
        ,toastColor:"success"})

        console.log(resp)
      } catch (err) {
        // Handle Error
        console.log(err)
        if (err.response) {
          console.log(err.response.data.error[0].msg)
          errorAPI = err.response.data.error
          this.setState({
            showToast: true,
            apiMsg: err.response.data.error[0].msg,
          toastColor:"error"
          })
        }
      }

      this.setState({ massagerror: errorAPI })
      console.log(this.state.massagerror)
    }
  }
  componentDidMount() {
    this.getAllNetwork()
  }
  render() {
    const {
      showHide,
      showHideBtn,
      backgroundHex,
      name,
      icon,
      point,
      valueCart,
      allNetwork,
      code,
      errors,
      endcode,
      startcode,
      descraption,
      showToast,
      apiMsg,toastColor
    } = this.state

    const mystyle = {
      color: 'white',
      backgroundColor: backgroundHex,
      padding: '10px',
      height: '230px',
      borderRadius: '17px',
      position: 'relative',
    }
    console.log(startcode)

    return (
      <div>
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
          title="اضافه كرت شحن"
          content={
            <div className="container  text-right">
              <div className="row  mt-3">
                <div className="col-md-6 col-sm-12">
                  <div className="d-md-flex my-3 d-block text-nowrap">
                    <div className="addAds"> اسم الشبكه:</div>
                    <Dropdown>
                      <Dropdown.Toggle
                        id="dropdown-basic"
                        className="dropCart"
                        name="dropCart"
                      >
                        {name}
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="dropdownCart">
                        {allNetwork.map((x) => (
                          <Dropdown.Item
                            key={x._id}
                            onSelect={(e) => {
                              console.log(x._id)
                              this.setState({
                                name: (
                                  <span>
                                    {x.title}{' '}
                                    <img src={x.logo} width="20px" alt="" />
                                  </span>
                                ),
                                startcode: x.startCode,
                                endcode: x.endCode,
                               
                                icon: <img src={x.logo} width="50px" alt="" />,
                                id: x._id,
                              })
                            }}
                          >
                            {' '}
                            {x.title} <img src={x.logo} alt="" width="20" />
                          </Dropdown.Item>
                        ))}
                       
                        
                        
                       
                      </Dropdown.Menu>
                    </Dropdown>
                    <span className="mt-2 error">{errors['dropCart']}</span>
                  </div>

                  <div className="d-md-flex my-3 d-block">
                    <div className="addAds text-nowrap "> قيمه الكارت :</div>
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
                    <span className="mt-2 error">{errors['valueCart']}</span>
                  </div>
                  <div className="d-md-flex my-3 d-block">
                    <div addAds className="addAds text-nowrap ">
                      كود الشحن :
                    </div>
                    <input
                      className="p-1 inputCrat "
                      type="number"
                      id="code"
                      name="code"
                      value={code}
                      onChange={(event) =>
                        this.setState({ code: event.target.value })
                      }
                    />
                    <span className="mt-2 error">{errors['code']}</span>
                  </div>
                  <div className="d-md-flex my-3 d-block">
                    <div className="addAds text-nowrap ">قيمه النقاط :</div>
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
                    <span className="mt-2 error">{errors['point']}</span>
                  </div>

                  <div className="d-md-flex my-3 d-block">
                    <div className="addAds text-nowrap">الوصف :</div>
                    <textarea
                      id="descrption"
                      className="inputCrat p-2"
                      name="descrption" 
                      value={descraption}
                      onChange={(event) =>
                        this.setState({descraption : event.target.value })}

                    />
                  </div>

                  <div className="d-md-flex my-3 d-block">
                    <label className=" addAds text-nowrap ">
                      {' '}
                      لون الخلفيه:
                    </label>
                    {showHide && (
                      <SketchPicker
                        color={this.state.background}
                        onChangeComplete={this.handleChangeComplete}
                        width="70%"
                      />
                    )}
                    {showHideBtn && (
                      <button
                        className="btnColor border border-light rounded-pill p-2"
                        onClick={this.hideComponent}
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
                    <div className="my-4 text-center">
                      {' '}
                      {endcode} {code} {startcode}{' '}
                    </div>
                    <h5 className="pointPostionCart">تبديل ب {point} نقطه</h5>
                  </div>
                  <div className="  d-md-flex my-3 justify-content-between d-sm-block p-3">
                    <div className="d-flex justify-content-center d-md-block">
                      <button className="addQuestion mb-2">
                        اضافه اكسل شيت
                      </button>
                    </div>
                    <div className="d-flex justify-content-center d-md-block">
                      <button
                        className=" addQuestion mb-2"
                        onClick={this.addCard}
                      >
                        اضافه الكارت
                      </button>
                    </div>
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
