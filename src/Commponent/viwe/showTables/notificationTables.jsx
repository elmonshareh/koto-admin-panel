import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import axios from 'axios'
import Delete from './../../variables/delete'
import SpinnerChart from './../../variables/spinnerCharts';
class NotificationTables extends Component {
  state = {
    filter: '',
    allNotification: [],
    filter: '',
    filterData: [],
    key: 1,
    token: localStorage.getItem('token'),
    keypagnation: 10,
    max_id: '',
    min_id: '',
    disablepre: true,
    disablenext: false,
    styleNext: '',
    stylePre: '#6b18ff80',
    show:false,
    status:"",  
      isLoading:false
  }
  gatNotification = async () => {
    this.setState({ isLoading:true})
    try {
      const { token, key } = this.state
      const resp = await axios({
        method: 'get',
        url: `https://koto2020.herokuapp.com/api/Notifications`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
     
      await this.setState({
        allNotification: resp.data.notifications.data,
        max_id: resp.data.notifications.paging.cursors.max_id,
        min_id: resp.data.notifications.paging.cursors.min_id,
        isLoading:false
      })
      if (!resp.data.notifications.paging.hasNext) {
        this.setState({
          disablenext: true,
          styleNext: '#6b18ff80',
        })}
  
    } catch (err) {
       this.props.history.push(`/404`)
    }
  }
  next = async () => {
    this.setState({ isLoading:true})
    const { token, max_id, key, keypagnation } = this.state

    try {
      await this.setState({ keypagnation: keypagnation + 10, key: key + 10 })
      const resp = await axios({
        method: 'get',
        url: `https://koto2020.herokuapp.com/api/Notifications?max_id=${max_id}&size=10`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
     
      await this.setState({
        allNotification: resp.data.notifications.data,
        max_id: resp.data.notifications.paging.cursors.max_id,
        min_id: resp.data.notifications.paging.cursors.min_id,
        isLoading:false
      })
      if (!resp.data.notifications.paging.hasNext) {
        this.setState({
          disablenext: true,
          styleNext: '#6b18ff80',
          disablepre: false,
          stylePre: '#6b18ff',
        })
      } else {
        this.setState({
          disablenext: false,
          disablepre: false,
          stylePre: '#6b18ff',
        })
      }
    } catch (err) {
       this.props.history.push(`/404`)
    }
  }
  pre = async () => {
    this.setState({ isLoading:true})
    const { key, keypagnation, token, min_id } = this.state
    try {
      await this.setState({ keypagnation: keypagnation - 10, key: key - 10})
      const resp = await axios({
        method: 'get',
        url: `https://koto2020.herokuapp.com/api/Notifications?min_id=${min_id}&size=10`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    
      await this.setState({
        allNotification: resp.data.notifications.data,
        max_id: resp.data.notifications.paging.cursors.max_id,
        min_id: resp.data.notifications.paging.cursors.min_id,
        isLoading:false

      })
      if (!resp.data.notifications.paging.hasPrevious) {
        this.setState({
          disablepre: true,
          disablenext: false,
          styleNext: '#6b18ff',
          stylePre: '#6b18ff80',
        })
      } else {
        this.setState({
          disablepre: false,
          disablenext: false,
          styleNext: '#6b18ff',
        })
      }
    } catch (err) {
      this.props.history.push(`/404`)
    }
  }
  handleShow = (item) => {
    const { show } = this.state
    this.setState({ show: !show, status: item.title })
  }
  
  componentDidMount() {
    this.gatNotification()
  }
  delete = async (status) => {
    try {
      const { token,show } = this.state
      const resp = await axios({
        method: 'delete',
        url: `https://koto2020.herokuapp.com/api/Notification/${status}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
 
      this.setState(prevState => ({
        allNotification: prevState.allNotification.filter(row => (
          row._id !== status
        ))
      }))
      this.setState({show:!show})
    } catch (err) {
      this.props.history.push(`/404`)
    }
  }
  render() {
    const {
      filter,
      keypagnation,
      disablepre,
      allNotification,
      styleNext,
      disablenext,
      stylePre,
      show,
      status,isLoading,key
    } = this.state
    return (
      <div className="px-4 py-5">
        <Delete
          show={show}
          handleShow={this.handleShow}
          status={status}
          delete={() => this.delete(status)}
        />
        <div className="col-12 py-5  mb-3 border rounded bg-light  ">
          {/* <div className="d-flex mb-2">
            <label>البحث :</label>{' '}
            <input
              type="text"
              className="filter mr-2 p-1"
              vaule={filter}
              onChange={this.handleChange}
            />
          </div> */}
            <h3 className="d-flex mb-4"> عرض  الاشعارات</h3>
          <Table
            striped
            hover
            bordered
            className="table text-nowrap table-light"
            responsive
          >
            <thead className="tdCatergory">
              <tr className="text-center">
                <th> كود </th>
                <th> العنوان</th>
                <th> نص الرساله</th>
                <th> مسح </th>
              </tr>
            </thead>
            <tbody className="trCatergory ">
            {isLoading ? 
              <tr>
            
              <td colspan="5" > <div className="d-flex justify-content-center uerSpiner ">
            <SpinnerChart />
          </div></td>
             
                </tr>
             : 
              allNotification.map((item) => {
            
                return (
                  <tr key={item._id} className="text-center">
                    <td> {item._id}</td>
                    <td> {item.title}</td>
                    <td> {item.body}</td>

                    <td
                      onClick={() => {
                        this.handleShow(item)
                      }}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
          <div className="d-flex justify-content-between px-5  mt-3">
            <button
              onClick={this.next}
              className="pgnationbtn"
              disabled={disablenext}
              style={{ background: styleNext }}
            >
              التالي{' '}
            </button>

            <p className="text-nowrap px-2">
            من{key} الي {keypagnation}{' '}
            </p>
            <button
              className="pgnationbtn "
              onClick={this.pre}
              disabled={disablepre}
              style={{ background: stylePre }}
            >
              السابق
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default NotificationTables
