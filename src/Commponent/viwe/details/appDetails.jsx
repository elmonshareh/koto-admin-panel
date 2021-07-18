import React, { Component } from 'react'
import axios from 'axios'
import Card from '../../login/Card'
import SpinnerChart from './../../variables/spinnerCharts'
class AppDeatiles extends Component {
  state = { app: {}, token: localStorage.getItem('token'), isLoading: false }
  getApp = async () => {
    try {
      const { token } = this.state
      this.setState({ isLoading: true })
      const resp = await axios({
        method: 'get',
        url: `https://koto2020.herokuapp.com/api/app/${this.props.match.params.id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      await this.setState({ app: resp.data.app.data[0], isLoading: false })
    } catch (err) {
      this.props.history.push(`/404`)
    }
  }
  componentDidMount() {
    this.getApp()
  }
  render() {
    const { app, isLoading } = this.state

    return (
      <div>
        <div>
   
          <Card
            title="تفاصيل التطبيق"
            content={
              <div>
                {isLoading ? (
                  <div className="d-flex justify-content-center uerSpiner ">

                    <SpinnerChart />
                  </div>
                ) : (
                  <div className="col-12 d-block d-md-flex"> 
                  <div className="text-right  my-3  col-sm-12 col-md-6">
                    <div className="my-2">
                      <span className="">- اسم التطبيق: </span> {app.title}
                    </div>
                    <div className="my-2">
                      <span className="text-nowrap">- كود التطبيق: </span>{' '}
                      {app._id}
                    </div>
                    <div className="my-2 d-flex ">
                      <span className="text-nowrap">- تاريخ الانشاء : </span>
                      {app.createdAt}
                    </div>
                    <div className="my-2 d-flex ">
                      <span className="text-nowrap">- تاريخ الانتهاء : </span>
                      {app.expireDate}
                    </div>
                    <div className="my-2">
                      <span className="text-nowrap">- android ربط : </span>
                      <a href={app.androidLink}> {app.androidLink}</a>
                    </div>

                    <div className="my-2">
                      <span className="text-nowrap">- عدد النقاط : </span>
                      {app.points}
                    </div>
                    <div className="my-2">
                      <span className="text-nowrap">-الوصف : </span>
                      {app.description}
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-6 text-center"> <img src={app.icon} width="250"  height="150"/></div>
                  </div>
                )}
              </div>
            }
          />
        </div>
      </div>
    )
  }
}

export default AppDeatiles
