<?php
/**
 * Class EditorTest
 *
 * @package Tests
 */

namespace Tests;

use Hide_Blocks_Temporarily\Classes\Models\Editor;
use PHPUnit\Framework\TestCase;
use ReflectionClass;
use ReflectionException;
use WP_Framework;
use WP_UnitTestCase;

/**
 * @noinspection PhpUndefinedClassInspection
 * Editor test case.
 *
 * @mixin TestCase
 */
class EditorTest extends WP_UnitTestCase {

	/**
	 * @var WP_Framework
	 */
	protected static $app;

	/**
	 * @var Editor $editor
	 */
	private static $editor;

	/**
	 * @var bool $is_ci
	 */
	private static $is_ci;

	/**
	 * @SuppressWarnings(StaticAccess)
	 */
	public static function setUpBeforeClass() {
		static::$app    = WP_Framework::get_instance( HIDE_BLOCKS_TEMPORARILY );
		static::$editor = Editor::get_instance( static::$app );
		static::$is_ci  = ! empty( getenv( 'CI' ) );
		static::reset();
	}

	public static function tearDownAfterClass() {
		static::reset();
		if ( static::$is_ci ) {
			static::$app->file->delete( static::$app->define->plugin_assets_dir . DS . 'js' . DS . 'index.min.js' );
			static::$app->file->delete( static::$app->define->plugin_assets_dir . DS . 'css' . DS . 'gutenberg.css' );
		}
	}

	private static function reset() {
		wp_dequeue_script( 'hide-blocks-temporarily' );
		wp_dequeue_style( 'hide-blocks-temporarily' );
		if ( static::$is_ci ) {
			static::$app->file->put_contents( static::$app->define->plugin_assets_dir . DS . 'js' . DS . 'index.min.js', '' );
			static::$app->file->put_contents( static::$app->define->plugin_assets_dir . DS . 'css' . DS . 'gutenberg.css', '' );
		}
	}

	/**
	 * @throws ReflectionException
	 */
	public function test_pre_render_block() {
		$this->check_hidden_block_test( 'pre_render_block' );
	}

	/**
	 * @throws ReflectionException
	 */
	public function test_render_block() {
		$this->check_hidden_block_test( 'render_block' );
	}

	/**
	 * @param string $filter
	 *
	 * @throws ReflectionException
	 */
	private function check_hidden_block_test( $filter ) {
		$this->reset_called_filter();
		$this->assertEquals( 'test', apply_filters( $filter, 'test', [] ) );
		$this->reset_called_filter();
		$this->assertEquals( 'test', apply_filters( $filter, 'test', [
			'attrs' => [
				'className' => '',
			],
		] ) );

		$this->reset_called_filter();
		$this->assertEquals( '', apply_filters( $filter, 'test', [
			'attrs' => [
				'className' => 'a b c is-style-hidden',
			],
		] ) );

		$this->reset_called_filter();
		$this->assertEquals( 'test', apply_filters( $filter, 'test', [] ) );
		$this->assertEquals( '', apply_filters( $filter, 'test', [
			'attrs' => [
				'className' => 'is-style-hidden a b c',
			],
		] ) );
		$this->assertEquals( 'test', apply_filters( $filter, 'test', [
			'attrs' => [
				'className' => '',
			],
		] ) );
		$this->assertEquals( '', apply_filters( $filter, 'test', [
			'attrs' => [
				'className' => 'a b c is-style-hidden',
			],
		] ) );
		$this->assertEquals( 'test', apply_filters( $filter, 'test', [] ) );
	}

	/**
	 * @throws ReflectionException
	 */
	public function test_call_once() {
		$this->reset_called_filter();
		$this->assertEquals( 'test1', apply_filters( 'pre_render_block', 'test1', [] ) );
		$this->assertEquals( 'test2', apply_filters( 'render_block', 'test2', [] ) );
		$this->assertEquals( 'test3', apply_filters( 'render_block', 'test3', [
			'attrs' => [
				'className' => 'is-style-hidden a b c',
			],
		] ) );

		$this->reset_called_filter();
		$this->assertEquals( '', apply_filters( 'pre_render_block', 'test1', [
			'attrs' => [
				'className' => 'is-style-hidden a b c',
			],
		] ) );
		$this->assertEquals( 'test2', apply_filters( 'render_block', 'test2', [] ) );
		$this->assertEquals( 'test3', apply_filters( 'render_block', 'test3', [
			'attrs' => [
				'className' => 'a b c is-style-hidden',
			],
		] ) );
	}

	public function test_enqueue_block_editor_assets() {
		static::reset();

		$this->assertFalse( wp_script_is( 'hide-blocks-temporarily' ) );
		$this->assertFalse( wp_style_is( 'hide-blocks-temporarily' ) );
		do_action( 'enqueue_block_editor_assets' );
		$this->assertTrue( wp_script_is( 'hide-blocks-temporarily' ) );
		$this->assertTrue( wp_style_is( 'hide-blocks-temporarily' ) );
	}

	/**
	 * @throws ReflectionException
	 */
	private function reset_called_filter() {
		$reflection = new ReflectionClass( static::$editor );
		$property   = $reflection->getProperty( 'called_filter' );
		$property->setAccessible( true );
		$property->setValue( static::$editor, null );
		$property->setAccessible( false );
	}
}
