import React, { Component } from 'react';
import Like from './common/Like';
import TableHeader from './common/TableHeader';

class MoviesTable extends Component {
	// raiseSort = (path) => {
	// 	const sortColumn = { ...this.props.sortColumn };
	// 	if (sortColumn.path === path) {
	// 		sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc';
	// 	} else {
	// 		sortColumn.path = path;
	// 		sortColumn.order = 'asc';
	//   }
	//   this.props.onSort(sortColumn)
	// };

	columns = [
		{ path: 'title', lable: 'Title' },
		{ path: 'genre.name', lable: 'Genre' },
		{ path: 'numberInStock', lable: 'Stock' },
		{ path: 'dailyRentalRate', lable: 'Rate' },
		{ key: 'like' },
		{ key: 'delete' },
	];

	render() {
		const {
			movies,
			onCheck,
			onLike,
			onDelete,
			onSort,
			sortColumn,
		} = this.props;

		return (
			<table className='table'>
				<TableHeader
					columns={this.columns}
					sortColumn={sortColumn}
					onSort={onSort}
				/>
				<tbody>
					{movies.map((movie) => {
						return (
							<tr key={movie._id}>
								<td>{movie.title}</td>
								<td>{movie.genre.name}</td>
								<td>{movie.numberInStock}</td>
								<td>{movie.dailyRentalRate}</td>
								<td>
									<Like
										onLoadCheck={() => onCheck(movie)}
										onClick={() => onLike(movie)}
									/>
								</td>
								<td>
									<button
										onClick={() => {
											onDelete(movie);
										}}
										className='btn btn-danger'
									>
										Delete
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		);
	}
}

export default MoviesTable;
