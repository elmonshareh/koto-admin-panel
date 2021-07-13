import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import axios from 'axios'
class SurveyTable extends Component {
  state = {
    filter: '',
    filterData: [],
    key: 0,
    keypagnation: 0,
    allSurveys: [],
    max_id: '',
    min_id:'',
    token: localStorage.getItem('token'),
    date: new Date().toISOString().split('T')[0],
    datastanp:"",
    hasNext:"",
    disablepre:true,
    disablenext:false,
    styleNext:"",
    stylePre:"#6b18ff80"
   
  }
  getSurvay = async () => {
    try {
      const { token, key } = this.state

      const resp = await axios({
        method: 'get',
        url: `https://koto2020.herokuapp.com/api/Survey?size=4`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(resp.data.data.paging.cursors)
      await this.setState({
        allSurveys: resp.data.data.data,
        max_id: resp.data.data.paging.cursors.max_id,
        min_id: resp.data.data.paging.cursors.min_id,
      })
    } catch (err) {
      console.log(err)
    }
  }
  componentDidMount = () => {
    this.getSurvay()
  }
  redirect = (item) => {
    console.log(item._id)
    this.props.history.push(`/admin/AddADS/survay${item._id}`)
  }
  deleteSurvay = async (item) => {
    try {
      const { token } = this.state
      const resp = await axios({
        method: 'delete',
        url: `https://koto2020.herokuapp.com/api/Survey/${item._id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(resp)
      this.setState(prevState => ({
        allSurveys: prevState.allSurveys.filter(row => (
          row._id !== item._id
        ))
      }))
    } catch (err) {
      console.log(err)
    }
  }
  getFiltertion = async () => {
    const { token, filter, key, allSurveys } = this.state
    var filterData = []
    try {
      const resp = await axios({
        method: 'get',
        url: `https://koto2020.herokuapp.com/api/Survey?data=${filter}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(resp)
      filterData = resp.data.data.data
      this.setState({ filterData: filterData })
      filterData ? console.log(filterData) : console.log('m')
      this.setState({ allSurveys: filterData })
      console.log(allSurveys)
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
      await this.getSurvay()
      console.log('emtyy')
    }
  }

  next = async () => {
    const { token, max_id, key, keypagnation,min_id } = this.state
 
    try {
      await this.setState({ keypagnation: keypagnation + 20, key: key + 1 })
      const resp = await axios({
        method: 'get',
        url: `https://koto2020.herokuapp.com/api/Survey?max_id=${max_id}&size=4`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(resp)
    
      await this.setState({
        allSurveys: resp.data.data.data,
        max_id: resp.data.data.paging.cursors.max_id,
        min_id: resp.data.data.paging.cursors.min_id,
        hasNext:resp.data.data.paging.cursors.hasNext
      })
      if( !resp.data.data.paging.hasNext){
        this.setState({ disablenext:true,styleNext:"#6b18ff80", disablepre:false,stylePre:"#6b18ff"})
    
       } else{ 
       this.setState({ disablenext:false , disablepre:false,stylePre:"#6b18ff"}) }
    } catch (err) {
      console.log(err)
    }
  }

  pre = async () => {
    const { key, keypagnation, token, min_id } = this.state
    
    
    await this.setState({ keypagnation: keypagnation - 20, key: key - 1 })
    try {
      const resp = await axios({
        method: 'get',
        url: `https://koto2020.herokuapp.com/api/Survey?min_id=${min_id}&size=4`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(resp)
      await this.setState({
        allSurveys: resp.data.data.data,
        max_id: resp.data.data.paging.cursors.max_id,
        min_id: resp.data.data.paging.cursors.min_id,
      })
      if(!resp.data.data.paging.hasPrevious){
     
        this.setState({ disablepre:true, disablenext:false,styleNext:"#6b18ff" ,stylePre:"#6b18ff80"})
       
    } else{ 
    this.setState({ disablepre:false,disablenext:false ,styleNext:"#6b18ff"})}
    } catch (err) {
      console.log(err)
    }
   
  }
  timestanp = async(event) => {
    this.setState({date: event.target.value })
    var date = this.state.date

    var mint = new Date().getMinutes()
    var hours = new Date().getHours()

    var output =
      date + ':' + ('0' + hours).slice(-2) + ':' + ('0' + mint).slice(-2)
    var datastanp = new Date(output).getTime()
    this.setState({ datastanp: datastanp })
    console.log( datastanp )
    try {
      const { token, key } = this.state

      const resp = await axios({
        method: 'get',
        url: `https://koto2020.herokuapp.com/api/Survey?date=${datastanp}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(resp.data.data.paging.cursors)
 
      await this.setState({
        allSurveys: resp.data.data.data,
        max_id: resp.data.data.paging.cursors.max_id,
        min_id: resp.data.data.paging.cursors.min_id,
      })
    } catch (err) {
      console.log(err)
    }
  }
  render() {
    const { allSurveys, filter, keypagnation, date,disablenext, disablepre,stylePre,styleNext}  = this.state
    //   
    return (
      <div className="col-12 py-5  mb-3 border rounded bg-light ">
        <div className="d-flex mb-2">
          <label>البحث :</label>{' '}
          <input
            type="text"
            className="filter mr-2 p-1"
            vaule={filter}
            onChange={this.handleChange}
          />
          <input type="date" name="date"  value={date}  onChange={this.timestanp }/>
        </div>
        <Table
          striped
          hover
          bordered
          className="table text-nowrap table-light"
          responsive
        >
          <thead className="tdCatergory text-center">
            <tr>
              <th> الاسم</th>
              <th> عدد النقاط </th>
              <th> تاريخ الانتهاء </th>
              <th> التفاصيل </th>
              <th> مسح </th>
            </tr>
          </thead>
          <tbody className="trCatergory text-center">
            {allSurveys.map((all) => {
              return (
                <tr key={all._id}>
                  <td>{all.name}</td>
                  <td>{all.points}</td>
                  <td>{all.expireDate}</td>
                  <td
                    onClick={() => {
                      this.redirect(all)
                    }}
                  >
                    <i className="far fa-eye"></i>
                  </td>
                  <td
                    onClick={() => {
                      this.deleteSurvay(all)
                    }}
                  >
                    <i className="fas fa-trash-alt"></i>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
        <div className="d-flex justify-content-between px-5  mt-3">
        <button onClick={this.next} className="pgnationbtn"  disabled={disablenext} style={{background:styleNext}}>
            التالي
          </button>
          <p className="text-nowrap px-2">
            من{keypagnation} الي {keypagnation + 20}
          </p>
        
          <button
            className="pgnationbtn"
            onClick={this.pre}
            disabled={disablepre}
            style={{background:stylePre}}
          >
            السابق
          </button>
        </div>
      </div>
    )
  }
}

export default SurveyTable
