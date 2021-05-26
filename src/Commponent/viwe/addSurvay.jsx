import Dropdown from 'react-bootstrap/Dropdown'
import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import { Card } from './../login/Card'
import axios from 'axios'

class AddSurvay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      name:[],
      question:'',
      answer: '',
      dropdown: 'اختار النوع',
      questionType: '',
      disabled: true,
      answers: [],
      inputs: [],
      arrayADD: [],
      allSurveys:[],
      date: new Date().toISOString().split('T')[0],
      number: '',
      errors: {},
      token:localStorage.getItem('token'),
     
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
      items.push({ name:name, answers: answers, questionType: questionType })
      this.setState({
        arrayADD,
        inputs: [],
        question: '',
        answer: '',
        answers: [],
        dropdown: 'اختار النوع',
        questionType: 'hidden',
       
      })
    }

    this.timestanp()

    console.log(items)
    
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
  handleValidation = () => {
    console.log(',,,')
    const { answers, questionType, name, question, date, number } = this.state
    let errors = {}
    let formIsValid = true
    console.log(answers.length)
    if (answers.length === 0) {
      formIsValid = false
      errors['answer'] = <i className=" mr-2 fas fa-exclamation-circle"></i>
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

  addSurvayAPI = async () => {
    // let fields = this.state.fields;
    const{token , inputs,items,date,arrayADD}=this.state
    console.log(arrayADD)
    let errorAPI = ''
    let json=JSON.stringify(arrayADD[1]);
       
   try {
       const resp = await axios({
        method: 'post',
        url: 'https://koto2020.herokuapp.com/api/addSurvey',
        headers: {
          "Authorization":`Bearer ${token}` ,
          
      },
        data: {
          name: arrayADD[0],
           questions:arrayADD[1]
         ,
          expireDate:date
        },
      })
      console.log(resp)
     
    } catch (err) {
      // Handle Error
      console.log(err)
      if (err.response) {
        console.log(err)
        errorAPI = err.response.data
      }
    }

    this.setState({ massagerror: errorAPI })
    console.log(this.state.massagerror)
  }
  addSurvay=()=>{
   this.addSurvayAPI()
  }
  getSurvay=async()=>{ try {
    const{token }=this.state
    const resp = await axios({
        method: 'get',
        url: 'https://koto2020.herokuapp.com/api/Survey',
        headers: {
            
          "Authorization":`Bearer ${token}`
        
        },
    })
    console.log(resp);
    await this.setState({ allSurveys: resp.data })

} catch (err) {
    console.log(err);
}

  }
  componentDidMount=()=>{ this.getSurvay() }

  render() {
    const {
      name,
      answer,
      question,
      dropdown,
      inputs,
      items,
      arrayADD,
      number,
      date,
      errors,
    } = this.state
   
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
                    <span className="mt-2 error">{errors['name']}</span>
                  </div>
                  <div className="d-flex my-3">
                    <div className="d-flex ">
                      <span className="addAds ml-3">نوع السوال :</span>
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
                                dropdown: 'Textarea',
                                questionType:'TEXTAREA',
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
                                dropdown: 'RADIO_BUTTON',
                                questionType: 'RADIO_BUTTON',
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
                                questionType: 'CHECKBOX',
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
                    <span className="mt-2 error">{errors['question']}</span>
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
                      <span className="mt-2 error">{errors['answer']}</span>
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
                    <span className="mt-2 error">{errors['date']}</span>
                  </div>
                  <div className="d-flex my-3">
                    <span className="addAds ml-1"> عدد النقاط :</span>
                    <input
                      type="number"
                      name="number"
                      className=" addPoint px-2 mr-2 p-1"
                      value={number}
                      onChange={(event) =>
                        this.setState({ number: event.target.value })
                      }
                    />
                    <span className="mt-2 error">{errors['number']}</span>
                  </div>
                  <div className="d-flex justify-content-between p-3">
                    <button onClick={this.addNewItem} className="addQuestion">
                      اضافه سؤال اخر
                    </button>
                    <button className="addQuestion" onClick={this.addSurvay}>اضافه الاستبيان</button>
                  </div>
                </div>
                <div className=" col-md-6 col-sm-12">
                  <div className="survey-card p-3">
                    <h3 className="text-center">{arrayADD[0]}</h3>

                    {items.map((item) => {
                      console.log(item)
                      return (
                        <div>
                          <h5 key={item.length}>{item.question}</h5>
                          <div >
                            {item.answers.map((object) => {
                              console.log(object)
                              return (
                                <div  key={ object+item.answers.length} className="my-3" >
                                  <input type={item.questionType} readOnly />
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
