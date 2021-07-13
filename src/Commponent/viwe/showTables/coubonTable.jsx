import React, { Component } from 'react'
import axios from 'axios'
import { Table } from 'react-bootstrap'
class CoubonTable extends Component {
  state = {
    token: localStorage.getItem('token'),
    allCoubon: [],
    filterData: [],
    filter: '',
    key: 0,
    keypagnation: 0,
    disablepre: true,
    token: localStorage.getItem('token'),
    max_id: '',
    min_id: '',
    disablepre: true,
    disablenext: false,
    styleNext: '',
    stylePre: '#6b18ff80'
  }
  getCoubonApi = async () => {
    try {
      const { token } = this.state
      const resp = await axios({
        method: 'get',
        url:`https://koto2020.herokuapp.com/api/gift/all?type=COUPON_CODE&size=2`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(resp)
      await this.setState({ allCoubon: resp.data.gifts.data,max_id: resp.data.gifts.paging.cursors.max_id,
        min_id: resp.data.gifts.paging.cursors.min_id, })
      console.log(this.state.allCoubon)
    } catch (err) {
      console.log(err)
    }
  }
  deleteApp = async (item) => {
     
    try {
      const { token } = this.state
      const resp = await axios({
        method: 'delete',
        url: `https://koto2020.herokuapp.com/api/gift/${item._id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(resp)
      this.setState(prevState => ({
        allCoubon: prevState.allCoubon.filter(row => (
          row._id !== item._id
        ))
      }))
    } catch (err) {
      console.log(err)
    }
  }
  componentDidMount() {
    this.getCoubonApi()
  }
  next = async () => {
    const { token, max_id, key, keypagnation } = this.state

    try {
      await this.setState({ keypagnation: keypagnation + 20, key: key + 1 })
      const resp = await axios({
        method: 'get',
        url: `https://koto2020.herokuapp.com/api/gift/all?type=COUPON_CODE&max_id=${max_id}&size=2`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(resp.data.gifts.paging)
      await this.setState({
        allCoubon: resp.data.gifts.data,
        max_id: resp.data.gifts.paging.cursors.max_id,
        min_id: resp.data.gifts.paging.cursors.min_id,
      })
      if (!resp.data.gifts.paging.hasNext) {
        this.setState({
          disablenext: true,
          styleNext: '#6b18ff80',
          disablepre: false,
          stylePre: '#6b18ff',
        })
      } else {
        this.setState({
          disablenext: false,
          disablepre: false,
          stylePre: '#6b18ff',
        })
      }
    } catch (err) {
      console.log(err)
    }
  }
  pre = async () => {
    const { key, keypagnation, token, min_id } = this.state
    try {
      await this.setState({ keypagnation: keypagnation - 20, key: key - 1 })
      const resp = await axios({
        method: 'get',
        url: `https://koto2020.herokuapp.com/api/gift/all?type=COUPON_CODE&min_id=${min_id}&size=2`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(resp.data.gifts.paging)
      await this.setState({
        allCoubon: resp.data.gifts.data,
        max_id: resp.data.gifts.paging.cursors.max_id,
        min_id: resp.data.gifts.paging.cursors.min_id,
      })
      if (!resp.data.gifts.paging.hasPrevious) {
        this.setState({
          disablepre: true,
          disablenext: false,
          styleNext: '#6b18ff',
          stylePre: '#6b18ff80',
        })
      } else {
        this.setState({
          disablepre: false,
          disablenext: false,
          styleNext: '#6b18ff',
        })
      }
    } catch (err) {
      console.log(err)
    }
  }
  render() {
      const{allCoubon,filter,
      keypagnation,
      styleNext,
      disablenext,
      disablepre,
      stylePre,}=this.state
    return <div className="col-12 py-5 px-3 my-1 border rounded bg-light">
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
          <th> اسم </th>
          <th> عدد النقاط </th>
          <th> كود الشحن </th>
          <th> قيمه الكارت </th>
          <th> الاستخدام </th>
          <th> التفاصيل </th>
          <th> مسح </th>
        </tr>
      </thead>
      <tbody className="trCatergory text-center">

        {allCoubon.map((item) => {
            console.log(allCoubon.used)
          return (
            <tr key={item._id}>
              <td>{item.title}</td>
              <td>{item.points}</td>
              <td>{item.code}</td>
              <td>{item.value}</td>
              <td>{item.used.toString()}</td>
              <td
                onClick={() => {
                    this.redirect(item)
                }}
              >
                <i className="far fa-eye"></i>
              </td>
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
    <button
              onClick={this.next}
              className="pgnationbtn"
              disabled={disablenext}
              style={{ background: styleNext }}
            >
              التالي{' '}
            </button>

            <p className="text-nowrap px-2">
              من{keypagnation} الي {keypagnation + 20}{' '}
            </p>
            <button
              className="pgnationbtn "
              onClick={this.pre}
              disabled={disablepre}
              style={{ background: stylePre }}
            >
              السابق
            </button>
    </div>
  </div>
  }
}

export default CoubonTable
