import React, { PropTypes } from 'react';
import { uiComponentHelper } from '../UIComponentHelper';

/**
 * Common sizer
 *
 * @class Sizer
 */
export default function Sizer(props) {
	
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
