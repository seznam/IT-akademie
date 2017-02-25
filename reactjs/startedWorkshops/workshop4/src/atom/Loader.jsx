import React, { PropTypes } from 'react';
import { uiComponentHelper } from '../UIComponentHelper';

/**
 * Common loader
 *
 * @class Loader
 */

export default function Loader(props) {
	return (
		<div className = { uiComponentHelper.cssClasses({
			'atm-loader': true,
			['atm-loader-' + props.mode]: props.mode,
			['atm-loader-' + props.layout]: props.layout
		}, props.className) }>
			<span/>
			<span/>
			<span/>
			<span/>
			<span/>
		</div>
	);
}

Loader.propTypes = {
	mode: PropTypes.string,
	layout: PropTypes.string,
	className: PropTypes.string
};

Loader.defaultProps = {
	mode: '',
	layout: '',
	className: ''
};
