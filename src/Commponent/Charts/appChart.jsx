import React, { Component } from 'react';
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";
import  Dropdown from 'react-bootstrap/Dropdown';

charts(FusionCharts);
class AppChart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dropdown:"اختر السنه", showHide: false,
             data:[
            {
                label: 'JAN',
                value: '555',
              },
              {
                label: 'MAR',
                value: '260',
              },
              {
                label: 'APR',
                value: '180',
              },
              {
                label: 'MAY',
                value: '140',
              },
              {
                label: 'JUN',
                value: '115',
              },
              {
                label: 'JUL',
                value: '100',
              },
              {
                label: 'AGU',
                value: '390',
              },
              {
                label: 'SPE',
                value: '350',
              },
              {
                label: 'OCT',
                value: '306',
              },
              {
                label: 'NOV',
                value: '309',
              },
              {
                label: 'DEC',
                value: '350',
              },
            ],
            data2021:[
                {
                    label: 'JAN',
                    value: '56',
                  },
                  {
                    label: 'MAR',
                    value: '20',
                  },
                  {
                    label: 'APR',
                    value: '10',
                  },
                  {
                    label: 'MAY',
                    value: '10',
                  },
                  {
                    label: 'JUN',
                    value: '15',
                  },
                  {
                    label: 'JUL',
                    value: '80',
                  },
                  {
                    label: 'AGU',
                    value: '90',
                  },
                  {
                    label: 'SPE',
                    value: '50',
                  },
                  {
                    label: 'OCT',
                    value: '306',
                  },
                  {
                    label: 'NOV',
                    value: '309',
                  },
                  {
                    label: 'DEC',
                    value: '350',
                  },
                ]
            ,
             dataMonth:[
            {
                label: 'JAN',
                value: 'FAB',
              },
              {
                label: 'MAR',
                value: '260',
              },
              {
                label: 'APR',
                value: '180',
              },
              {
                label: 'MAY',
                value: '140',
              },
              {
                label: 'JUN',
                value: '115',
              },
              {
                label: 'JUL',
                value: '100',
              },
              {
                label: 'AGU',
                value: '390',
              },
              {
                label: 'SPE',
                value: '350',
              },
              {
                label: 'OCT',
                value: '306',
              },
              {
                label: 'NOV',
                value: '309',
              },
              {
                label: 'DEC',
                value: '350',
              },
            ],
            dataYear:[  {
                label: '2021',
                value: '232',
              },
              {
                label: '2020',
                value: '850',
              },
              {
                label: '2019',
                value: '180',
              },
              {
                label: '2018',
                value: '232',
              },
              ]
        }}
        onValueChange = (event) => {
            const{dataYear,dataMonth}=this.state
            event.target.value === 'years' ? this.setState({showHide:false,data:dataYear})
             : this.setState({showHide:true,data:dataMonth})
          }
  render() {
      const{dataMonth,data, dropdown,showHide ,data2021}=this.state
    return (
   <div>   
       <ReactFusioncharts
        type="line"
        width="100%"
        height="400"
        dataFormat="JSON"
        dataSource= {{
            chart: {
            
              theme: "fusion"
            },
            data: data }
           
          }
          
      />
      <div onChange={this.onValueChange} className="d-md-flex d-sm-block text-right">
          <div className="mx-2">
            <input type="radio" value="years" name="gender" /> سنوي
          </div>
          <div className="d-md-flex d-sm-block text-right">
            <div className="mx-2">
              <input type="radio" value="months" name="gender" /> شهري
            </div>
            {showHide && (
              <Dropdown className="chartsbnt">
                <Dropdown.Toggle id="dropdown-basic">
                 { dropdown}
                </Dropdown.Toggle>

                <Dropdown.Menu className="menuYears">
                  <Dropdown.Item
                    eventKey="0"
                    onSelect={() => this.setState({data:dataMonth,dropdown:"2021"})}
                  >
                    {new Date().getUTCFullYear()}
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="1"
                    onSelect={() => this.setState({data:data2021,dropdown:"2020"})}
                  >
                    {new Date().getUTCFullYear() - 1}
                  </Dropdown.Item>
                  
                </Dropdown.Menu>
              </Dropdown>
            )}
          </div>
        </div>
      </div>   
    );
  }
}
export default AppChart;