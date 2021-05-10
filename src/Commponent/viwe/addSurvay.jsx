import Dropdown from 'react-bootstrap/Dropdown'
import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import { Card } from './../login/Card'
class AddSurvay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      name: '',
      question: '',
      answer: '',
      dropdown: ' اختار النوع',
      answerStyle: 'hidden',
      disabled: true,
    }
  }
 
  render() {
    const { name, answer, question, dropdown } = this.state

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
                      className="w-75"
                      maxLength="50"
                      value={this.state.name}
                      onChange={(e) => {
                        this.setState({ name: e.target.value })
                      }}
                    />
                  </div>
                  <div className="d-flex my-3">
                    <span className="addAds ml-2">نوع السوال :</span>
                    <Dropdown className="">
                      <Dropdown.Toggle id="dropdown-basic">
                        {this.state.dropdown}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item
                          eventKey="textarea"
                          onSelect={(e) => {
                            this.setState({ dropdown: 'Textarea' ,answerStyle: 'hidden',disabled:true,answer:""})
                          }}
                        >
                          textarea
                        </Dropdown.Item>
                        <Dropdown.Item
                          eventKey="Redio"
                          onSelect={(e) => {
                            this.setState({ dropdown: 'Redio Button' ,answerStyle: 'radio' ,disabled:false })
                          }}
                        >
                          Redio Button
                        </Dropdown.Item>
                        <Dropdown.Item
                          eventKey="cheek"
                          onSelect={(e) => {
                            this.setState({ dropdown: 'checkbox',answerStyle: 'checkbox',disabled:false })
                          }}
                        >
                          cheekBox
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  <div className="d-flex my-3">
                    <span className="addAds ml-2">اضافه سوال :</span>
                    <input
                      type="text"
                      name=" question"
                      className="w-75"
                      maxLength="150"
                      value={this.state.question}
                      onChange={(e) => {
                        this.setState({ question: e.target.value })
                      }}
                    />
                    <button className=" addBtn  ">
                      <i className="fas fa-plus-circle danger"></i>
                    </button>
                  </div>
                  <div className="d-flex my-3">
                    <span className="addAds ml-2">اضافه اجابه :</span>
                    <input
                      type="text"
                      name="answer"
                      className="w-75"
                      maxLength="50"
                      value={this.state.answer}
                      disabled={this.state.disabled}
                      onChange={(e) => {
                        this.setState({ answer: e.target.value })
                      }}
                    />
                    <button className="addBtn">
                      <i className="fas fa-plus-circle danger"></i>
                    </button>
                  </div>
                </div>
                <div className=" col-md-6 col-sm-12">
                  <div className="survey-card p-3">
                  
                    <h2>{this.state.name}</h2>
                    <h4>{this.state. question}</h4>
                    <input type={this.state.answerStyle}  />
                    <label for="fname" >{this.state.answer}</label>
                   
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
