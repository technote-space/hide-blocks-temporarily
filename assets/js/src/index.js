const { addFilter } = wp.hooks;
const { registerBlockStyle } = wp.blocks;
const { registerPlugin } = wp.plugins;
const { PluginMoreMenuItem } = wp.editPost;
const { __ } = wp.i18n;

import { PluginIcon } from './components';
import { PLUGIN_NAME } from './constant';
import { translate, getNamespace, blockHasDefault, removeHiddenClassFromBlocks, isTargetBlockType } from './utils';

addFilter(
	'blocks.registerBlockType',
	getNamespace( 'register-hide-block-style' ),
	( setting, name ) => {
		if ( ! isTargetBlockType( setting ) ) {
			return setting;
		}
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
