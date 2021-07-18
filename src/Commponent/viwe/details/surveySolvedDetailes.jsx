import React, { Component } from 'react'
import { Card } from './../../login/Card'
import axios from 'axios'
import  Carousel  from 'react-bootstrap/Carousel';
import SpinnerChart from './../../variables/spinnerCharts';

class SolvedServayDetailes extends Component {
  state = {
    answer: {},
    token: localStorage.getItem('token'),
    user: this.props.match.params.iduser,
    survay: this.props.match.params.idsurvay,
    questions:[],
    name:"",isLoading:false
  }
  getAnswer = async () => {
    try {
      const { token } = this.state
      this.setState({ isLoading:true})
      const resp = await axios({
        method: 'post',
        url: `https://koto2020.herokuapp.com/api/survey/answers`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          userID: this.props.match.params.iduser,
          surveyID: this.props.match.params.idsurvay,
          
        },
      })

      await this.setState({
        answer:resp.data.answers[0],
        questions: resp.data.answers[0].questionsWithAnswers,
        name:resp.data.answers[0].survey.name,
        isLoading:false
      })
    } catch (err) {
     
      this.props.history.push(`/404`)
    }
  }
  componentDidMount() {
    this.getAnswer()
  }
  render() {
 
      const{answer,questions,name,isLoading}=this.state
    return (

      <div>
        <Card
          title="اجابه المستخدم "
          content={ <div>
            { isLoading?  <div className="d-flex justify-content-center uerSpiner ">   <SpinnerChart />  </div> :  <div className=" row text-right mx-4 my-3 ">
            <div className="col-sm-12 col-md-6">
            <div className="my-3"> 
             <span className="">- اسم الاستبيان: </span> {name} </div>
             <div className="my-3"> <span  className="text-nowrap">- كود الاستبيان: </span> { answer._id}</div>
             <div className="my-3 d-flex ">
                {' '}
                <span className="text-nowrap">- تاريخ الانشاء : </span>
                {answer.createdAt}
              </div>
            </div>

            <div className=" col-md-6 col-sm-12">
              <div className="survey-card p-3 d-flex  ">
                <Carousel className="col-12">
                  {questions.map((x, index) => {
                   
                    return (
                      <Carousel.Item key={index}>
                        <h4 className=" text-right mx-3 mt-3 mb-3">
                          {x.questionId.name}
                        </h4>
                        { Array.isArray(x.answer)?
                         x.answer.map((y, index) => {
                   
                          return (
                            <div className="mx-3 mt-4" key={index}>
                              {y}
                            </div>
                          )
                        })
                        :x.answer}
                       
                      </Carousel.Item>
                    )
                  })}
                </Carousel>
              </div>
            </div>
          </div>}
          </div>
          }
        />
      </div>
    )
  }
}

export default SolvedServayDetailes
