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
ReactFC.fcRoot(FusionCharts, Chart, FusionTheme)

const chartConfigs = {
  type: 'column2d',
  width: '100%',
  height: 400,
  dataFormat: 'json',
  dataSource: {
    chart: {
      
      decimals: '3',
      theme: 'fusion',
    },
    // Chart data
    data: [
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
  },
}

class Chartfff extends Component {
  constructor(props) {
    super(props)
    this.state = { yaers: [2021, 2022, 2023], showHide: true ,dropdown:"اختر السنه"}
    this.state = chartConfigs
  }

  updateData() {
    var prevDs = Object.assign({}, this.state.dataSource)
    var year = new Date().getUTCFullYear()

    prevDs.data = [
      {
        label: year.toString(),
        value: '309',
      },
      {
        label: (new Date().getUTCFullYear() - 1).toString(),
        value: '756',
      },
      {
        label: (new Date().getUTCFullYear() - 2).toString(),
        value: '488',
      },
      {
        label: (new Date().getUTCFullYear() - 3).toString(),
        value: '550',
      },
    ]
    this.setState({
      dataSource: prevDs,
      showHide: false,
    })
  }
  updatedefult() {
    var prevDs = Object.assign({}, this.state.dataSource)
    prevDs.data = chartConfigs.dataSource.data
    this.setState({
      dataSource: prevDs,
      showHide: true,
    })
  }
  onValueChange = (event) => {
    console.log(event.target.value)
    event.target.value === 'years' ? this.updateData() : this.updatedefult()
  }
  updateData2021() {
    var prevDs = Object.assign({}, this.state.dataSource)
    prevDs.data = [
      {
        label: 'JAN',
        value: '525',
      },
      {
        label: 'Feb',
        value: '266',
      },
      {
        label: ' MAR',
        value: '190',
      },
      {
        label: ' APR',
        value: '840',
      },
      {
        label: ' MAY',
        value: '115',
      },
      {
        label: ' JUN',
        value: '1300',
      },
      {
        label: 'JUL',
        value: '340',
      },
      {
        label: ' AGU ',
        value: '650',
      },
      {
        label: ' SPE ',
        value: '366',
      },
      {
        label: ' OCT',
        value: '3049',
      },
      {
        label: ' NOVDEC',
        value: '350',
      },
      {
        label: ' DEC',
        value: '358',
      },
    ]

    this.setState({
      dataSource: prevDs,
      showHide: true,
    })
  }

  render() {
    const { showHide,dropdown } = this.state

    console.log()

    return (
      <div className="text-right">
        <div>
          {' '}
          <ReactFC {...this.state} />
        </div>
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
                  اختر السنه
                </Dropdown.Toggle>

                <Dropdown.Menu className="menuYears">
                  <Dropdown.Item
                    eventKey="0"
                    onSelect={() => this.updatedefult()}
                  >
                    {new Date().getUTCFullYear()}
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="1"
                    onSelect={() => this.updateData2021()}
                  >
                    {new Date().getUTCFullYear() - 1}
                  </Dropdown.Item>
                  <Dropdown.Item
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
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </div>
        </div>
      </div>
    )
  }
}
export default Chartfff
