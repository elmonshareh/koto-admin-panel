/** @format */
import './App.css';
import React, { Component } from 'react';
import Login from './Commponent/login/login';
import { Redirect, Route, Switch } from 'react-router';
import Sidebar from './Commponent/sidebar';
import PageNotFound from './Commponent/page404';


class App extends Component {
	state = { off: "" }

	push = () => { this.props.history.replace('/404') }
	render() {
		window.addEventListener('online', () => {
			this.setState({ off: "" })
		});

		window.addEventListener('offline', () => {
			this.setState({ off: "Became offline" })
		});
		if (this.state.off) { return <PageNotFound /> } else {
			<link href="/">
				Reload the page
			</link>
		}

		return (
			<div className="App">


				<Switch>
					<Route path="/login" component={Login} />
					<Route path="/admin" render={(props) => <Sidebar {...props} />} />
					<Route exact path='/404' component={PageNotFound} />
					{/* <Redirect  from="*" to="/404" /> */}
					<Redirect from="/" to="/login" />




				</Switch>

			</div>);
	}
}

export default App;

