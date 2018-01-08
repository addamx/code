define( [
	"../var/pnum"
], function( pnum ) {

"use strict";
// ^(?:([+-])=|)([+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|))([a-z%]*)$
// -=17.33%a, 17.33%%, +=17bca
return new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );

} );
