import { forwardRef } from 'preact/compat';
import { useRef } from 'preact/hooks';

import uid from 'easy-uid';

import './input.less';

function Input({ label, disabled, type = 'text' }, ref) {
  const inputUid = useRef(uid());

  return (
    <div className='m-input'>
      {label && (
        <label className='m-input__label' htmlFor={inputUid}>
          {label}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        disabled={disabled}
        id={inputUid.current}
        className='m-input__input'
      />
    </div>
  );
}

export default forwardRef(Input);
