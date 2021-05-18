import React, { Component } from 'react'
import { Table } from 'react-bootstrap'

import { Card } from '../login/Card'

class AddVedio extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      number: 0,
      video: '',
      title:"",
      selectedFile: null,
      date: new Date().toISOString().split('T')[0],
      errors:{},
      subTitle:""
    }
  }
  uploadVedio = async (e) => {
    await this.setState({
      selectedFile: e.target.files[0],
      loaded: 0,
    })

    let src = URL.createObjectURL(this.state.selectedFile)
    console.log(this.state.selectedFile)
    console.log(src)
    this.setState({ video: src })
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
  addVedio = () => {
    this.timestanp()
    this.handleValidation()
  }
  handleValidation = () => {
    console.log(',,,')
    const {title, video, date, number } = this.state
    let errors = {}
    let formIsValid = true
    if (!title) {
      formIsValid = false
      errors['title'] = <i className=" mr-2 fas fa-exclamation-circle"></i>
    }

    if (date === new Date().toISOString().split('T')[0]) {
      errors['date'] = <i className=" mr-2 fas fa-exclamation-circle"></i>
    }
    if (!number) {
      formIsValid = false
      errors['number'] = <i className=" mr-2 fas fa-exclamation-circle"></i>
    }
    if (!video) {
      formIsValid = false
      errors['vedio'] = <i className=" mr-2 fas fa-exclamation-circle"></i>
    }

    this.setState({ errors: errors })
    return formIsValid
  }
  render() {
    const { vedio, date, number,errors ,title,subTitle} = this.state
    console.log(this.state.video)
    return (
      <div>
        <Card
          content={
            <div className="container  text-right">
              <div className=" row mt-3 ">
                <div className="col-md-6 col-sm-12">
                  <div className="d-flex my-3">
                    <span className="addAds  pl-2">عنوان الاعلان:</span>
                    <input
                      type="text"
                      name="title"
                      className="imputservary  px-2 p-1"
                      maxLength="100"
                      value={title}
                      onChange={(event) =>
                        this.setState({ title: event.target.value })
                      }
                    />
                      <span className="mt-2 error">{errors['title']}</span>
                  </div>
                  <div className="d-flex">
                    <span className="addAds   ml-1 pl-2">نص الاعلان :</span>
                    <textarea
                      type="textarea"
                      className="imputservary px-2 p-1"
                      maxLength="100"
                      value={subTitle}
                      onChange={(event) =>
                        this.setState({ subTitle: event.target.value })
                      }
                    />
                  </div>
                  <div className="d-flex mt-3">
                    <span className="addAds ml-1">تاريخ الانتهاء:</span>
                    <input
                      type="date"
                      id="start"
                      name="date"
                      className="imputservary mr-2 px-2 p-1"
                      value={date}
                      min={new Date().toISOString().split('T')[0]}
                      max="2022-12-31"
                      onChange={(event) =>
                        this.setState({ date: event.target.value })
                      }
                    ></input>
                      <span className="mt-2 error">{errors['date']}</span>
                  </div>
                  <div className="d-flex my-3">
                    <span className="addAds ml-1"> عدد النقاط :</span>
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
                  <div className="file-input d-flex justify-content-around m-3 ">
                    <input
                      type="file"
                      id="file"
                      
                      className="file"
                      accept="video/*"
                      value={vedio}
                      onChange={this.uploadVedio}
                      name="vedio"
                    />
                   
                    
                    <label htmlFor="file">
                      تحميل الفيديو
                      <p className="file-name"></p>
                     
                    </label>

                    <input
                      type="submit"
                      className="addQuestion"
                      onClick={this.addVedio}
                      value="اضافه الاعلان"
                    />
                    
                  </div>
                </div>

                <div className="col-md-6 col-sm-12 d-flex justify-content-center my-2 ">
                  <video
                    src={this.state.video}
                    autoPlay={true}
                    controls="controls"
                    width="90%"
                   
                  />
                    <span className="d-flex align-items-center error">{errors['vedio']}</span>
                    
                </div>
              </div>
              <div className="">
                <Table
                  striped
                  hover
                  className=" border table-success table-striped"
                >
                  <thead className="tdCatergory">
                    <tr>
                      <th> عنوان الرساله</th>
                      <th> نص الرساله</th>
                    </tr>
                  </thead>
                  <tbody className="trCatergory">
                    <tr>
                      <td>mm</td>
                      <td>mmm</td>
                    </tr>
                    <tr>
                      <td>mm</td>
                      <td>mmm</td>
                    </tr>
                    {this.state.items.map((item) => {
                      return (
                        <tr key={item.id}>
                          <td>mm</td>
                          <td>mmm</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
              </div>
            </div>
          }
        />
      </div>
    )
  }
}

export default AddVedio
