import React from 'react';
import { uiComponentHelper } from '../UIComponentHelper';

/**
 * Common sizer
 *
 * @class Sizer
 */
export default React.forwardRef(function Sizer({ width, height, placeholder, className }, ref) {
	return (
		<div
			className = { uiComponentHelper.cssClasses({
				'atm-sizer': true,
				'atm-placeholder': placeholder
			}, className || '') }
			style = { { paddingTop: (height || 0) / (width || 0) * 100 + '%' } }
			ref={ref}
		/>
	);
});
