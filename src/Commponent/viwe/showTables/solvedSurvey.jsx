import React, { Component } from 'react'
import { Table } from 'react-bootstrap'

class SolvedSurvey extends Component {
  state = {
    allSurvey: [],
    filter: [],
    key: 0,
    keypagnation: 0,
    disablepre: true,
    token: localStorage.getItem('token'),
  }
  redirect = (item) => {

    this.props.history.push(`/admin/AddADS/SolvedSurveyUser`)
  }
  render() {
    const { allSurvey, filter, keypagnation, disablepre} = this.state
    return (
      <div>
        <div className="py-5 px-3 mt-5 border rounded bg-light ">
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
                <th> اسم </th>
                <th> عدد النقاط</th>
                <th> تاريخ الانتهاء </th>
                <th> عدد المستخدمين</th>
                <th> التفاصيل </th>
                <th> مسح </th>
              </tr>
            </thead>
            <tbody className="trCatergory ">

            <tr className="text-center">
                    <td>kkkkk</td>
                    <td> uhuygt</td>
                    <td> jhbhjjg</td>
                    <td> 5555</td>
                    <td
                      onClick={() => {
                        this.redirect()
                      }}
                    >
                      <i className="far fa-eye"></i>
                    </td>
                    <td
                      onClick={() => {
                        this.deleteApp()
                      }}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </td>
                  </tr>



              {/* {allSurvey.map((item) => {
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
              })} */}
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
        </div>{' '}
      </div>
    )
  }
}

export default SolvedSurvey
