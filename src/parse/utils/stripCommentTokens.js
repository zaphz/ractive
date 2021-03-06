define([ 'config/types' ], function ( types ) {

	'use strict';

	return function ( tokens ) {
		var i, current, previous, next;

		for ( i=0; i<tokens.length; i+=1 ) {
			current = tokens[i];
			previous = tokens[i-1];
			next = tokens[i+1];

			// if the current token is a comment or a delimiter change, remove it...
			if ( current.mustacheType === types.COMMENT || current.mustacheType === types.DELIMCHANGE ) {

				tokens.splice( i, 1 ); // remove comment token

				// ... and see if it has text nodes either side, in which case
				// they can be concatenated
				if ( previous && next ) {
					if ( previous.type === types.TEXT && next.type === types.TEXT ) {
						previous.value += next.value;

						tokens.splice( i, 1 ); // remove next token
					}
				}

				i -= 1; // decrement i to account for the splice(s)
			}
		}

		return tokens;
	};

});
