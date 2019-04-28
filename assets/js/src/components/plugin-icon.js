const { SVG } = wp.components;

import { ICON_SIZE, PLUGIN_ICON } from '../constant';

export function PluginIcon() {
	return (
		<SVG
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			x="0px"
			y="0px"
			width={ ICON_SIZE + 'px' }
			height={ ICON_SIZE + 'px' }
			viewBox={ '0 0 ' + ICON_SIZE + ' ' + ICON_SIZE }
			enable-background={ 'new 0 0 ' + ICON_SIZE + ' ' + ICON_SIZE }
		>
			<image
				width={ ICON_SIZE }
				height={ ICON_SIZE }
				x="0"
				y="0"
				xlinkHref={ PLUGIN_ICON }
			/>
		</SVG>
	);
}
