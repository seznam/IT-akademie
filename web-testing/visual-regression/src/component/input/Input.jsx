import React, { Component } from 'react';
import './input.css';

class Input extends Component {
	render() {
		return (
			<div className="input">
				<label className="input-label">{this.props.label}</label>
				<input {...this.props} className="input-field" />
			</div>
		);
	}
}

export default Input;
