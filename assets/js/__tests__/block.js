/* eslint-disable no-magic-numbers */
import { removeHiddenClassFromBlocks, toggleHiddenClass } from '../src/utils';

const { select } = wp.data;

describe( 'toggleHiddenClass', () => {
	it( 'should add hidden class', () => {
		expect( toggleHiddenClass( '' ) ).toMatch( /^is-style-hidden$/ );
		expect( toggleHiddenClass( undefined ) ).toMatch( /^is-style-hidden$/ );
		expect( toggleHiddenClass( 'abc xyz' ) ).toMatch( /^abc xyz is-style-hidden$/ );
	} );

	it( 'should remove hidden class', () => {
		expect( toggleHiddenClass( 'is-style-hidden' ) ).toMatch( /^$/ );
		expect( toggleHiddenClass( 'abc xyz is-style-hidden' ) ).toMatch( /^abc xyz$/ );
		expect( toggleHiddenClass( 'is-style-hidden abc xyz' ) ).toMatch( /^abc xyz$/ );
		expect( toggleHiddenClass( 'abc is-style-hidden xyz' ) ).toMatch( /^abc xyz$/ );
	} );
} );

describe( 'removeHiddenClassFromBlocks', () => {
	it( 'should return test data', () => {
		const blocks = select( 'core/block-editor' ).getBlocks();
		expect( blocks ).toHaveLength( 5 );
		expect( blocks[ 0 ].attributes ).not.toHaveProperty( 'className' );
		expect( blocks[ 1 ].attributes.className ).toBe( '' );
		expect( blocks[ 2 ].attributes.className ).toBe( 'test1' );
		expect( blocks[ 3 ].attributes.className ).toBe( 'test2 is-style-hidden' );
		expect( blocks[ 4 ].attributes.className ).toBe( 'is-style-hidden test3' );
	} );

	it( 'should removed is-style-hidden class', () => {
		removeHiddenClassFromBlocks();
		const blocks = select( 'core/block-editor' ).getBlocks();
		expect( blocks ).toHaveLength( 5 );
		expect( blocks[ 0 ].attributes ).not.toHaveProperty( 'className' );
		expect( blocks[ 1 ].attributes.className ).toBe( '' );
		expect( blocks[ 2 ].attributes.className ).toBe( 'test1' );
		expect( blocks[ 3 ].attributes.className ).toBe( 'test2' );
		expect( blocks[ 4 ].attributes.className ).toBe( 'test3' );
	} );
} );
