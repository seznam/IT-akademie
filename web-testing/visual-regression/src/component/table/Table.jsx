import React, { Component } from 'react';
import data from './data';
import './table.css';

class Table extends Component {
	render() {
		return (
			<table className="table">
				{this._renderHeaderRow()}
				{data.map(rowData => this._renderRow(rowData))}
			</table>
		);
	}

	_renderHeaderRow() {
		if (!this.props.headers) {
			return null;
		}

		return (
			<tr>
				{this.props.headers.map(header => (<th>{header}</th>))}
			</tr>
		);
	}

	_renderRow(rowData) {
		return (
			<tr>
				{rowData.map(column => (<td>{column}</td>))}
			</tr>
		);
	}
}

export default Table;
