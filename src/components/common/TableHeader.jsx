import React, { Component } from 'react';

class TableHeader extends Component {
	raiseSort = (path) => {
		const sortColumn = { ...this.props.sortColumn };
		if (sortColumn.path === path) {
			sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc';
		} else {
			sortColumn.path = path;
			sortColumn.order = 'asc';
		}
		this.props.onSort(sortColumn);
	};

	renderSortIcon = (column) => {
		const { sortColumn } = this.props;
		if (column.path === sortColumn.path) {
			return sortColumn.order === 'asc' ? (
				<i className='fas fa-sort-up'></i>
			) : (
				<i className='fas fa-sort-down'></i>
			);
		}
	};

	render() {
		return (
			<thead>
				<tr>
					{this.props.columns.map((column) => (
						<th
							className='clickable'
							key={column.path || column.key}
							onClick={() => {
								this.raiseSort(column.path);
							}}
						>
							{column.lable} {this.renderSortIcon(column)}
						</th>
					))}
				</tr>
			</thead>
		);
	}
}

export default TableHeader;
