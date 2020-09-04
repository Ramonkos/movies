import React from 'react';
import { getGenres } from '../../services/fakeGenreService';

const ListGroup = (props) => {
	// let classes = 'list-group-item';
	const {
		items,
		textProperty,
		valueProperty,
		onItemSelect,
		selectedItem,
	} = props;

	// filterGenre = () => {
	// 	console.log('filterGenre');
	// };

	return (
		<ul className='list-group'>
			{/* <li className='list-group-item'>All Genres</li> */}
			{items.map((item) => (
				<li
					onClick={() => onItemSelect(item)}
					key={item[valueProperty || '_id']}
					className={
						item === selectedItem ? 'list-group-item active' : 'list-group-item'
					}
				>
					{item[textProperty || 'name']}
				</li>
			))}
		</ul>
	);
};

export default ListGroup;
