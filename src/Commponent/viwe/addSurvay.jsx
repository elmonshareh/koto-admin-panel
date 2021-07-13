import Dropdown from 'react-bootstrap/Dropdown'
import React, { Component } from 'react'

import { Card } from './../login/Card'
import axios from 'axios'
import Carousel from 'react-bootstrap/Carousel'
import Toast from 'react-bootstrap/Toast'
class AddSurvay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      name: '',
      question: '',
      answer: '',
      dropdown: 'اختار النوع',
      questionType: '',
      disabled: true,
      answers: [],
      inputs: [],
      arrayADD: [],
      allSurveys: [],
      date: new Date().toISOString().split('T')[0],
      number: '',
      errors: {},
      token: localStorage.getItem('token'),
      filter: '',
      filterData: [],
      key: 0,
      keypagnation: 0,
      disablepre: true,
      isLoading: false,
      apiMsg: '',
      showToast: false,
      toastColor: '',
      disablenext:false
    }
  }
  addNewItem = () => {
    let {
      answers,
      question,
      items,
      name,
      questionType,
      date,
      arrayADD,
      number,
    } = this.state
    var Expidate = new Object()
    Expidate.Expidate = date
    var Points = new Object()
    Points.Points = number
    arrayADD = [name, items, Expidate, Points]
    if (this.handleValidation()) {
      items.push({
        name: question,
        answers: answers,
        questionType: questionType,
      })
      this.setState({
        arrayADD,
        inputs: [],
        question: '',
        answer: '',
        answers: [],
        dropdown: 'اختار النوع',
        questionType: '',
      })
    }
    this.timestanp()
    console.log(arrayADD.items)
  }
  removeInputField = (key) => {
    var { inputs, answers } = this.state
    answers.splice(key, 1)
    inputs.splice(key, 1)
    this.setState({ inputs: inputs })
  }

  onHandleSubmit = () => {
    const { inputs, answers, answer } = this.state
    const name = inputs.length
    let inputbox = (
      <div className="d-flex" key={name}>
        <input
          name={name}
          value={answer}
          key={name}
          type="text"
          className="addAnwens p-1 mt-1"
          readOnly
        />
        <button onClick={this.removeInputField} className="addBtn">
          <i className="fas fa-minus-circle"></i>
        </button>
      </div>
    )
    answers.push(this.state.answer)

    inputs.push(inputbox)

    this.setState({ inputs, answer: '' })
  }
  timestanp = () => {
    var date = this.state.date
    var mint = new Date().getMinutes()
    var hours = new Date().getHours()
    var output =
      date + ':' + ('0' + hours).slice(-2) + ':' + ('0' + mint).slice(-2)
    var datastanp = new Date(output).getTime()
    this.setState({ datastanp: datastanp })
  }
  handleValidation = () => {
    const {
      answers,
      questionType,
      name,
      question,
      date,
      number,
      dropdown,
    } = this.state
    let errors = {}
    let formIsValid = true
    if (!name) {
      formIsValid = false
      errors['name'] = <i className=" mr-2 fas fa-exclamation-circle"></i>
    }
    if (
      dropdown === 'اختار النوع' ||
      dropdown === 'radio' ||
      dropdown === 'checkbox'
    ) {
      if (answers.length === 0) {
        formIsValid = false
        errors['answer'] = <i className=" mr-2 fas fa-exclamation-circle"></i>
      }
    }

    if (!question) {
      formIsValid = false
      errors['question'] = <i className=" mr-2 fas fa-exclamation-circle"></i>
    }
    if (!questionType) {
      formIsValid = false
      errors['dropType'] = <i className=" mr-2 fas fa-exclamation-circle"></i>
    }
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
  handleValidationAPI = () => {
    const { items } = this.state
    let errors = {}
    let formIsValid = true
    if (items.length === 0) {
      formIsValid = false
      errors['add'] = <i className=" mr-2 fas fa-exclamation-circle"></i>
    }
    this.setState({ errors: errors })
    return formIsValid
  }
  addSurvayAPI = async () => {
    // let fields = this.state.fields;
    const { token, date, datastanp, arrayADD } = this.state
    let errorAPI = ''
    this.setState({ isLoading: true })

    try {
      const resp = await axios({
        method: 'post',
        url: 'https://koto2020.herokuapp.com/api/Survey/add',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          name: arrayADD[0],
          questions: arrayADD[1],
          expireDate: datastanp,
          points: '5',
        },
      })

      console.log(resp.data.message)
      this.setState({
        name: '',
        answers: [],
        data: new Date().toISOString().split('T')[0],
        dropdown: 'اختار النوع',
        arrayADD: [],
        items: [],
        isLoading: false,
        showToast: true,
        apiMsg: resp.data.message,
        toastColor: 'success',
      })
    } catch (err) {
      // Handle Error
      console.log(err)
      if (err.response) {
        console.log(err)
        errorAPI = err.response.data
        this.setState({
          showToast: true,
          apiMsg: err.response.data.error,
          isLoading: false,
          toastColor: 'error',
        })
      }
    }

    this.setState({ massagerror: errorAPI })
    console.log(this.state.massagerror)
  }
  addSurvay = () => {
    if (this.handleValidationAPI()) {
      this.addSurvayAPI()
    }
  }
  render() {
    const {
      name,
      answer,
      question,
      disabled,
      dropdown,
      inputs,
      items,
      arrayADD,
      number,
      date,
      errors,
      apiMsg,
      isLoading,
      showToast,
      toastColor,
     
    } = this.state
    return (
      <div className="pb-3">
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
          title="اضافه استيان"
          content={
            <div className="container text-right mb-3">
              <div className="row mt-3 ">
                <div className="col-md-6 col-sm-12">
                  <div className="d-md-flex my-3 d-block">
                    <span className="addAds text-nowrap">الاسم:</span>
                    <input
                      type="text"
                      name="name"
                      className="imputservary px-2 p-1"
                      maxLength="100"
                      value={name}
                      onChange={(e) => {
                        this.setState({ name: e.target.value })
                      }}
                    />
                    <span className="mt-2 error">{errors['name']}</span>
                  </div>

                  <div className="d-md-flex d-block my-3 ">
                    <span className="  ml-3 text-nowrap">نوع السوال :</span>
                    <Dropdown>
                      <Dropdown.Toggle
                        id="dropdown-basic"
                        className="dropType"
                        name="dropType"
                      >
                        {dropdown}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item
                          eventKey="textarea"
                          onSelect={(e) => {
                            this.setState({
                              dropdown: 'textarea',
                              questionType: 'textarea',
                              disabled: true,
                              answers: [],
                            })
                          }}
                        >
                          textarea
                        </Dropdown.Item>
                        <Dropdown.Item
                          eventKey="Redio"
                          onSelect={(e) => {
                            this.setState({
                              dropdown: 'radio',
                              questionType: 'radio',
                              disabled: false,
                            })
                          }}
                        >
                          Redio Button
                        </Dropdown.Item>
                        <Dropdown.Item
                          eventKey="cheek"
                          onSelect={(e) => {
                            this.setState({
                              dropdown: 'checkbox',
                              questionType: 'checkbox',
                              disabled: false,
                            })
                          }}
                        >
                          cheekBox
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    <span className="mt-2 error">{errors['dropType']}</span>
                  </div>

                  <div className="d-md-flex d-block my-3">
                    <span className="addAds text-nowrap ">اضافه سؤال :</span>
                    <input
                      type="text"
                      name=" question"
                      className="imputservary px-2 p-1"
                      maxLength="100"
                      value={question}
                      onChange={(e) => {
                        this.setState({ question: e.target.value })
                      }}
                    />
                    <span className="mt-2 error">{errors['question']}</span>
                  </div>
                  <div>
                    <div className="d-md-flex  d-dlock  my-3">
                      <span className="addAds text-nowrap">
                        اضافه إجابة &nbsp;:
                      </span>
                      <input
                        type="text"
                        name="answer"
                        className=" imputservary px-2 p-1 "
                        maxLength="50"
                        value={answer}
                        disabled={this.state.disabled}
                        onChange={(e) => {
                          this.setState({ answer: e.target.value })
                        }}
                      />

                      <button
                        className="addBtn"
                        disabled={disabled}
                        onClick={this.onHandleSubmit}
                      >
                        <i className="fas fa-plus-circle danger"></i>
                      </button>
                      <span className="mt-2 error">{errors['answer']}</span>
                    </div>

                    <div> {inputs.map((i) => i)}</div>
                    <div></div>
                  </div>
                  <div className="d-md-flex  d-block my-3">
                    <span className="addAds text-nowrap">تاريخ الانتهاء :</span>

                    <input
                      type="date"
                      id="start"
                      name="date"
                      className="imputservary px-2 p-1"
                      value={date}
                      min={new Date().toISOString().split('T')[0]}
                      max="2022-12-31"
                      onChange={(event) =>
                        this.setState({ date: event.target.value })
                      }
                    />
                    <span className="mt-2 error">{errors['date']}</span>
                  </div>
                  <div className="d-flex my-3">
                    <span className="addAds text-nowrap "> عدد النقاط :</span>
                    <input
                      type="number"
                      name="number"
                      className="addPoint px-2 p-1"
                      value={number}
                      onChange={(event) =>
                        this.setState({ number: event.target.value })
                      }
                    />
                    <span className="mt-2 error">{errors['number']}</span>
                  </div>
                  <div className="d-md-flex justify-content-between d-sm-block p-3">
                    <div className="d-flex justify-content-center d-md-block">
                      <button
                        onClick={this.addNewItem}
                        className="addQuestion mb-2 "
                      >
                        اضافه سؤال
                      </button>
                      <span className="d-flex justify-content-center error mt-3">
                        {errors['add']}
                      </span>
                    </div>
                    <div className="d-flex justify-content-center">
                      <button className="addQuestion" onClick={this.addSurvay}>
                        {!isLoading ? (
                          'اضافه الاستبيان'
                        ) : (
                          <div class="lds-ellipsis">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                          </div>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                <div className=" col-md-6 col-sm-12">
                  <div className="survey-card p-3 d-flex  ">
                    <Carousel className="col-12">
                      {items.map((x, index) => {
                        console.log(x)
                        return (
                          <Carousel.Item key={index}>
                            <h2 className="text-center">{arrayADD[0]}</h2>
                            <h4 className="text-right mx-3 mt-3 mb-3">
                              {x.name}
                            </h4>
                            {x.answers.length === 0 && (
                              <textarea className="mt-2 mr-3 surTextarea" />
                            )}
                            {x.answers.map((y, index) => {
                              console.log(y, x.questionType)
                              return (
                                <div className="mx-3 mt-4" key={index}>
                                  <input
                                    type={x.questionType}
                                    className="ml-2"
                                  />
                                  {y}
                                </div>
                              )
                            })}
                          </Carousel.Item>
                        )
                      })}
                    </Carousel>
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

export default AddSurvay
