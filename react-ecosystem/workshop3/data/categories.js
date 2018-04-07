import clone from 'clone';

const FETCH_LIST_DELAY = 100; // milliseconds

const DATA = [
  {
    id: 1,
    title: 'Akční',
    url: 'akcni',
    icon: 'dashboard',
  },
  {
    id: 2,
    title: 'Animované',
    url: 'animovane',
    icon: 'cd',
  },
  {
    id: 3,
    title: 'Dobrodružné',
    url: 'dobrodruzne',
    icon: 'road',
  },
  {
    id: 4,
    title: 'Romantické',
    url: 'romanticke',
    icon: 'heart',
  },
];

export async function fetchCategories() {
  await delay(FETCH_LIST_DELAY);
  return clone(DATA);
}

function delay(duration) {
  return new Promise(resolve => setTimeout(resolve, duration));
}
