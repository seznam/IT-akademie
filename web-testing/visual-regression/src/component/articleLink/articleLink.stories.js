import React from 'react';
import { storiesOf } from '@storybook/react';
import ArticleLink from './ArticleLink';

const TEXT = 'Lorem ipsum dolor sit amet, consectetuer adipiscing...';
const POST = {
	title: 'Random Article Title',
	text: TEXT
};

storiesOf('ArticleLink', module)
	.add('default', () => (<ArticleLink post={POST} />));
