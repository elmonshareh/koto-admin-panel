import React, { Component } from 'react'
import { Card } from './../../login/Card'
import axios from 'axios'
import Toast from 'react-bootstrap/Toast'
class AddBillCategory extends Component {
  state = {
    name: '',
    errors: '',
    subTitle: '',
    logo: '',
    token: localStorage.getItem('token'),
    massagerror: '',
    showToast: false,
    apiMsg: '',
    toastColor: '',
  }
  uploadimg = async (e) => {
    await this.setState({
      logo: e.target.files[0],
    })
  }
  handleValidation = () => {
    const { name, logo } = this.state
    let errors = {}
    let formIsValid = true
    if (!name) {
      formIsValid = false
      errors['name'] = <i className=" mr-2 fas fa-exclamation-circle"></i>
    }
    if (!logo) {
      formIsValid = false
      errors['logo'] = <i className=" mr-2 fas fa-exclamation-circle"></i>
    }
    this.setState({ errors: errors })
    return formIsValid
  }
  addApiCategory = async () => {
    const { token, name, logo } = this.state
    let errorAPI = ''
    var bodyFormData = new FormData()
    bodyFormData.append('name', name)
    bodyFormData.append('photo', logo)
    try {
      const resp = await axios({
        method: 'post',
        url: 'https://koto2020.herokuapp.com/api/category/add',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        data: bodyFormData,
      })

      this.setState({
        name: '',
        logo: '',
        img: '',
        showToast: true,
        apiMsg: resp.data.message,
        toastColor: 'success',
      })
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
          toastColor: 'error',
        })
      }
    }

    this.setState({ massagerror: errorAPI })
    console.log(this.state.massagerror)
  }
  render() {
    const { name, errors, subTitle, showToast, apiMsg, toastColor } = this.state
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
          title=" اضافه نوع الفاتوره"
          content={
            <div className="container text-right  mb-3">
              <div className="row mt-3 ">
                <div className="col-sm-12 col-md-6">
                  <div className="d-md-flex my-3 d-block">
                    <span className="addAds  "> الاسم :</span>
                    <input
                      type="text"
                      name="name"
                      className="imputservary  px-2 p-1 "
                      maxLength="100"
                      value={name}
                      required
                      onChange={(event) =>
                        this.setState({ name: event.target.value })
                      }
                    />
                    <span className="mt-2 error">{errors['name']}</span>
                  </div>
                  <div className="d-md-flex d-block">
                    <span className="addAds  text-nowrap ">الوصف :</span>
                    <textarea
                      type="textarea"
                      className="imputservary px-2 p-1"
                      maxLength="500"
                      value={subTitle}
                      onChange={(event) =>
                        this.setState({ subTitle: event.target.value })
                      }
                    />
                  </div>
                  <div className="d-md-flex my-3 d-block">
                    <span className="addAds  "> اخر الصوره :</span>
                    <input
                      className="p-1 inputCrat border-0"
                      type="file"
                      id="logo"
                      accept="image/*"
                      name="logo"
                      onChange={this.uploadimg}
                      required
                    />
                    <span className="mt-2 error">{errors['logo']}</span>
                  </div>
                  <div className="d-flex justify-content-center p-3">
                    <button
                      className="addQuestion"
                      onClick={this.addApiCategory}
                    >
                      اضافه النوع
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

export default AddBillCategory
