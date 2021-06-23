import React, { Component } from 'react'
import FusionCharts from 'fusioncharts'
import charts from 'fusioncharts/fusioncharts.charts'
import ReactFusioncharts from 'react-fusioncharts'
import Dropdown from 'react-bootstrap/Dropdown'

// Resolves charts dependancy
charts(FusionCharts)



class VedioChart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {dropdown:"اختر السنه" ,showHide: false,
         category: [
        {
          label: 'Jan 1',
        },
        {
          label: 'Jan 2',
        },
        {
          label: 'Jan 3',
        },
        {
          label: 'Jan 4',
        },
        {
          label: 'Jan 5',
        },
        {
          label: 'Jan 6',
        },
        {
          label: 'Jan 7',
        },
      ],
      categoryMonth: [
        {
          label: 'Jan 1',
        },
        {
          label: 'Jan 2',
        },
        {
          label: 'Jan 3',
        },
        {
          label: 'Jan 4',
        },
        {
          label: 'Jan 5',
        },
        {
          label: 'Jan 6',
        },
        {
          label: 'Jan 7',
        },
      ],
    categoryYears: [
        {
          label: "2020",
        },
        {
          label: '2021',
        },
        {
          label: '2022',
        },
      
      ],
    dataKoto:[
        {
          value: '55',
        },
        {
          value: '45',
        },
        {
          value: '52',
        },
        {
          value: '29',
        },
        {
          value: '48',
        },
        {
          value: '28',
        },
        {
          value: '32',
        },
      ] ,data2:[{
        value: '95',
      },
      {
        value: '65',
      },
      {
        value: '62',
      },
      {
        value: '59',
      },
      {
        value: '42',
      },
      {
        value: '99',
      },
      {
        value: '82',
      },],data3:[{
        value: '75',
      },
      {
        value: '95',
      },
      {
        value: '61',
      },
      {
        value: '59',
      },
      {
        value: '52',
      },
      {
        value: '99',
      },
      {
        value: '52',
      },],dataAdmob:[
        {
          value: '50',
        },
        {
          value: '30',
        },
        {
          value: '49',
        },
        {
          value: '22',
        },
        {
          value: '43',
        },
        {
          value: '14',
        },
        {
          value: '31',
        },
      ]}

  }
  onValueChange = (event) => {
    const{categoryYears,categoryMonth}=this.state
    event.target.value === 'years' ? this.setState({showHide:false,category:categoryYears}) : this.setState({showHide:true,category:categoryMonth})
  }
  render() {
    const { showHide, category , dataKoto,data2,dataAdmob,data3,dropdown} = this.state
    return (
      <div>
        <ReactFusioncharts
          type="msspline"
          width="100%"
          height="400"
          dataFormat="JSON"
          dataSource={{
            chart: {
              caption:' Koto vs Utility vs Admob',
              numdivlines: '3',
              showvalues: '0',
              legenditemfontsize: '15',
              legenditemfontbold: '1',
              plottooltext: '<b>$dataValue</b> Tickets $seriesName on $label',
              theme: 'fusion',
            },
            categories: [
              {
                category
              },
            ],
            dataset: [
              {
                seriesname: 'Koto',
                data: dataKoto ,
              },
              {
                seriesname: 'Utility',
                data: dataAdmob,
              },
              {
                seriesname: 'Admob',
                data: [
                  {
                    value: '95',
                  },
                  {
                    value: '25',
                  },
                  {
                    value: '92',
                  },
                  {
                    value: '79',
                  },
                  {
                    value: '28',
                  },
                  {
                    value: '58',
                  },
                  {
                    value: '92',
                  },
                ],
              },
            ],
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
                <Dropdown.Toggle id="dropdown-basic">
             {dropdown}
                </Dropdown.Toggle>

                <Dropdown.Menu className="menuYears">
                  <Dropdown.Item
                    eventKey="0"
                    onSelect={() => this.setState({dataKoto:data2,dataAdmob:data3,dropdown:"2021"})}
                  >
                    {new Date().getUTCFullYear()}
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="1"
                    onSelect={() => this.setState({dataKoto:data3,dataAdmob:data2,dropdown:"2020"})}
                  >
                    {new Date().getUTCFullYear() - 1}
                  </Dropdown.Item>
                  {/* <Dropdown.Item
                    eventKey="2"
                    onSelect={() => this.updatedefult()}
                  >
                    {new Date().getUTCFullYear() - 2}
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="3"
                    onSelect={() => this.updateData2021()}
                  >
                    {new Date().getUTCFullYear() - 3}
                  </Dropdown.Item> */}
                </Dropdown.Menu>
              </Dropdown>
            )}
          </div>
        </div>
      </div>
    )
  }
}
export default VedioChart
