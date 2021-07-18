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
      email: '',
      password: '',
      massagerror: '',
      isLoading: false,
    }
  }

  Login = (e) => {
    e.preventDefault()
    this.setState({ isLoading: true })
    if (this.handleValidation()) {
      this.sendPostRequest()
    }
   
  }
  sendPostRequest = async () => {
    const { email, password, massagerror } = this.state
    let erroors = ''
    try {
      const resp = await axios({
        method: 'post',
        url: 'https://koto2020.herokuapp.com/api/login',
        data: {
          email: email,
          password: password,
          language: 'AR',
        },
      })
      localStorage.setItem('token', resp.data.data.token)
      this.props.history.replace('/admin/Dashboard')
      this.setState({ isLoading: false })
    } catch (err) {
      // Handle Error
    
      this.setState({ isLoading: false })
      if(err.response.data.error){
     
        this.setState({ massagerror: err.response.data.error })
      }else
 {
       this.setState({ massagerror: err.response.data.message })
        }
      
    }
    // this.setState({ massagerror: erroors })
 
  }

  handleValidation() {
    let errors = {}
    let formIsValid = true
    const { email, password } = this.state
    if (!email) {
      formIsValid = false
      errors['email'] = 'لايمكن ان يكون فارغا'
    }

    if (!password) {
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
    const { errors, email, password, massagerror, isLoading } = this.state

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
                      <Form
                        className="form-example  mb-5"
                        onSubmit={this.Login}
                      >
                        <div>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="ادخل رقم البريد الاكتروني"
                            required
                            className=" inputform  mb-1 mt-3 py-2 px-3"
                            onChange={(e) =>
                              this.setState({ email: e.target.value })
                            }
                            value={email}
                            maxLength="50"
                          />
                          <div>
                            {' '}
                            <span className="error">{errors['email']}</span>
                          </div>
                        </div>
                        <div>
                          <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="ادخل الرقم السري "
                            required
                            className="inputform  mb-1 mt-3 py-2 px-3"
                            onChange={(e) =>
                              this.setState({ password: e.target.value })
                            }
                            value={password}
                          />
                          <div>
                            <span className="error">{errors['password']}</span>
                          </div>
                        </div>
                       
                       
                          <div className="pb-2">
                            <button
                              type="submit"
                              className="addQuestion w-100  my-3 py-2 px-3"
                              style={{ color: 'white' }}
                            > {!isLoading ? ( "تسجيل الدخول" ) : (
                              <div class="lds-ellipsis">
                              <div></div>
                              <div></div>
                              <div></div>
                              <div></div>
                            </div>
    
                            )} </button>
                          </div>
                        
                        <span className="error">{massagerror}</span>
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
