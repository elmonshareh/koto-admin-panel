import React, { Component } from 'react'
import axios from 'axios'
import Card from '../../login/Card'
import Carousel from 'react-bootstrap/Carousel'
import SpinnerChart from './../../variables/spinnerCharts';
class SurvayDetailes extends Component {
  state = { survay: {}, 
  token: localStorage.getItem('token'), questions: [] ,
  isLoading:false }
  getSurvay = async () => {
    this.setState({isLoading:true })
    try {
      const { token } = this.state
      const resp = await axios({
        method: 'get',
        url: `https://koto2020.herokuapp.com/api/survey/${this.props.match.params.id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
 
      await this.setState({
        survay: resp.data.survey.data[0],
        questions: resp.data.survey.data[0].questions,
        isLoading:false
      })
    } catch (err) {

      this.props.history.push(`/404`)
    }
  }
  componentDidMount() {
    this.getSurvay()
  }
  render() {
    const { survay, questions,isLoading } = this.state

    return ( 
      <div>  { isLoading?<div className="d-flex justify-content-center uerSpiner ">   <SpinnerChart />  </div> :
       
        <Card
          title="تفاصيل الاستبيان"
          content={
            <div className=" row text-right mx-4 my-3 ">
              <div className="col-sm-12 col-md-6">
                <div className="my-3">
                  {' '}
                  <span className="">- اسم الاستبيان: </span> {survay.name}{' '}
                </div>
                <div className="my-3">
                  {' '}
                  <span className="text-nowrap">- كود الاستبيان: </span>{' '}
                  {survay._id}
                </div>
                <div className="my-3 d-flex ">
                
                  <span className="text-nowrap">- تاريخ الانشاء : </span>
                  {survay.createdAt}
                </div>
                <div className="my-3  d-flex ">
               
                  <span className="text-nowrap">- تاريخ الانتهاء : </span>
                  {survay.expireDate}
                </div>
                <div className="my-3 ">
             
                  <span className="text-nowrap">- عدد النقاط : </span>{' '}
                  {survay.points}
                </div>
              </div>
              <div className=" col-md-6 col-sm-12">
                <div className="survey-card p-3 d-flex  ">
                  <Carousel className="col-12">
                    {questions.map((x, index) => {
             
                      return (
                        <Carousel.Item key={index}>
                          <h4 className="text-right mx-3 mt-3 mb-3">
                            {x.name}
                          </h4>
                          {x.answers.length === 0 && (
                            <textarea className="mt-2 mr-3 surTextarea" />
                          )}
                          {x.answers.map((y, index) => {
                        
                            return (
                              <div className="mx-3 mt-4" key={index}>
                                <input type={x.questionType} className="ml-2" />
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
          }
        />}
      </div>
    )
  }
}

export default SurvayDetailes
