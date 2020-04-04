import { getNamespace } from '../src/utils';
import { PLUGIN_NAME } from '../src/constant';

describe('getNamespace', () => {
	it('should get namespace', () => {
		const nameSpace = getNamespace('test');
		expect(nameSpace).toStartWith(PLUGIN_NAME);
		expect(nameSpace).toEndWith('test');
	});
});
