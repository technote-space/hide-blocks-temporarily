<?php
/**
 * @author Technote
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
	 * @var string $called_filter
	 */
	private $called_filter = null;

	/**
	 * @noinspection PhpUnusedPrivateMethodInspection
	 * @SuppressWarnings(PHPMD.UnusedPrivateMethod)
	 *
	 * @param null|string $pre_render
	 * @param array $block
	 *
	 * @return null|string
	 */
	private function pre_render_block( $pre_render, $block ) {
		return $this->check_hidden_block( $pre_render, $block, 'pre_render_block' );
	}

	/**
	 * @noinspection PhpUnusedPrivateMethodInspection
	 * @SuppressWarnings(PHPMD.UnusedPrivateMethod)
	 *
	 * @param string $block_content The block content about to be appended.
	 * @param array $block The full block, including name and attributes.
	 *
	 * @return string
	 */
	private function render_block( $block_content, $block ) {
		return $this->check_hidden_block( $block_content, $block, 'render_block' );
	}

	/**
	 * @param null|string $default
	 * @param array $block
	 * @param string $filter_name
	 *
	 * @return null|string
	 */
	private function check_hidden_block( $default, $block, $filter_name ) {
		if ( ! isset( $this->called_filter ) ) {
			$this->called_filter = $filter_name;
		} elseif ( $this->called_filter !== $filter_name ) {
			return $default;
		}

		if ( $this->is_style_hidden( $block ) ) {
			return '';
		}

		return $default;
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

			return in_array( 'is-style-hidden', $classes, true );
		}

		return false;
	}

	/**
	 * enqueue css for gutenberg
	 *
	 * @noinspection PhpUnusedPrivateMethodInspection
	 * @SuppressWarnings(PHPMD.UnusedPrivateMethod)
	 */
	private function enqueue_block_editor_assets() {
		$this->enqueue_script( 'hide-blocks-temporarily', 'index.min.js', $this->app->editor->filter_packages( [
			'wp-block-editor',
			'wp-block-library',
			'wp-blocks',
			'wp-components',
			'wp-core-data',
			'wp-data',
			'wp-edit-post',
			'wp-editor',
			'wp-element',
			'wp-hooks',
			'wp-i18n',
			'wp-rich-text',
			'wp-server-side-render',
			'wp-url',
		], [ 'lodash' ] ), $this->app->get_plugin_version(), false );
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
