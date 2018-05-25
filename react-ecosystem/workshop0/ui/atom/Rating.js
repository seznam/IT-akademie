import classnames from 'classnames';
import PropTypes from 'prop-types';
import '~/ui/atom/ratingStar.css';

const RATING_STARS = 5;

export default function Rating({rating}) {
  const filledStars = rating / 100 * RATING_STARS;

  return (
    <div className="atm-rating">
      {Array.from({length: RATING_STARS}).map((_, index) =>
        <div
          key={index}
          className={classnames(
            'atm-rating-star',
            {
              'atm-rating-star-full': index < filledStars,
            },
          )}
        />,
      )}
    </div>
  );
}

Rating.propTypes = {
  rating: PropTypes.number.isRequired,
};
