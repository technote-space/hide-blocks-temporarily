import { Components, Helpers } from '@technote-space/gutenberg-utils';
import { PLUGIN_NAME, PLUGIN_ICON } from './constant';
import { getNamespace, toggleHiddenClass, hasHiddenClass, removeHiddenClassFromBlocks, isTargetBlockType } from './utils';

const { addFilter } = wp.hooks;
const { registerPlugin } = wp.plugins;
const { PluginMoreMenuItem } = wp.editPost;
const { Icon } = Components;
const { getTranslator, getEditor } = Helpers;
const translate = getTranslator( hbtParams );
const { createHigherOrderComponent } = wp.compose;
const { Fragment } = wp.element;
const { ToggleControl, PanelBody } = wp.components;
const { InspectorControls } = getEditor();

addFilter(
	'editor.BlockEdit',
	getNamespace( 'register-hide-block-style' ),
	createHigherOrderComponent( BlockEdit => props => {
		if ( ! isTargetBlockType( props ) ) {
			return <BlockEdit { ...props }/>;
		}

		const toggle = () => {
			const { attributes, setAttributes } = props;
			setAttributes( { className: toggleHiddenClass( attributes.className ) } );
		};
		return <Fragment>
			<BlockEdit { ...props }/>
			<InspectorControls>
				<PanelBody title={ translate( 'Hidden' ) }>
					<ToggleControl
						label={ translate( 'Hidden' ) }
						checked={ hasHiddenClass( props.attributes.className ) }
						onChange={ toggle }
					/>
				</PanelBody>
			</InspectorControls>
		</Fragment>;
	} ),
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
