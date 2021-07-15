import axios from 'axios'
import React, { Component } from 'react'
import { Card } from './../../login/Card'
import  Dropdown  from 'react-bootstrap/Dropdown'
import ModaleUser from './userModal';
import SpinnerChart from './../../variables/spinnerCharts';
class UserInfo extends Component {
  state = { token: localStorage.getItem('token'), user: {} ,status:"",show:false,
  isLoading:false,
 
}

  getUser = async () => {
    this.setState({ isLoading:true})
    try {
      const { token } = this.state
      const resp = await axios({
        method: 'get',
        url: `https://koto2020.herokuapp.com/api/userInfo/${this.props.match.params.id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(resp.data.data)
      await this.setState({ user: resp.data.data,status: resp.data.data.status,isLoading:false })
    } catch (err) {
      this.props.history.push(`/404`)
    }
  }
  changeStutes = async () => {
    try {
      const { token,status } = this.state
      const resp = await axios({
        method: 'patch',
        url: `https://koto2020.herokuapp.com/api/user/${this.props.match.params.id}/status`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data:{ "status":status}
      })
      console.log(resp)
      this.handleShow()
    } catch (err) {
      this.props.history.push(`/404`)
    }
  }
  componentDidMount() {
    this.getUser()
  }
  handleShow=()=>{  
    const{show}=this.state
    this.setState({show:!show})}
  render() {
    const { user,status ,show,isLoading} = this.state
    let newStutes
    if(status==="ACTIVE") {newStutes=["BLOCKED","DELETED"]} else if (status==="BLOCKED") {
      newStutes=["ACTIVE","DELETED"]
    } else{ newStutes=["ACTIVE","BLOCKED"]}

    return (
      <div className="container p-5">
        <div className="row">
          <div className="col-sm-12 col-md-8">
            <ModaleUser show={show} handleShow={this.changeStutes} status={status}  delete={this.handleShow}/>
            <Card
              title="بينات المستخدم"
              content={  <div>
                { isLoading?  <div className="d-flex justify-content-center uerSpiner ">   <SpinnerChart />  </div> :
                <div className="container text-right">
                  <div className="row my-3">
                    <div className="col-12">
                      <p className=" d-md-flex my-3 d-block ">
                        <span className="  text-nowrap"> كود : </span>
                        <span className=" text-nowrap"> {user._id}</span>
                      </p>
                      <p className=" d-md-flex my-3 d-block ">
                        <span className="  text-nowrap"> الاسم : </span>
                        <span className=" text-nowrap">

                          {user.firstName + user.lastName}
                        </span>
                      </p>
                      <p className=" d-md-flex my-3 d-block ">
                        <span className="  text-nowrap"> الايميل : </span>
                        <span className=" text-nowrap"> {user.email}</span>
                      </p>
                      <p className=" d-md-flex my-3 d-block ">
                        <span className="  text-nowrap">
                          عدد النقاط :
                        </span>
                        <span className=" text-nowrap"> {user.points}</span>
                      </p>
                      <p className=" d-md-flex my-3 d-block ">
                        <span className="  text-nowrap">

                          الرقم المحمول :
                        </span>
                        <span className=" text-nowrap">

                          {user.phoneNumber}
                        </span>
                      </p>
                      <p className=" d-md-flex my-3 d-block ">
                        <span className="  text-nowrap"> النوع : </span>
                        <span className=" text-nowrap"> {user.role}</span>
                      </p>
                      <div className=" d-md-flex my-3 d-block ">
                      
                  
                          <span className="  text-nowrap"> الحاله : </span>
                          <span className=" text-nowrap"> {user.status}</span>

                
                      </div>
                  
                      <div className="d-flex">
                        <span className="  text-nowrap"> تغير الحاله : </span>
                        <Dropdown>
                          <Dropdown.Toggle
                            variant="success"
                            id="dropdown-basic"
                          >
                            {status}
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            {newStutes.map ((x) => ( <Dropdown.Item  onSelect={()=>{this.setState({status:x})
                          this.handleShow()}}>
                              {x}
                           </Dropdown.Item> )) }
                            
                      
                          </Dropdown.Menu>
                        </Dropdown> 
          
        
              </div>
                    </div>
                  </div>
                </div>}
                </div>
              }
            />
          </div>
        </div>
      </div>
    )
  }
}

export default UserInfo
