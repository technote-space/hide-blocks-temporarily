<?php
/*
Plugin Name: Hide Blocks Temporarily
Plugin URI: https://wordpress.org/plugins/hide-blocks-temporarily/
Description: This plugin makes it easy to hides blocks temporarily.
Author: Technote
Version: 1.0.4
Author URI: https://technote.space
Text Domain: hide-blocks-temporarily
Domain Path: /languages/
*/

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( defined( 'HIDE_BLOCKS_TEMPORARILY' ) ) {
	return;
}

define( 'HIDE_BLOCKS_TEMPORARILY', 'Hide_Blocks_Temporarily' );

@require_once dirname( __FILE__ ) . DIRECTORY_SEPARATOR . 'vendor' . DIRECTORY_SEPARATOR . 'autoload.php';

WP_Framework::get_instance( HIDE_BLOCKS_TEMPORARILY, __FILE__ );
