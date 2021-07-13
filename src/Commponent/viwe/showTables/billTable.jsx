import React, { Component } from 'react';
import axios from 'axios'
import { Table } from 'react-bootstrap'
class BillTables extends Component {
    state = {
        token: localStorage.getItem('token'),
        allBill:[],
        key: 0,
        filter: '',
        filterData: [],
        keypagnation: 0,
        max_id: '',
        min_id: '',
        disablepre: true,
        disablenext: false,
        styleNext: '',
        stylePre: '#6b18ff80',
      }
  
      getBillApi = async () => {
        try {
          const { token, key } = this.state
          const resp = await axios({
            method: 'get',
            url: `https://koto2020.herokuapp.com/api/gift/all?type=BILL&size=4`,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          console.log(resp)
       await this.setState({ allBill:resp.data.gifts.data,
        max_id: resp.data.gifts.paging.cursors.max_id,
        min_id: resp.data.gifts.paging.cursors.min_id,})
        
        } catch (err) {
          console.log(err)
        }
      }
      componentDidMount() {
        this.getBillApi()
      }
      redirect = (item) => {
        console.log(item._id)
        this.props.history.push(`/admin/gift/billDetailes${item._id}`)
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
        
          this.setState({ allBill: filterData })
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
        const { token, max_id, key, keypagnation } = this.state
    
        try {
          await this.setState({ keypagnation: keypagnation + 20, key: key + 1 })
          const resp = await axios({
            method: 'get',
            url: `https://koto2020.herokuapp.com/api/gift/all?type=BILL&max_id=${max_id}&size=4`,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          console.log(resp.data.gifts.paging)
          await this.setState({
            allBill: resp.data.gifts.data,
            max_id:resp.data.gifts.paging.cursors.max_id,
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
        const { key, keypagnation, token, min_id, hasPrevious } = this.state
        try {
          await this.setState({ keypagnation: keypagnation - 20, key: key - 1 })
          const resp = await axios({
            method: 'get',
            url: `https://koto2020.herokuapp.com/api/gift/all?type=BILL&min_id=${min_id}&size=4`,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          console.log(resp.data.gifts.paging)
          await this.setState({
            allBill: resp.data.gifts.data,
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
            allBill: prevState.allBill.filter(row => (
              row._id !== item._id
            ))
          }))
        } catch (err) {
          console.log(err)
        }
      }
    render() { 
    
        const { allBill, filter, keypagnation,  styleNext,
          disablenext,
          disablepre,
          stylePre, } = this.state
       
        return (<div className="col-12 py-5 px-3 my-1 border rounded bg-light">
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
              <th>نوع</th>
              <th> عدد النقاط </th>
              <th> كود الشحن </th>
              <th> قيمه الكارت </th>
              <th> الاستخدام </th>
              <th> التفاصيل </th>
              <th> مسح </th>
            </tr>
          </thead>
          <tbody className="trCatergory text-center">

            {allBill.map((item) => {
                console.log(allBill)
              return (
                <tr key={item._id}>
                  <td>{item.title}</td>
                  <td>{item.name}</td>
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
      </div> );
    }
}
 
export default BillTables;