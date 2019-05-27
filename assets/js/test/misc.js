require( 'should' );

import { isTargetBlockType } from '../src/utils';

describe( 'isTargetBlockType test', () => {
	it( 'should true if target block', () => {
		isTargetBlockType( { name: 'core/paragraph' } ).should.equal( true );
		isTargetBlockType( { name: 'core/heading' } ).should.equal( true );
		isTargetBlockType( { name: 'test' } ).should.equal( true );
	} );
	it( 'should false if not target block', () => {
		isTargetBlockType( { name: 'core/block' } ).should.equal( false );
		isTargetBlockType( { name: 'core/template' } ).should.equal( false );
		isTargetBlockType( {} ).should.equal( false );
		isTargetBlockType( null ).should.equal( false );
	} );
} );
