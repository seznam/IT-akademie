import React, { Component } from 'react';
import './clickCounter.css';

class ClickCounter extends Component {
	constructor(props, context) {
		super(props, context);

		this.state = { counter: 0 };
	}

	render() {
		return (
			<div className = 'click-counter'>
				<button
					className = 'click-counter-button'
					onClick = {event => this._handleDecrement(event)}
					style = {{
						backgroundColor: this.context.background,
						color: this.context.foreground
					}}>
					-
				</button>
				<div className = 'click-counter-value'>
					{this.state.counter}
				</div>
				<button
					className = 'click-counter-button'
					onClick = {event => this._handleIncrement(event)}
					style = {{
						backgroundColor: this.context.background,
						color: this.context.foreground
					}}>
					+
				</button>
			</div>
		);
	}

	_handleIncrement(event) {
		event.preventDefault();
		this.setState({ counter: this.state.counter + 1 });
	}

	_handleDecrement(event) {
		event.preventDefault();
		this.setState({ counter: this.state.counter - 1 });
	}
}

export default ClickCounter;
