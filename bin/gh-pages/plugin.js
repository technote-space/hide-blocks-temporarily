const { Fragment } = wp.element;
const { addFilter } = wp.hooks;

import './plugin.scss';

window.hbtParams = window.hbtParams || {};

addFilter( 'gh-pages.renderContent', 'plugin/renderContent', () => <Fragment>
	<p>You can switch visibility of each block.</p>
	<img className='playground__content__screenshot' src='./screenshot.gif'/>
</Fragment> );
