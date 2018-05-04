const withCSS = require('@zeit/next-css');
const withOrganismLinker = require('./build/organismLinker');
const withReducerLinker = require('./build/reducerLinker');
const withSagaLinker = require('./build/sagaLinker');

const withLinkers = nextConfig => withSagaLinker(withReducerLinker(withOrganismLinker(nextConfig)));

module.exports = withLinkers(withCSS());
