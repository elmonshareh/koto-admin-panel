import React, { Component } from 'react'
import axios from 'axios'
import { Table } from 'react-bootstrap'
class ChargingTable extends Component {
  state = {
    token: localStorage.getItem('token'),
    allCard: [],
    key: 0,
    keypagnation: 0,
    disablepre: true,
  }
  getCardApi = async () => {
    try {
      const { token, key } = this.state
      const resp = await axios({
        method: 'get',
        url: `https://koto2020.herokuapp.com/api/Card?&page=${key}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(resp)
      await this.setState({ allCard: resp.data.cards })
      console.log(this.state.allCard)
    } catch (err) {
      console.log(err)
    }
  }
  componentDidMount() {
    this.getCardApi()
  }
  redirect = (item) => {
    console.log(item._id)
    this.props.history.push(`/admin/details/${item._id}`)
  }
  getFiltertion = async () => {
    const { token, filter, key } = this.state
    var filterData = []
    try {
      const resp = await axios({
        method: 'get',
        url: `https://koto2020.herokuapp.com/api/Card?title=${filter}&page=${key} `,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(resp)
      filterData = resp.data.cards
      this.setState({ filterData: filterData })
      filterData ? console.log('mmm') : console.log('m')
      this.setState({ allCard: filterData })
    } catch (err) {
      console.log(err.response)
    }
  }
  handleChange = async (e) => {
    const { filter } = this.state
    this.setState({ filter: e.target.value })
    if (filter) {
      this.getFiltertion()
    } else {
      await this.getCardApi()
      console.log('emtyy')
    }
  }
 
  next = async () => {
    const { key, keypagnation, filter } = this.state
    this.setState({ disablepre: false })
    await this.setState({ keypagnation: keypagnation + 20, key: key + 1 })

    console.log(keypagnation)
    if (filter) {
      await this.getFiltertion()
    } else {
      await this.getCardApi()
    }
  }
  pre = async () => {
    const { key, keypagnation } = this.state

    if (this.state.key === 1) {
      this.setState({ disablepre: true })
    }
    await this.setState({ keypagnation: keypagnation - 20, key: key - 1 })
    if (this.state.filter) {
      await this.getFiltertion()
    } else {
      await this.getCardApi()
    }
  }

  deleteApp = async (item) => {
    const allCard = [...this.state.allCard]
    try {
      const { token } = this.state
      const resp = await axios({
        method: 'delete',
        url: `https://koto2020.herokuapp.com/api/Card/${item._id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(resp)
      allCard.splice(item._id, 1)
      this.setState({ allCard })
    } catch (err) {
      console.log(err)
    }
  }
  render() {
    const { allCard, filter, keypagnation, disablepre } = this.state
    return (
      <div className="col-12 py-5 px-3 my-1 border rounded bg-light">
        <div className="d-flex ">
          <label>البحث :</label>
          <input
            type="text"
            className="filter  mr-2 p-1"
            vaule={filter}
            onChange={this.handleChange}
          />
        </div>

        <Table
          striped
          hover
          bordered
          className="table text-nowrap mt-3"
          responsive
        >
          <thead className="tdCatergory text-center">
            <tr>
              <th> اسم الشبكه</th>
              <th> عدد النقاط </th>
              <th> كود الشحن </th>
              <th> قيمه الكارت </th>
              <th> الاستخدام </th>
              <th> مسح </th>
            </tr>
          </thead>
          <tbody className="trCatergory text-center">
            {allCard.map((item) => {
              console.log(item.used.toString())
              return (
                <tr key={item._id}>
                  <td>{item.title}</td>
                  <td>{item.points}</td>
                  <td>{item.chargeCode}</td>
                  <td>{item.value}</td>
                  <td>{item.used.toString()}</td>
                  <td
                    onClick={() => {
                      this.deleteApp(item)
                    }}
                  >
                    <i className="fas fa-trash-alt"></i>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
        <div className="d-flex justify-content-between px-5 pb-4 mt-3">
          {' '}
          <button
            className="pgnationbtn"
            onClick={this.pre}
            disabled={disablepre}
          >
            السابق
          </button>{' '}
          <p className="text-nowrap px-2">
            من{keypagnation} الي {keypagnation + 20}{' '}
          </p>
          <button onClick={this.next} className="pgnationbtn">
            التالي{' '}
          </button>
        </div>
      </div>
    )
  }
}

export default ChargingTable
