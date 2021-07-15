import React, { Component } from 'react'
import FusionCharts from 'fusioncharts'
import charts from 'fusioncharts/fusioncharts.charts'
import ReactFusioncharts from 'react-fusioncharts'
import Dropdown from 'react-bootstrap/Dropdown'
import axios from 'axios'
import SpinnerChart from './../variables/spinnerCharts';
charts(FusionCharts)
class AppChart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      token: localStorage.getItem('token'),
      year: 2021,
      filters: [],
      title: 'اختر السنه',
      isLoading: false,
    }
  }
  Defult = async () => {
    const { token, year } = this.state
    let errorAPI = ''
    this.setState({ isLoading: true })
    try {
      const resp = await axios({
        method: 'post',
        url: 'https://koto2020.herokuapp.com/api/dashboard/chart/app',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          filter: 'monthly',
          year: year,
        },
      })
      console.log(resp)
      await this.setState({
        data: resp.data.data,
        filters: resp.data.years,
        isLoading: false,
      })
    } catch (err) {
      // Handle Error
      console.log(err)
    }
  }
  componentDidMount() {
    this.Defult()
  }
  handelChangeYear = async (x) => {
    await this.setState({ year: x, title: x })
    this.Defult()
  }
  monthly = () => {
    this.Defult()
    this.setState({ showHide: true })
  }
  slecteyear = async () => {
    await this.setState({ year: new Date().getUTCFullYear() })
    this.Defult()
  }
  years = async () => {
    const { token } = this.state
    let errorAPI = ''
    this.setState({ showHide: false, isLoading: true })
    try {
      const resp = await axios({
        method: 'post',
        url: 'https://koto2020.herokuapp.com/api/dashboard/chart/app',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          filter: 'annual',
        },
      })
      console.log(resp)
      await this.setState({ data: resp.data.data ,isLoading:false })
    } catch (err) {
      // Handle Error
      this.props.history.push(`/404`)
     
    }
  }

  onValueChange = (event) => {
    const { data } = this.state
    event.target.value === 'years' ? this.years() : this.monthly()
  }
  render() {
    const { filters, data, title, showHide, isLoading } = this.state
    return ( <div> {isLoading?(  <div className="d-flex justify-content-center uerSpiner " > <SpinnerChart /></div>):(  <div>
      <ReactFusioncharts
        type="line"
        width="100%"
        height="400"
        dataFormat="JSON"
        dataSource={{
          chart: {
            theme: 'fusion',
          },
          data: data,
        }}
      />
      <div
        onChange={this.onValueChange}
        className="d-md-flex d-sm-block text-right"
      >
        <div className="mx-2">
          <input type="radio" value="years" name="gender" /> سنوي
        </div>
        <div className="d-md-flex d-sm-block text-right">
          <div className="mx-2">
            <input type="radio" value="months" name="gender" /> شهري
          </div>
          {showHide && (
            <Dropdown className="chartsbnt">
              <Dropdown.Toggle id="dropdown-basic">{title}</Dropdown.Toggle>

              <Dropdown.Menu className="menuYears">
                {filters.map((x) => (
                  <Dropdown.Item
                    eventKey="0"
                    onSelect={() => this.handelChangeYear(x)}
                  >
                    {x}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          )}
        </div>
      </div>
    </div>)}</div>
     
    )
  }
}
export default AppChart
