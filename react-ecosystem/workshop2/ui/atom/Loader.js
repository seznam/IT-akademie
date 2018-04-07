import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import '~/ui/atom/loader.css';

export default function Loader({mode, layout}) {
  return (
    <div
      className={classnames(
        'atm-loader',
        {
          [`atm-loader-${mode}`]: mode,
          [`atm-loader-${layout}`]: layout,
        },
      )}
    >
      <span/>
      <span/>
      <span/>
      <span/>
      <span/>
    </div>
  );
}

Loader.propTypes = {
  mode: PropTypes.oneOf(['small']),
  layout: PropTypes.oneOf(['center']),
};
