import { useRef } from 'preact/hooks';

import './loginForm.less';

function useLoginForm({ onSubmit, onCancel }) {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const handleCancel = (event) => {
    event.preventDefault();
    onCancel();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    });
  };

  return {
    usernameRef,
    passwordRef,
    handleCancel,
    handleSubmit,
  };
}

export default function LoginForm() {
  return null;
}
