import React from 'react';
import { storiesOf } from '@storybook/react';
import Headline from './Headline';

const title = 'It\'s a beautiful day!';

storiesOf('Headline', module)
	.add('h1', () => (<Headline type="h1">{title}</Headline>))
	.add('h2', () => (<Headline type="h2">{title}</Headline>))
	.add('h3', () => (<Headline type="h3">{title}</Headline>))
	.add('h4', () => (<Headline type="h4">{title}</Headline>));
