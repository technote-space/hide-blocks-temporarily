import { Helpers } from '@technote-space/gutenberg-utils';

const { dispatch, select } = wp.data;
const { filter, isEmpty } = window.lodash;
const { getEditorStoreKey } = Helpers;

/**
 * @param {object} setting setting
 * @returns {boolean} whether to have default setting or not
 */
export function blockHasDefault( setting ) {
	return ! isEmpty( setting.styles ) && ! isEmpty( filter( setting.styles, [ 'isDefault', true ] ) );
}

/**
 * remove hidden class
 */
export function removeHiddenClassFromBlocks() {
	getHasClassNameBlocks().forEach( block => dispatch( getEditorStoreKey() ).updateBlock( block.clientId, {
		attributes: {
			className: removeHiddenClass( block.attributes.className ),
		},
	} ) );
}

/**
 * @param {object} block block
 * @returns {boolean} whether to have class name or not
 */
function hasClassName( block ) {
	return block.attributes && block.attributes.className;
}

/**
 * @returns {array} filtered blocks
 */
function getHasClassNameBlocks() {
	return select( getEditorStoreKey() ).getBlocks().filter( block => {
		return hasClassName( block );
	} );
}

/**
 * @param {string} className class name
 * @returns {string} class name
 */
function removeHiddenClass( className ) {
	return className.split( ' ' ).filter( name => name !== 'is-style-hidden' ).join( ' ' );
}
