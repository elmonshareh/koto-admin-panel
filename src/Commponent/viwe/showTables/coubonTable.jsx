import React, { Component } from 'react'
import axios from 'axios'
import { Table } from 'react-bootstrap'
import Delete from './../../variables/delete';
import SpinnerChart from './../../variables/spinnerCharts';
class CoubonTable extends Component {
  state = {
    token: localStorage.getItem('token'),
    allCoubon: [],
    filterData: [],
    filter: '',
    key: 1,
    keypagnation: 10,
    disablepre: true,
    token: localStorage.getItem('token'),
    max_id: '',
    min_id: '',
    disablepre: true,
    disablenext: false,
    styleNext: '',
    stylePre: '#6b18ff80',
    show: false,
    status:"",   
     isLoading: false,
  }
  getCoubonApi = async () => {
    this.setState({ isLoading:true})
    try {
      const { token } = this.state
      const resp = await axios({
        method: 'get',
        url:`https://koto2020.herokuapp.com/api/gift/all?type=COUPON_CODE&size=10`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
  
      await this.setState({ allCoubon: resp.data.gifts.data,max_id: resp.data.gifts.paging.cursors.max_id,
        min_id: resp.data.gifts.paging.cursors.min_id,  isLoading: false, })
        if (!resp.data.gifts.paging.hasNext) {
          this.setState({
            disablenext: true,
            styleNext: '#6b18ff80',
          })}
   
    } catch (err) {
      this.props.history.push(`/404`)
    }
  }
  delete = async (status) => {
    try {
      const { token,show } = this.state
      const resp = await axios({
        method: 'delete',
        url: `https://koto2020.herokuapp.com/api/gift/${status}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
     
      this.setState(prevState => ({
        allCoubon: prevState.allCoubon.filter(row => (
          row._id !== status
        ))
      }))
      this.setState({show:!show})
    } catch (err) {
      this.props.history.push(`/404`)
    }
  }
  componentDidMount() {
    this.getCoubonApi()
  }
  next = async () => {
    const { token, max_id, key, keypagnation } = this.state
    this.setState({ isLoading:true})
    try {
      await this.setState({ keypagnation: keypagnation + 10, key:key + 10 })
      const resp = await axios({
        method: 'get',
        url: `https://koto2020.herokuapp.com/api/gift/all?type=COUPON_CODE&max_id=${max_id}&size=10`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
     
      await this.setState({
        allCoubon: resp.data.gifts.data,
        max_id: resp.data.gifts.paging.cursors.max_id,
        min_id: resp.data.gifts.paging.cursors.min_id,
        isLoading:false
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
      this.props.history.push(`/404`)
    }
  }
  pre = async () => {
    const { key, keypagnation, token, min_id } = this.state
    this.setState({ isLoading:true})
    try {
      await this.setState({ keypagnation: keypagnation - 10, key: key - 10})
      const resp = await axios({
        method: 'get',
        url: `https://koto2020.herokuapp.com/api/gift/all?type=COUPON_CODE&min_id=${min_id}&size=10`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
  
      await this.setState({
        allCoubon: resp.data.gifts.data,
        max_id: resp.data.gifts.paging.cursors.max_id,
        min_id: resp.data.gifts.paging.cursors.min_id,
        isLoading:false
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
      this.props.history.push(`/404`)
    }
  }
  handleShow = (item) => {
    const { show } = this.state
    this.setState({ show: !show ,status:item.title})
  }
  render() {
      const{allCoubon,filter,
      keypagnation,
      styleNext,
      disablenext,
      disablepre,
      stylePre,
      show,
      key,
      status,isLoading
    }=this.state
    return <div className="col-12 py-5 px-3 my-1 border rounded bg-light">
       <Delete show={show} handleShow={this.handleShow} status={status} delete={()=>this.delete(status)}  />
    {/* <div className="d-flex ">
      <label>البحث :</label>
      <input
        type="text"
        className="filter  mr-2 p-1"
        vaule={filter}
        onChange={this.handleChange}
      />
    </div> */}
 <h3 className="d-flex mb-4"> عرض  كوبونات</h3>
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
          {/* <th> التفاصيل </th> */}
          <th> مسح </th>
        </tr>
      </thead>
      <tbody className="trCatergory text-center">
      {isLoading ? 
              <tr>
            
              <td colspan="8" > <div className="d-flex justify-content-center uerSpiner ">
            <SpinnerChart />
          </div></td>
             
                </tr>
             :
        allCoubon.map((item) => {
          return (
            <tr key={item._id}>
              <td>{item.title}</td>
              <td>{item.points}</td>
              <td>{item.code}</td>
              <td>{item.value}</td>
              <td>{item.used.toString()}</td>
              {/* <td
                onClick={() => {
                    this.redirect(item)
                }}
              >
                <i className="far fa-eye"></i>
              </td> */}
              <td
                onClick={() => {
                  this.handleShow(item)
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
            من{key} الي {keypagnation}{' '}
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
