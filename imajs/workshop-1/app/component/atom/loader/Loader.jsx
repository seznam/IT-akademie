import AbstractComponent from 'ima/page/AbstractComponent';
import React, { PropTypes } from 'react';

/**
 * Common loader
 *
 * @class Loader
 */

export default class Loader extends AbstractComponent {

	static get propTypes() {
		return {
			mode: PropTypes.string,
			layout: PropTypes.string,
			className: PropTypes.string
		};
	}

	static get defaultProps() {
		return {
			mode: '',
			layout: '',
			className: ''
		};
	}

	render() {
		return (
			<div className={this.cssClasses({
				'atm-loader': true,
				['atm-loader-' + this.props.mode]: this.props.mode,
				['atm-loader-' + this.props.layout]: this.props.layout
			}, true)}>
				<span/>
				<span/>
				<span/>
				<span/>
				<span/>
			</div>
		);
	}
}
