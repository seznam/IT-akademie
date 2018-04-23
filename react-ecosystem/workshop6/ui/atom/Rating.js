import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import '~/ui/atom/ratingStar.css';

const RATING_STARS = 5;

export default function Rating({rating, onRate}) {
  const filledStars = rating / 100 * RATING_STARS;

  return (
    <div className="atm-rating">
      {Array.from({length: RATING_STARS}).map((_, index) =>
        <button
          key={index}
          className={classnames(
            'atm-rating-star',
            {
              'atm-rating-star-full': index < filledStars,
            },
          )}
          onClick={onRate && (() => onRate(100 / RATING_STARS * (index + 1)))}
        />,
      )}
    </div>
  );
}

Rating.propTypes = {
  rating: PropTypes.number.isRequired,
  onRate: PropTypes.func,
};
