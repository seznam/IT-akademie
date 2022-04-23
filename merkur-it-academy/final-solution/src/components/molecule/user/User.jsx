import { useContext, useState } from 'preact/hooks';

import { TextButton } from '#/components/atom';
import WidgetContext from '#/components/WidgetContext';

import './user.less';

export default function User() {
  const widget = useContext(WidgetContext);
  const { user } = widget.state;

  return (
    <div className='m-user'>
      {user.avatar && <img className='m-user__img' src={user.avatar} />}
      <span className='m-user__name'>{user.displayName || user.username}</span>
      <span className='m-user__separator'></span>
      <TextButton className='m-user_btn' onClick={widget.logout}>
        Logout
      </TextButton>
    </div>
  );
}
