/* eslint-disable no-magic-numbers */
require( 'should' );
import { removeHiddenClassFromBlocks, hasHiddenClass, toggleHiddenClass } from '../src/utils';

const { select } = wp.data;

describe( 'hasHiddenClass', () => {
	it( 'should return true', () => {
		hasHiddenClass( 'is-style-hidden' ).should.true();
		hasHiddenClass( 'abc is-style-hidden xyz' ).should.true();
	} );

	it( 'should return false', () => {
		hasHiddenClass( '' ).should.false();
		hasHiddenClass( 'abc xyz' ).should.false();
	} );
} );

describe( 'toggleHiddenClass', () => {
	it( 'should add hidden class', () => {
		toggleHiddenClass( '' ).should.match( /^is-style-hidden$/ );
		toggleHiddenClass( 'abc xyz' ).should.match( /^abc xyz is-style-hidden$/ );
	} );

	it( 'should remove hidden class', () => {
		toggleHiddenClass( 'is-style-hidden' ).should.match( /^$/ );
		toggleHiddenClass( 'abc xyz is-style-hidden' ).should.match( /^abc xyz$/ );
		toggleHiddenClass( 'is-style-hidden abc xyz' ).should.match( /^abc xyz$/ );
		toggleHiddenClass( 'abc is-style-hidden xyz' ).should.match( /^abc xyz$/ );
	} );
} );

describe( 'removeHiddenClassFromBlocks', () => {
	it( 'should return test data', () => {
		const blocks = select( 'core/block-editor' ).getBlocks();
		blocks.should.have.length( 5 );
		blocks[ 0 ].attributes.should.not.ownProperty( 'className' );
		blocks[ 1 ].attributes.className.should.equal( '' );
		blocks[ 2 ].attributes.className.should.equal( 'test1' );
		blocks[ 3 ].attributes.className.should.equal( 'test2 is-style-hidden' );
		blocks[ 4 ].attributes.className.should.equal( 'is-style-hidden test3' );
	} );

	it( 'should removed is-style-hidden class', () => {
		removeHiddenClassFromBlocks();
		const blocks = select( 'core/block-editor' ).getBlocks();
		blocks.should.have.length( 5 );
		blocks[ 0 ].attributes.should.not.ownProperty( 'className' );
		blocks[ 1 ].attributes.className.should.equal( '' );
		blocks[ 2 ].attributes.className.should.equal( 'test1' );
		blocks[ 3 ].attributes.className.should.equal( 'test2' );
		blocks[ 4 ].attributes.className.should.equal( 'test3' );
	} );
} );
