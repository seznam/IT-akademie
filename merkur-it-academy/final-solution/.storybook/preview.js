import '../src/client';
import { forceReRender } from '@storybook/preact';

import { createWidgetLoader } from '@merkur/tool-storybook';

import devices from './devices';
import WidgetContext from '../src/components/WidgetContext';
import widgetProperties from '../src/widget';

const viewports = devices.map(
	({ name, width, height, isTablet, isMobile }) => ({
		name,
		styles: {
			height: `${height}px`,
			width: `${width}px`
		},
		type: (isTablet && 'tablet') || (isMobile && 'mobile') || 'desktop'
	})
);

const loaders = [
	createWidgetLoader({
		render: forceReRender,
		widgetProperties: { isRegression: true, ...widgetProperties }
	})
];

const decorators = [
	(Story, { loaded: { widget }}) => {
	 return (
		 <WidgetContext.Provider value={widget}>
			<div className="m-merkur-login">
				<Story />
			</div>
		 </WidgetContext.Provider>
	 );
 },
];

const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	viewport: {
		viewports
	},
	options: {
		storySort: {
			method: 'alphabetical'
		}
	},
	layout: 'fullscreen'
};

export { loaders, decorators, parameters };
