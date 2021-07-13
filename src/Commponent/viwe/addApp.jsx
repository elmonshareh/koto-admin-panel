import React, { Component } from 'react'
import { Card } from '../login/Card'
import axios from 'axios'
import Toast from 'react-bootstrap/Toast'
class AddApp extends Component {
  state = {
    items: [],
    IOS: '',
    Android: '',
    number: 0,
    date: new Date().toISOString().split('T')[0],
    name: '',
    errors: {},
    massagerror: '',
    token: localStorage.getItem('token'),
    showToast: false,
    apiMsg: '',
    toastColor: '',
  }
  timestanp = () => {
    var date = this.state.date

    var mint = new Date().getMinutes()
    var hours = new Date().getHours()

    var output =
      date + ':' + ('0' + hours).slice(-2) + ':' + ('0' + mint).slice(-2)
    var datastanp = new Date(output).getTime()
    this.setState({ datastanp: datastanp })

    console.log(datastanp)
    console.log(output)
  }
  handleValidation = () => {
    console.log(',,,')
    const { name, date, number } = this.state
    let errors = {}
    let formIsValid = true
    if (!name) {
      formIsValid = false
      errors['name'] = <i className=" mr-2 fas fa-exclamation-circle"></i>
    }

    if (date === new Date().toISOString().split('T')[0]) {
      errors['date'] = <i className=" mr-2 fas fa-exclamation-circle"></i>
    }
    if (!number) {
      formIsValid = false
      errors['number'] = <i className=" mr-2 fas fa-exclamation-circle"></i>
    }

    this.setState({ errors: errors })
    return formIsValid
  }
  addApp = () => {
    if (this.handleValidation()) {
      this.addAppAPI()
    }
  }
  addAppAPI = async () => {
    const { date, IOS, Android, number, name, token } = this.state
    // let fields = this.state.fields;
    let errorAPI = ''
    try {
      const resp = await axios({
        method: 'post',
        url: 'https://koto2020.herokuapp.com/api/App/add',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          title: name,
          description: 'mm',
          iosLink: IOS,
          androidLink: Android,
          expireDate: date,
          points: number,
        },
      })
      console.log(resp.data.message)
      this.setState({
        IOS: '',
        Android: '',
        number: 0,
        date: new Date().toISOString().split('T')[0],
        name: '',
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
        })
      }
    }

    this.setState({ massagerror: errorAPI })
    console.log(this.state.massagerror)
  }

  render() {
    const {
      IOS,
      Android,
      number,
      name,
      errors,
      showToast,
      apiMsg,
      toastColor,
    } = this.state

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
          title="اضافه تطبيق"
          content={
            <div className="container text-right  mb-3">
              <div className="row mt-3 ">
                <div className="col-sm-12 col-md-8">
                  <div className=" d-md-flex my-3  d-block">
                    <div className=" text-nowrap w-25"> اسم التطبيق :</div>
                    <input
                      type="text"
                      name="name"
                      className="imputservary p-1"
                      maxLength="100"
                      value={name}
                      onChange={(e) => {
                        this.setState({ name: e.target.value })
                      }}
                    />
                    <span className="mt-2 error">{errors['name']}</span>
                  </div>
                  <div className="d-md-flex my-3  d-block">
                    <span className="addAds w-25"> اضافه الرابط Android :</span>

                    <input
                      type="text"
                      name="Android"
                      className="imputservary  px-2 p-1"
                      maxLength="200"
                      value={Android}
                      onChange={(e) => {
                        this.setState({ Android: e.target.value })
                      }}
                    />
                  </div>
                  <div className="d-md-flex my-3  d-block">
                    <span className="addAds w-25">اضافه الرابط Ios :</span>

                    <input
                      type="text"
                      name="IOS"
                      className="imputservary px-2 p-1"
                      maxLength="200"
                      value={IOS}
                      onChange={(e) => {
                        this.setState({ IOS: e.target.value })
                      }}
                    />
                  </div>
                  <div className="d-md-flex my-3  d-block">
                    <span className="addAds  w-25">تاريخ الانتهاء :</span>
                    <input
                      type="date"
                      id="start"
                      name="date"
                      className="imputDateApp p-1"
                      value={this.state.date}
                      min={new Date().toISOString().split('T')[0]}
                      max="2022-12-31"
                      onChange={(event) =>
                        this.setState({ date: event.target.value })
                      }
                    ></input>
                    <span className="mt-2 error">{errors['date']}</span>
                  </div>
                  <div className="d-md-flex my-3   d-block">
                    <span className="addAds w-25"> عدد النقاط المكتسبة :</span>
                    <input
                      type="number"
                      name="number"
                      className=" w-25 px-2 p-1"
                      value={number}
                      onChange={(event) =>
                        this.setState({ number: event.target.value })
                      }
                    ></input>
                    <span className="mt-2 error">{errors['number']}</span>
                  </div>
                  <div className="d-flex justify-content-center p-3">
                    <button className="addQuestion" onClick={this.addApp}>
                      اضافه التطبيق
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

export default AddApp
