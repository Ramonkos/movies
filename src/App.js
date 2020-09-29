import React from 'react';
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

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
	return (
		<>
			<ToastContainer />
			<MainNav />
			<main className='container'>
				<Switch>
					<Route path='/login' component={LoginForm} />
					<Route path='/register' component={RegisterForm} />
					<Route path='/movies/:id' component={MovieForm} />
					<Route path='/movies/new' component={MovieForm} />
					<Route path='/movies' component={Movies} />
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

export default App;
