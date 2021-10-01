// register our widget to Merkur
import '../src/client';

// receive widget properties for creating our Merkur widget instance
import widgetProperties from '../src/widget';

// import { loginApi } from '../src/lib/utils';

// helper method for creating storybook loader, which async creates our widget instance.
import { createWidgetLoader } from '@merkur/tool-storybook';

// Specific imports for your chosen view. For example Preact:
import { h } from 'preact';
import { forceReRender } from '@storybook/preact';
import WidgetContext from '../src/components/WidgetContext';

import devices from './devices';

// defined our custom widget loader
const loaders = [
  createWidgetLoader({
    render: forceReRender, // widget must be able to update the storybook playground
    widgetProperties, // created widget properties
  })
];

// if you need Context in React or Preact widget you must define Context Provider.
const decorators = [
   (Story, { args: { widget }}) => {
	  //  widget = {
		//    ...widget,
		//    ...loginApi()
	  //  };

    return (
      <WidgetContext.Provider value={widget}>
		<div className="m-merkur-login">
			<Story />
		</div>
      </WidgetContext.Provider>
    );
  },
];

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

export { decorators, loaders, parameters };
