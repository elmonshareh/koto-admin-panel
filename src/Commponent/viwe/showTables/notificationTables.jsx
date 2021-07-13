import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
class NotificationTables extends Component {
  state = { filter: '',allNotification:[] , filter: '',
  filterData: [],
  key: 0,
  keypagnation: 0,
  disablepre: true, }
  render() {
    const { filter, keypagnation, disablepre ,allNotification} = this.state
    return (
      <div className="px-4 py-5">
      <div className="col-12 py-5  mb-3 border rounded bg-light  ">
        <div className="d-flex mb-2">
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
              <th> عنوان الرساله </th>
              <th> نص الرساله</th>
              <th> التفاصيل </th>
              <th> مسح </th>
            </tr>
          </thead>
          <tbody className="trCatergory ">
            {allNotification.map((item) => {
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
        <div className="d-flex justify-content-between px-5  mt-3">
          <button
            className="pgnationbtn"
            onClick={this.pre}
            disabled={disablepre}
          >
            السابق
          </button>
          <p className="text-nowrap px-2">
            من{keypagnation} الي {keypagnation + 20}
          </p>
          <button onClick={this.next} className="pgnationbtn">
            التالي
          </button>
        </div>
      </div>
      </div>
    )
  }
}

export default NotificationTables
