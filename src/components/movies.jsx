import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Like from './common/like';
import 'font-awesome/css/font-awesome.css';

class Movies extends Component {
	state = {
		movies: getMovies(),
	};

	deleteMovie = (movie) => {
		let movies = this.state.movies.filter((film) => film._id !== movie._id);
		this.setState({ movies: movies });
	};

	checkLiked = (movie) => {
		const movies = [...this.state.movies];
		const index = movies.indexOf(movie);
		return movies[index].liked ? { fontWeight: 'bold' } : null;
	};

	handleLike = (movie) => {
		const movies = [...this.state.movies];
		const index = movies.indexOf(movie);
		movies[index].liked = !movies[index].liked;
		this.setState({ movies });
	};

	render() {
		return (
			<>
				{this.state.movies.length > 0 ? (
					<>
						<h3>Showing {this.state.movies.length} movies in the database</h3>
						<table className='table'>
							<thead>
								<tr>
									<th scope='col'>Title</th>
									<th scope='col'>Genre</th>
									<th scope='col'>Stock</th>
									<th scope='col'>Rate</th>
									<th></th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{this.state.movies.map((movie) => {
									return (
										<tr key={movie._id}>
											<td>{movie.title}</td>
											<td>{movie.genre.name}</td>
											<td>{movie.numberInStock}</td>
											<td>{movie.dailyRentalRate}</td>
											<td>
												<Like
													checkLiked={() => this.checkLiked(movie)}
													onClick={() => this.handleLike(movie)}
												/>
											</td>
											<td>
												<button
													onClick={() => {
														this.deleteMovie(movie);
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
					</>
				) : (
					<h3>There are no movies in the database</h3>
				)}
			</>
		);
	}
}

export default Movies;
