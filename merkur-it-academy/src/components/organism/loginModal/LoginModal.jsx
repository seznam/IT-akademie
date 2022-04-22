import { useContext, useState } from 'preact/hooks';

import { Modal } from '#/components/atom';
import { LoginForm } from '#/components/molecule';
import WidgetContext from '#/components/WidgetContext';

export default function LoginModal() {
  return (
    <Modal title='Sign in'>
      <LoginForm />
    </Modal>
  );
}
