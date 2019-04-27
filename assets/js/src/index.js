const addFilter = wp.hooks.addFilter;
const registerBlockStyle = wp.blocks.registerBlockStyle;
const { __ } = wp.i18n;
const { filter, isEmpty } = window.lodash;
import { PLUGIN_NAME } from './constant';
import translate from './utilis/translate';

addFilter(
	'blocks.registerBlockType',
	PLUGIN_NAME + '/register-hide-block-style',
	( settings, name ) => {
		if ( isEmpty( settings.styles ) || isEmpty( filter( settings.styles, [ 'isDefault', true ] ) ) ) {
			registerBlockStyle( name, {
				name: 'default',
				label: __( 'Default' ),
				isDefault: true,
			} );
		}
		registerBlockStyle( name, {
			name: 'hidden',
			label: translate( 'Hidden' ),
		} );
		return settings;
	},
);
