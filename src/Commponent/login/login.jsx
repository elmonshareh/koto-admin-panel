import React, { Component } from 'react'
import { Card } from './Card'
import img from '../../Img/logo.png'
import { Form, Image } from 'react-bootstrap'
import axios from 'axios'
class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fields: {},
      errors: {},
      massagerror: '',
     
    }
  }

  Login = (e) => {
    e.preventDefault()
    if (this.handleValidation()) {
      this.sendGetRequest()
    }
  }
  sendGetRequest = async () => {

      let fields = this.state.fields;
      let erroors = {}
      try {
          const resp = await axios({
              method: 'post',
              url: 'https://koto2020.herokuapp.com/api/login',
              data: {
              "email":"abdelrahman.omar.hanafy@gmail.com",
             "password":'12345678',
             "language":"AR"
              }
          })
          console.log(resp.data.token);
          localStorage.setItem('token', resp.data.token);
          this.props.history.replace('/admin/Dashboard');
      } catch (err) {
          // Handle Error
          console.log(err);
          if (err.response) {
              console.log(err);
              erroors = err.response.data;
          }

      }

    //   this.setState({ massagerror: erroors })
    //   console.log(this.state.massagerror)
  };

  handleValidation() {
    let fields = this.state.fields
    let errors = {}
    let formIsValid = true
    if (!fields['number']) {
      formIsValid = false
      errors['number'] = 'لايمكن ان يكون فارغا'
    }
    if (typeof fields['number'] !== 'undefined') {
      if (!fields['number'].match(/^(01)[0-9]{9}$/)) {
        formIsValid = false
        errors['number'] = 'الرقم مثل :01011185477'
      }
    }
    if (!fields['password']) {
      formIsValid = false
      errors['password'] = 'لايمكن ان يكون فارغا'
    }

    this.setState({ errors: errors })
    return formIsValid
  }
  handleChange(field, e) {
    let fields = this.state.fields
    fields[field] = e.target.value
    this.setState({ fields })
  }
  render() {
    return (
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-sm-12 col-md-4 pt-5">
            <Card
              content={
                <div className="d-flex justify-content-center ">
                  <div className=" log pt-4  text-center">
                    <div>
                      <Image src={img} width="200" height="150" />
                      <h3 className="py-4">مرحبا بك في كوتو</h3>
                    </div>
                    <div>
                      <Form className="form-example ">
                        <div>
                          
                          <input
                            type="number"
                            name="number"
                            id="number"
                            placeholder="ادخل رقم الهاتف"
                            required
                            className=" inputform  mb-1 mt-3 py-2 px-3"
                            onChange={this.handleChange.bind(this, 'number')}
                            value={this.state.fields['number']}
                            onInput={(e) =>
                              (e.target.value = e.target.value.slice(0, 11))
                            }
                          />
                        <div> <span className="error">
                            {this.state.errors['number']}
                          </span></div>  
                        </div>
                        <div>
                       
                          <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="ادخل الرقم السري "
                            required
                            className="inputform  mb-1 mt-3 py-2 px-3"
                            onChange={this.handleChange.bind(this, 'password')}
                            value={this.state.fields['password']}
                          />
                        <div>  
                             <span className="error">
                            {this.state.errors['password']}
                          </span>
                           </div>
                        </div>

                        <div className="pb-5" >
                          {' '}
                          <input
                            type="submit"
                            value="تسجيل الدخول"
                            className="addQuestion w-100  my-3 py-2 px-3"
                            onClick={this.Login}
                            style={{ color: 'white' }}
                          />
                        </div>
                        <span className="error">{this.state.massagerror}</span>
                      </Form>
                    </div>
                  </div>
                </div>
              }
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Login
