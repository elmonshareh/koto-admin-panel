import React, { Component } from 'react'
import Card from '../login/Card'
import { Form } from 'react-bootstrap'
import axios from 'axios'
import Toast from 'react-bootstrap/Toast'
import Loader from './../variables/loaderModal'
class Notification extends Component {
  state = {
    title: '',
    errors: '',
    body: '',
    massagerror: '',
    token: localStorage.getItem('token'),
    showToast: false,
    apiMsg: '',
    toastColor: '',
    isLoading: false,
  }

  handleFormSubmit = (e) => {
    e.preventDefault()
    if (this.handlevalidation()) {
      this.setState({
        // Clear values
        title: '',
        body: '',
      })
    }
  }
  handlevalidation = () => {
    let errors = {}
    let formIsValid = true
    const { title, body } = this.state
    if (!title) {
      formIsValid = false
      errors['title'] = <i className=" mr-2 fas fa-exclamation-circle"></i>
    }
    if (!body) {
      formIsValid = false
      errors['body'] = <i className=" mr-2 fas fa-exclamation-circle"></i>
    }
    this.setState({ errors: errors })
    return formIsValid
  }
  addNotificationAPI = async (e) => {
    const { title, token, body } = this.state
    this.setState({ isLoading: true })
    let errorAPI = ''
    try {
      const resp = await axios({
        method: 'post',
        url: 'https://koto2020.herokuapp.com/api/Notification/Send',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          title: title,
          body: body,
        },
      })

      this.setState({
        body: '',
        title: '',
        showToast: true,
        apiMsg: resp.data.message,
        toastColor: 'success',
        isLoading: false,
      })
    } catch (err) {
      // Handle Error
 
      if (err.response) {

        errorAPI = err.response.data.error
        this.setState({
          showToast: true,
          apiMsg: err.response.data.error,
          toastColor: 'errorToster',
          isLoading: false,
        })
      }
    }

    this.setState({ massagerror: errorAPI })
    
  }
  addNotfitcaion = (e) => {
    e.preventDefault()
    if (this.handlevalidation()) {
      this.addNotificationAPI()
    }
  }
  render() {
    const {
      title,
      errors,
      body,
      massagerror,
      showToast,
      apiMsg,
      toastColor,
      isLoading,
    } = this.state
    return (
      <div className=" mx-4 mt-5">
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
          title="انشاء اشعار"
          content={
            <div className="container text-right">
              <div className=" row mt-3  d-block ">
                <div className="col-sm-12 col-md-6  ">
                  <Form onSubmit>
                    <div>
                      <label className="d-md-flex my-3  d-block">
                        <div className=" addAds text-nowrap  pb-1">
                          {' '}
                          عنوان الرساله:
                        </div>
                        <input
                          className=" w-100  mr-1 p-1"
                          type="text"
                          name=" title"
                          value={title}
                          onChange={(e) =>
                            this.setState({ title: e.target.value })
                          }
                          maxLength="30"
                        />
                        <span className="mt-2 error">{errors['title']}</span>
                      </label>

                      <div className="d-md-flex  my-3 d-block">
                        <span className=" addAds text-nowrap pb-1">
                          {' '}
                          نص الرساله :
                        </span>
                        <textarea
                          className=" w-100  mr-2 p-3"
                          type="textarea"
                          name="body"
                          value={body}
                          onChange={(e) =>
                            this.setState({ body: e.target.value })
                          }
                          maxLength="100"
                        />
                        <span className="mt-4 error">{errors['body']}</span>
                      </div>
                    </div>

                    <br></br>
                    <div className="d-flex justify-content-center ">
                      {' '}
                      <input
                        className="addQuestion mb-3"
                        type="submit"
                        value="ارسال"
                        onClick={this.addNotfitcaion}
                      />
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          }
        />
      </div>
    )
  }
}

export default Notification
