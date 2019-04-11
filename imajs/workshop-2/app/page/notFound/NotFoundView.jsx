import AbstractComponent from 'ima/page/AbstractComponent';
import React from 'react';
import PropTypes from 'prop-types';

export default class NotFoundView extends AbstractComponent {
  static get contextTypes() {
    return {
      $Utils: PropTypes.object
    };
  }

  render() {
    return (
      <div className="l-not-found">
        <h1>404 &ndash; Not Found</h1>
      </div>
    );
  }
}
