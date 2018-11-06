import React, { Component } from 'react';
import Headline from '../headline/Headline';
import './card.css';

class Card extends Component {
	render() {
		if (!this.props.post) {
			return null;
		}

		return (
			<div className="card">
				<Headline type="h2">{this.props.post.title}</Headline>
				<div className="card-content">{this.props.post.text}</div>
			</div>
		);
	}
}

export default Card;
