import React from 'react';
import Input from '../common/Input';

const SearchInput = ({ onChange, value }) => {
	return (
		<Input
			type='text'
			name='query'
			onChange={(e) => onChange(e.currentTarget.value)}
			className='form-control my-3'
			placeholder='Search...'
			value={value}
		/>
	);
};

export default SearchInput;
