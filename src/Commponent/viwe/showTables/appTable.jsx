import React, {Component } from 'react';
import axios from 'axios'
import { Table } from 'react-bootstrap';
class AppTable extends Component {
    state = {   allApp: [],
        filterData: [],
        filter: '',
        key: 0,
        keypagnation: 0,
        disablepre: true,token: localStorage.getItem('token'),}
    getApp = async () => {
        try {
          const { token, key } = this.state
          const resp = await axios({
            method: 'get',
            url: `https://koto2020.herokuapp.com/api/app?page=${key}`,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          console.log(resp)
          await this.setState({ allApp: resp.data.apps })
        } catch (err) {
          console.log(err)
        }
      }
      redirect = (item) => {
        console.log(item._id)
        this.props.history.push(`/admin/AddADS/App${item._id}`)
      }
      deleteApp = async (item) => {
        const allApp = [...this.state.allApp]
        try {
          const { token } = this.state
          const resp = await axios({
            method: 'delete',
            url: `https://koto2020.herokuapp.com/api/app/${item._id}`,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          console.log(resp)
          allApp.splice(item._id, 1)
          this.setState({ allApp })
        } catch (err) {
          console.log(err)
        }
      }
      getFiltertion = async () => {
        const { token, filter, key } = this.state
        var filterData = []
        try {
          const resp = await axios({
            method: 'get',
            url: `https://koto2020.herokuapp.com/api/app?date=${filter}&page=${key} `,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          console.log(resp)
          filterData = resp.data.apps
          this.setState({ filterData: filterData })
          filterData ? console.log('mmm') : console.log('m')
          this.setState({ allApp: filterData })
        } catch (err) {
          console.log(err.response)
        }
      }
      handleChange = async (e) => {
        const { filter, } = this.state
        this.setState({ filter: e.target.value })
        if (filter) {
          this.getFiltertion()
        } else {
          await this.getApp()
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
          await this.getApp()
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
          await this.getApp()
        }
      }
      componentDidMount() {
        this.getApp()
      }
    render() { 
    const{allApp,
        filter, keypagnation, key ,disablepre}=this.state
        return ( <div> <div className="py-5 px-3 mt-5 border rounded bg-light ">
        <div className="d-flex mb-3 ">
          <label>البحث :</label>{' '}
          <input
            type="text"
            className="filter mr-2 p-1"
            vaule={filter}
            onChange={this.handleChange}
          />
        </div>
        <Table
          striped
          hover
          bordered
          className="table text-nowrap table-light"
          responsive
        >
          <thead className="tdCatergory">
            <tr className="text-center">
              <th> اسم التطبيق</th>
              <th> عدد النقاط</th>
              <th> تاريخ الانتهاء </th>
              <th> التفاصيل </th>
              <th> مسح </th>
            </tr>
          </thead>
          <tbody className="trCatergory ">
            {allApp.map((item) => {
              console.log(item)
              return (
                <tr key={item._id} className="text-center">
                  <td> {item.title}</td>
                  <td> {item.points}</td>
                  <td> {item.expireDate}</td>
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
      </div>  </div> );
    }
}
 
export default AppTable;