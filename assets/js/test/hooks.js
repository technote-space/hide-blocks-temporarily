require( 'should' );
import { getNamespace } from '../src/utils';
import { PLUGIN_NAME } from '../src/constant';

describe( 'getNamespace', () => {
	it( 'should get namespace', () => {
		const nameSpace = getNamespace( 'test' );
		nameSpace.should.startWith( PLUGIN_NAME );
		nameSpace.should.endWith( 'test' );
	} );
} );
