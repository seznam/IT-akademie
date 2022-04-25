import { useRef } from 'preact/hooks';

import { Button, Input } from '#/components/atom';

import './loginForm.less';

export default function LoginForm({
  onSubmit,
  onCancel,
  error,
  disabled = false,
  isLoading = false,
}) {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit({
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className='m-login-form'>
      <Input label='Username:' ref={usernameRef} disabled={disabled} />
      <Input
        label='Password:'
        type='password'
        ref={passwordRef}
        disabled={disabled}
      />
      {error && <div className='m-login-form__error'>{error}</div>}
      <div className='m-login-form__footer'>
        <Button isLoading={isLoading} disabled={disabled} type='submit' primary>
          Submit
        </Button>
        <Button disabled={disabled} onClick={onCancel}>
          Close
        </Button>
      </div>
    </form>
  );
}
