import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import axios from 'axios'
import Delete from './../../variables/delete';
import SpinnerChart from './../../variables/spinnerCharts';
class SurveyTable extends Component {
  state = {
    filter: '',
    filterData: [],
    key: 1,
    keypagnation: 10,
    allSurveys: [],
    max_id: '',
    min_id: '',
    token: localStorage.getItem('token'),
    date: new Date().toISOString().split('T')[0],
    datastanp: "",
    hasNext: "",
    disablepre: true,
    disablenext: false,
    styleNext: "",
    stylePre: "#6b18ff80",
    show: false,
    status: "",
    isLoading: false

  }
  getSurvay = async () => {
    this.setState({ isLoading: true })
    try {
      const { token } = this.state

      const resp = await axios({
        method: 'get',
        url: `https://koto2020.herokuapp.com/api/Survey?size=10`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      await this.setState({
        allSurveys: resp.data.data.data,
        max_id: resp.data.data.paging.cursors.max_id,
        min_id: resp.data.data.paging.cursors.min_id,
        isLoading: false
      })
      if (!resp.data.data.paging.hasNext) {
        this.setState({
          disablenext: true,
          styleNext: '#6b18ff80',
        })
      }
    } catch (err) {
      this.props.history.push(`/404`)
    }
  }
  componentDidMount = () => {
    this.getSurvay()
  }
  redirect = (item) => {

    this.props.history.push(`/admin/AddADS/survay${item._id}`)
  }
  delete = async (status) => {
    try {
      const { token, show } = this.state
      const resp = await axios({
        method: 'delete',
        url: `https://koto2020.herokuapp.com/api/Survey/${status}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      this.setState(prevState => ({
        allSurveys: prevState.allSurveys.filter(row => (
          row._id !== status
        ))

      }))
      this.setState({ show: !show })
    } catch (err) {
      this.props.history.push(`/404`)
    }
  }
  getFiltertion = async () => {
    const { token, filter, allSurveys } = this.state
    var filterData = []
    try {
      const resp = await axios({
        method: 'get',
        url: `https://koto2020.herokuapp.com/api/Survey?data=${filter}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      filterData = resp.data.data.data
      this.setState({ filterData: filterData })

      this.setState({ allSurveys: filterData })

    } catch (err) {
      this.props.history.push(`/404`)
    }
  }
  handleChange = async (e) => {
    const { filter } = this.state
    this.setState({ filter: e.target.value })
    if (filter) {
      this.getFiltertion()
    } else {
      await this.getSurvay()

    }
  }

  next = async () => {
    const { token, max_id, key, keypagnation } = this.state
    this.setState({ isLoading: true })
    try {
      await this.setState({ keypagnation: keypagnation + 10, key: key + 1 })
      const resp = await axios({
        method: 'get',
        url: `https://koto2020.herokuapp.com/api/Survey?max_id=${max_id}&size=10`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      await this.setState({
        allSurveys: resp.data.data.data,
        max_id: resp.data.data.paging.cursors.max_id,
        min_id: resp.data.data.paging.cursors.min_id,
        hasNext: resp.data.data.paging.cursors.hasNext,
        isLoading: false
      })
      if (!resp.data.data.paging.hasNext) {
        this.setState({ disablenext: true, styleNext: "#6b18ff80", disablepre: false, stylePre: "#6b18ff" })

      } else {
        this.setState({ disablenext: false, disablepre: false, stylePre: "#6b18ff" })
      }
    } catch (err) {
      this.props.history.push(`/404`)
    }
  }

  pre = async () => {
    const { key, keypagnation, token, min_id } = this.state
    await this.setState({ keypagnation: keypagnation - 10, key: key - 10, isLoading: true })

    try {
      const resp = await axios({
        method: 'get',
        url: `https://koto2020.herokuapp.com/api/Survey?min_id=${min_id}&size=10`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      await this.setState({
        allSurveys: resp.data.data.data,
        max_id: resp.data.data.paging.cursors.max_id,
        min_id: resp.data.data.paging.cursors.min_id,
        isLoading: false
      })
      if (!resp.data.data.paging.hasPrevious) {

        this.setState({ disablepre: true, disablenext: false, styleNext: "#6b18ff", stylePre: "#6b18ff80" })

      } else {
        this.setState({ disablepre: false, disablenext: false, styleNext: "#6b18ff" })
      }
    } catch (err) {
      this.props.history.push(`/404`)
    }

  }
  timestanp = async (event) => {
    this.setState({ date: event.target.value })
    var date = this.state.date

    var mint = new Date().getMinutes()
    var hours = new Date().getHours()

    var output =
      date + ':' + ('0' + hours).slice(-2) + ':' + ('0' + mint).slice(-2)
    var datastanp = new Date(output).getTime()
    this.setState({ datastanp: datastanp })

    try {
      const { token } = this.state

      const resp = await axios({
        method: 'get',
        url: `https://koto2020.herokuapp.com/api/Survey?date=${datastanp}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })


      await this.setState({
        allSurveys: resp.data.data.data,
        max_id: resp.data.data.paging.cursors.max_id,
        min_id: resp.data.data.paging.cursors.min_id,
      })
    } catch (err) {
      this.props.history.push(`/404`)
    }
  }
  handleShow = (item) => {
    const { show } = this.state
    this.setState({ show: !show, status: item._id })
  }
  render() {
    const { allSurveys, key, keypagnation, disablenext, disablepre, stylePre, styleNext, show, isLoading,
      status } = this.state

    return (
      <div className="col-12 py-5  mb-3 border rounded bg-light ">
        <Delete show={show} handleShow={this.handleShow} status={status} delete={() => this.delete(status)} />
        {/* <div className="d-flex mb-2">
          <label>البحث :</label>{' '}
          <input
            type="text"
            className="filter mr-2 p-1"
            vaule={filter}
            onChange={this.handleChange}
          />
          <input type="d
          ate" name="date"  value={date}  onChange={this.timestanp }/>
        </div> */}
        <h3 className="d-flex mb-4"> عرض الاستبيانات</h3>
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
            {isLoading ?
              <tr>

                <td colspan="5" > <div className="d-flex justify-content-center uerSpiner ">
                  <SpinnerChart />
                </div></td>

              </tr>
              : allSurveys.map((all) => {

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

                        this.handleShow(all)
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
          <button onClick={this.next} className="pgnationbtn" disabled={disablenext} style={{ background: styleNext }}>
            التالي
          </button>
          <p className="text-nowrap px-2">
            من{key} الي {keypagnation}
          </p>

          <button
            className="pgnationbtn"
            onClick={this.pre}
            disabled={disablepre}
            style={{ background: stylePre }}
          >
            السابق
          </button>
        </div>
      </div>
    )
  }
}

export default SurveyTable
