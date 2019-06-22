<?php
/**
 * @version 1.0.2
 * @author Technote
 * @since 0.0.1
 * @copyright Technote All Rights Reserved
 * @license http://www.opensource.org/licenses/gpl-2.0.php GNU General Public License, version 2
 * @link https://technote.space/
 */

if ( ! defined( 'HIDE_BLOCKS_TEMPORARILY' ) ) {
	exit;
}

return [

	'\Hide_Blocks_Temporarily\Classes\Models\Editor' => [
		'pre_render_block'            => [
			'pre_render_block',
		],
		'render_block'                => [
			'render_block',
		],
		'enqueue_block_editor_assets' => [
			'enqueue_block_editor_assets' => 1,
		],
	],
];
