import { PLUGIN_NAME } from '../constant';

/**
 * @param {string} name name
 * @returns {string} namespace
 */
export function getNamespace(name) {
	return PLUGIN_NAME + '/' + name;
}
