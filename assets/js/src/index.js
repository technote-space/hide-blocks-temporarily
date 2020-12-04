import React from 'react';
import { Components, Helpers } from '@technote-space/gutenberg-utils';
import { addFilter } from '@wordpress/hooks';
import { registerPlugin } from '@wordpress/plugins';
import { PluginMoreMenuItem } from '@wordpress/edit-post';
import { InspectorControls } from '@wordpress/block-editor';
import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment } from '@wordpress/element';
import { ToggleControl, PanelBody } from '@wordpress/components';
import { select } from '@wordpress/data';
import { PLUGIN_NAME, PLUGIN_ICON } from './constant';
import { getNamespace, toggleHiddenClass, hasHiddenClass, removeHiddenClassFromBlocks, isTargetBlockType } from './utils';

const { Icon }          = Components;
const { getTranslator } = Helpers;
/** @var {object} hbtParams */
const translate         = getTranslator(hbtParams);

addFilter(
  'editor.BlockEdit',
  getNamespace('register-hide-block-style'),
  createHigherOrderComponent(BlockEdit => props => {
    if (!isTargetBlockType(select('core/blocks').getBlockType(props.name))) {
      return <BlockEdit {...props}/>;
    }

    const toggle = () => {
      const { attributes, setAttributes } = props;
      setAttributes({ className: toggleHiddenClass(attributes.className) });
    };
    return <Fragment>
      <BlockEdit {...props}/>
      <InspectorControls>
        <PanelBody title={translate('Hidden')}>
          <ToggleControl
            label={translate('Hidden')}
            checked={hasHiddenClass(props.attributes.className)}
            onChange={toggle}
          />
        </PanelBody>
      </InspectorControls>
    </Fragment>;
  }, 'addHideBlockComponents'),
);

registerPlugin(PLUGIN_NAME, {
  render: () => {
    return <PluginMoreMenuItem
      icon={<Icon
        icon={PLUGIN_ICON}
      />}
      onClick={() => {
        removeHiddenClassFromBlocks();
      }}
    >
      {translate('Remove All Hide Styles')}
    </PluginMoreMenuItem>;
  },
});
