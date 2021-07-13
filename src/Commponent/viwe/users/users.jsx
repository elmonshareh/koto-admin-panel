import axios from 'axios'
import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
class Users extends Component {
  state = {
    token: localStorage.getItem('token'),
    allUsers: [],
    key: 0,
    filter: '',
    filterData: [],
    keypagnation: 0,
    max_id: '',
    min_id: '',
    disablepre: true,
    disablenext: false,
    styleNext: '',
    stylePre: '#6b18ff80'

  }
  getUsers= async () => {
    try {
      const { token } = this.state
      const resp = await axios({
        method: 'get',
        url: 'https://koto2020.herokuapp.com/api/users',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(resp.data.users)
      await this.setState({
        allUsers: resp.data.users
      })
    } catch (err) {
      console.log(err)
    }
  }
  redirect = (item) => {
    this.props.history.push(`/admin/UserInfo${item._id}`)
  }
  componentDidMount(){ this.getUsers()}
  render() {
    const {  allUsers, filter, keypagnation, disablepre } = this.state
    return (
      <div className="container p-5">
        <div className="row">
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
                  <th> كود </th>
                  <th>الاسم</th>
                  <th> النوع </th>
                  <th> عدد النقاط </th>
                  <th>  الحاله </th>
                  <th> رقم التليفوان </th>
                  <th> التفاصيل </th>
                  <th> مسح </th>
                </tr>
              </thead>
              <tbody className="trCatergory text-center">
                { allUsers.map((item) => {
                  console.log( allUsers)
                  return (
                    <tr key={item._id}>
                      <td>{item._id}</td>
                      <td>{item.firstName+item.lastName}</td>
                      <td>{item.role}</td>
                      <td>{item.points}</td>
                      <td>{item.status}</td>
                      <td>{item.phoneNumber}</td>
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
          </div>
        </div>
      </div>
    )
  }
}

export default Users
