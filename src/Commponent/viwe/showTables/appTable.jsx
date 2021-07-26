import React, { Component } from 'react'
import axios from 'axios'
import { Table } from 'react-bootstrap'
import Delete from './../../variables/delete';
import Loader from '../../variables/loaderModal';
import SpinnerChart from './../../variables/spinnerCharts';
class AppTable extends Component {
  state = {
    allApp: [],
    filterData: [],
    filter: '',
    key: 1,
    keypagnation: 10,
    disablepre: true,
    token: localStorage.getItem('token'),
    max_id: '',
    min_id: '',
    disablepre: true,
    disablenext: false,
    styleNext: '',
    stylePre: '#6b18ff80',
    show: false,
    status: "", isLoading: false
  }
  getApp = async () => {
    this.setState({ isLoading: true })
    try {
      const { token, key } = this.state
      const resp = await axios({
        method: 'get',
        url: `https://koto2020.herokuapp.com/api/app?size=10`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      await this.setState({
        allApp: resp.data.apps.data,
        max_id: resp.data.apps.paging.cursors.max_id,
        min_id: resp.data.apps.paging.cursors.min_id,
        isLoading: false
      })
      if (!resp.data.apps.paging.hasNext) {
        this.setState({
          disablenext: true,
          styleNext: '#6b18ff80',
        })
      }
    } catch (err) {
      this.props.history.push(`/404`)
    }
  }
  redirect = (item) => {

    this.props.history.push(`/admin/AddADS/App${item._id}`)
  }
  handleShow = (item) => {

    const { show } = this.state
    this.setState({ show: !show, status: item._id })

  }
  delete = async (status) => {
    try {
      const { token, show } = this.state
      const resp = await axios({
        method: 'delete',
        url: `https://koto2020.herokuapp.com/api/app/${status}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      this.setState((prevState) => ({
        allApp: prevState.allApp.filter((row) => row._id !== status),
      }))
      this.setState({ show: !show })
    } catch (err) {
      this.props.history.push(`/404`)
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

      filterData = resp.data.apps
      this.setState({ filterData: filterData })

      this.setState({ allApp: filterData })
    } catch (err) {

    }
  }
  handleChange = async (e) => {
    const { filter } = this.state
    this.setState({ filter: e.target.value })
    if (filter) {
      this.getFiltertion()
    } else {
      await this.getApp()

    }
  }
  next = async () => {
    const { token, max_id, key, keypagnation } = this.state
    this.setState({ isLoading: true })
    try {
      await this.setState({ keypagnation: keypagnation + 10, key: key + 10 })
      const resp = await axios({
        method: 'get',
        url: `https://koto2020.herokuapp.com/api/app?max_id=${max_id}&size=10`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      await this.setState({
        allApp: resp.data.apps.data,
        max_id: resp.data.apps.paging.cursors.max_id,
        min_id: resp.data.apps.paging.cursors.min_id,
        isLoading: false
      })
      if (!resp.data.apps.paging.hasNext) {
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
    const { key, keypagnation, token, min_id, hasPrevious } = this.state
    this.setState({ isLoading: true })
    try {
      await this.setState({ keypagnation: keypagnation - 10, key: key - 10 })
      const resp = await axios({
        method: 'get',
        url: `https://koto2020.herokuapp.com/api/app?min_id=${min_id}&size=10`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      await this.setState({
        allApp: resp.data.apps.data,
        max_id: resp.data.apps.paging.cursors.max_id,
        min_id: resp.data.apps.paging.cursors.min_id,
        isLoading: false
      })
      if (!resp.data.apps.paging.hasPrevious) {
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
  componentDidMount() {
    this.getApp()
  }
  render() {
    const {
      allApp,
      filter,
      keypagnation,
      styleNext,
      disablenext,
      disablepre,
      stylePre,
      show,
      status,
      isLoading, key
    } = this.state
    return (
      <div>
        <Delete show={show} handleShow={this.handleShow} status={status} delete={() => this.delete(status)} />
        <div className="py-5 px-3  border rounded bg-light ">
          {/* <div className="d-flex mb-3 ">
            <label>البحث :</label>{' '}
            <input
              type="text"
              className="filter mr-2 p-1"
              vaule={filter}
              onChange={this.handleChange}
            />
          </div> */}


          <h3 className="d-flex mb-4"> عرض التطبيقات</h3>
          <Table
            striped
            hover
            bordered
            className="table text-nowrap table-light"
            responsive
          >
            <thead className="tdCatergory">
              <tr className="text-center">
                <th> اسم التطبيق</th>
                <th> عدد النقاط</th>
                <th> تاريخ الانتهاء </th>
                <th> التفاصيل </th>
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
                : allApp.map((item) => {

                  return (
                    <tr key={item._id} className="text-center">
                      <td> {item.title}</td>
                      <td> {item.points}</td>
                      <td> {item.expireDate}</td>
                      <td
                        onClick={() => {
                          this.redirect(item)
                        }}
                      >
                        <i className="far fa-eye"></i>
                      </td>
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
          <div className="d-flex justify-content-between px-5 pb-4 mt-3">
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
        </div>{' '}
      </div>
    )
  }
}

export default AppTable
