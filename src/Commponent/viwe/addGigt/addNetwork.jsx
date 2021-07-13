import React, { Component } from 'react'
import axios from 'axios'
import { SketchPicker } from 'react-color'
import Card from '../../login/Card'
import  Toast  from 'react-bootstrap/Toast';
class AddNetwork1 extends Component {
  state = {
    name: '',
    logo: '',
    icon: '',
    stratCode: '',
    endCode: '',
    showHide: false,
    showHideBtn: true,
    background: '#6b18ff',
    backgroundHex: '#6b18ff',
    errors: {},
    img: ' ',
    token: localStorage.getItem('token'),
    massagerror: '',
    showToast: false,
    apiMsg: '',
    toastColor:"",
  }
  handleChangeComplete = (color, event) => {
    this.setState({ background: color.rgb, backgroundHex: color.hex, showHide: !this.state.showHide,
      showHideBtn: !this.state.showHideBtn, })
    console.log(this.state.background)
  }
  hideComponent = () => {
    this.setState({
      showHide: !this.state.showHide,
      showHideBtn: !this.state.showHideBtn,
    })
  }

  uploadimg = async (e) => {
    await this.setState({
      logo: e.target.files[0],
    })
     this.state.logo&&this.setState({ img: URL.createObjectURL(this.state.logo) })
    
  }
  handleValidation = () => {
    const { stratCode, endCode, name } = this.state
    let errors = {}
    let formIsValid = true
    if (!name) {
      formIsValid = false
      errors['name'] = <i className=" mr-2 fas fa-exclamation-circle"></i>
    }

    if (!stratCode) {
      errors['stratCode'] = <i className=" mr-2 fas fa-exclamation-circle"></i>
    }
    if (!endCode) {
      formIsValid = false
      errors['endCode'] = <i className=" mr-2 fas fa-exclamation-circle"></i>
    }

    this.setState({ errors: errors })
    return formIsValid
  }

  addNetworkAPI = async () => {
    // let fields = this.state.fields;

    const { token, name, stratCode, endCode, logo,background} = this.state

    let errorAPI = ''
    var bodyFormData = new FormData()
    bodyFormData.append('title', name)
    bodyFormData.append('startCode', stratCode)
    bodyFormData.append('endCode', endCode)
    bodyFormData.append('photo', logo)
    bodyFormData.append('networkColor', background)

    try {
      const resp = await axios({
        method: 'post',
        url: 'https://koto2020.herokuapp.com/api/Network/add',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        data: bodyFormData,
      })

      this.setState({ name:"", stratCode:"",endCode:"" ,logo:"", img:'' ,showToast: true,
      apiMsg: resp.data.message
        ,toastColor:"success" })
      console.log(resp)
    } catch (err) {
      // Handle Error
      console.log(err)
      if (err.response) {
        console.log(err)
        errorAPI = err.response.data
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
  addNetwork = () => {
    if (this.handleValidation()) {
      this.addNetworkAPI()
    }
  }
  

  render() {
    const {
      name,
      logo,
      endCode,
      img,
      background,
      stratCode,
      showHide,
      showHideBtn,
      backgroundHex,
      errors, showToast,
      apiMsg,toastColor
    } = this.state
    console.log(logo)
    const mystyle = {
      color: 'white',
      backgroundColor: backgroundHex,
      padding: '10px',
      height: '230px',
      borderRadius: '17px',
      position: 'relative',
    }
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
          title="اضافه  شبكه اخري"
          content={
            <div className="container text-right">
              <div className="row  mt-3">
                <div className="col-md-6 col-sm-12">
                  <div className="d-md-flex my-3  d-block">
                    <div htmlFor="name" className="addAds text-nowrap">
                      اسم الشبكه:
                    </div>
                    <input
                      className="p-1 inputCrat "
                      type="text"
                      id="name"
                      name="name"
                      value={name}
                      maxLength="50" 
                      onChange={(event) =>
                        this.setState({ name: event.target.value })
                        
                      }
                    />
                    <span className="mt-2 error">{errors['name']}</span>
                  </div>

                  <div className="d-md-flex my-3  d-block">
                    <div htmlFor="stratCode" className="addAds text-nowrap">
                      كود البداية :
                    </div>
                    <input
                      className="p-1 inputCrat "
                      type="text"
                      id="stratCode"
                      name="stratCode"
                      value={stratCode}
                      maxLength="10"
                            
                      onChange={(e) =>
                        this.setState({ stratCode: e.target.value })
                      }
                    />
                    <span className="mt-1 error">{errors['stratCode']}</span>
                  </div>
                  <div className="d-md-flex my-3  d-block">
                    <div  className="addAds text-nowrap">
                      كود النهايه :
                    </div>
                    <input
                      className="p-1 inputCrat "
                      type="text"
                      id="endCode"
                      name="endCode"
                      value={endCode}
                      maxLength="100"     
                      onChange={(e) =>
                        this.setState({ endCode: e.target.value })
                      }
                    />
                    <span className="mt-1 error">{errors['endCode']}</span>
                  </div>
                  <div className="d-md-flex my-3  d-block">
                    <div  className="aadAds mt-1 text-nowrap">
                      شعار الشبكه :
                    </div>
                    <input
                      className="p-1 inputCrat border-0"
                      type="file"
                      id="logo"
                      accept="image/*"
                      name="logo"
                      
                      onChange={this.uploadimg}
                    />
                  </div>

                  <div className="d-md-flex my-3  d-block">
                    <label className="text-nowrap addAds"> لون الخلفيه:</label>
                    {showHide && (
                      <SketchPicker
                        color={background}
                        onChangeComplete={this.handleChangeComplete}
                        width="90%"
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
                    <div className="d-flex ">
                      <img src={img} alt="" width="50" height="50" />
                    </div>
                    <h4 className="my-5  d-flex justify-content-center ">
                      {endCode} كود الشحن {stratCode}
                    </h4>
                  </div>
                  <div className="  d-flex my-3 justify-content-around">
                    <button
                      className=" addcatrbtn  border-light rounded-pill p-2"
                      onClick={() => this.addNetwork()}
                    >
                      اضافه الشبكه
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

export default AddNetwork1
