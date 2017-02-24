import AbstractComponent from 'ima/page/AbstractComponent';
import React, { PropTypes } from 'react';

export default class MainLayout extends AbstractComponent {

	static get propTypes() {
		return {
			className: PropTypes.string,
			query: PropTypes.string
		};
	}

	static get defaultProps() {
		return {
			className: '',
			query: ''
		};
	}

	constructor(props, context) {
		super(props, context);

		this.state = {
			query: this.props.query
		};
	}

	render() {
		return (
			<div className={this.cssClasses({
				'tpl-main-layout': true
			}, true)}>
				<header className='tpl-main-layout-header'>
					<div className='tpl-main-layout-header-content'>
						<a href={this.link('home')} className='tpl-main-layout-logo'>
							<h1>SFlix</h1>
						</a>
						<form className='tpl-main-layout-search-form' action='/' method='get'>
							<input
									className='tpl-main-layout-search-input'
									type='search'
									name='q'
									placeholder='Vyhledávání…'
									value={this.state.query}
									onChange={event => this.onSearch(event)}/>
							<button className='tpl-main-layout-search-button'>Hledat</button>
							<button className='tpl-main-layout-search-button'>Vymazat</button>
						</form>
					</div>
				</header>
				<main className='tpl-main-layout-main'>
					{this.props.children}
				</main>
				<footer className='tpl-main-layout-footer'>
					Seznam.cz &copy; 2016
				</footer>
			</div>
		);
	}

	onSearch(event) {
		let input = event.target;
		let query = input.value;
		this.setState({
			query
		});

		this.fire('search', {
			query: query.trim()
		});
	}
}
