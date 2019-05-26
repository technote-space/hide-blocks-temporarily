const { isReusableBlock } = wp.blocks;

/**
 * @param {object} blockOrType block or type
 * @returns {boolean} start or not
 */
export function isTargetBlockType( blockOrType ) {
	return ! isReusableBlock( blockOrType ) && 'core/template' !== blockOrType.name;
}
