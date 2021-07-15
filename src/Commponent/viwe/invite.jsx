import React, { Component } from 'react';
import SpinnerChart from './../variables/spinnerCharts';
class InviteFriends extends Component {
    state = {show:true  }
    render() { 
        const{show}=this.state
        return (  <div>   <SpinnerChart/></div>);
    }
}
 
export default InviteFriends;