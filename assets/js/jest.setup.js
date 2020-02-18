import { setupGlobal } from '@technote-space/gutenberg-test-helper';

setupGlobal( {
	setUseRefMock: false,
	globalParams: {
		hbtParams: {
			translate: {
				test: 'テスト',
			},
		},
	},
	setup: global => {
		[
			{},
			{ className: '' },
			{ className: 'test1' },
			{ className: 'test2 is-style-hidden' },
			{ className: 'is-style-hidden test3' },
		].forEach( attributes => {
			global.wp.data.dispatch( 'core/block-editor' ).insertBlocks(
				global.wp.blocks.createBlock( 'core/paragraph', attributes ),
			);
		} );
	},
} );
