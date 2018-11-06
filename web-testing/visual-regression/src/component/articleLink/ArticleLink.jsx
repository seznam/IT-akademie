import React, { Component } from 'react';
import Headline from '../headline/Headline';
import FakeImage from '../fakeImage/FakeImage';
import './articleLink.css';

class ArticleLink extends Component {
	render() {
		if (!this.props.post) {
			return null;
		}

		return (
			<div className="article-link">
				<a href="#">
					<div className="article-link-container">
						<FakeImage width={160} height={120} color='black' />
						<div className="article-link-description">
							<Headline type="h2">{this.props.post.title}</Headline>
							<div className="article-link-description-text">{this.props.post.text}</div>
						</div>
					</div>
				</a>
			</div>
		);
	}
}

export default ArticleLink;
