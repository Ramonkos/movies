import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import auth from '../services/authService';
import Like from './common/Like';
import Table from './common/Table';

class MoviesTable extends Component {
	columns = [
		{
			path: 'title',
			lable: 'Title',
			content: (movie) => <Link to={`movies/${movie._id}`}>{movie.title}</Link>,
		},
		{ path: 'genre.name', lable: 'Genre' },
		{ path: 'numberInStock', lable: 'Stock' },
		{ path: 'dailyRentalRate', lable: 'Rate' },
		{
			key: 'like',
			content: (movie) => (
				<Like
					onLoadCheck={() => this.props.onCheck(movie)}
					onClick={() => this.props.onLike(movie)}
				/>
			),
		},
	];

	deleteColumn = {
		key: 'delete',
		content: (movie) => (
			<button
				onClick={() => {
					this.props.onDelete(movie);
				}}
				className='btn btn-danger'
			>
				Delete
			</button>
		),
	};

	constructor() {
		super();
		const user = auth.getCurrentUser();
		if (user && user.isAdmin) {
			this.columns.push(this.deleteColumn);
		}
	}

	render() {
		const { movies, onSort, sortColumn } = this.props;

		return (
			<Table
				columns={this.columns}
				data={movies}
				sortColumn={sortColumn}
				onSort={onSort}
			/>
		);
	}
}

export default MoviesTable;
