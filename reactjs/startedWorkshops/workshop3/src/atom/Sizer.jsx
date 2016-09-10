import React, { PropTypes } from 'react';
import { uiComponentHelper } from '../UIComponentHelper';

/**
 * Common sizer
 *
 * @class Sizer
 */
export default function Sizer(props) {
	return (
		<div
				className = { uiComponentHelper.cssClasses({
					'atm-sizer': true,
					'atm-placeholder': props.placeholder
				}, props.className) }
				style = { { paddingTop: props.height / props.width * 100 + '%' } }/>
	);
}

Sizer.propTypes = {
	width:  PropTypes.number,
	height:  PropTypes.number,
	placeholder: PropTypes.bool,
	className: PropTypes.string
};

Sizer.defaultProps = {
	width: 0,
	height: 0,
	placeholder: false,
	className: ''
};
