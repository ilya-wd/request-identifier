import RequestIdentifier from './RequestIdentifier.js';

/**
 * @class ClientForRI
 * @classdesc ClientForRI class representing the client for RequestIdentifier
 * @constructor
 * @param {string} uri - URI string to be validated
 */
class ClientForRI {
  constructor(uri) {
    /**
     * @property {string} uri - URI string to be validated
     */
    this.uri = uri;
    /**
     * @property {RequestIdentifier} RequestIdentifier - Instance of RequestIdentifier class
     */
    this.RequestIdentifier = new RequestIdentifier();
  }

  /**
   * @function validatePath
   * @description Validates the path of the URI string
   * @returns {string} Path of the URI string
   */
  validatePath() {
    return this.RequestIdentifier.validateAndReturnPath(this.uri);
  }

  /**
   * @function validateParams
   * @description Validates the parameters of the URI string
   * @returns {Object} Parameters of the URI string
   */
  validateParams() {
    return this.RequestIdentifier.validateAndReturnParams(this.uri);
  }
}

/**
 * Below is code for testing purposes
 * Replace testURI value with a string to be tested
 */

const testURI = 'visma-identity://confirm?source=netvisor&paymentnumber=102226';
const testClient = new ClientForRI(testURI);

console.log(testClient.validatePath());
console.log(testClient.validateParams());
