import cn from 'classnames';

import './textButton.less';

export default function TextButton({ children, className, ...restProps }) {
  return (
    <button className={cn('m-text-button', className)} {...restProps}>
      {children}
    </button>
  );
}
