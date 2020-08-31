import React, { Component } from 'react';

class Pagination extends Component {
	state = {};
	render() {
		return (
			<nav aria-label='...'>
				<ul class='pagination'>
					{/* <li class='page-item disabled'>
						<span class='page-link'>Previous</span>
					</li> */}
					<li class='page-item'>
						<a class='page-link' href='#'>
							1
						</a>
					</li>
					<li class='page-item active' aria-current='page'>
						<span class='page-link'>
							2<span class='sr-only'>(current)</span>
						</span>
					</li>
					<li class='page-item'>
						<a class='page-link' href='#'>
							3
						</a>
					</li>
					{/* <li class='page-item'>
						<a class='page-link' href='#'>
							Next
						</a>
					</li> */}
				</ul>
			</nav>
		);
	}
}

export default Pagination;
