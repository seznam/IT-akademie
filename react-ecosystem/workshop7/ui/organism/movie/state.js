import namespace from '~/store/namespace';

export const NAMESPACE = namespace('movie');

export default {
  movie: null,
  isLoading: null,
  lastError: null,
};
