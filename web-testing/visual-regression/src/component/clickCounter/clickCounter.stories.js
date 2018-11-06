import React from 'react';
import { storiesOf } from '@storybook/react';
import ClickCounter from './ClickCounter';

storiesOf('ClickCounter', module)
  .add('default', () => (<ClickCounter>Button</ClickCounter>));
