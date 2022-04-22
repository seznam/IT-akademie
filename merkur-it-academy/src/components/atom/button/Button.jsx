import cn from 'classnames';

import { Loader } from '#/components/atom';

import './button.less';

export default function Button({
  children,
  primary = false,
  isLoading = false,
  type = 'button',
  className,
  ...restProps
}) {
  return (
    <button
      type={type}
      className={cn(
        {
          ['m-button']: true,
          ['m-button--primary']: primary,
          ['m-button--secondary']: !primary,
          ['m-button--loading']: isLoading,
        },
        className
      )}
      {...restProps}
    >
      {isLoading ? <Loader /> : children}
    </button>
  );
}
