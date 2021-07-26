/** @format */

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css';


import { HashRouter } from 'react-router-dom';

ReactDOM.render(
	<HashRouter>

		<App />
	</HashRouter>,

	document.getElementById('root'),
);
