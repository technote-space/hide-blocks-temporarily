const { Fragment } = wp.element;
const { addFilter } = wp.hooks;

import './plugin.scss';

window.hbtParams = window.hbtParams || {};

addFilter( 'gh-pages.renderContent', 'plugin/renderContent', () => <Fragment>
	<p>This page is demonstration of <a href="https://github.com/technote-space/hide-blocks-temporarily">Hide Blocks Temporarily</a></p>
	<p>You can switch visibility of each block.</p>
	<img className='playground__content__screenshot' src='./screenshot.gif'/>
</Fragment> );
