import namespace from '~/store/namespace';

export const NAMESPACE = namespace('movieListing');

export default {
  movies: [],
  isLoading: false,
  lastError: null,
};
