const { filter, isEmpty } = require( 'lodash' );

global.hbtParams = {
	translate: {
		test: 'テスト',
	},
};
global.wp = {};
global.wp.test = {};
global.wp.test.blocks = [
	{ clientId: 1, attributes: {} },
	{ clientId: 2, attributes: { className: '' } },
	{ clientId: 3, attributes: { className: 'test1' } },
	{ clientId: 4, attributes: { className: 'test2 is-style-hidden' } },
	{ clientId: 5, attributes: { className: 'is-style-hidden test3' } },
];
global.wp.data = {
	dispatch: () => {
		return {
			updateBlock: ( clientId, { attributes } ) => {
				global.wp.test.blocks.filter( block => block.clientId === clientId ).map( block => {
					block.attributes = Object.assign( block.attributes, attributes );
					return block;
				} );
			},
		};
	},
	select: () => {
		return {
			getBlocks: () => global.wp.test.blocks,
		};
	},
};
global.window = {};
global.window.lodash = {
	filter, isEmpty,
};
global.wp.blocks = {
	isReusableBlock: blockOrType => blockOrType.name === 'core/block',
};
