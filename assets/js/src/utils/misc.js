import { isReusableBlock } from '@wordpress/blocks';

/**
 * @param {object} blockOrType block or type
 * @returns {boolean} start or not
 */
export function isTargetBlockType(blockOrType) {
  return !!(blockOrType && blockOrType.name) && !isReusableBlock(blockOrType) && 'core/template' !== blockOrType.name && !!(blockOrType.attributes && blockOrType.attributes.className);
}
