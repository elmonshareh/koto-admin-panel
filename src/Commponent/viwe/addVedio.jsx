import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import axios from 'axios'
import { Card } from '../login/Card'
import Toast from 'react-bootstrap/Toast'
class AddVedio extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      number: 0,
      video: '',
      title: '',
      selectedFile: null,
      date: new Date().toISOString().split('T')[0],
      errors: {},
      subTitle: '',
      token: localStorage.getItem('token'),
      showToast: false,
      apiMsg: '',
      isLoading: false,
      toastColor:""
    }
  }
  uploadVedio = async (e) => {
    const { selectedFile } = this.state
    await this.setState({
      selectedFile: e.target.files[0],
    })
    console.log(selectedFile)
    this.state.selectedFile &&
      this.setState({ video: URL.createObjectURL(this.state.selectedFile) })
  }
  timestanp = () => {
    var { date } = this.state

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

    if (this.handleValidation()) {
      this.addVideoAPI()
    }
  }
  handleValidation = () => {
    console.log(',,,')
    const { title, video, date, number } = this.state
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
  addVideoAPI = async () => {
    // let fields = this.state.fields;
    const {
      token,
      title,
      date,
      number,
      subTitle,
      video,
      selectedFile,
      key,
      toastColor
    } = this.state
    let errorAPI = ''
    var bodyFormData = new FormData()
    bodyFormData.append('title', title)
    bodyFormData.append('description', subTitle)
    bodyFormData.append('expireDate', date)
    bodyFormData.append('points', number)
    bodyFormData.append('video', selectedFile)
    this.setState({isLoading:true})
    try {
      const resp = await axios({
        method: 'post',
        url: `https://koto2020.herokuapp.com/api/Video/add?page=${key}`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        data: bodyFormData,
      })
      if(resp.data.message){console.log("manar")}
      console.log(resp.data.message)
      this.setState({
        title: '',
        number: '',
        video: '',
        selectedFile: null,
        date: new Date().toISOString().split('T')[0],
        subTitle: '',
        showToast: true,
        isLoading:false,
        apiMsg: resp.data.message
        ,toastColor:"success"
      })
    } catch (err) {
      console.log(err)

      if (err.response) {
        console.log(err.response.data.error[0].msg)
        errorAPI = err.response.data.error
        this.setState({
          showToast: true,
          apiMsg: err.response.data.error[0].msg,
          isLoading:false,toastColor:"error"
        })
      }
    }
    this.setState({ massagerror: errorAPI })
    console.log(this.state.massagerror)
  }


  render() {
    const {
      vedio,
      date,
      number,
      errors,
      allVedio,
      title,
      subTitle,
      showToast,
      apiMsg,
      isLoading,toastColor
    } = this.state
    console.log(allVedio)
    return (
      <div >
        <Toast
          
          show={showToast}
          delay={3000}
          autohide
        >
          <Toast.Body className={toastColor}>{apiMsg}</Toast.Body>
        </Toast>

        <Card
          title="اضافه فيديوهات"
          content={
            <div className="container text-right ">
              <div className=" row mt-3 ">
                <div className="col-md-6 col-sm-12">
                
                  <div className="d-md-flex my-3 d-block">
                    <span className="addAds  ">عنوان الاعلان :</span>
                    <input
                      type="text"
                      name="title"
                      className="imputservary  px-2 p-1 "
                      maxLength="100"
                      value={title}
                      onChange={(event) =>
                        this.setState({ title: event.target.value })
                      }
                    />
                    <span className="mt-2 error">{errors['title']}</span>
                  </div>
                  <div className="d-md-flex d-block">
                    <span className="addAds  text-nowrap ">نص الاعلان :</span>
                    <textarea
                      type="textarea"
                      className="imputservary px-2 p-1"
                      maxLength="500"
                      value={subTitle}
                      onChange={(event) =>
                        this.setState({ subTitle: event.target.value })
                      }
                    />
                  </div>
                  <div className="d-md-flex d-block mt-3">
                    <span className="addAds  text-nowrap ">
                      تاريخ الانتهاء :
                    </span>
                    <input
                      type="date"
                      id="start"
                      name="date"
                      className="imputservary  px-2 p-1"
                      value={date}
                      min={new Date().toISOString().split('T')[0]}
                      max="2022-12-31"
                      onChange={(event) =>
                        this.setState({ date: event.target.value })
                      }
                    ></input>
                    <span className="mt-2 error">{errors['date']}</span>
                  </div>
                  <div className="d-md-flex my-3  d-block">
                    <span className="addAds  text-nowrap "> عدد النقاط :</span>
                    <input
                      type="number"
                      name="number"
                      className=" addPoint px-2  p-1"
                      value={number}
                      onChange={(event) =>
                        this.setState({ number: event.target.value })
                      }
                    ></input>
                    <span className="mt-2 error">{errors['number']}</span>
                  </div>

                  <div className="file-input d-md-flex justify-content-around d-sm-block m-3 ">
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

                    <button
                      type="submit"
                      className="addQuestion mr-2"
                      onClick={this.addVedio}
                     
                    > {!isLoading ? ( "اضافه الاعلان " ) : (
                      <div class="lds-ellipsis">
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>

                    )}</button>
                  </div>
                </div>

                <div className="col-md-6 col-sm-12 d-flex justify-content-center my-2 ">
                  <video
                    src={this.state.video}
                    autoPlay={true}
                    controls="controls"
                    width="90%"
                  />
                  <span className="d-flex align-items-center error">
                    {errors['vedio']}
                  </span>
                </div>
              </div>
              
              
            </div>
          }
        />
      </div>
    )
  }
}

export default AddVedio
