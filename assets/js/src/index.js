const addFilter = wp.hooks.addFilter;
const registerBlockStyle = wp.blocks.registerBlockStyle;
const registerPlugin = wp.plugins.registerPlugin;
const { PluginMoreMenuItem } = wp.editPost;
const { __ } = wp.i18n;

import { PluginIcon } from './components';
import { PLUGIN_NAME } from './constant';
import { translate, getNamespace, blockHasDefault, removeHiddenClassFromBlocks } from './utilis';

addFilter(
	'blocks.registerBlockType',
	getNamespace( 'register-hide-block-style' ),
	( setting, name ) => {
		if ( ! blockHasDefault( setting ) ) {
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
		return setting;
	},
);

registerPlugin( PLUGIN_NAME, {
	render: () => {
		return <PluginMoreMenuItem
			icon={ <PluginIcon/> }
			onClick={ () => {
				removeHiddenClassFromBlocks();
			} }
		>
			{ translate( 'Remove All Hide Styles' ) }
		</PluginMoreMenuItem>;
	},
} );
