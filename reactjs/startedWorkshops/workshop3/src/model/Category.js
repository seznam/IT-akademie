import { deepFreeze, clone } from './utils';

const DATA = deepFreeze([
	{
		id: 1,
		title: 'Akční',
		url: 'akcni',
		icon: 'dashboard'
	},
	{
		id: 2,
		title: 'Animované',
		url: 'animovane',
		icon: 'cd'
	},
	{
		id: 3,
		title: 'Dobrodružné',
		url: 'dobrodruzne',
		icon: 'road'
	},
	{
		id: 4,
		title: 'Romantické',
		url: 'romanticke',
		icon: 'heart'
	}
]);

export default class Category {
	getCategories() {
		return Promise.resolve(deepFreeze(clone(DATA)));
	}
}
