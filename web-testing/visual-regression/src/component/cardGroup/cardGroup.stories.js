import React from 'react';
import { storiesOf } from '@storybook/react';
import CardGroup from './CardGroup';

const POSTS = [
	{
		title: 'Main Card',
		text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. In convallis. Etiam bibendum elit eget erat. Donec vitae arcu. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. In sem justo, commodo ut, suscipit at, pharetra vitae, orci. Nullam faucibus mi quis velit. Phasellus faucibus molestie nisl. Etiam dictum tincidunt diam. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla turpis magna, cursus sit amet, suscipit a, interdum id, felis. Proin mattis lacinia justo.'
	},
	{
		title: 'Top right card',
		text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. In convallis. Etiam bibendum elit eget erat. Donec vitae arcu. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. In sem justo, commodo ut, suscipit at, pharetra vitae, orci.'
	},
	{
		title: 'Bottom right card' ,
		text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. In convallis. Etiam bibendum elit eget erat. Donec vitae arcu.'
	}
]

storiesOf('CardGroup', module)
  .add('with 3 cards', () => <CardGroup posts={POSTS}/> )
