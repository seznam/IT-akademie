import React, { Component } from 'react';
import Headline from '../headline/Headline';
import FakeImage from '../fakeImage/FakeImage';
import { ThemeContext } from '../../context';
import './articleLink.css';

class ArticleLink extends Component {
	render() {
		if (!this.props.post) {
			return null;
		}

		return (
			<a className="article-link" href="#">
				<div
					className="article-link-container"
					style={{background: this.context.background}}>
					<FakeImage width={160} height={120} color={this.context.foreground} />
					<div className="article-link-description">
						<Headline type="h2">{this.props.post.title}</Headline>
						<div style={{color: this.context.foreground}}>{this.props.post.text}</div>
					</div>
				</div>
			</a>
		);
	}
}
ArticleLink.contextType = ThemeContext;

export default ArticleLink;
