require( 'should' );
import { blockHasDefault, removeHiddenClassFromBlocks } from '../src/utils';

const { select } = wp.data;

describe( 'blockHasDefault test', () => {
	it( 'should return false if not have default', () => {
		blockHasDefault( {} ).should.equal( false );
		blockHasDefault( { styles: [] } ).should.equal( false );
		blockHasDefault( {
			styles: [
				{ isDefault: false },
			],
		} ).should.equal( false );
	} );

	it( 'should return true if have default', () => {
		blockHasDefault( {
			styles: [
				{ isDefault: false },
				{ isDefault: true },
			],
		} ).should.equal( true );
	} );
} );

describe( 'removeHiddenClassFromBlocks test', () => {
	it( 'should return test data', () => {
		const blocks = select( 'core/editor' ).getBlocks();
		blocks.should.have.length( 5 ); // eslint-disable-line no-magic-numbers
		blocks[ 0 ].attributes.should.not.ownProperty( 'className' );
		blocks[ 1 ].attributes.className.should.equal( '' );
		blocks[ 2 ].attributes.className.should.equal( 'test1' );
		blocks[ 3 ].attributes.className.should.equal( 'test2 is-style-hidden' );
		blocks[ 4 ].attributes.className.should.equal( 'is-style-hidden test3' );
	} );

	it( 'should removed is-style-hidden class', () => {
		removeHiddenClassFromBlocks();
		const blocks = select( 'core/editor' ).getBlocks();
		blocks.should.have.length( 5 ); // eslint-disable-line no-magic-numbers
		blocks[ 0 ].attributes.should.not.ownProperty( 'className' );
		blocks[ 1 ].attributes.className.should.equal( '' );
		blocks[ 2 ].attributes.className.should.equal( 'test1' );
		blocks[ 3 ].attributes.className.should.equal( 'test2' );
		blocks[ 4 ].attributes.className.should.equal( 'test3' );
	} );
} );