import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import axios from 'axios'
import SpinnerChart from './../../variables/spinnerCharts'
class SolvedSurvey extends Component {
  state = {
    allSurvey: [],
    filter: [],
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
    show: false,
  }
  redirect = (item) => {
    this.props.history.push(`/admin/AddADS/SolvedSurveyUser${item._id}`)
  }
  getSurvey = async () => {
    this.setState({ isLoading: true })
    try {
      const { token } = this.state
      const resp = await axios({
        method: 'get',
        url: `https://koto2020.herokuapp.com/api/survey/solved?size=10`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(resp.data.data)
      await this.setState({
        allSurvey: resp.data.data.data,
        max_id: resp.data.data.paging.cursors.max_id,
        min_id: resp.data.data.paging.cursors.min_id,
        isLoading: false,
      })
      if (!resp.data.data.paging.hasNext) {
        this.setState({
          disablenext: true,
          styleNext: '#6b18ff80',
        })
      }
    } catch (err) {
      console.log(err)
    }
  }
  next = async () => {
    const { token, max_id, key, keypagnation } = this.state
    this.setState({ isLoading: true })
    try {
      await this.setState({ keypagnation: keypagnation + 20, key: key + 1 })
      const resp = await axios({
        method: 'get',
        url: `https://koto2020.herokuapp.com/api/survey/solved?max_id=${max_id}&size=10`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(resp.data.data.paging)
      await this.setState({
        allSurvey: resp.data.data.data,
        max_id: resp.data.data.paging.cursors.max_id,
        min_id: resp.data.data.paging.cursors.min_id,
        isLoading: false,
      })
      if (!resp.data.data.paging.hasNext) {
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
    const { key, keypagnation, token, min_id } = this.state
    this.setState({ isLoading: true })
    try {
      await this.setState({ keypagnation: keypagnation - 20, key: key - 1 })
      const resp = await axios({
        method: 'get',
        url: `https://koto2020.herokuapp.com/api/survey/solved?min_id=${min_id}&size=10`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(resp.data.data.paging)
      await this.setState({
        allSurvey: resp.data.data.data,
        max_id: resp.data.data.paging.cursors.max_id,
        min_id: resp.data.data.paging.cursors.min_id,
        isLoading: false,
      })
      if (!resp.data.data.paging.hasPrevious) {
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
    this.getSurvey()
  }
  render() {
    const {
      allSurvey,
      filter,
      keypagnation,
      isLoading,
      styleNext,
      disablenext,
      disablepre,
      stylePre,
    } = this.state
    return (
      <div>
        <div className="py-5 px-3 mt-5 border rounded bg-light ">
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
                <td> كود</td>
                <th> اسم </th>
                <th> عدد النقاط</th>
                <th> تاريخ الانتهاء </th>
                <th> عدد المستخدمين</th>
                <th> التفاصيل </th>
              </tr>
            </thead>
            <tbody className="trCatergory text-center ">
              {isLoading ? (
                <tr>
                  <td colspan="6">
                    {' '}
                    <div className="d-flex justify-content-center uerSpiner ">
                      <SpinnerChart />
                    </div>
                  </td>
                </tr>
              ) : (
                allSurvey.map((item) => {
                  return (
                    <tr key={item._id}>
                      <td>{item._id}</td>
                      <td>{item.name}</td>
                      <td>{item.points}</td>
                      <td>{item.expireDate}</td>
                      <td> {item.users}</td>
                      <td
                        onClick={() => {
                          this.redirect(item)
                        }}
                      >
                        <i className="far fa-eye"></i>
                      </td>
                    </tr>
                  )
                })
              )}
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

export default SolvedSurvey
