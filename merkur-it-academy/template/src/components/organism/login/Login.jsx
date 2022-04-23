import { useContext, useEffect, useState } from 'preact/hooks';

import { TextButton } from '#/components/atom';
import { User } from '#/components/molecule';
import WidgetContext from '#/components/WidgetContext';

import './login.less';

export default function Login() {
  return (
    <div className='m-login__button'>
      <TextButton>Sign in</TextButton>
    </div>
  );
}
