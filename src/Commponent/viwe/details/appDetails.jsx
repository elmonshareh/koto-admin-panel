import React, { Component } from 'react'
import axios from 'axios'
import Card from '../../login/Card'
class AppDeatiles extends Component {
  state = { app: {}, token: localStorage.getItem('token') }
  getApp = async () => {
    try {
      const { token} = this.state
      const resp = await axios({
        method: 'get',
        url: `https://koto2020.herokuapp.com/api/app/${this.props.match.params.id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(resp)
      await this.setState({ app: resp.data.app.data[0] })
    } catch (err) {
      console.log(err)
    }
  }
  componentDidMount() {
    this.getApp()
  }
  render() {
    const { app } = this.state
    console.log(app)
    return (
      <div>
        <div>
          {' '}
          <Card
            title="تفاصيل التطبيق"
            content={
              <div className="text-right mx-4 my-3 ">
                <div className="my-2">
                  <span className="">- اسم التطبيق: </span> {app.title}
                </div>
                <div className="my-2">
                  <span className="text-nowrap">- كود التطبيق: </span> {app._id}
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
                  <span className="text-nowrap">- ios ربط : </span>
                  <a href={app.iosLink}> {app.iosLink}</a>
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
            }
          />
        </div>
      </div>
    )
  }
}

export default AppDeatiles
