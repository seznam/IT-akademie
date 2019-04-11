import AbstractComponent from 'ima/page/AbstractComponent';
import React from 'react';
import PropTypes from 'prop-types';

export default class ErrorView extends AbstractComponent {
  static get contextTypes() {
    return {
      $Utils: PropTypes.object
    };
  }

  render() {
    let error = this.props.error || {};
    let message = error.message || '';
    let stack = error.stack || '';

    return (
      <div className="l-error">
        <h1>500 &ndash; Error</h1>
        <div className="message">{message}</div>
        <pre>{stack}</pre>
      </div>
    );
  }
}
