import cn from 'classnames';

import './textButton.less';

export default function TextButton({
  children,
  className,
  type = 'button',
  ...restProps
}) {
  return (
    <button
      type={type}
      className={cn('m-text-button', className)}
      {...restProps}
    >
      {children}
    </button>
  );
}
