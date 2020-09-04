import React from 'react';

const Like = (props) => {
	return (
		<i
			style={props.onLoadCheck()}
			className='far fa-heart'
			onClick={props.onClick}
		></i>
	);
};

export default Like;
