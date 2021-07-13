import React, { Component } from 'react'
import FusionCharts from 'fusioncharts'
import charts from 'fusioncharts/fusioncharts.charts'
import ReactFusioncharts from 'react-fusioncharts'
import  Dropdown  from 'react-bootstrap/Dropdown';
import axios from 'axios'
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
      data: [
        {
            "color": "#ffa500",
            "label": "Orange",
            "value": "33%"
        },
        {
            "color": "#ff0000",
            "label": "Vodafone",
            "value": "17%"
        },
        {
            "color": "#008000",
            "label": "Etislat",
            "value": "33%"
        },
        {
            "color": "#800080",
            "label": "WE",
            "value": "19"
        }
    ],
       data100: [
        {
          label: 'Vodafon',
          value: '100',
        },
        {
          label: 'We',
          value: '530',
        },
        {
          label: 'Etislat',
          value: '1500',
        },
        {
          label: 'Etislat',
          value: '10500',
        },
      ], 
      data50: [
        {
          label: 'Vodafon',
          value: '100',
        },
        {
          label: 'We',
          value: '530',
        },
        {
          label: 'Etislat',
          value: '1050',
        },
        {
          label: 'Orange',
          value: '100',
        },
      ], 
      data25: [
        {
          label: 'Vodafon',
          value: '800',
          
        },
        {
          label: 'We',
          value: '5700',
        },
        {
          label: 'Orange',
          value: '1050',
        },
        {
          label: 'Etislat',
          value: '900',
        },
      ],data10: [
        {
          label: 'Vodafon',
          value: '400',
        },
        {
          label: 'We',
          value: '500',
        },
        {
          label: 'Orange',
          value: '105',
        },
        {
          label: 'Etislat',
          value: '900',
        },
      ],
      data5: [
        {
          label: 'Vodafon',
          value: '600',
        },
        {
          label: 'We',
          value: '500',
        },
        {
          label: 'Orange',
          value: '300',
        },
        {
          label: 'Etislat',
          value: '800',
        },
      ],
    }
  }

  ChargingCardApi = async () => {
  
      const {filter , token,} = this.state
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
        await this.setState({filters:resp.data.filters ,data:resp.data.data})
      } catch (err) {
        // Handle Error
        console.log(err)
        if (err.response) {
          console.log(err)
         
        }
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
    const { data,filter,filters,title } = this.state
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
              </div>
      </div>
    )
  }
}
export default ChargingChart
