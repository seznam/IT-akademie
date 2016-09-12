import React, { PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import { uiComponentHelper } from '../UIComponentHelper';

export default class MainLayout extends React.Component {

	static get propTypes() {
		return {
			className: PropTypes.string
		};
	}

	static get defaultProps() {
		return {
			className: ''
		};
	}

	render() {
		return (
			<div className = { uiComponentHelper.cssClasses({
				'tpl-main-layout': true
			}, this.props.className) }>
				<header className = 'tpl-main-layout-header'>
					<div className = 'tpl-main-layout-header-content'>
						<a href = '/' className = 'tpl-main-layout-logo'>
							<h1>SFlix</h1>
						</a>
						<form className = 'tpl-main-layout-search-form' action = '/' method = 'get'>
							<input
									className = 'tpl-main-layout-search-input'
									type = 'search'
									name = 'q'
									placeholder = 'Vyhledávání…'/>
							<button className = 'tpl-main-layout-search-button'>Hledat</button>
							<button className = 'tpl-main-layout-search-button'>Vymazat</button>
						</form>
					</div>
				</header>
				<main className = 'tpl-main-layout-main'>
					{this.props.children}
				</main>
				<footer className = 'tpl-main-layout-footer'>
					Seznam.cz &copy; 2016
				</footer>
			</div>
		);
	}

	onSearch(event) {
		// TODO: browserHistory.push()
	}

	onClear(event) {
		// TODO: clear form input
	}
}
