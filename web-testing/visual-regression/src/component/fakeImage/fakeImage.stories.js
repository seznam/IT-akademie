import React from 'react';
import { storiesOf } from '@storybook/react';
import FakeImage from './FakeImage';

storiesOf('FakeImage', module)
	.add('default', () => (<FakeImage width={100} height={100} />))
	.add('with color', () => (<FakeImage width={100} height={100} color="pink" />))
