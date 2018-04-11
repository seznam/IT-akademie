import React from 'react';
import PropTypes from 'prop-types';

export default class Link extends React.Component {
  render() {
    return (
      <mock-link {...this.props}>
        {this.props.children}
      </mock-link>
    );
  }
}

Link.propTypes = {
  children: PropTypes.node,
};
