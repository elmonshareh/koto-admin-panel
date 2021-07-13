//Including react
import React, { Component } from 'react'

//Including the fusioncharts library
import FusionCharts from 'fusioncharts'

//Including the chart type
import Chart from 'fusioncharts/fusioncharts.charts'

//Including react-fusioncharts component
import ReactFC from 'react-fusioncharts'
//Including the theme as fusion
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion'
import Dropdown from 'react-bootstrap/Dropdown'
import charts from 'fusioncharts/fusioncharts.charts'
import ReactFusioncharts from 'react-fusioncharts'
import axios from 'axios'
import { ThemeConsumer } from 'react-bootstrap/esm/ThemeProvider'
ReactFC.fcRoot(FusionCharts, Chart, FusionTheme)
charts(FusionCharts)
class UserChart extends Component {
  state = {
    showHide: false,
    token: localStorage.getItem('token'),
    data: [],
    year: 2021,
    filters:[],
    title:"اختر السنه"
  }

  onValueChange = (event) => {
    const { data } = this.state
    event.target.value === 'years' ? this.years() : this.monthly()
  }
  usesDefult = async () => {
    const { token, year } = this.state
    let errorAPI = ''
    try {
      const resp = await axios({
        method: 'post',
        url: 'https://koto2020.herokuapp.com/api/dashboard/chart/user',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          filter: 'monthly',
          year: year,
        },
      })
      console.log(resp)
      await this.setState({ data: resp.data.data,filters:resp.data.years })
    } catch (err) {
      // Handle Error
      console.log(err)
      if (err.response) {
        console.log(err.response.data.error)
        errorAPI = err.response.data.error
        this.setState({
          apiMsg: err.response.data.error,
        })
      }
    }
  }
  monthly = () => {
    this.usesDefult()
    this.setState({ showHide: true })
  }
  slecteyear = async () => {
    await this.setState({ year: new Date().getUTCFullYear() })
    this.usesDefult()
  }
  years = async () => {
    const { token } = this.state
    let errorAPI = ''
    this.setState({ showHide: false })
    try {
      const resp = await axios({
        method: 'post',
        url: 'https://koto2020.herokuapp.com/api/dashboard/chart/user',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          filter: 'annual',
        },
      })
      console.log(resp)
      await this.setState({ data: resp.data.data })
    } catch (err) {
      // Handle Error
      console.log(err)
      if (err.response) {
        console.log(err.response.data.error)
        errorAPI = err.response.data.error
        this.setState({
          apiMsg: err.response.data.error,
        })
      }
    }
  }
handelChangeYear= async (x)=>{
  await this.setState({year:x ,title:x})
  this.usesDefult()

}
  componentDidMount() {
    this.usesDefult()
  }
  render() {
    const { showHide, data, year,filters ,title} = this.state
    console.log(year)
    return (
      <div>
        <ReactFusioncharts
          type="column2d"
          width="100%"
          height="400"
          dataFormat="JSON"
          dataSource={{
            chart: {
              numbersuffix: 'K',
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
            {' '}
            <input type="radio" value="years" name="gender" /> سنوي
          </div>
          <div className="d-md-flex d-sm-block text-right">
            <div className="mx-2">
              <input type="radio" value="months" name="gender" /> شهري
            </div>
          </div>
          {showHide && (
            <Dropdown className="chartsbnt">
              <Dropdown.Toggle id="dropdown-basic"> {title} </Dropdown.Toggle>

              <Dropdown.Menu className="menuYears">
                {filters.map((x)=> 
                <Dropdown.Item eventKey="0" onSelect={() => this.handelChangeYear(x)}>
                 {x}
                </Dropdown.Item>)}
                
                
              </Dropdown.Menu>
            </Dropdown>
          )}
        </div>
      </div>
    )
  }
}
export default UserChart
