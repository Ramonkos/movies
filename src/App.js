import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import MainNav from './components/MainNav';
import Customers from './components/Customers';
import Rentals from './components/Rentals';
import Movies from './components/Movies';
import NotFound from './components/NotFount';

import './App.css';

function App() {
	return (
		<>
			<MainNav />
			<main className='container'>
				<Switch>
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
