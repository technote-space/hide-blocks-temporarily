const addFilter = wp.hooks.addFilter;
const registerBlockStyle = wp.blocks.registerBlockStyle;
const registerPlugin = wp.plugins.registerPlugin;
const { PluginMoreMenuItem } = wp.editPost;
const { dispatch, select } = wp.data;
const { __ } = wp.i18n;
const { filter, isEmpty } = window.lodash;
import { PluginIcon } from './components';
import { PLUGIN_NAME } from './constant';
import { translate, getNamespace } from './utilis';

addFilter(
	'blocks.registerBlockType',
	getNamespace( 'register-hide-block-style' ),
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

registerPlugin( PLUGIN_NAME, {
	render: () => {
		return <PluginMoreMenuItem
			icon={ <PluginIcon/> }
			onClick={ () => {
				select( 'core/editor' ).getBlocks().forEach( ( block ) => {
					if ( block.attributes && block.attributes.className ) {
						dispatch( 'core/editor' ).updateBlock( block.clientId, {
							attributes: {
								className: block.attributes.className.split( ' ' ).filter( c => c !== 'is-style-hidden' ).join( ' ' ),
							},
						} );
					}
				} );
			} }
		>
			{ translate( 'Remove All Hide Styles' ) }
		</PluginMoreMenuItem>;
	},
} );
