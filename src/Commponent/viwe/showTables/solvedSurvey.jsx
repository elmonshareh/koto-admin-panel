import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import axios from 'axios'
import SpinnerChart from './../../variables/spinnerCharts'
class SolvedSurvey extends Component {
  state = {
    allSurvey: [],
    filter: [],
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
      // (resp.data)
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
      this.props.history.push(`/404`)
    }
  }
  next = async () => {
    const { token, max_id, key, keypagnation } = this.state
    this.setState({ isLoading: true })
    try {
      await this.setState({ keypagnation: keypagnation + 10, key: key + 10 })
      const resp = await axios({
        method: 'get',
        url: `https://koto2020.herokuapp.com/api/survey/solved?max_id=${max_id}&size=10`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

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
      this.props.history.push(`/404`)
    }
  }
  pre = async () => {
    const { key, keypagnation, token, min_id } = this.state
    this.setState({ isLoading: true })
    try {
      await this.setState({ keypagnation: keypagnation - 10, key: key - 10 })
      const resp = await axios({
        method: 'get',
        url: `https://koto2020.herokuapp.com/api/survey/solved?min_id=${min_id}&size=10`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

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
      this.props.history.push(`/404`)
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
      key,
    } = this.state
    return (
      <div>
        <div className=" px-3   py-5 mb-3 border rounded bg-light ">
          {/* <div className="d-flex mb-3 ">
            <label>?????????? :</label>{' '}
            <input
              type="text"
              className="filter mr-2 p-1"
              vaule={filter}
              onChange={this.handleChange}
            />
          
          </div> */}
          <h3 className="d-flex mb-4"> ?????? ?????????????????????? ????????????????</h3>
          <Table
            striped
            hover
            bordered
            className="table text-nowrap table-light"
            responsive
          >
            <thead className="tdCatergory">
              <tr className="text-center">
                <th> ??????</th>
                <th> ?????? </th>
                <th> ?????? ????????????</th>
                <th> ?????????? ???????????????? </th>
                <th> ?????? ????????????????????</th>
                <th> ???????????????? </th>
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
              ????????????{' '}
            </button>

            <p className="text-nowrap px-2">
              ????{key} ?????? {keypagnation}{' '}
            </p>
            <button
              className="pgnationbtn "
              onClick={this.pre}
              disabled={disablepre}
              style={{ background: stylePre }}
            >
              ????????????
            </button>
          </div>
        </div>{' '}
      </div>
    )
  }
}

export default SolvedSurvey
