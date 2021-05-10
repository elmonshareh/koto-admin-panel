import React, { Component } from 'react';
import { Card } from './Card';
class Login extends Component {
    state = {}
    render() {
        return (<div className="m-5">
            <Card content={<div className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-6 sginIn"> manar</div>
                    <div className="col-sm-12 col-md-6  d-none d-md-block   logoPart ">  ali ramzi </div>

                </div>
            </div>
            } />

        </div>);
    }
}

export default Login;