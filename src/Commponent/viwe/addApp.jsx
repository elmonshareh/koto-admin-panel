import React, { Component } from 'react'
import { Card } from '../login/Card'
import axios from 'axios'
import Toast from 'react-bootstrap/Toast'
import Loader from './../variables/loaderModal';
class AddApp extends Component {
  constructor(props) {
    super(props);
this. state = {
    items: [],
    Android: '',
    number:null,
    date: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    name: '',
    errors: {},
    massagerror: '',
    token: localStorage.getItem('token'),
    showToast: false,
    apiMsg: '',
    toastColor: '',
    subTitle:"",
    img:"",
    logo:"",
    isLoading: false,
  }
  this.imgAPP = React.createRef();
  }
  timestanp = () => {
    var date = this.state.date

    var mint = new Date().getMinutes()
    var hours = new Date().getHours()

    var output =
      date + ':' + ('0' + hours).slice(-2) + ':' + ('0' + mint).slice(-2)
    var datastanp = new Date(output).getTime()
    this.setState({ datastanp: datastanp })


 
  }
  handleValidation = () => {

    const { name, date, number } = this.state
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
    if (this.handleValidation()) {
      this.addAppAPI()
    }
  }
  addAppAPI = async () => {
    const { date, Android, number, name, token,subTitle,logo } = this.state

    let errorAPI = ''
    var bodyFormData = new FormData()
    bodyFormData.append('title', name)
    bodyFormData.append('description', subTitle)
    bodyFormData.append('expireDate', date)
    bodyFormData.append('points', number)
    bodyFormData.append( 'androidLink', Android)
    bodyFormData.append( 'photo', logo)
    this.setState({ isLoading: true })

    try {
      const resp = await axios({
        method: 'post',
        url: 'https://koto2020.herokuapp.com/api/App/add',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data:bodyFormData,
      })
     
      this.setState({
        Android: '',
        number: 0,
        date: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        name: '',
        showToast: true,
        apiMsg: resp.data.message,
        toastColor: 'success', 
        isLoading: false,
        subTitle:"",
       
      })
      this.fileInput.value = null;
     

    } catch (err) {

        errorAPI = err.response.data.message
        if(err.response.status===400){ 
          this.setState({
          showToast: true,
          apiMsg:err.response.data.message,
          toastColor: 'errorToster',
          isLoading: false,
        })} else{
           
          this.setState({
          showToast: true,
          apiMsg: err.response.data.error,
          toastColor: 'errorToster',
          isLoading: false,
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
      Android,
      number,
      name,
      errors,
      showToast,
      apiMsg,
      toastColor,
      subTitle, isLoading
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
          title="اضافه تطبيق"
          content={
            <div className="container text-right  mb-3">
              <div className="row mt-3 ">
                <div className="col-sm-12 col-md-8">
                  <div className=" d-md-flex my-3  d-block">
                    <div className=" text-nowrap w-25"> اسم التطبيق :</div>
                    <input
                      type="text"
                      name="name"
                      className="imputservary p-1"
                      maxLength="100"
                      value={name}
                      onChange={(e) => {
                        this.setState({ name: e.target.value })
                      }}
                    />
                    <span className="mt-2 error">{errors['name']}</span>
                  </div>
                  <div className="d-md-flex my-3  d-block">
                    <span className="addAds w-25"> اضافه الرابط Android :</span>

                    <input
                      type="text"
                      name="Android"
                      className="imputservary  px-2 p-1"
                      maxLength="200"
                      value={Android}
                      onChange={(e) => {
                        this.setState({ Android: e.target.value })
                      }}
                    />
                  </div>
                  
                  <div className="d-md-flex my-3  d-block">
                    <span className="addAds  w-25">تاريخ الانتهاء :</span>
                    <input
                      type="date"
                      id="start"
                      name="date"
                      className="imputDateApp p-1"
                      value={this.state.date}
                      min={new Date().toISOString().split('T')[0]}
                      max="2022-12-31"
                      onChange={(event) =>
                        this.setState({ date: event.target.value })
                      }
                    ></input>
                    <span className="mt-2 error">{errors['date']}</span>
                  </div>
                  <div className="d-md-flex d-block">
                    <span className="  w-25 text-nowrap "> وصف التطبيق :</span>
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
                  <div className="d-md-flex my-3  d-block">
                    <div  className="w-25 mt-1 text-nowrap">
                      اختيار لوجو التطبيق   :
                    </div>
                    <input
                      className="p-1 inputCrat border-0"
                      type="file"
                      id="logo"
                      accept="image/png"
                      name="logo"
                      ref={ref=> this.fileInput = ref}
                      onChange={this.uploadimg}
                    />
                     <span className="mt-2 mr-2 error"> {errors['logo']}</span>
                  </div>
                  <div className="d-md-flex my-3   d-block">
                    <span className=" w-25"> عدد النقاط المكتسبة :</span>
                    <input
                      type="number"
                      name="number"
                      className=" w-25 px-2 p-1"
                      value={number}
                      placeholder="0"
                      onInput={(e) => e.target.value = e.target.value.slice(0, 5)}
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
            </div>
          }
        />
      </div>
    )
  }
}

export default AddApp
