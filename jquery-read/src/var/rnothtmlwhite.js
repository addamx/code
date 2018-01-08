define( function() {
	"use strict";

	// Only count HTML whitespace
	// Other whitespace should count in values
	// https://infra.spec.whatwg.org/#ascii-whitespace

	// 非->空格|制表符|回车符|换行符|换页符
	return ( /[^\x20\t\r\n\f]+/g );
} );
