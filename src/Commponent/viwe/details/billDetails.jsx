import React, { Component } from 'react';
import axios from 'axios'
class BillDetailes extends Component {
    state = { bill:{} ,  token:localStorage.getItem('token'),}
    getBill = async () => {
        try {
          const { token } = this.state
          const resp = await axios({
            method: 'get',
            url: `https://koto2020.herokuapp.com/api/gift/${this.props.match.params.id}`,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
    
       
        } catch (err) {
          this.props.history.push(`/404`)
        }
      }
     componentDidMount(){this.getBill()}
    render() { 
        return (  <div> dillDetailes</div>);
    }
}
 
export default BillDetailes;