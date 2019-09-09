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
global.wpMock = {
	blockEditor: {
		getColorObjectByColorValue: () => false,
	},
	element: {
		useRef: () => ( {
			current: {
				contains: () => false,
				focus: () => 0,
				getBoundingClientRect: () => ( { width: 0, height: 0 } ),
				parentNode: {
					getBoundingClientRect: () => ( { width: 0, height: 0, left: 0, right: 0, top: 0, bottom: 0 } ),
				},
				querySelectorAll: () => ( [] ),
			},
		} ),
	},
};
global.window.lodash.debounce = fn => {
	function debounced() {
		return fn();
	}

	debounced.cancel = jest.fn();
	debounced.flush = jest.fn();
	return debounced;
};
global.hbtParams = {
	translate: {
		test: 'テスト',
	},
};

jest.mock( '@wordpress/block-editor', () => ( {
	...jest.requireActual( '@wordpress/block-editor' ),
	getColorObjectByColorValue: ( colors, value ) => global.wpMock.blockEditor.getColorObjectByColorValue( colors, value ),
} ) );
jest.mock( '@wordpress/element', () => ( {
	...jest.requireActual( '@wordpress/element' ),
	useRef: ( colors, value ) => global.wpMock.element.useRef( colors, value ),
} ) );

const blockEditor = require( '@wordpress/block-editor' );
const blockLibrary = require( '@wordpress/block-library' );
const blocks = require( '@wordpress/blocks' );
const components = require( '@wordpress/components' );
const coreData = require( '@wordpress/core-data' );
const data = require( '@wordpress/data' );
const dom = require( '@wordpress/dom' );
const editPost = require( '@wordpress/edit-post' );
const editor = require( '@wordpress/editor' );
const element = require( '@wordpress/element' );
const i18n = require( '@wordpress/i18n' );
const isShallowEqual = require( '@wordpress/is-shallow-equal' );
const richText = require( '@wordpress/rich-text' );
const url = require( '@wordpress/url' );

global.wp = {
	blockEditor,
	blockLibrary,
	blocks,
	components,
	coreData,
	data,
	dom,
	editPost,
	editor,
	element,
	i18n,
	isShallowEqual,
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
