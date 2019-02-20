import React from 'react';
import { uiComponentHelper } from '../UIComponentHelper';

/**
 * Common loader
 *
 * @class Loader
 */

export default React.forwardRef(function Loader(props, ref) {
	return (
		<div
			className = { uiComponentHelper.cssClasses({
				'atm-loader': true,
				['atm-loader-' + (props.mode || '')]: props.mode,
				['atm-loader-' + (props.layout || '')]: props.layout
			}, props.className || '') }
			ref={ref}
		>
			<span/>
			<span/>
			<span/>
			<span/>
			<span/>
		</div>
	);
});
