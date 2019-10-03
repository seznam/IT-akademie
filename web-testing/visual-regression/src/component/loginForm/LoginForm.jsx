import React, { Component } from 'react';
import Headline from '../headline/Headline';
import Button from '../button/Button';
import Input from '../input/Input';
import './loginForm.css';

class LoginForm extends Component {
	render() {
		return (
			<form className="login-form">
				<Headline type="h1">Login Page</Headline>
				<Input type="text" label="Username" />
				<Input type="password" label="Password" />
				<Button>Login</Button>
			</form>
		);
	}
}

export default LoginForm;
