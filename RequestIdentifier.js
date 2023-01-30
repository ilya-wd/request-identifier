/* eslint-disable operator-linebreak */

/**
 * @class RequestIdentifier
 * @classdesc RequestIdentifier class that valudates path and parameters of a URI
 */
class RequestIdentifier {
  /**
   * The scheme of the URI
   * @private
   */
  #scheme = 'visma-identity';

  /**
   * The allowed paths in the URI
   * @private
   */
  #allowedPaths = ['login', 'confirm', 'sign'];

  /**
   * Validate the scheme of the URI
   * @private
   * @param {string} uri - The URI to be validated
   * @throws {Error} - When the scheme is invalid
   */

  #validateScheme(uri) {
    if (!uri.startsWith(`${this.#scheme}://`)) {
      throw new Error('Invalid URI scheme');
    }
  }

  /**
   * Validate the path of the URI
   * @private
   * @param {string} uri - The URI to be validated
   * @returns {string} - The path in the URI
   * @throws {Error} - When the path is invalid
   */
  #validatePath(uri) {
    const [path, rest] = uri.slice(this.#scheme.length + 3).split('?');
    if (!this.#allowedPaths.includes(path)) {
      throw new Error('Invalid path');
    }
    return path;
  }

  /**
   * Validate a string parameter in the URI
   * @private
   * @param {string} pathName - The name of the path to be validated
   * @param {string} param - The parameter name to be validated
   * @param {URLSearchParams} uriParams - The parameters of the URI
   * @returns {string} - The value of the parameter
   * @throws {Error} - When the parameter is missing or not a string
   */
  #validateParamString(pathName, param, uriParams) {
    if (uriParams.has(param)) {
      return uriParams.get(param);
    }
    throw new Error(`Invalid parameters for ${pathName} path - missing ${param}`);
  }

  /**
   * Validate a number parameter in the URI
   * @private
   * @param {string} pathName - The name of the path to be validated
   * @param {string} param - The parameter name to be validated
   * @param {URLSearchParams} uriParams - The parameters of the URI
   * @returns {number} - The value of the parameter
   * @throws {Error} - When the parameter is missing or not a number
   */
  #validateParamNumber(pathName, param, uriParams) {
    if (uriParams.has(param) && !Number.isNaN(uriParams.get(param))) {
      return uriParams.get(param);
    }
    throw new Error(`Invalid parameters for ${pathName} path - missing ${param}`);
  }

  /**
   * Validates the parameters of a URI based on the specified path
   * @param {string} uri - The URI to be validated
   * @param {string} path - The path of the URI
   * @returns {Object} An object containing the validated parameters of the URI
   */
  #validateParams(uri, path) {
    const urlObj = new URL(uri);
    const uriParams = new URLSearchParams(urlObj.search);
    switch (path) {
      case 'login':
        return {
          source: this.#validateParamString('login', 'source', uriParams),
        };
      case 'confirm':
        return {
          source: this.#validateParamString('login', 'source', uriParams),
          paymentnumber: this.#validateParamString('login', 'paymentnumber', uriParams),
        };
      case 'sign':
        return {
          source: this.#validateParamString('login', 'source', uriParams),
          documentid: this.#validateParamString('login', 'documentid', uriParams),
        };
      default:
        throw new Error('Invalid parameters');
    }
  }

  /**
   * Validates the scheme and path of a URI and returns the path
   * @param {string} uri - The URI to be validated
   * @returns {string} The path of the URI
   */

  validateAndReturnPath(uri) {
    this.#validateScheme(uri);
    return this.#validatePath(uri);
  }

  /**
   * Validates the scheme and parameters of a URI and returns the parameters
   * @param {string} uri - The URI to be validated
   * @returns {Object} – a mapping of URI parameters to their values
   */
  validateAndReturnParams(uri) {
    this.#validateScheme(uri);
    const path = this.#validatePath(uri);
    return this.#validateParams(uri, path);
  }
}

export default RequestIdentifier;
