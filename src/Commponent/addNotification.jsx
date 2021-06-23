import React, { Component } from 'react'
import Card from './login/Card'
import { Form } from 'react-bootstrap'

class Notification extends Component {
  state = { title: '', errors: '', body: '', massagerror: '' }

  handleFormSubmit = (e) => {
    e.preventDefault()
    if (this.handlevalidation()) {
      this.setState({
        // Clear values
        title: '',
        body: '',
      })
    }

    // let items = [...this.state.items]
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
  render() {
    const { title, errors, body, massagerror} = this.state
    return (
      <div className="mx-4 mt-5">
        <Card
          title="انشاء اشعار"
          content={
            <div className="container text-right">
              <div className=" row mt-3  d-block ">
                <div className="col-sm-12 col-md-6  ">
                  <Form onSubmit={this.handleFormSubmit}>
                    <div >
                      <label className="d-md-flex my-3  d-block">
                        <div className=" addAds text-nowrap  pb-1"> عنوان الرساله:</div>
                        <input
                          className=" w-100  mr-1 p-1"
                          type="text"
                          name=" title"
                          value={title}
                          onChange={(e) =>
                            this.setState({ title: e.target.value })
                          }
                        />
                        <span className="mt-2 error">{errors['title']}</span>
                      </label>
                    
                      <div className="d-md-flex  my-3 d-block">
                        <span className=" addAds text-nowrap pb-1"> نص الرساله :</span>
                        <textarea
                          className=" w-100  mr-2 p-3"
                          type="textarea"
                          name="body"
                          value={body}
                          onChange={(e) =>
                            this.setState({ body: e.target.value })
                          }
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
                      />
                    </div>

                    <span className="error">{massagerror}</span>
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
