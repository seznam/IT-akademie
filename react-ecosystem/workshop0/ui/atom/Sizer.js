import classnames from 'classnames';
import PropTypes from 'prop-types';

export default function Sizer({width, height, placeholder}) {
  return (
    <div
      className={classnames(
        'atm-sizer',
        {
          'atm-placeholder': placeholder,
        },
      )}
      style={{
        paddingTop: `${height / width * 100}%`,
      }}
    />
  );
}

Sizer.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  placeholder: PropTypes.bool,
};
