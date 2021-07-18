import React, { Component } from 'react';
import Spinner from './spinner';
import SpinnerTable from './../showTables/spinnerTables';
import { Route } from 'react-router';
class SpinnerNav extends Component {
    state = {  }
    render() { 
        return ( <div className="container p-5">
             <Route path="/admin/Spinner/add" component={Spinner} />
             <Route path="/admin/Spinner/Tables" component={SpinnerTable} />
             
       </div>  );
    }
}
 
export default SpinnerNav;