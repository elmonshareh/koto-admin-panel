/** @format */
import './App.css';
import Login from './Commponent/login/login';
import { Redirect, Route } from 'react-router';

import Sidebar from './Commponent/sidebar';


function App() {
	return (
		<div className="App">
			<Route path="/login" component={Login} />
			<Route path="/admin" render={(props) => <Sidebar {...props} />} />
		  {/* <Route path="/PageNotFound" component={PageNotFound} /> */}
					<Redirect from="/" to="/login" />

		</div>
	);
}

export default App;
