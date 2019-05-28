<?php
/**
 * @version 1.0.2
 * @author Technote
 * @since 0.0.1
 * @copyright Technote All Rights Reserved
 * @license http://www.opensource.org/licenses/gpl-2.0.php GNU General Public License, version 2
 * @link https://technote.space/
 */

namespace Hide_Blocks_Temporarily\Classes\Models;

use WP_Framework_Common\Traits\Package;
use WP_Framework_Core\Traits\Hook;
use WP_Framework_Core\Traits\Singleton;
use WP_Framework_Presenter\Traits\Presenter;

if ( ! defined( 'HIDE_BLOCKS_TEMPORARILY' ) ) {
	exit;
}

/**
 * Class Editor
 * @package Hide_Blocks_Temporarily\Classes\Models
 */
class Editor implements \WP_Framework_Core\Interfaces\Singleton, \WP_Framework_Core\Interfaces\Hook, \WP_Framework_Presenter\Interfaces\Presenter {

	use Singleton, Hook, Presenter, Package;

	/**
	 * @param null|string $pre_render
	 * @param array $block
	 *
	 * @return mixed
	 */
	/** @noinspection PhpUnusedPrivateMethodInspection */
	private function pre_render_block( $pre_render, $block ) {
		if ( $this->is_style_hidden( $block ) ) {
			return '';
		}

		return $pre_render;
	}

	/**
	 * @param string $block_content The block content about to be appended.
	 * @param array $block The full block, including name and attributes.
	 *
	 * @return string
	 */
	/** @noinspection PhpUnusedPrivateMethodInspection */
	private function render_block( $block_content, $block ) {
		if ( $this->app->utility->compare_wp_version( '5.1.0', '<' ) ) {
			if ( $this->is_style_hidden( $block ) ) {
				return '';
			}
		}

		return $block_content;
	}

	/**
	 * @param array $block
	 *
	 * @return bool
	 */
	private function is_style_hidden( $block ) {
		$class = $this->app->array->get( $block, 'attrs.className' );
		if ( ! empty( $class ) ) {
			$classes = $this->app->string->explode( $class, ' ' );

			return in_array( 'is-style-hidden', $classes );
		}

		return false;
	}

	/**
	 * enqueue css for gutenberg
	 */
	/** @noinspection PhpUnusedPrivateMethodInspection */
	private function enqueue_block_editor_assets() {
		$this->enqueue_script( 'hide-blocks-temporarily', 'index.min.js', [
			'wp-hooks',
			'wp-blocks',
			'wp-compose',
			'wp-element',
			'wp-editor',
			'wp-components',
			'wp-edit-post',
			'wp-data',
			'wp-i18n',
			'lodash',
		], $this->app->get_plugin_version(), false );
		$this->localize_script( 'hide-blocks-temporarily', 'hbtParams', [
			'plugin_icon' => $this->get_img_url( 'icon-24x24.png' ),
			'translate'   => $this->get_translate_data( [
				'Hidden',
				'Remove All Hide Styles',
			] ),
		] );
		$this->enqueue_style( 'hide-blocks-temporarily', 'gutenberg.css' );
	}
}