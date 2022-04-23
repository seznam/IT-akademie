import { bindWidgetToFunctions } from '@merkur/core';
import { componentPlugin } from '@merkur/plugin-component';
import { errorPlugin } from '@merkur/plugin-error';
import { eventEmitterPlugin } from '@merkur/plugin-event-emitter';
import {
  httpClientPlugin,
  setDefaultConfig,
  transformBody,
  transformQuery,
} from '@merkur/plugin-http-client';

import pkg from '../package.json';

export default {
  name: pkg.name,
  version: pkg.version,
  $plugins: [
    componentPlugin,
    eventEmitterPlugin,
    httpClientPlugin,
    errorPlugin,
  ],
  assets: [
    {
      name: 'polyfill.js',
      type: 'script',
    },
    {
      name: 'widget.js',
      type: 'script',
    },
    {
      name: 'widget.css',
      type: 'stylesheet',
    },
  ],
  load(widget) {
    // eslint-disable-next-line no-unused-vars
    const { environment, ...restProps } = widget.props;

    return {
      ...restProps,
      isModalOpened: false,
      user: null,
    };
  },
};
