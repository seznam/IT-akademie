
export default class AbstractService {

	/**
	 * @param {HttpAgent} httpAgent
	 * @param {string} baseUrl
	 * @param {*} entityFactory
	 */
	constructor(httpAgent, baseUrl, entityFactory) {
		/**
		 * @type {HttpAgent}
		 */
		this._httpAgent = httpAgent;

		/**
		 * @type {string}
		 */
		this._baseUrl = baseUrl;

		/**
		 * @type {*}
		 */
		this._entityFactory = entityFactory;
	}
}
