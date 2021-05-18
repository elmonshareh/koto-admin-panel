import Dropdown from 'react-bootstrap/Dropdown'
import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import { Card } from './../login/Card'
import { useLayoutEffect } from 'react'
class AddSurvay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      name: '',
      question: '',
      answer: '',
      dropdown: 'اختار النوع',
      answerStyle: 'hidden',
      disabled: true,
      // inputValues: {},
      answers: [],
      inputs: [],
      arrayADD: [],
      date: new Date().toISOString().split('T')[0],
      number:0,
    }
  }
  addNewItem = () => {
    let {
      answers,
      question,
      items,
      name,
      answerStyle,
      date,
      arrayADD,
    } = this.state

    var Expidate = new Object()
    Expidate.Expidate = date

    arrayADD = [name, items, Expidate]

    items.push({ questions: question, answers: answers, type: answerStyle })
    this.timestanp()
    this.setState({
      arrayADD,
      inputs: [],
      question: '',
      answer: '',
      answers: [],
      dropdown: 'اختار النوع',
      answerStyle: 'hidden',
      date: new Date().toISOString().split('T')[0],
    })

    console.log(answers)
  }

  removeInputField = (key) => {
    var { inputs, answers } = this.state
    answers.splice(key, 1)
    inputs.splice(key, 1)
    this.setState({ inputs: inputs })
  }

  onHandleSubmit = () => {
    const { inputs, answers, answer, arrayADD } = this.state
    const name = `incrediant+${inputs.length}`
    let inputbox = (
      <div className="d-flex">
        <input
          name={name}
          value={answer}
          key={inputs.length}
          type="text"
          className="addAnwens p-1 mt-1"
          readOnly
        />
        <button onClick={this.removeInputField} className="addBtn">
          <i class="fas fa-minus-circle"></i>
        </button>
      </div>
    )
    answers.push(this.state.answer)

    inputs.push(inputbox)

    this.setState({ inputs, answer: '' })

    console.log(inputbox)
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

  render() {
    const {
      name,
      answer,
      question,
      dropdown,
      inputs,
      answerStyle,
      items,
      arrayADD,
      disabled,
      number,date
    } = this.state
    console.log(arrayADD[1])
    return (
      <div>
        <Card
          content={
            <div className="container text-right">
              <div className="row mt-3">
                <div className="col-md-6 col-sm-12">
                  <div className="d-flex my-3">
                    <span className="addAds ml-2">الاسم :</span>
                    <input
                      type="text"
                      name="name"
                      className="imputservary px-2 mr-5 p-1"
                      maxLength="100"
                      value={name}
                      onChange={(e) => {
                        this.setState({ name: e.target.value })
                      }}
                    />
                  </div>
                  <div className="d-flex my-3">
                    <div className="d-flex ">
                      <span className="addAds ml-3">نوع السوال :</span>
                      <Dropdown>
                        <Dropdown.Toggle
                          id="dropdown-basic"
                          className="dropType"
                        >
                          {dropdown}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item
                            eventKey="textarea"
                            onSelect={(e) => {
                              this.setState({
                                dropdown: 'Textarea',
                                answerStyle: 'textarea',
                                disabled: true,
                                answer: '',
                              })
                            }}
                          >
                            textarea
                          </Dropdown.Item>
                          <Dropdown.Item
                            eventKey="Redio"
                            onSelect={(e) => {
                              this.setState({
                                dropdown: 'Redio Button',
                                answerStyle: 'radio',
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
                                answerStyle: 'checkbox',
                                disabled: false,
                              })
                            }}
                          >
                            cheekBox
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                  <div className="d-flex my-3">
                    <span className="addAds ml-2">اضافه سؤال :</span>
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
                  </div>
                  <div>
                    <div className="d-flex my-3">
                      <span className="addAds ml-2">اضافه إجابة &nbsp;:</span>
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
                      <button className="addBtn" onClick={this.onHandleSubmit}>
                        <i className="fas fa-plus-circle danger"></i>
                      </button>
                    </div>

                    <div> {inputs.map((i) => i)}</div>
                    <div></div>
                  </div>
                  <div className="d-flex my-3">
                    <span className="addAds ml-2">تاريخ الانتهاء :</span>

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
                  </div>
                  <div className="d-flex my-3">
                    <span className="addAds ml-1"> عدد النقاط  :</span>
                    <input
                      type="number"
                      name="number"
                      className=" addPoint px-2 mr-2 p-1"
                      value={number}
                      onChange={(event) =>
                        this.setState({ number: event.target.value })
                      }
                    ></input>
                  </div>
                  <div className="d-flex justify-content-between p-3">
                    <button onClick={this.addNewItem} className="addQuestion">
                      اضافه سؤال اخر
                    </button>
                    <button className="addQuestion">اضافه الاستبيان</button>
                  </div>
                </div>
                <div className=" col-md-6 col-sm-12">
                  <div className="survey-card p-3">
                    <h3 className="text-center">{arrayADD[0]}</h3>

                    {items.map((item) => {
                      return (
                        <div>
                          <h5>{item.questions}</h5>
                          <div>
                            {item.answers.map((object) => {
                              console.log(object)
                              return (
                                <div className="my-3">
                                  <input type={item.type} readOnly />
                                  {object}
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div className="col-12">
                  <Table striped hover className="table">
                    <thead className="tdCatergory">
                      <tr>
                        <th> عنوان الرساله</th>
                        <th> نص الرساله</th>
                      </tr>
                    </thead>
                    <tbody className="trCatergory">
                      {this.state.items.map((item) => {
                        return (
                          <tr key={item.id}>
                            <td>jjjj</td>
                            <td>lll</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </Table>
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
