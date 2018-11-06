import React, { Component } from 'react';
import Card from '../card/Card';
import EmptySpace from '../emptySpace/EmptySpace';
import './cardGroup.css';

class CardGroup extends Component {
	render() {
		return (
			<div className="card-group">
				<Card className="card-group-main" post={this.props.posts[0]} />
				<EmptySpace />
				<div className="card-group-sidebar">
					<Card post={this.props.posts[1]} />
					<EmptySpace />
					<Card post={this.props.posts[2]} />
				</div>
			</div>
		);
	}
}

export default CardGroup;
