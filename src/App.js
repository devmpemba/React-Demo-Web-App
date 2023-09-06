import React, { Component } from 'react';

import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';

import Home from './pages/Home';
import LoginForm from './pages/LoginForm';
import Register from './pages/Register';
import Dashboard from './Dashboard';

import Login from './Login';

import './App.css';

class App extends Component {
render() {
	return (
	<Router>
		<div className="App">
			<ul className="App-header">

			<li>
				<Link to="/">Home</Link>
			</li>
			<li>
				<Link to="/login">Login</Link>
			</li>
			<li>
				<Link to="/register">Register</Link>
			</li>
			</ul>

		<Routes>
				<Route exact path='/' element={< Home />}></Route>
				
				<Route exact path='/login' element={<Login />}></Route>

				<Route exact path='/register' element={< Register />}></Route>

				<Route exact path='/dashboard' element={<Dashboard />}></Route>


		</Routes>
		</div>
	</Router>
);
}
}

export default App;
