import React, { Component } from 'react';
import axios from 'axios'
import { Table } from 'react-bootstrap';
class VedioTable extends Component {
    state = {  items: [],  token: localStorage.getItem('token'), errors: {}, allVedio: [],
    filter: '',
    filterData: [],
    key: 0,
    keypagnation: 0,
    disablepre: true,}
    getVideo = async () => {
        try {
          const { token, key } = this.state
          const resp = await axios({
            method: 'get',
            url: `https://koto2020.herokuapp.com/api/video?page=${key}`,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          console.log(resp)
          await this.setState({ allVedio: resp.data.videos })
        } catch (err) {
          console.log(err)
        }
      }
      redirect = (item) => {
        console.log(item._id)
        this.props.history.push(`/admin/AddADS/AddVedio${item._id}`)
      }
      deleteVideo = async (item) => {
        const allVedio = [...this.state.allVedio]
        try {
          const { token } = this.state
          const resp = await axios({
            method: 'delete',
            url: `https://koto2020.herokuapp.com/api/video/${item._id}`,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          console.log(resp)
          allVedio.splice(item._id, 1)
          this.setState({ allVedio })
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
            url: `https://koto2020.herokuapp.com/api/video?title=${filter}&date=${filter}&page=${key}`,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          console.log(resp)
          filterData = resp.data.videos
          this.setState({ filterData: filterData })
          filterData ? console.log(filterData) : console.log('m')
          this.setState({ allVedio: filterData })
        } catch (err) {
          console.log(err.response)
        }
      }
      handleChange = async (e) => {
        const { filter } = this.state
        this.setState({ filter: e.target.value, allVedio: [] })
        if (filter) {
          this.getFiltertion()
        } else {
          await this.getVideo()
          console.log('emtyy')
        }
      }
      next = async () => {
        const { key, keypagnation, filter } = this.state
        this.setState({ disablepre: false })
        await this.setState({ keypagnation: keypagnation + 20, key: key + 1 })
        console.log(key)
        console.log(keypagnation)
        if (filter) {
          await this.getFiltertion()
        } else {
          await this.getVideo()
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
          await this.getVideo()
        }
      }
      componentDidMount() {
        this.getVideo()
      }
    render() { 
        const{filter,allVedio,keypagnation,disablepre}=this.state
        return ( <div> <div className="pt-5 px-3 mb-5 border rounded bg-light">
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
          responsive
          bordered
          className="table text-nowrap table-white "
        >
          <thead className="tdCatergory text-center">
            <tr>
              <th>الاسم</th>
              <th>عدد النقاط </th>
              <th>تاريخ الانتهاء</th>
              <th>التفاصيل</th>
              <th> مسح</th>
            </tr>
          </thead>
          <tbody className="trCatergory text-center ">
            {allVedio.map((item) => {
              return (
                <tr key={item._id}>
                  <td>{item.title}</td>
                  <td>{item.points}</td>
                  <td>{item.expireDate}</td>
                  <td
                    onClick={() => {
                      this.redirect(item)
                    }}
                  >
                    <i className="far fa-eye"></i>
                  </td>
                  <td
                    onClick={() => {
                      this.deleteVideo(item)
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
                  className="pgnationbtn "
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
      </div></div> );
    }
}
 
export default VedioTable;