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

const blockEditor = require( '@wordpress/block-editor' );
const blockLibrary = require( '@wordpress/block-library' );
const blocks = require( '@wordpress/blocks' );
const components = require( '@wordpress/components' );
const coreData = require( '@wordpress/core-data' );
const data = require( '@wordpress/data' );
const editPost = require( '@wordpress/edit-post' );
const editor = require( '@wordpress/editor' );
const element = require( '@wordpress/element' );
const i18n = require( '@wordpress/i18n' );
const richText = require( '@wordpress/rich-text' );
const url = require( '@wordpress/url' );

global.wp = {
	blockEditor,
	blockLibrary,
	blocks,
	components,
	coreData,
	data,
	editPost,
	editor,
	element,
	i18n,
	richText,
	url,
};

blockLibrary.registerCoreBlocks();
[
	{},
	{ className: '' },
	{ className: 'test1' },
	{ className: 'test2 is-style-hidden' },
	{ className: 'is-style-hidden test3' },
].forEach( attributes => {
	data.dispatch( 'core/block-editor' ).insertBlocks(
		blocks.createBlock( 'core/paragraph', attributes ),
	);
} );
