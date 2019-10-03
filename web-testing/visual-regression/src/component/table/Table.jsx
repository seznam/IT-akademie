import React, { Component } from 'react';
import data from './data';
import './table.css';

class Table extends Component {
	render() {
		return data.map(row => (<div>{row}</div>));
	}
}

export default Table;
