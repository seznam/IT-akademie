import { configure } from '@storybook/react';
import 'loki/configure-react';

const req = require.context('../src/component', true, /\.stories\.js$/)

function loadStories() {
	req.keys().forEach(file => req(file));
}

configure(loadStories, module);
