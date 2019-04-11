import AbstractComponent from 'ima/page/AbstractComponent';
import React from 'react';
import PropTypes from 'prop-types';

const STARS_COUNT = 5;

export default class Rating extends AbstractComponent {
  static get propTypes() {
    return {
      rating: PropTypes.number,
      className: PropTypes.string
    };
  }

  static get defaultProps() {
    return {
      rating: 0,
      className: ''
    };
  }

  render() {
    const stars = new Array(STARS_COUNT).fill();
    const fullStarIndex = Math.floor((this.props.rating / 100) * STARS_COUNT);

    return (
      <React.Fragment>
        {stars.map((_, index) => (
          <span
            key={index}
            className={this.cssClasses({
              'atm-rating-star': true,
              'atm-rating-star-full': fullStarIndex > index
            })}
          />
        ))}
      </React.Fragment>
    );
  }
}
