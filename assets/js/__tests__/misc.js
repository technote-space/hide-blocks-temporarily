import { hasHiddenClass, isTargetBlockType } from '../src/utils';

describe( 'hasHiddenClass', () => {
	it( 'should return true', () => {
		expect( hasHiddenClass( 'is-style-hidden' ) ).toBeTrue();
		expect( hasHiddenClass( 'abc is-style-hidden xyz' ) ).toBeTrue();
	} );

	it( 'should return false', () => {
		expect( hasHiddenClass( '' ) ).toBeFalse();
		expect( hasHiddenClass( undefined ) ).toBeFalse();
		expect( hasHiddenClass( 'abc xyz' ) ).toBeFalse();
	} );
} );

describe( 'isTargetBlockType', () => {
	it( 'should true if target block', () => {
		expect( isTargetBlockType( { name: 'core/paragraph', attributes: { className: { type: 'string' } } } ) ).toBeTrue();
		expect( isTargetBlockType( { name: 'core/heading', attributes: { className: { type: 'string' } } } ) ).toBeTrue();
		expect( isTargetBlockType( { name: 'test', attributes: { className: { type: 'string' } } } ) ).toBeTrue();
	} );
	it( 'should false if not target block', () => {
		expect( isTargetBlockType( { name: 'core/paragraph' } ) ).toBeFalse();
		expect( isTargetBlockType( { name: 'core/heading' } ) ).toBeFalse();
		expect( isTargetBlockType( { name: 'test' } ) ).toBeFalse();
		expect( isTargetBlockType( { name: 'core/block', attributes: { className: { type: 'string' } } } ) ).toBeFalse();
		expect( isTargetBlockType( { name: 'core/template', attributes: { className: { type: 'string' } } } ) ).toBeFalse();
		expect( isTargetBlockType( {} ) ).toBeFalse();
		expect( isTargetBlockType( null ) ).toBeFalse();
	} );
} );
