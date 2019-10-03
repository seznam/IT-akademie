import React from 'react';
import { storiesOf } from '@storybook/react';
import Table from './Table';
import data from './data.json';

const headers = ['First Name', 'Last Name', 'Income'];

storiesOf('Table', module)
  .add('default', () => (<Table data={data} />))
  .add('with headers', () => (<Table headers={headers} data={data} />));
