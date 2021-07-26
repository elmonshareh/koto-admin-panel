import React, { Component } from 'react'
import FusionCharts from 'fusioncharts'
import charts from 'fusioncharts/fusioncharts.charts'
import ReactFusioncharts from 'react-fusioncharts'
import axios from 'axios'
import SpinnerChart from './../variables/spinnerCharts'
// Resolves charts dependancy
charts(FusionCharts)
class BillChats extends React.Component {
  state = { token: localStorage.getItem('token'), data: [], isLoading: false }
  getBialChart = async () => {
    const { token } = this.state
    this.setState({ isLoading: true })
    try {
      const resp = await axios({
        method: 'get',
        url: 'https://koto2020.herokuapp.com/api/dashboard/chart/gift',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      await this.setState({ data: resp.data.data, isLoading: false })
      console.log(resp.data.data)
    } catch (err) {
      // Handle Error
      this.props.history.push(`/404`)
    }
  }

  componentDidMount() {
    this.getBialChart()
  }
  render() {
    const { data, isLoading } = this.state
    return (
      <div>
        {isLoading ? (
          <div className="d-flex justify-content-center pieChart ">
            <SpinnerChart />
          </div>
        ) : (
          <div>

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


                  caption: 'الفواتير ',
                },
                data: data,
              }}
            />
          </div>
        )}
      </div>
    )
  }
}
export default BillChats
