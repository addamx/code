/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module

define( [
	"./var/arr",
	"./var/document",
	"./var/getProto",
	"./var/slice",
	"./var/concat",
	"./var/push",
	"./var/indexOf",
	"./var/class2type",
	"./var/toString",
	"./var/hasOwn",
	"./var/fnToString",
	"./var/ObjectFunctionString",
	"./var/support",
	"./var/isWindow",
	"./core/DOMEval"
], function( arr, document, getProto, slice, concat, push, indexOf,
	class2type, toString, hasOwn, fnToString, ObjectFunctionString,
	support, isWindow, DOMEval ) {

"use strict";

var
	// grunt 中会替代@VERSION
	version = "@VERSION",

	// 生成jQuery实例的工厂函数
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		//jQuery对象实质是init初始化函数的增强
		// 仅当jQuery被使用时才进行初始化;
		return new jQuery.fn.init( selector, context );
	},

	//匹配空格
	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g,

	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// 记录jquery对象的深度
	length: 0,

	//转为数组的方法
	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

//1. jQuery.extend( [deep ], target, object1 [, objectN ] )
//2. jQuery.extend( target [, object1 ] [, objectN ] )
jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// 进入深复制场景
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// 如果只有一个参数, 则准备对this(jQuery 本身)扩展
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// 如果base对象有被extend对象引用, 则直接跳过循环, 否则将引起无限循环
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && Array.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {

		// Support: Chrome <=57, Firefox <=52
		// In some browsers, typeof returns "function" for HTML <object> elements
		// (i.e., `typeof document.createElement( "object" ) === "function"`).
		// We don't want to classify *any* DOM node as a function.
		return typeof obj === "function" && typeof obj.nodeType !== "number";
	},

	isNumeric: function( obj ) {

		// As of jQuery 3.0, isNumeric is limited to
		// strings and numbers (primitives or objects)
		// that can be coerced to finite numbers (gh-2662)
		var type = jQuery.type( obj );
		return ( type === "number" || type === "string" ) &&

			// parseFloat NaNs numeric-cast false positives ("")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			!isNaN( obj - parseFloat( obj ) );
	},

	/**
	 * 是否为纯对象(没有原型. 或者原型为Object)
	 */
	isPlainObject: function( obj ) {
		var proto, Ctor;

		// [1]是否为对象
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// [2]是否没有原型, 如`Object.create( null )`创建一个原型为null的空对象
		if ( !proto ) {
			return true;
		}

		// [3]是否为字面量对象 -> 是否由Object构造函数直接创建的
		// 0. 提取constructor函数; 
		// -> 有constructor属性说明是通过Object对象得到的，但是还不能确定为是Object的实例(普通函数构造)，或是字面量方式(Object函数构造)得到
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		// 1. 确定了constructor属性存在, 并且是函数
		// 2. fun.toString.call(Ctor) === fun.toString.call(Object)	-> "function Object() { [native code] }"
		// -> 确定了contructor是Object的原生构造函数, ->即"{}.proto.constructor"
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	/**
	 * 是否空对象(没有可迭代属性)
	 */
	isEmptyObject: function( obj ) {

		/* eslint-disable no-unused-vars */
		// See https://github.com/eslint/eslint/issues/6125
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	/**
	 * 得出类型
	 */
	type: function( obj ) {
		// 是否 null 或 undefined
		if ( obj == null ) {
			return obj + "";
		}
		// "Boolean Number String Function Array Date RegExp Object Error Symbol"
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	/**
	 * 在document作用域下执行代码
	 */
	// 在head插入script执行code后然后移除script
	// ./core/DOMEval, DOMEval( code, doc )  
	globalEval: function( code ) {
		DOMEval( code );
	},

	/**
	 * css/HTML标签/属性名转驼峰变量名
	 */
	// 兼容IE的'-ms-'前缀 (#9572)
	camelCase: function( string ) {
		//  /^-ms-/,  /-([a-z])/g,  fcamelCase:function(all, letter) {return letter.toUpperCase()}
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	/**
	 * 数组/类数组.each((index, el)-=>{})
	 */
	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	/**
	 * 移除字符开头结尾所有空格
	 */
	// rtrim: /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g
	// - IE9开始 \s已经包括U+FEFF 和 U+00A0 (eg: /^\s+$/.test("\ufeff\u00a0"))
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	/**
	 * 相当于Array.prototype.concat
	 */
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	/**
	 * 相当于 Array.prototype.find(callback[, thisArg])
	 * 
	 * 查找满足过滤函数(返回true)的数组元素。原始数组不受影响
	 * 。如果“invert”为true，函数返回一个“callback”中返回false的所有元素组成的数组。
	 */
	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// 二维数组转一维数组 / 将第二层的数组元素提升至第一层
		return concat.apply( [], ret );
	},

	// 全局唯一标识符
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		// jQuery.proxy( context, fun-name )
		// fun-name 必须存在context中
		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

/**
 * 是否为类数组对象:
 */
function isArrayLike( obj ) {

	// 参数有效 && 有length属性 && length属性值有效
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );
	// 参数不能是函数或则window对象
	if ( jQuery.isFunction( obj ) || isWindow( obj ) ) {
		return false;
	}
	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}

return jQuery;
} );
