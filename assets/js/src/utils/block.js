import { dispatch, select } from '@wordpress/data';

/**
 * remove hidden class
 */
export const removeHiddenClassFromBlocks = () => {
  getHasClassNameBlocks().forEach(block => dispatch('core/block-editor').updateBlock(block.clientId, {
    attributes: {
      className: removeHiddenClass(block.attributes.className),
    },
  }));
};

/**
 * @param {object} block block
 * @returns {boolean} whether to have class name or not
 */
const hasClassName = block => block.attributes && block.attributes.className;

/**
 * @returns {array} filtered blocks
 */
const getHasClassNameBlocks = () => select('core/block-editor').getBlocks().filter(block => {
  return hasClassName(block);
});

/**
 * @returns {string} hidden class
 */
const getHiddenClass = () => 'is-style-hidden';

/**
 * @param {*} value value
 * @returns {string} string
 */
const stringify = value => typeof value !== 'string' ? '' : value;

/**
 * @param {string} className class name
 * @returns {string} class name
 */
const removeHiddenClass = className => stringify(className).split(' ').filter(name => name !== getHiddenClass()).join(' ');

/**
 * @param {string} className class name
 * @returns {string} class name
 */
const addHiddenClass = className => (removeHiddenClass(className) + ' ' + getHiddenClass()).trim();

/**
 * @param {string} className class name
 * @returns {string} class name
 */
export const toggleHiddenClass = className => hasHiddenClass(className) ? removeHiddenClass(className) : addHiddenClass(className);

/**
 * @param {string} className class name
 * @returns {boolean} result
 */
export const hasHiddenClass = className => stringify(className).split(' ').includes(getHiddenClass());
