import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import axios from 'axios'
class SurveyTable extends Component {
  state = {
    filter: '',
    filterData: [],
    key: 0,
    keypagnation: 0,
    disablepre: true,
    allSurveys: [],
    token: localStorage.getItem('token'),
  }
  getSurvay = async () => {
    try {
      const { token, key } = this.state
      const resp = await axios({
        method: 'get',
        url: `https://koto2020.herokuapp.com/api/Survey?page=${key}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(resp)
      await this.setState({ allSurveys: resp.data.surveys })
    } catch (err) {
      console.log(err)
    }
  }
  componentDidMount = () => {
    this.getSurvay()
  }
  redirect = (item) => {
    console.log(item._id)
    this.props.history.push(`/admin/AddADS/survay${item._id}`)
  }
  deleteSurvay = async (item, key) => {
    // const allSurveys = [...this.state.allSurveys]

    try {
      const { token, allSurveys } = this.state
      const resp = await axios({
        method: 'delete',
        url: `https://koto2020.herokuapp.com/api/Survey/${item._id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(resp)
      allSurveys.splice(item._id, 1)
      this.setState({ allSurveys })
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
        url: `https://koto2020.herokuapp.com/api/Survey?name=${filter}&date=${filter}&page=${key}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(resp.data.surveys)
      filterData = resp.data.surveys
      this.setState({ filterData: filterData })
      filterData ? console.log(filterData) : console.log('m')
      this.setState({ allSurveys: filterData })
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
      await this.getSurvay()
      console.log('emtyy')
    }
  }

  next = async () => {
    const { key, keypagnation, filter } = this.state
    this.setState({ disablepre: false })
    await this.setState({ keypagnation: keypagnation + 20, key: key + 1 })
    console.log(key)
    console.log(keypagnation)
    if (filter) {
      await this.getFiltertion()
    } else {
      await this.getSurvay()
    }
  }
  pre = async () => {
    const { key, keypagnation } = this.state

    if (this.state.key === 1) {
      this.setState({ disablepre: true })
    }
    await this.setState({ keypagnation: keypagnation - 20, key: key - 1 })
    if (this.state.filter) {
      await this.getFiltertion()
    } else {
      await this.getSurvay()
    }
  }
  render() {
    const { allSurveys, filter, keypagnation, disablepre } = this.state
    return (
      <div className="col-12 py-5  mb-3 border rounded bg-light ">
        <div className="d-flex mb-2">
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
          <thead className="tdCatergory text-center">
            <tr>
              <th> الاسم</th>
              <th> عدد النقاط </th>
              <th> تاريخ الانتهاء </th>
              <th> التفاصيل </th>
              <th> مسح </th>
            </tr>
          </thead>
          <tbody className="trCatergory text-center">
            {allSurveys.map((all) => {
              return (
                <tr key={all._id}>
                  <td>{all.name}</td>
                  <td>{all.points}</td>
                  <td>{all.expireDate}</td>
                  <td
                    onClick={() => {
                      this.redirect(all)
                    }}
                  >
                    <i className="far fa-eye"></i>
                  </td>
                  <td
                    onClick={() => {
                      this.deleteSurvay(all)
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
            className="pgnationbtn"
            onClick={this.pre}
            disabled={disablepre}
          >
            السابق
          </button>
          <p className="text-nowrap px-2">
            من{keypagnation} الي {keypagnation + 20}
          </p>
          <button onClick={this.next} className="pgnationbtn">
            التالي
          </button>
        </div>
      </div>
    )
  }
}

export default SurveyTable
