import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const Pagination = (props) => {
	const { pageSize, itemsCount, onPageChange, currentPage } = props;

	const pagesCount = itemsCount / pageSize;
	const pages = _.range(1, pagesCount + 1);
	if (Math.ceil(pagesCount) === 1) return null;

	return (
		<nav aria-label='...'>
			<ul className='pagination'>
				{pages.map((page) => (
					<li
						key={page}
						className={page === currentPage ? 'page-item active' : 'page-item'}
					>
						<a className='page-link' onClick={() => onPageChange(page)}>
							{page}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
};

Pagination.propTypes = {
	pageSize: PropTypes.number.isRequired,
	itemsCount: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired,
	currentPage: PropTypes.number.isRequired,
};

export default Pagination;
