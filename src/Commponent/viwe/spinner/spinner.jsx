import React from 'react'
import { Wheel } from 'react-custom-roulette'
import { SketchPicker } from 'react-color'
import axios from 'axios'
import { Card } from './../../login/Card'
import Toast from 'react-bootstrap/Toast'
import Loader from './../../variables/loaderModal';
class Spinner extends React.Component {
  state = {
    list: [],
    number: '',
    backgroundColor: '',
    showHide: false,
    showHideBtn: true,
    errors: '',
    token: localStorage.getItem('token'),
    showToast: false,
    apiMsg: '',
    toastColor: '',
    isLoading: false,
  
  }
  add = () => {
    const { number, backgroundColor } = this.state
  
    this.state.list.push({
      option: number,
      style: { backgroundColor: backgroundColor },
    })
    this.setState({ list: this.state.list })
    console.log(this.state.list)
  }

  handleChangeComplete = (color, event) => {
    this.setState({
      backgroundColor: color.hex,
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
  addAPI = async (e) => {
    
    this.setState({ isLoading: true })
    const { number, token, backgroundColor } = this.state
    let errorAPI = ''
    try {
      const resp = await axios({
        method: 'post',
        url: 'https://koto2020.herokuapp.com/api/Spinner/Values',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          value: number,
          color: backgroundColor,
        },
      })
 
      this.add()
      this.setState({
        isLoading: false,
        number: '',
        backgroundColor: '',
        showToast: true,
        apiMsg: resp.data.message,
        toastColor: 'success',
      })
    } catch (err) {
      // Handle Error
      console.log(err)
      if (err.response) {
        console.log(err.response.data.error)
        errorAPI = err.response.data.error
        this.setState({
          showToast: true,
          apiMsg: err.response.data.error,
          toastColor: 'error',
          isLoading: false,
        })
      }
    }

    this.setState({ massagerror: errorAPI })
    console.log(this.state.massagerror)
  }
  handlevalidation = () => {
    let errors = {}
    let formIsValid = true
    const { number, backgroundColor } = this.state
    if (!number) {
      formIsValid = false
      errors['number'] = <i className=" mr-2 fas fa-exclamation-circle"></i>
    }
    if (!backgroundColor) {
      formIsValid = false
      errors['backgroundColor'] = (
        <i className=" mr-2 fas fa-exclamation-circle"></i>
      )
    }
    this.setState({ errors: errors })
    return formIsValid
  }
  addSpinner = () => {
    if (this.handlevalidation()) {
      this.addAPI()
    }
  }
  render() {
    const {
      number,
      backgroundColor,
      showHide,
      showHideBtn,
      errors,
      showToast,
      apiMsg,
      toastColor,
      isLoading
    } = this.state
    return (
      <div>
         <Loader show={isLoading} />
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
          title="اضافه قيم  العجله"
          content={
            <div className="container text-right ">
              <div className="row  px-3">
                <div className="col-sm-12 col-md-6 pt-3">
                  <div className="d-md-flex my-3  d-block ">
                    <div htmlFor="name" className="addAds text-nowrap">
                      القيمه:
                    </div>
                    <input
                      type="number"
                      name="number"
                      className="inptSpinner px-2 p-1"
                      maxLength="100"
                      value={number}
                      onChange={(e) => {
                        this.setState({ number: e.target.value })
                      }}
                    />
                    <span className="mt-2 error">{errors['number']}</span>
                  </div>

                  <div className="d-md-flex  d-block my-3" >
                    <spin className="text-nowrap addAds"> لون الخلفيه:</spin>
                    {showHide && (
                      <SketchPicker
                        color={backgroundColor}
                        onChangeComplete={this.handleChangeComplete}
                        width="65%"
                      />
                    )}
                    {showHideBtn && (
                      <button
                        className="btnspiner border border-light rounded-pill p-2 "
                        onClick={() => this.hideComponent()}
                      
                      >
                        اضغط لي اختيار اللون
                      </button>
                    )}
                    <span className="mt-2 error">
                      {errors['backgroundColor']}
                    </span>
                  </div>

                  <div className="d-flex justify-content-center mt-5 spinnerAdBtn  mb-5 ">
                    <button onClick={this.addSpinner} className="addQuestion ">kk</button>{' '}
                  </div>
                </div>

                <div className="col-sm-12 col-md-6 p-3 d-flex justify-content-center ">
                  <Wheel
                    prizeNumber={3}
                    data={this.state.list}
                    textColors={['#ffffff']}
                  />
                </div>
              </div>
            </div>
          }
        />
      </div>
    )
  }
}

export default Spinner
