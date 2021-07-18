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
import SpinnerChart from './../variables/spinnerCharts';
ReactFC.fcRoot(FusionCharts, Chart, FusionTheme)
charts(FusionCharts)
class UserChart extends Component {
  state = {
    showHide: false,
    token: localStorage.getItem('token'),
    data: [],
    year: 2021,
    filters:[],
    title:"اختر السنه",
    isLoading:false
  }

  onValueChange = (event) => {
    const { data } = this.state
    event.target.value === 'years' ? this.years() : this.monthly()
  }
  usesDefult = async () => {
    const { token, year } = this.state
    let errorAPI = ''
    this.setState({isLoading:true})
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
      
      await this.setState({ data: resp.data.data,filters:resp.data.years,isLoading:false })
    } catch (err) {
      // Handle Error

      if (err.response) {
      
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
    this.setState({ showHide: false,isLoading:true })

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
   
      await this.setState({ data: resp.data.data ,isLoading:false })
    } catch (err) {
      // Handle Error
      this.props.history.push(`/404`)
     
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
    const { showHide, data,filters ,title,isLoading} = this.state

    return (
      <div  >
        {isLoading?(  <div className="d-flex justify-content-center uerSpiner" > <SpinnerChart /></div>):(  <div> <ReactFusioncharts
          type="column2d"
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
        </div></div>)}
        
       
       
      </div>
    )
  }
}
export default UserChart
