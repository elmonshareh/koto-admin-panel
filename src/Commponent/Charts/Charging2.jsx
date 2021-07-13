import React, { Component } from 'react'
import FusionCharts from 'fusioncharts'
import charts from 'fusioncharts/fusioncharts.charts'
import ReactFusioncharts from 'react-fusioncharts'
import  Dropdown  from 'react-bootstrap/Dropdown';
import axios from 'axios'
// Resolves charts dependancy
charts(FusionCharts) 

class ChargingChart2 extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      title:"قيمه الكرت",
      token: localStorage.getItem('token'),
      filter:"50",
      filters:[],
      data: [ ],
      
     
     
     
    }
  }

  ChargingCardApi = async () => {
  
      const { token} = this.state
      try {
        const resp = await axios({
          method: 'get',
          url: 'https://koto2020.herokuapp.com/api/dashboard/chart/card',
          headers: {
            Authorization: `Bearer ${token}`,
          },
         
        })

        console.log(resp)
        this.setState({data:resp.data.data})
       
      } catch (err) {
        // Handle Error
        console.log(err)
       
        if (err.response) {
          console.log(err)
         
        }
      }

     
    
  }
  
  componentDidMount(){
    this.ChargingCardApi()
  }

  render() {
    const { data} = this.state
    return (
        <div > <div>
      <ReactFusioncharts
        type="doughnut2d"
        width="100%"
        height="300"
        dataFormat="JSON"
        dataSource={{
          chart: {
            caption: 'كروت الشحن',
            captionpadding: '0',
            decimals: '1',
            theme: 'fusion',
          },
          data: data,
        }}
      /> </div>
     
      </div>
    )
  }
}
export default ChargingChart2
