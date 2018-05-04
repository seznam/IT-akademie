import get from 'lodash.get';

export default (path, defaultValue = undefined) => {
  return source => get(source, path, defaultValue);
};
