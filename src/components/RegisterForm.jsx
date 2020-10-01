import React from 'react';
import Form from './common/Form';
import Joi from 'joi-browser';
import * as userService from '../services/userService';

class RegisterForm extends Form {
	state = {
		data: { username: '', password: '', name: '' },
		errors: {},
	};

	schema = {
		username: Joi.string().required().email().label('Username'),
		password: Joi.string().required().min(5).label('Password'),
		name: Joi.string().required().label('Name'),
	};

	doSubmit = async () => {
		try {
			const { headers } = await userService.register(this.state.data);
			localStorage.setItem('token', headers['x-auth-token']);
			this.props.history.push('/');
		} catch (error) {
			if (error.response && error.response.status === 400) {
				const errors = { ...this.state.errors };
				errors.username = error.response.data;
				this.setState({ errors });
			}
		}
	};

	render() {
		return (
			<>
				<h1>Register</h1>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput('username', 'Username')}
					{this.renderInput('password', 'Password', 'password')}
					{this.renderInput('name', 'Name')}
					{this.renderButton('Register')}
				</form>
			</>
		);
	}
}

export default RegisterForm;
