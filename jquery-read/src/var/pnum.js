define( function() {
	"use strict";
	/**
	 * 匹配数字
	 */
	// -12.10e-2
	// 13.4
	// -12
	return ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;
} );
