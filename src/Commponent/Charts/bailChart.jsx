import React, { Component } from 'react'
import FusionCharts from 'fusioncharts'
import charts from 'fusioncharts/fusioncharts.charts'
import ReactFusioncharts from 'react-fusioncharts'
import axios from 'axios'
// Resolves charts dependancy
charts(FusionCharts)

class BillChats extends React.Component {
  state = { token: localStorage.getItem('token'), data: [] }
  getBialChart = async () => {
    const { token } = this.state

    try {
      const resp = await axios({
        method: 'get',
        url: 'https://koto2020.herokuapp.com/api/dashboard/chart/gift',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(resp)
      await this.setState({ data: resp.data.data })
    } catch (err) {
      // Handle Error
      console.log(err)
    }
  }

  componentDidMount() {
    this.getBialChart()
  }
  render() {
    const{data}=this.state
    return (
      <ReactFusioncharts
        type="doughnut2d"
        renderAt="chart-container"
        width="100%"
        height="335"
        dataFormat="JSON"
        dataSource={{
          chart: {
  
            theme: 'fusion',
         
            minAngleForValue: '75',
    
            decimals: '0',
            centerLabel: ' $label: $value',
            
            showTooltip: '0',
            caption: 'الفواتير ',
          },
          data:data
        }}
      />
    )
  }
}
export default BillChats
