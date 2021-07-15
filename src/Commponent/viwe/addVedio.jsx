import React, { Component } from 'react'
import axios from 'axios'
import { Card } from '../login/Card'
import Toast from 'react-bootstrap/Toast'
import  img from "../../Img/logo.png"
import Loader from './../variables/loaderModal';
import PageNotFound from './../page404';

class AddVedio extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      number: 0,
      video:'',
      title: '',
      selectedFile: "",
      date: new Date().toISOString().split('T')[0],
      errors: {},
      subTitle: '',
      token: localStorage.getItem('token'),
      showToast: false,
      apiMsg: '',
      isLoading: false,
      toastColor: '',
      logo:"",
     img:""
    }
  }
  uploadVedio = async (e) => {
    const { selectedFile } = this.state
    await this.setState({
      selectedFile: e.target.files[0],
    })
    
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
    const { title, video, date, number ,logo} = this.state
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
    if(!logo){
      formIsValid = false
      errors['logo'] = <i className=" mr-2 fas fa-exclamation-circle"></i>
    }

    this.setState({ errors: errors })
    return formIsValid
  }
  addVideoAPI = async () => {
    this.setState({ isLoading: true })
    const {
      token,
      title,
      date,
      number,
      subTitle,
      selectedFile,
      key,
    } = this.state
    let errorAPI = ''
    var bodyFormData = new FormData()
    bodyFormData.append('title', title)
    bodyFormData.append('description', subTitle)
    bodyFormData.append('expireDate', date)
    bodyFormData.append('points', number)
    bodyFormData.append('video', selectedFile)
    
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
    
     
      this.setState({
        title: '',
        number: '',
        video: null,
        selectedFile: null,
        date: new Date().toISOString().split('T')[0],
        subTitle: '',
        showToast: true,
        isLoading: false,
        apiMsg: resp.data.message,
        toastColor: 'success',
        logo:null,
        img:""
      })
    } catch (err) {
      console.log(err)

      if (err.response) {
      //  this.props.history.push(`/404`)
        errorAPI = err.response.data.error
        this.setState({
          showToast: true,
          apiMsg: err.response.data.error,
          isLoading: false,
          toastColor: 'error',
        })
      }
    }
    this.setState({ massagerror: errorAPI })

  }
 
  uploadimg = async (e) => {
    await this.setState({
      logo: e.target.files[0],
    })
     this.state.logo&&this.setState({ img: URL.createObjectURL(this.state.logo) })
    
  }
  render() {
    const {
      selectedFile,
      date,
      number,
      errors,
      title,
      subTitle,
      showToast,
      apiMsg,
      isLoading,
      toastColor,
      logo,
      img
   
    } = this.state
    return (
      <div>
        <Loader show={isLoading} />
        <Toast
          onClose={() => {
            this.setState({ showToast: false })
          }}
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
                    <span className="addAds text-nowrap ">عنوان الاعلان :</span>
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
                    <div  className="addAds mt-1 text-nowrap">
                      اختار الخلفيه  :
                    </div>
                    <input
                      className="p-1 inputCrat border-0"
                      type="file"
                      id="logo"
                      accept="image/*"
                      name="logo"
                      // key={logo}
                      onChange={this.uploadimg}
                    />
                     <span className="mt-2 mr-2 error"> {errors['logo']}</span>
                  </div>
                  <div className="d-md-flex my-3  d-block">
                    <div  className="addAds mt-1 text-nowrap">
                    تحميل الفيديو:
                    </div>
                    <input
                      className="p-1 inputCrat border-0"
                      type="file"
                      accept="video/*"
                      id="vedio"
                      onChange={this.uploadVedio}
                      name="vedio"
                      // key={selectedFile}
                    />
                       <span className="mt-2  mr-2  error"> {errors['vedio']}</span>
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


                    <button
                      type="submit"
                      className="addQuestion mr-2"
                      onClick={this.addVedio}
                    >
                 
                     
                        اضافه الاعلان 
                    </button>
                  </div>
                </div>

                <div className="col-md-6 col-sm-12 d-flex justify-content-center my-2 ">  
                  <video muted  poster={img} controls src={this.state.video} className="video" height="200" />
                
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
