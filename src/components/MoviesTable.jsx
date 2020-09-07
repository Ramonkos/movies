import React, { Component } from 'react';
import Like from './common/Like';
import TableHeader from './common/TableHeader';
import TableBody from './common/TableBody';

class MoviesTable extends Component {
	columns = [
		{ path: 'title', lable: 'Title' },
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
		{
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
		},
	];

	render() {
		const { movies, onSort, sortColumn } = this.props;

		return (
			<table className='table'>
				<TableHeader
					columns={this.columns}
					sortColumn={sortColumn}
					onSort={onSort}
				/>
				<TableBody columns={this.columns} data={movies} />
			</table>
		);
	}
}

export default MoviesTable;
