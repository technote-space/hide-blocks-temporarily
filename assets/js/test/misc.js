require( 'should' );

import { isTargetBlockType } from '../src/utils';

describe( 'isTargetBlockType', () => {
	it( 'should true if target block', () => {
		isTargetBlockType( { name: 'core/paragraph', attributes: { className: { type: 'string' } } } ).should.equal( true );
		isTargetBlockType( { name: 'core/heading', attributes: { className: { type: 'string' } } } ).should.equal( true );
		isTargetBlockType( { name: 'test', attributes: { className: { type: 'string' } } } ).should.equal( true );
	} );
	it( 'should false if not target block', () => {
		isTargetBlockType( { name: 'core/paragraph' } ).should.equal( false );
		isTargetBlockType( { name: 'core/heading' } ).should.equal( false );
		isTargetBlockType( { name: 'test' } ).should.equal( false );
		isTargetBlockType( { name: 'core/block', attributes: { className: { type: 'string' } } } ).should.equal( false );
		isTargetBlockType( { name: 'core/template', attributes: { className: { type: 'string' } } } ).should.equal( false );
		isTargetBlockType( {} ).should.equal( false );
		isTargetBlockType( null ).should.equal( false );
	} );
} );
