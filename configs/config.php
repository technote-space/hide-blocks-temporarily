<?php
/**
 * @version 0.0.1
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

	// required wordpress version
	'required_wordpress_version' => '5.1', // for gutenberg

	// update
	'update_info_file_url'       => 'https://raw.githubusercontent.com/technote-space/hide-blocks-temporarily/master/update.json',

	// github repo
	'github_repo'                => 'technote-space/hide-blocks-temporarily',
];
