const Mousetrap = require( 'mousetrap' );
const lodash = require( 'lodash' );
global.Mousetrap = Mousetrap;
global.window.lodash = lodash;
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
const compose = require( '@wordpress/compose' );
const coreData = require( '@wordpress/core-data' );
const data = require( '@wordpress/data' );
const dom = require( '@wordpress/dom' );
const editor = require( '@wordpress/editor' );
const element = require( '@wordpress/element' );
const formatLibrary = require( '@wordpress/format-library' );
const hooks = require( '@wordpress/hooks' );
const i18n = require( '@wordpress/i18n' );
const isShallowEqual = require( '@wordpress/is-shallow-equal' );
const keycodes = require( '@wordpress/keycodes' );
const richText = require( '@wordpress/rich-text' );
const url = require( '@wordpress/url' );

global.wp = {
	blockEditor,
	blockLibrary,
	blocks,
	components,
	compose,
	coreData,
	data,
	dom,
	editor,
	element,
	formatLibrary,
	hooks,
	i18n,
	isShallowEqual,
	keycodes,
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
