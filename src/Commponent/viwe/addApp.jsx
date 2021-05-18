import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import { Card } from '../login/Card'
class AddApp extends Component {
  state = {
    items: [],
    IOS: '',
    Android: '',
    number: 0,
    date: new Date().toISOString().split('T')[0],
    name: '',
    errors: {},
  }
  timestanp = () => {
    var date = this.state.date

    var mint = new Date().getMinutes()
    var hours = new Date().getHours()

    var output =
      date + ':' + ('0' + hours).slice(-2) + ':' + ('0' + mint).slice(-2)
    var datastanp = new Date(output).getTime()
    this.setState({ datastanp: datastanp })

    console.log(datastanp)
    console.log(output)
  }
  handleValidation = () => {
    console.log(',,,')
    const { IOS, Android, name, date ,number} = this.state
    let errors = {}
    let formIsValid = true
    if (!name) {
      formIsValid = false
      errors['name'] = <i className=" mr-2 fas fa-exclamation-circle"></i>
    }

    if (date === new Date().toISOString().split('T')[0]) {
      errors['date'] = <i className=" mr-2 fas fa-exclamation-circle"></i>
    }
    if (!number) {
      formIsValid = false
      errors['number'] = <i className=" mr-2 fas fa-exclamation-circle"></i>
    }

    
    this.setState({ errors: errors })
    return formIsValid
  }
  addApp = () => {
    this.handleValidation()
  }

  render() {
    const { IOS, Android, number, name, errors } = this.state
    return (
      <div>
        <Card
          content={
            <div className="container text-right">
              <div className="row mt-3">
                <div className="col-sm-12 col-md-8">
                  <div className="d-flex my-3">
                    <span className="addAds ml-5"> اسم التطبيق :</span>
                    <input
                      type="text"
                      name="name"
                      className="imputservary mr-3 px-2 p-1"
                      maxLength="100"
                      value={name}
                      onChange={(e) => {
                        this.setState({ name: e.target.value })
                      }}
                    />
                    <span className="mt-2 error">{errors['name']}</span>
                  </div>
                  <div className="d-flex my-3">
                    <span className="addAds ml-0"> اضافه الرابط Android :</span>
                    <input
                      type="text"
                      name="Android"
                      className="imputservary mr-1 px-2 p-1"
                      maxLength="50"
                      value={Android}
                      onChange={(e) => {
                        this.setState({ Android: e.target.value })
                      }}
                    />
                  </div>
                  <div className="d-flex my-3">
                    <span className="addAds ml-3">اضافه الرابط Ios :</span>
                    <input
                      type="text"
                      name="IOS"
                      className="imputservary   px-2 mr-4 p-1"
                      maxLength="50"
                      value={IOS}
                      onChange={(e) => {
                        this.setState({ IOS: e.target.value })
                      }}
                    />
                  </div>
                  <div className="d-flex my-3">
                    <span className="addAds   pl-2 ml-5">تاريخ الانتهاء :</span>
                    <input
                      type="date"
                      id="start"
                      name="date"
                      className="imputservary px-2  mr-2 p-1"
                      value={this.state.date}
                      min={new Date().toISOString().split('T')[0]}
                      max="2022-12-31"
                      onChange={(event) =>
                        this.setState({ date: event.target.value })
                      }
                    ></input>
                     <span className="mt-2 error">{errors['date']}</span>
                  </div>
                  <div className="d-flex my-3">
                    <span className="addAds  ml-1"> عدد النقاط المكتسبة :</span>
                    <input
                      type="number"
                      name="number"
                      className=" addPoint px-2 mr-2 p-1"
                      value={number}
                      onChange={(event) =>
                        this.setState({ number: event.target.value })
                      }
                    ></input>
                     <span className="mt-2 error">{errors['number']}</span>
                    
                  </div>
                  <div className="d-flex justify-content-center p-3">
                    <button className="addQuestion" onClick={this.addApp}>
                      اضافه التطبيق
                    </button>
                  </div>
                </div>
              </div>

              <Table striped hover className="table">
                <thead className="tdCatergory">
                  <tr>
                    <th> عنوان الرساله</th>
                    <th> نص الرساله</th>
                  </tr>
                </thead>
                <tbody className="trCatergory">
                  {this.state.items.map((item) => {
                    return (
                      <tr key={item.id}>
                        <td>lll</td>
                        <td>kk</td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </div>
          }
        />
      </div>
    )
  }
}

export default AddApp
