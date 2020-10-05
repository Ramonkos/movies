import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import MainNav from './components/MainNav';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Customers from './components/Customers';
import Rentals from './components/Rentals';
import Movies from './components/Movies';
import MovieForm from './components/MovieForm';
import NotFound from './components/NotFount';
import Logout from './components/Logout';
import auth from './services/authService';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

class App extends Component {
	state = {};

	componentDidMount() {
		const user = auth.getCurrentUser();
		this.setState({ user });
	}

	render() {
		return (
			<>
				<ToastContainer />
				<MainNav user={this.state.user} />
				<main className='container'>
					<Switch>
						<Route path='/login' component={LoginForm} />
						<Route path='/logout' component={Logout} />
						<Route path='/register' component={RegisterForm} />
						<Route path='/movies/:id' component={MovieForm} />
						<Route path='/movies/new' component={MovieForm} />
						<Route
							path='/movies'
							render={props => <Movies {...props} user={this.state.user} />}
						/>
						<Route path='/customers' component={Customers} />
						<Route path='/rentals' component={Rentals} />
						<Route path='/not-found' component={NotFound} />
						<Redirect from='/' exact to='/movies' />
						<Redirect to='/not-found' />
					</Switch>
				</main>
			</>
		);
	}
}

export default App;
