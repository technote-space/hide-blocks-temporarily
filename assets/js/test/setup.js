const Mousetrap = require( 'mousetrap' );
const { filter, isEmpty } = require( 'lodash' );
global.Mousetrap = Mousetrap;
global.window.lodash = {
	filter, isEmpty,
};
global.window.matchMedia = () => ( {
	matches: true, addListener: () => {
	},
} );
global.hbtParams = {
	translate: {
		test: 'テスト',
	},
};

const blockLibrary = require( '@wordpress/block-library' );
const blocks = require( '@wordpress/blocks' );
const data = require( '@wordpress/data' );
const editor = require( '@wordpress/editor' );
global.wp = {
	blockLibrary,
	blocks,
	data,
	editor,
};

blockLibrary.registerCoreBlocks();
[
	{},
	{ className: '' },
	{ className: 'test1' },
	{ className: 'test2 is-style-hidden' },
	{ className: 'is-style-hidden test3' },
].forEach( attributes => {
	data.dispatch( 'core/editor' ).insertBlocks(
		blocks.createBlock( 'core/paragraph', attributes ),
	);
} );
