import React from 'react';
import { storiesOf } from '@storybook/react';
import Input from './Input';

storiesOf('Input', module)
	.add('with text', () => (<Input label="Username" type="text" value="Text" />))
	.add('with password', () => (<Input label="Password" type="password" value="This is password" />));
