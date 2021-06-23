import React, { Component } from 'react'
import FusionCharts from 'fusioncharts'
import charts from 'fusioncharts/fusioncharts.charts'
import ReactFusioncharts from 'react-fusioncharts'
import  Dropdown  from 'react-bootstrap/Dropdown';

// Resolves charts dependancy
charts(FusionCharts) 

class ChargingChart extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      title:"قيمه الكرت",
      data: [
        {
          label: 'Vodafon',
          value: '100',
        },
        {
          label: 'We',
          value: '520',
        },
        {
          label: 'Etislat',
          value: '200',
        },
        {
          label: 'Orange',
          value: '185',
        },
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
  render() {
    const { data,data5,data10,data25,data50,data100,title } = this.state
    return (
        <div > <div>
      <ReactFusioncharts
        type="doughnut2d"
        width="100%"
        height="400"
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
                  <Dropdown.Item
                    eventKey="0"
                    onSelect={() => this.setState({data:data5,title:"كرت فكه" })}
                  >
                   كرت فكه
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="1"
                    onSelect={() => this.setState({data:data10  ,title:"كرت 10"})}
                  >
                   10 
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="2"
                    onSelect={() => this.setState({data:data25,title:"كرت 25"})}
                  >
                   25
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="3"
                    onSelect={() => this.setState({data:data50, title:"كرت 50"})}
                  >
                   50
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="4"
                    onSelect={() => this.setState({data:data100 ,title:"كرت 100"})}
                  >
                   100
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              </div>
      </div>
    )
  }
}
export default ChargingChart
