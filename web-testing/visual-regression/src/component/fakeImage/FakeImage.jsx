import React, { Component } from 'react';
import './fakeImage.css';

class FakeImage extends Component {
	render() {
		return (
			<div
				className="fake-image"
				style={{
					width: (this.props.width || 0) + 'px',
					height: (this.props.height || 0) + 'px',
					backgroundColor: this.props.color || 'blue'
				}} />);
	}
}

export default FakeImage;
