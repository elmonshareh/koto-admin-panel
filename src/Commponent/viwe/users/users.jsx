import axios from 'axios'
import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import SpinnerChart from './../../variables/spinnerCharts';
class Users extends Component {
  state = {
    token: localStorage.getItem('token'),
    allUsers: [],
    key: 1,
    filter: '',
    filterData: [],
    keypagnation: 10,
    max_id: '',
    min_id: '',
    disablepre: true,
    disablenext: false,
    styleNext: '',
    stylePre: '#6b18ff80', isLoading:false

  }
  getUsers= async () => {
    this.setState({ isLoading:true})
    try {
      const { token } = this.state
      const resp = await axios({
        method: 'get',
        url: 'https://koto2020.herokuapp.com/api/users?size=10',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      await this.setState({
        allUsers: resp.data.users.data,
        max_id: resp.data.users.paging.cursors.max_id,
        min_id: resp.data.users.paging.cursors.min_id,
        isLoading:false
      })
    } catch (err) {
      this.props.history.push(`/404`) 
    }
  }
  redirect = (item) => {
    this.props.history.push(`/admin/UserInfo${item._id}`)
  }
  next = async () => {
    const { token, max_id, key, keypagnation } = this.state
    this.setState({ isLoading:true})
    try {
      await this.setState({ keypagnation: keypagnation + 10, key: key + 10 })
      const resp = await axios({
        method: 'get',
        url: `https://koto2020.herokuapp.com/api/users?max_id=${max_id}&size=10`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      await this.setState({
        allUsers: resp.data.users.data,
        max_id: resp.data.users.paging.cursors.max_id,
        min_id: resp.data.users.paging.cursors.min_id,
        isLoading:false
      })
      if (!resp.data.users.paging.hasNext) {
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
    const { key, keypagnation, token, min_id } = this.state
    this.setState({ isLoading:true})
    try {
      await this.setState({ keypagnation: keypagnation - 10, key: key - 10 })
      const resp = await axios({
        method: 'get',
        url: `https://koto2020.herokuapp.com/api/users?min_id=${min_id}&size=10`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
   
      await this.setState({
        allUsers: resp.data.users.data,
        max_id: resp.data.users.paging.cursors.max_id,
        min_id: resp.data.users.paging.cursors.min_id,
        isLoading:false
      })
      if (!resp.data.users.paging.hasPrevious) {
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
  componentDidMount(){ this.getUsers()}
  render() {
    const {  allUsers, keypagnation,isLoading, styleNext,key,
      disablenext,
      disablepre,
      stylePre, } = this.state
    return (
      <div className="container p-5">
        <div className="row">
          <div className="col-12 py-5 px-3 my-1 border rounded bg-light">
            {/* <div className="d-flex ">
              <label>البحث :</label>
              <input
                type="text"
                className="filter  mr-2 p-1"
                vaule={filter}
                onChange={this.handleChange}
              />
            </div> */}
<h3 className="d-flex mb-4"> عرض المستخدمين  </h3>
            <Table
              striped
              hover
              bordered
              className="table text-nowrap mt-3"
              responsive
            >
              <thead className="tdCatergory text-center">
                <tr>
                  <th> كود </th>
                  <th>الاسم</th>
                  <th> النوع </th>
                  <th> عدد النقاط </th>
                  <th>  الحاله </th>
                  <th> رقم المحمول </th>
                  <th> التفاصيل </th>
                 
                </tr>
              </thead>
              <tbody className="trCatergory text-center">
              {isLoading ? 
              <tr>
            
              <td colspan="7" > <div className="d-flex justify-content-center uerSpiner ">
            <SpinnerChart />
          </div></td>
             
                </tr>
             : allUsers.map((item) => {
                  return (
                    <tr key={item._id}>
                      <td>{item._id}</td>
                      <td>{item.firstName+item.lastName}</td>
                      <td>{item.role}</td>
                      <td>{item.points}</td>
                      <td>{item.status}</td>
                      <td>{item.phoneNumber}</td>
                      <td
                        onClick={() => {
                          this.redirect(item)
                        }}
                      >
                        <i className="far fa-eye"></i>
                      </td>
                     
                    </tr>
                  )
                })}
              </tbody>
            </Table>
            <div className="d-flex justify-content-between px-5 pb-4 mt-3">
              {' '}
              <button
            onClick={this.next}
            className="pgnationbtn"
            disabled={disablenext}
            style={{ background: styleNext }}
          >
            التالي{' '}
          </button>

          <p className="text-nowrap px-2">
          من{key} الي {keypagnation}
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
      </div>
    )
  }
}

export default Users
