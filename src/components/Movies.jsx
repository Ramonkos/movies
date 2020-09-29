import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.css';

import { getMovies, deleteMovie } from '../services/movieService';
import { getGenres } from '../services/genreService';
import Pagination from './common/Pagination';
import ListGroup from './common/ListGroup';
import { paginate } from '../utils/paginate';
import MoviesTable from './MoviesTable';
import SearchInput from './common/SearchInput';
import _ from 'lodash';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { toast } from 'react-toastify';

class Movies extends Component {
	state = {
		movies: [],
		genres: [],
		pageSize: 4,
		currentPage: 1,
		sortColumn: { path: 'title', order: 'asc' },
		searchQuery: '',
		selectedGenre: null,
	};

	async componentDidMount() {
		const { data } = await getGenres();
		const genres = [{ name: 'All Genres', _id: 0 }, ...data];
		const { data: movies } = await getMovies();
		this.setState({ movies, genres });
	}

	handlePageChange = (page) => {
		this.setState({ currentPage: page });
	};

	handleGenreSelect = (genre) => {
		this.setState({ selectedGenre: genre, currentPage: 1, searchQuery: '' });
	};

	deleteMovie = async (movie) => {
		const originalMovies = this.state.movies;
		let movies = originalMovies.filter((film) => film._id !== movie._id);
		this.setState({ movies });
		try {
			await deleteMovie(movie._id);
		} catch (error) {
			if (error.response && error.response.status === 404) {
				toast.error('This movie has already been deleted.');
			}
			this.setState({ originalMovies });
		}
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
		if (sortColumn.path) {
			this.setState({ sortColumn });
		}
	};

	handleSearch = (query) => {
		this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
	};

	getPagedData = () => {
		const {
			currentPage,
			sortColumn,
			pageSize,
			selectedGenre,
			movies: allMovies,
			searchQuery,
		} = this.state;

		if (searchQuery) {
			const filtered = allMovies.filter((m) =>
				m.title.toLowerCase().startsWith(searchQuery.toLocaleLowerCase())
			);
			const movies = paginate(filtered, currentPage, pageSize);
			return { totalCount: filtered.length, movies };
		} else {
			const filtered =
				selectedGenre && selectedGenre._id
					? allMovies.filter((m) => m.genre._id === selectedGenre._id)
					: allMovies;

			const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
			const movies = paginate(sorted, currentPage, pageSize);
			return { totalCount: filtered.length, movies };
		}
	};

	render() {
		const { length: count } = this.state.movies;
		const { currentPage, sortColumn, pageSize, searchQuery } = this.state;

		if (count === 0) return <h3>There are no movies in the database</h3>;

		const { totalCount, movies } = this.getPagedData();

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
					<Link to='/movies/new' className='btn btn-primary'>
						New Movie
					</Link>
					<SearchInput value={searchQuery} onChange={this.handleSearch} />
					<p>Showing {totalCount} movies in the database</p>
					<MoviesTable
						movies={movies}
						sortColumn={sortColumn}
						onCheck={this.checkLiked}
						onLike={this.handleLike}
						onDelete={this.deleteMovie}
						onSort={this.handleSort}
					/>
					<Pagination
						itemsCount={totalCount}
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
