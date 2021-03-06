import React, { Component } from 'react'
import axios from 'axios'
import Card from '../../login/Card'
import SpinnerChart from './../../variables/spinnerCharts';
class VideoDetailes extends Component {
  state = { video: {}, token: localStorage.getItem('token') , isLoading:false}
  getVideo = async () => {
    this.setState({ isLoading:true})
    try {
      const { token } = this.state

      const resp = await axios({
        method: 'get',
        url: `https://koto2020.herokuapp.com/api/Video/${this.props.match.params.id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
 
      await this.setState({ video: resp.data.video.data[0],isLoading:false })
    } catch (err) {
      this.props.history.push(`/404`)
    }
  }
  componentDidMount() {
    this.getVideo()
  }
  render() {
    const { video , isLoading} = this.state

    return (
      <div>
        <Card
          title="تفاصيل الفيديو"
          content={ <div>
            { isLoading?  <div className="d-flex justify-content-center uerSpiner ">   <SpinnerChart />  </div> : <div className=" row text-right mx-4 my-3">
              
            <div className="col-sm-12 col-md-6">
              <div className="my-3 d-flex">
                {' '}
                <div className="text-nowrap pl-1">- اسم الفيديو: </div>{' '}
                {video.title}
              </div>
              <div className="my-3 d-md-flex d-sm-block ">
                {' '}
                <div className="text-nowrap pl-1">- كود الفيديو: </div>{' '}
                {video._id}
              </div>
              <div className="my-3 d-md-flex d-sm-block ">
                {' '}
                <p className="text-nowrap">- تاريخ الانشاء : </p>{' '}
                {video.createdAt}
              </div>
              <div className="my-3  d-md-flex d-sm-block  ">
                {' '}
                <div className="text-nowrap">- تاريخ الانتهاء : </div>
                {video.expireDate}
              </div>
              <div className="my-3  ">
                {' '}
                <div className="text-nowrap">- رابط الفيديو : </div>{' '}
                <a href={video.link}> {video.link}</a>
              </div>
              <div className="my-3 d-flex">
                {' '}
                <div className="text-nowrap">- عدد النقاط : </div>{' '}
                {video.points}
              </div>
              <div className="my-3 d-md-flex d-sm-block  ">
                {' '}
                <div className="text-nowrap">-الوصف : </div>{' '}
                {video.description}
              </div>
            </div>
            <div className="col-sm-12 col-md-6 ">
              <video src={video.link} width="90%" controls height="200" />
            </div>
          </div>}  
          </div>
          }
        />
      </div>
    )
  }
}

export default VideoDetailes
