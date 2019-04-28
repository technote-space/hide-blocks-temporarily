import { TRANSLATE_DATA } from '../constant';

export function translate( str ) {
	if ( str in TRANSLATE_DATA ) {
		return TRANSLATE_DATA[ str ];
	}
	return str;
}
