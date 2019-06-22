<?php
/**
 * Class EditorTest
 *
 * @package Test_Travis
 */

use Hide_Blocks_Temporarily\Classes\Models\Editor;
use PHPUnit\Framework\TestCase;

/**
 * @noinspection PhpUndefinedClassInspection
 * Editor test case.
 *
 * @mixin TestCase
 */
class EditorTest extends WP_UnitTestCase {

	/**
	 * @var WP_Framework|Phake_IMock
	 */
	protected static $app;

	/**
	 * @var Editor $editor
	 */
	private static $editor;

	/**
	 * @SuppressWarnings(StaticAccess)
	 */
	public static function setUpBeforeClass() {
		static::$app    = WP_Framework::get_instance( HIDE_BLOCKS_TEMPORARILY );
		static::$editor = Editor::get_instance( static::$app );
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
		$this->reset_called();
		$this->assertNull( apply_filters( $filter, null, [] ) );
		$this->reset_called();
		$this->assertNull( apply_filters( $filter, null, [
			'attrs' => [
				'className' => '',
			],
		] ) );
		$this->reset_called();
		$this->assertEquals( '', apply_filters( $filter, null, [
			'attrs' => [
				'className' => 'a b c is-style-hidden',
			],
		] ) );

		$this->assertNull( apply_filters( $filter, null, [] ) );
	}

	public function test_enqueue_block_editor_assets() {
		do_action( 'enqueue_block_editor_assets' );
		$wp_scripts = wp_scripts();
		$wp_styles  = wp_styles();

		$this->assertArrayHasKey( 'hide-blocks-temporarily', $wp_scripts->registered );
		$this->assertStringEndsWith( '/assets/js/index.min.js', $wp_scripts->registered['hide-blocks-temporarily']->src );
		$this->assertContains( 'hide-blocks-temporarily', $wp_scripts->registered['hide-blocks-temporarily']->src );
		$this->assertArrayHasKey( 'data', $wp_scripts->registered['hide-blocks-temporarily']->extra );
		$this->assertContains( ' hbtParams ', $wp_scripts->registered['hide-blocks-temporarily']->extra['data'] );

		$this->assertArrayHasKey( 'hide-blocks-temporarily', $wp_styles->registered );
		$this->assertStringEndsWith( '/assets/css/gutenberg.css', $wp_styles->registered['hide-blocks-temporarily']->src );
		$this->assertContains( 'hide-blocks-temporarily', $wp_styles->registered['hide-blocks-temporarily']->src );
	}

	/**
	 * @throws ReflectionException
	 */
	private function reset_called() {
		$reflection = new ReflectionClass( static::$editor );
		$property   = $reflection->getProperty( 'called' );
		$property->setAccessible( true );
		$property->setValue( static::$editor, false );
		$property->setAccessible( false );
	}
}
