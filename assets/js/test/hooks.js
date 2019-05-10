require( 'should' ); // eslint-disable-line no-unused-vars
import { getNamespace } from '../src/utilis';
import { PLUGIN_NAME } from '../src/constant';

describe( 'getNamespace test', () => {
	it( 'should get namespace', () => {
		const nameSpace = getNamespace( 'test' );
		nameSpace.should.startWith( PLUGIN_NAME );
		nameSpace.should.endWith( 'test' );
	} );
} );
