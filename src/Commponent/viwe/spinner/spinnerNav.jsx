import React, { Component } from 'react';
import Spinner from './spinner';
class SpinnerNav extends Component {
    state = {  }
    render() { 
        return ( <div className="container p-5">
               <Spinner/>
       </div>  );
    }
}
 
export default SpinnerNav;