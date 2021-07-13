import React, { Component } from 'react'
import axios from 'axios'
import { Table } from 'react-bootstrap'
class AppTable extends Component {
  state = {
    allApp: [],
    filterData: [],
    filter: '',
    key: 0,
    keypagnation: 0,
    disablepre: true,
    token: localStorage.getItem('token'),
    max_id: '',
    min_id: '',
    disablepre: true,
    disablenext: false,
    styleNext: '',
    stylePre: '#6b18ff80',
  }
  getApp = async () => {
    try {
      const { token, key } = this.state
      const resp = await axios({
        method: 'get',
        url: `https://koto2020.herokuapp.com/api/app?size=4`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(resp)
      await this.setState({
        allApp: resp.data.apps.data,
        max_id: resp.data.apps.paging.cursors.max_id,
        min_id: resp.data.apps.paging.cursors.min_id,
      })
    } catch (err) {
      console.log(err)
    }
  }
  redirect = (item) => {
    console.log(item._id)
    this.props.history.push(`/admin/AddADS/App${item._id}`)
  }
  deleteApp = async (item) => {
    try {
      const { token } = this.state
      const resp = await axios({
        method: 'delete',
        url: `https://koto2020.herokuapp.com/api/app/${item._id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(resp)
      this.setState((prevState) => ({
        allApp: prevState.allApp.filter((row) => row._id !== item._id),
      }))
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
      this.setState({ allApp: filterData })
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
  next = async () => {
    const { token, max_id, key, keypagnation } = this.state

    try {
      await this.setState({ keypagnation: keypagnation + 20, key: key + 1 })
      const resp = await axios({
        method: 'get',
        url: `https://koto2020.herokuapp.com/api/app?max_id=${max_id}&size=4`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(resp.data.apps.paging)
      await this.setState({
        allApp: resp.data.apps.data,
        max_id: resp.data.apps.paging.cursors.max_id,
        min_id: resp.data.apps.paging.cursors.min_id,
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
      console.log(err)
    }
  }
  pre = async () => {
    const { key, keypagnation, token, min_id, hasPrevious } = this.state
    try {
      await this.setState({ keypagnation: keypagnation - 20, key: key - 1 })
      const resp = await axios({
        method: 'get',
        url: `https://koto2020.herokuapp.com/api/app?min_id=${min_id}&size=4`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(resp.data.apps.paging)
      await this.setState({
        allApp: resp.data.apps.data,
        max_id: resp.data.apps.paging.cursors.max_id,
        min_id: resp.data.apps.paging.cursors.min_id,
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
      console.log(err)
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
    } = this.state
    return (
      <div>
        <div className="py-5 px-3 mt-5 border rounded bg-light ">
          <div className="d-flex mb-3 ">
            <label>البحث :</label>{' '}
            <input
              type="text"
              className="filter mr-2 p-1"
              vaule={filter}
              onChange={this.handleChange}
            />
          </div>
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
              {allApp.map((item) => {
                console.log(item)
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
                        this.deleteApp(item)
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
              من{keypagnation} الي {keypagnation + 20}{' '}
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
