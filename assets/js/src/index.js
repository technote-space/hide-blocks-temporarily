import { Components, Helpers } from '@technote-space/gutenberg-utils';
import { PLUGIN_NAME, PLUGIN_ICON } from './constant';
import { getNamespace, blockHasDefault, removeHiddenClassFromBlocks, isTargetBlockType } from './utils';

const { addFilter } = wp.hooks;
const { registerBlockStyle } = wp.blocks;
const { registerPlugin } = wp.plugins;
const { PluginMoreMenuItem } = wp.editPost;
const { __ } = wp.i18n;
const { Icon } = Components;
const { getTranslator } = Helpers;
const translate = getTranslator( hbtParams );

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
			icon={ <Icon
				icon={ PLUGIN_ICON }
			/> }
			onClick={ () => {
				removeHiddenClassFromBlocks();
			} }
		>
			{ translate( 'Remove All Hide Styles' ) }
		</PluginMoreMenuItem>;
	},
} );
