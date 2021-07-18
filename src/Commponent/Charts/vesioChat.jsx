import React, { Component } from 'react'
import FusionCharts from 'fusioncharts'
import charts from 'fusioncharts/fusioncharts.charts'
import ReactFusioncharts from 'react-fusioncharts'
import Dropdown from 'react-bootstrap/Dropdown'
import axios from 'axios'
import SpinnerChart from './../variables/spinnerCharts';
// Resolves charts dependancy
charts(FusionCharts)
class VedioChart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {dropdown:"اختر السنه" ,showHide: false,token: localStorage.getItem('token'),
    data: [],
    year: 2021,
    filters:[],
    dataset:[],
    title:"اختر السنه",
   category: [],
   isLoading:false  
    
  }
  }
  getVedioChart = async () => {
    const { token,year } = this.state
this.setState({isLoading:true})
    try {
      const resp = await axios({
        method: 'post',
        url: 'https://koto2020.herokuapp.com/api/dashboard/chart/video',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          "filter":"monthly",
          "year":year
        
        },
      })
   
      await this.setState({ category: resp.data.data[0].categories[0].category,
        filters:resp.data.years ,dataset: resp.data.data[0].dataSet ,isLoading:false})
    } catch (err) {
      // Handle Error
      this.props.history.push(`/404`)
    }
  }
  onValueChange = (event) => {
    const { data } = this.state
    event.target.value === 'years' ? this.years() : this.monthly()
  }
  componentDidMount(){ this.getVedioChart()}
  years = async () => {
    const { token } = this.state
    let errorAPI = ''
    this.setState({ showHide: false,isLoading:true })
    try {
      const resp = await axios({
        method: 'post',
        url: 'https://koto2020.herokuapp.com/api/dashboard/chart/video',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          filter: 'annual',
        },
      })
     
      await this.setState({ category: resp.data.data[0].categories[0].category,
         filters:resp.data.years ,dataset: resp.data.data[0].dataSet ,
         isLoading:false})
    } catch (err) {
      // Handle Error
      this.props.history.push(`/404`)
    
    }
  }
  monthly = () => {
    this.getVedioChart()
    this.setState({ showHide: true })
  }
  handelChangeYear= async (x)=>{
    await this.setState({year:x ,title:x})
    this.getVedioChart()
  
  }
  render() {
    const { showHide, category ,dataset,title,filters,isLoading} = this.state
    return ( <div> {isLoading?(  <div className="d-flex justify-content-center uerSpiner " > <SpinnerChart /></div>):(<div>
      <ReactFusioncharts
        type="msspline"
        width="100%"
        height="400"
        dataFormat="JSON"
        dataSource={{
          chart: {
            caption:' Koto vs Unity vs Admob',
            numdivlines: '3',
            showvalues: '0',
            legenditemfontsize: '15',
            legenditemfontbold: '1',
            plottooltext: '<b>$dataValue</b> video watched',
            theme: 'fusion',
          },
           categories: [
            {
              category:category
            }
          ],
          dataset: dataset
        }}
      />
      <div onChange={this.onValueChange} className="d-md-flex d-sm-block text-right">
        <div className="mx-2">
          {' '}
          <input type="radio" value="years" name="gender" /> سنوي
        </div>
        <div className="d-md-flex d-sm-block text-right">
          <div className="mx-2">
            <input type="radio" value="months" name="gender" /> شهري
          </div>
          {showHide && (
            <Dropdown className="chartsbnt">
            <Dropdown.Toggle id="dropdown-basic"> {title} </Dropdown.Toggle>

            <Dropdown.Menu className="menuYears">
              {filters.map((x)=> 
              <Dropdown.Item onSelect={() => this.handelChangeYear(x)}>
               {x}
              </Dropdown.Item>)}
              
              
            </Dropdown.Menu>
          </Dropdown>
          )}
        </div>
      </div>
    </div>)} </div>
      
    )
  }
}
export default VedioChart
