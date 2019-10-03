import { configure } from '@storybook/react';
import requireContext from 'require-context.macro';

const req = requireContext('../src/component', true, /\.stories\.js$/)

function loadStories() {
  req.keys().forEach(file => req(file));
}

configure(loadStories, module);
