require( 'should' );
import { translate } from '../src/utils';

describe( 'translate test', () => {
	it( 'should translate if data exists', () => {
		translate( 'test' ).should.equal( 'テスト' );
	} );
	it( 'should not translate if data not exists', () => {
		translate( 'test2' ).should.equal( 'test2' );
	} );
} );