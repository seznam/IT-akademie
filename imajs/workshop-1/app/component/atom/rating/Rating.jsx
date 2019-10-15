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
    return null
    // WORKSHOP: implement
    /*
		stars <- []
		for i of [0, STARS_COUNT)
			stars <- [...stars, 100 / STARS_COUNT * i]

		return
			span[class="atm-rating {props.className}"]
				for ratingLimit of stars
					span[key=ratingLimit][class="atm-rating-star {ratingLimit <= this.props.rating && "atm-rating-star-full"}"]
		 */
  }
}
