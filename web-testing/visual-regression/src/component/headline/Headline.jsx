import React, { Component } from 'react';
import H1 from './H1';
import H2 from './H2';
import H3 from './H3';
import H4 from './H4';
import './headline.css';

class Headline extends Component {
	render() {
		let Type = this._getHeadlineType();

		if (!Type) {
			return null;
		}

		return (
			<Type className="headline">{this.props.children}</Type>
		);
	}

	_getHeadlineType() {
		let Type;

		switch (this.props.type) {
			case 'h1': Type = H1; break;
			case 'h2': Type = H2; break;
			case 'h3': Type = H3; break;
			case 'h4': Type = H4; break;
			default: Type = null
		}

		return Type;
	}
}

export default Headline;
