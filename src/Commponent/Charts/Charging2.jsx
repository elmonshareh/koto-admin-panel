import React, { Component } from 'react'
import FusionCharts from 'fusioncharts'
import charts from 'fusioncharts/fusioncharts.charts'
import ReactFusioncharts from 'react-fusioncharts'
import Dropdown from 'react-bootstrap/Dropdown'
import axios from 'axios'
import SpinnerChart from './../variables/spinnerCharts'
// Resolves charts dependancy
charts(FusionCharts)

class ChargingChart2 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'قيمه الكرت',
      token: localStorage.getItem('token'),
      filter: '50',
      filters: [],
      data: [],
      isLoading: false,
    }
  }

  ChargingCardApi = async () => {
    const { token } = this.state
    this.setState({ isLoading: true })
    try {
      const resp = await axios({
        method: 'get',
        url: 'https://koto2020.herokuapp.com/api/dashboard/chart/card',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      console.log(resp)
      this.setState({ data: resp.data.data, isLoading: false })
    } catch (err) {
      this.props.history.push(`/404`)

    }
  }

  componentDidMount() {
    this.ChargingCardApi()
  }

  render() {
    const { data, isLoading } = this.state
    return (
      <div>
        {' '}
        {isLoading ? (
          <div className="d-flex justify-content-center pieChart ">
            <SpinnerChart />
          </div>
        ) : (
          <div>
            <ReactFusioncharts
              type="doughnut2d"
              width="100%"
              height="335"
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
            />{' '}
          </div>
        )}
      </div>
    )
  }
}
export default ChargingChart2
