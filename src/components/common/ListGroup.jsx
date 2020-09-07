import React from 'react';

const ListGroup = (props) => {
	const {
		items,
		textProperty,
		valueProperty,
		onItemSelect,
		selectedItem,
	} = props;

	return (
		<ul className='list-group'>
			{items.map((item) => (
				<li
					onClick={() => onItemSelect(item)}
					key={item[valueProperty || '_id']}
					className={
						item === selectedItem ? 'list-group-item clickable active' : 'list-group-item clickable'
					}
				>
					{item[textProperty || 'name']}
				</li>
			))}
		</ul>
	);
};

export default ListGroup;
