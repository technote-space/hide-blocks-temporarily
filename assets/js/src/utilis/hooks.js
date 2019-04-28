import { PLUGIN_NAME } from '../constant';

export function getNamespace( name ) {
	return PLUGIN_NAME + '/' + name;
}
