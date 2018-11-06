import React from 'react';
import { storiesOf } from '@storybook/react';
import ClickCounter from './ClickCounter';

storiesOf('ClickCounter', module)
	.add('default', () => (<ClickCounter>Button</ClickCounter>))
	.add('with updated state', () => {
		return (
			<ClickCounter ref={instance => { instance && instance.setState({ counter: 1 }) }}>
				Button
			</ClickCounter>
		);
	});
