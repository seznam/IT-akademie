import { useContext, useState } from 'preact/hooks';

import { TextButton } from '#/components/atom';
import WidgetContext from '#/components/WidgetContext';

import './user.less';

export default function User() {
  return (
    <div className='m-user'>
      <img className='m-user__img' />
      <span className='m-user__name'></span>
      <span className='m-user__separator'></span>
      <TextButton className='m-user_btn'>Logout</TextButton>
    </div>
  );
}
