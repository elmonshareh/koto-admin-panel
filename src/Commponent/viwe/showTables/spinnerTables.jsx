import React, { Component } from 'react'
import axios from 'axios'
import { Table } from 'react-bootstrap'
import Delete from './../../variables/delete';
import SpinnerChart from './../../variables/spinnerCharts';
class SpinnerTable extends Component {
  state = {
    allValuse: [],
    filterData: [],
    filter: '',
    token: localStorage.getItem('token'),
    show: false,
    status:"", isLoading:false
  }
  allValues = async () => {
    this.setState({ isLoading:true})
    try {
      const { token, key } = this.state
      const resp = await axios({
        method: 'get',
        url: `https://koto2020.herokuapp.com/api/Spinner/Values/All`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(resp)
      await this.setState({
       allValuse: resp.data.values,
       isLoading:false
       
      })
    } catch (err) {
      console.log(err)
    }
  }
  redirect = (item) => {
    console.log(item._id)
    this.props.history.push(`/admin/AddADS/App${item._id}`)
  }
  delete = async (status) => {
    try {
      const { token,show } = this.state
      const resp = await axios({
        method: 'delete',
        url: `https://koto2020.herokuapp.com/api//Spinner/${status}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(resp)
      this.setState((prevState) => ({
       allValuse: prevState.allValuse.filter((row) => row._id !== status),
      }))
      this.setState({show:!show})
    } catch (err) {
      console.log(err)
    }
  }
  getFiltertion = async () => {
    const { token, filter, key } = this.state
    var filterData = []
    try {
      const resp = await axios({
        method: 'get',
        url: `https://koto2020.herokuapp.com/api/app?date=${filter}&page=${key} `,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(resp)
      filterData = resp.data.apps
      this.setState({ filterData: filterData })
      filterData ? console.log('mmm') : console.log('m')
      this.setState({allValuse: filterData })
    } catch (err) {
      console.log(err.response)
    }
  }
  handleChange = async (e) => {
    const { filter } = this.state
    this.setState({ filter: e.target.value })
    if (filter) {
      this.getFiltertion()
    } else {
      await this.getApp()
      console.log('emtyy')
    }
  }

  componentDidMount() {
    this.allValues()
  }
  handleShow = (item) => {
    const { show } = this.state
    this.setState({ show: !show ,status:item._id})
  }
  render() {
    const {
     allValuse,
      filter,
      show,
      status,isLoading
    } = this.state
    return (
      <div>
        <div className="py-5 px-3  border rounded bg-light ">
        <Delete show={show} handleShow={this.handleShow} status={status} delete={()=>this.delete(status)}  />
          {/* <div className="d-flex mb-3 ">
            <label>البحث :</label>{' '}
            <input
              type="text"
              className="filter mr-2 p-1"
              vaule={filter}
              onChange={this.handleChange}
            />
          </div> */}
          <Table
            striped
            hover
            bordered
            className="table text-nowrap table-light"
            responsive
          >
            <thead className="tdCatergory">
              <tr className="text-center">
                <th> كود</th>
                <th>القيمه</th>
                <th>الوان</th>
             
                <th> مسح </th>
              </tr>
            </thead>
            <tbody className="trCatergory ">
            {isLoading ? 
              <tr>
            
              <td colspan="4" > <div className="d-flex justify-content-center uerSpiner ">
            <SpinnerChart />
          </div></td>
             
                </tr>
             :
              allValuse.map((item) => {
                console.log(item)
                return (
                  <tr key={item._id} className="text-center">
                    <td> {item._id}</td>
                    <td> {item.value}</td>
                    <td> {item.color}</td>
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
         
        </div>
      </div>
    )
  }
}

export default SpinnerTable