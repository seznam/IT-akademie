import React, { Component } from 'react';

class H3 extends Component {
	render() {
		return (
			<h3 className={this.props.className}>{this.props.children}</h3>
		);
	}
}

export default H3;
