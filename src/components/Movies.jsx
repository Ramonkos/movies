import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.css';

import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import Pagination from './common/Pagination';
import ListGroup from './common/ListGroup';
import { paginate } from '../utils/paginate';
import MoviesTable from './MoviesTable';
import _ from 'lodash';

class Movies extends Component {
	state = {
		movies: [],
		genres: [],
		pageSize: 4,
		currentPage: 1,
		sortColumn: { path: 'title', order: 'asc' },
	};

	componentDidMount() {
		const genres = [{ name: 'All Genres', _id: 0 }, ...getGenres()];
		this.setState({ movies: getMovies(), genres });
	}

	handlePageChange = (page) => {
		this.setState({ currentPage: page });
	};

	handleGenreSelect = (genre) => {
		this.setState({ selectedGenre: genre, currentPage: 1 });
	};

	deleteMovie = (movie) => {
		let movies = this.state.movies.filter((film) => film._id !== movie._id);
		this.setState({ movies: movies });
	};

	checkLiked = (movie) => {
		const movies = [...this.state.movies];
		const index = movies.indexOf(movie);
		return movies[index].liked
			? { fontWeight: 'bold', cursor: 'pointer' }
			: { cursor: 'pointer' };
	};

	handleLike = (movie) => {
		const movies = [...this.state.movies];
		const index = movies.indexOf(movie);
		movies[index].liked = !movies[index].liked;
		this.setState({ movies });
	};

	handleSort = (sortColumn) => {
		this.setState({ sortColumn });
	};

	render() {
		const { length: count } = this.state.movies;
		const {
			currentPage,
			sortColumn,
			pageSize,
			selectedGenre,
			movies: allMovies,
		} = this.state;

		if (count === 0) return <h3>There are no movies in the database</h3>;

		const filtered =
			selectedGenre && selectedGenre._id
				? allMovies.filter((m) => m.genre._id === selectedGenre._id)
				: allMovies;

		const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

		const movies = paginate(sorted, currentPage, pageSize);

		return (
			<div className='row'>
				<div className='col-2'>
					<ListGroup
						items={this.state.genres}
						selectedItem={this.state.selectedGenre}
						onItemSelect={this.handleGenreSelect}
					/>
				</div>
				<div className='col'>
					<p>Showing {filtered.length} movies in the database</p>
					<MoviesTable
						movies={movies}
						sortColumn={sortColumn}
						onCheck={this.checkLiked}
						onLike={this.handleLike}
						onDelete={this.deleteMovie}
						onSort={this.handleSort}
					/>
					<Pagination
						itemsCount={filtered.length}
						pageSize={pageSize}
						currentPage={currentPage}
						onPageChange={this.handlePageChange}
					/>
				</div>
			</div>
		);
	}
}

export default Movies;
