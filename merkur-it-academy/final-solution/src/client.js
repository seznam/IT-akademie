// eslint-disable-next-line import/order
import './style.less';
import { render, hydrate } from 'preact';
import { unmountComponentAtNode } from 'preact/compat';

import { createMerkurWidget, createMerkur } from '@merkur/core';

import { mapViews } from './lib/utils';
import { viewFactory } from './views/View';
import widgetProperties from './widget';

function createWidget(widgetParams) {
  return createMerkurWidget({
    ...widgetProperties,
    ...widgetParams,
    $dependencies: {
      render,
      hydrate,
      unmountComponentAtNode,
    },
    async mount(widget) {
      return mapViews(widget, viewFactory, ({ View, container, isSlot }) => {
        if (!container) {
          return null;
        }

        return (
          container?.children?.length && !isSlot
            ? widget.$dependencies.hydrate
            : widget.$dependencies.render
        )(View(widget), container);
      });
    },
    async unmount(widget) {
      mapViews(widget, viewFactory, ({ container }) => {
        if (container) {
          widget.$dependencies.unmountComponentAtNode(container);
        }
      });
    },
    async update(widget) {
      return mapViews(
        widget,
        viewFactory,
        ({ View, container }) =>
          container && widget.$dependencies.render(View(widget), container)
      );
    },
    openModal(widget) {
      widget.setState({
        isModalOpened: true,
      });
    },
    closeModal(widget) {
      widget.setState({
        isModalOpened: false,
      });
    },
    async fetchApi(widget, route, data, method = 'GET') {
      return await widget.http.request({
        url: `${widget.props.environment.authUrl}/${route}`,
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: data,
      });
    },
    async login(widget, data) {
      const { response } = await widget.fetchApi('login', data, 'POST');

      widget.setState({
        user: response.body.data.user,
      });
    },
    async logout(widget) {
      await widget.fetchApi('logout');

      widget.setState({
        user: null,
      });
    },
    async check(widget) {
      const { response } = await widget.fetchApi('check');

      if (response.body?.data?.user) {
        widget.setState({
          user: response.body.data.user,
        });
      }
    },
  });
}

const merkur = createMerkur();
merkur.register({
  ...widgetProperties,
  createWidget,
});
