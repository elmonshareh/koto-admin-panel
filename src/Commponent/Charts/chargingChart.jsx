import React, { Component } from 'react'
import FusionCharts from 'fusioncharts'
import charts from 'fusioncharts/fusioncharts.charts'
import ReactFusioncharts from 'react-fusioncharts'
import  Dropdown  from 'react-bootstrap/Dropdown';
import axios from 'axios'
import SpinnerChart from './../variables/spinnerCharts';
// Resolves charts dependancy
charts(FusionCharts) 

class ChargingChart extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      title:"قيمه الكرت",
      token: localStorage.getItem('token'),
      filter:"50",
      filters:[],
      data: [],
      isLoading: false 
  }
  }

  ChargingCardApi = async () => {
  
      const {filter , token,} = this.state
      this.setState({ isLoading: true })
      try {
        const resp = await axios({
          method: 'post',
          url: 'https://koto2020.herokuapp.com/api/dashboard/chart/card/filter',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            filter: filter,
           
          },
        })

        console.log(resp)
        await this.setState({filters:resp.data.filters ,data:resp.data.data,isLoading: false})
      } catch (err) {
        this.props.history.push(`/404`)
      }

     
    
  }
  handelChangeFilter= async(x)=>{
   await this.setState({filter: x ,title:x})
    this.ChargingCardApi()
  }
  componentDidMount(){
    this.ChargingCardApi()
  }

  render() {
    const { data,filters,title ,isLoading} = this.state
    return (
        <div > {isLoading ? (
          <div className="d-flex justify-content-center pieChart ">
            <SpinnerChart />
          </div>
        ) : ( <div> <div>
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
          <div className="text-right d-flex">
              <Dropdown className="chartsbnt">
                    <Dropdown.Toggle id="dropdown-basic">
                     {title}
                    </Dropdown.Toggle>
    
                    <Dropdown.Menu className="menuYears">
                    {filters.map((x) => (  
                    <Dropdown.Item
                        eventKey="1"
                        onSelect={()=>this.handelChangeFilter(x)}
                      >
                     {x}
                      </Dropdown.Item>))}
                     
                     
                     
                    </Dropdown.Menu>
                  </Dropdown>
                  </div></div>)}
          
      </div>
    )
  }
}
export default ChargingChart
