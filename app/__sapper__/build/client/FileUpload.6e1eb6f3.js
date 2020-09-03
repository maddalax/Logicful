import { D as dispatchSync, z as subscribe, E as commonjsGlobal, x as dispatch, S as SvelteComponent, i as init, s as safe_not_equal, e as element, t as text, c as claim_element, a as children, b as claim_text, d as detach, h as insert, j as append, k as space, l as claim_space, f as attr, y as set_data, n as noop, m as create_component, p as claim_component, q as mount_component, r as transition_in, u as transition_out, v as destroy_component, A as group_outros, B as check_outros, o as onMount, F as bubble, C as listen, G as stop_propagation, H as is_function, I as run_all, J as set_custom_element_data, K as update_slot, g as set_style, L as add_render_callback, M as add_resize_listener, N as update_keyed_each, O as outro_and_destroy_block, P as tick, Q as create_slot, R as binding_callbacks, T as empty, U as destroy_each, V as createEventDispatcher, W as onDestroy, X as beforeUpdate, Y as svg_element, Z as get_spread_update, _ as get_spread_object, $ as prevent_default, a0 as toggle_class, a1 as assign, a2 as set_attributes, a3 as set_input_value, a4 as HtmlTag, a5 as add_flush_callback, a6 as bind, a7 as __awaiter, a8 as afterUpdate } from './client.a93cf518.js';
import { f as fastClone, a as fastEquals, n as nullOrEmpty, L as LoadState, i as isString, b as isFunction$3, r as randomString, F as Fuse, s as stringEquals, c as isObject$3, t as toNumberOrDefault } from './fuse.esm.4840cecb.js';

function dispatchFieldChange(field, change) {
    dispatchSync("field_changed", {
        field,
        change
    });
}
function subscribeFieldChange(callback) {
    subscribe("field_changed", (payload) => {
        if (!payload.field) {
            console.error("Field change was undefined.", payload);
            return;
        }
        callback(payload.field, payload.change);
    });
}

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** `Object#toString` result references. */
var funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    symbolTag = '[object Symbol]';

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/,
    reLeadingDot = /^\./,
    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var Symbol = root.Symbol,
    splice = arrayProto.splice;

/* Built-in method references that are verified to be native. */
var Map$1 = getNative(root, 'Map'),
    nativeCreate = getNative(Object, 'create');

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  return this.has(key) && delete this.__data__[key];
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map$1 || ListCache),
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  return getMapData(this, key)['delete'](key);
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  getMapData(this, key).set(key, value);
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = isKey(path, object) ? [path] : castPath(path);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value) {
  return isArray(value) ? value : stringToPath(value);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoize(function(string) {
  string = toString(string);

  var result = [];
  if (reLeadingDot.test(string)) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result);
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Assign cache to `_.memoize`.
memoize.Cache = MapCache;

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

var lodash_get = get;

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT$1 = 'Expected a function';

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

/** Used as references for various `Number` constants. */
var INFINITY$1 = 1 / 0,
    MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var funcTag$1 = '[object Function]',
    genTag$1 = '[object GeneratorFunction]',
    symbolTag$1 = '[object Symbol]';

/** Used to match property names within property paths. */
var reIsDeepProp$1 = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp$1 = /^\w*$/,
    reLeadingDot$1 = /^\./,
    rePropName$1 = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar$1 = /[\\^$.*+?()[\]{}|]/g;

/** Used to match backslashes in property paths. */
var reEscapeChar$1 = /\\(\\)?/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor$1 = /^\[object .+?Constructor\]$/;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Detect free variable `global` from Node.js. */
var freeGlobal$1 = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

/** Detect free variable `self`. */
var freeSelf$1 = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root$1 = freeGlobal$1 || freeSelf$1 || Function('return this')();

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue$1(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject$1(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/** Used for built-in method references. */
var arrayProto$1 = Array.prototype,
    funcProto$1 = Function.prototype,
    objectProto$1 = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData$1 = root$1['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey$1 = (function() {
  var uid = /[^.]+$/.exec(coreJsData$1 && coreJsData$1.keys && coreJsData$1.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/** Used to resolve the decompiled source of functions. */
var funcToString$1 = funcProto$1.toString;

/** Used to check objects for own properties. */
var hasOwnProperty$1 = objectProto$1.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString$1 = objectProto$1.toString;

/** Used to detect if a method is native. */
var reIsNative$1 = RegExp('^' +
  funcToString$1.call(hasOwnProperty$1).replace(reRegExpChar$1, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var Symbol$1 = root$1.Symbol,
    splice$1 = arrayProto$1.splice;

/* Built-in method references that are verified to be native. */
var Map$2 = getNative$1(root$1, 'Map'),
    nativeCreate$1 = getNative$1(Object, 'create');

/** Used to convert symbols to primitives and strings. */
var symbolProto$1 = Symbol$1 ? Symbol$1.prototype : undefined,
    symbolToString$1 = symbolProto$1 ? symbolProto$1.toString : undefined;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash$1(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear$1() {
  this.__data__ = nativeCreate$1 ? nativeCreate$1(null) : {};
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete$1(key) {
  return this.has(key) && delete this.__data__[key];
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet$1(key) {
  var data = this.__data__;
  if (nativeCreate$1) {
    var result = data[key];
    return result === HASH_UNDEFINED$1 ? undefined : result;
  }
  return hasOwnProperty$1.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas$1(key) {
  var data = this.__data__;
  return nativeCreate$1 ? data[key] !== undefined : hasOwnProperty$1.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet$1(key, value) {
  var data = this.__data__;
  data[key] = (nativeCreate$1 && value === undefined) ? HASH_UNDEFINED$1 : value;
  return this;
}

// Add methods to `Hash`.
Hash$1.prototype.clear = hashClear$1;
Hash$1.prototype['delete'] = hashDelete$1;
Hash$1.prototype.get = hashGet$1;
Hash$1.prototype.has = hashHas$1;
Hash$1.prototype.set = hashSet$1;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache$1(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear$1() {
  this.__data__ = [];
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete$1(key) {
  var data = this.__data__,
      index = assocIndexOf$1(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice$1.call(data, index, 1);
  }
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet$1(key) {
  var data = this.__data__,
      index = assocIndexOf$1(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas$1(key) {
  return assocIndexOf$1(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet$1(key, value) {
  var data = this.__data__,
      index = assocIndexOf$1(data, key);

  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache$1.prototype.clear = listCacheClear$1;
ListCache$1.prototype['delete'] = listCacheDelete$1;
ListCache$1.prototype.get = listCacheGet$1;
ListCache$1.prototype.has = listCacheHas$1;
ListCache$1.prototype.set = listCacheSet$1;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache$1(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear$1() {
  this.__data__ = {
    'hash': new Hash$1,
    'map': new (Map$2 || ListCache$1),
    'string': new Hash$1
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete$1(key) {
  return getMapData$1(this, key)['delete'](key);
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet$1(key) {
  return getMapData$1(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas$1(key) {
  return getMapData$1(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet$1(key, value) {
  getMapData$1(this, key).set(key, value);
  return this;
}

// Add methods to `MapCache`.
MapCache$1.prototype.clear = mapCacheClear$1;
MapCache$1.prototype['delete'] = mapCacheDelete$1;
MapCache$1.prototype.get = mapCacheGet$1;
MapCache$1.prototype.has = mapCacheHas$1;
MapCache$1.prototype.set = mapCacheSet$1;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty$1.call(object, key) && eq$1(objValue, value)) ||
      (value === undefined && !(key in object))) {
    object[key] = value;
  }
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf$1(array, key) {
  var length = array.length;
  while (length--) {
    if (eq$1(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative$1(value) {
  if (!isObject$1(value) || isMasked$1(value)) {
    return false;
  }
  var pattern = (isFunction$1(value) || isHostObject$1(value)) ? reIsNative$1 : reIsHostCtor$1;
  return pattern.test(toSource$1(value));
}

/**
 * The base implementation of `_.set`.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @param {Function} [customizer] The function to customize path creation.
 * @returns {Object} Returns `object`.
 */
function baseSet(object, path, value, customizer) {
  if (!isObject$1(object)) {
    return object;
  }
  path = isKey$1(path, object) ? [path] : castPath$1(path);

  var index = -1,
      length = path.length,
      lastIndex = length - 1,
      nested = object;

  while (nested != null && ++index < length) {
    var key = toKey$1(path[index]),
        newValue = value;

    if (index != lastIndex) {
      var objValue = nested[key];
      newValue = customizer ? customizer(objValue, key, nested) : undefined;
      if (newValue === undefined) {
        newValue = isObject$1(objValue)
          ? objValue
          : (isIndex(path[index + 1]) ? [] : {});
      }
    }
    assignValue(nested, key, newValue);
    nested = nested[key];
  }
  return object;
}

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString$1(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isSymbol$1(value)) {
    return symbolToString$1 ? symbolToString$1.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY$1) ? '-0' : result;
}

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Array} Returns the cast property path array.
 */
function castPath$1(value) {
  return isArray$1(value) ? value : stringToPath$1(value);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData$1(map, key) {
  var data = map.__data__;
  return isKeyable$1(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative$1(object, key) {
  var value = getValue$1(object, key);
  return baseIsNative$1(value) ? value : undefined;
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey$1(value, object) {
  if (isArray$1(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol$1(value)) {
    return true;
  }
  return reIsPlainProp$1.test(value) || !reIsDeepProp$1.test(value) ||
    (object != null && value in Object(object));
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable$1(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked$1(func) {
  return !!maskSrcKey$1 && (maskSrcKey$1 in func);
}

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath$1 = memoize$1(function(string) {
  string = toString$1(string);

  var result = [];
  if (reLeadingDot$1.test(string)) {
    result.push('');
  }
  string.replace(rePropName$1, function(match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar$1, '$1') : (number || match));
  });
  return result;
});

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey$1(value) {
  if (typeof value == 'string' || isSymbol$1(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY$1) ? '-0' : result;
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource$1(func) {
  if (func != null) {
    try {
      return funcToString$1.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize$1(func, resolver) {
  if (typeof func != 'function' || (resolver && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT$1);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result);
    return result;
  };
  memoized.cache = new (memoize$1.Cache || MapCache$1);
  return memoized;
}

// Assign cache to `_.memoize`.
memoize$1.Cache = MapCache$1;

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq$1(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray$1 = Array.isArray;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction$1(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject$1(value) ? objectToString$1.call(value) : '';
  return tag == funcTag$1 || tag == genTag$1;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject$1(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike$1(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol$1(value) {
  return typeof value == 'symbol' ||
    (isObjectLike$1(value) && objectToString$1.call(value) == symbolTag$1);
}

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString$1(value) {
  return value == null ? '' : baseToString$1(value);
}

/**
 * Sets the value at `path` of `object`. If a portion of `path` doesn't exist,
 * it's created. Arrays are created for missing index properties while objects
 * are created for all other missing properties. Use `_.setWith` to customize
 * `path` creation.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns `object`.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.set(object, 'a[0].b.c', 4);
 * console.log(object.a[0].b.c);
 * // => 4
 *
 * _.set(object, ['x', '0', 'y', 'z'], 5);
 * console.log(object.x[0].y.z);
 * // => 5
 */
function set(object, path, value) {
  return object == null ? object : baseSet(object, path, value);
}

var lodash_set = set;

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT$2 = 'Expected a function';

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$2 = '__lodash_hash_undefined__';

/** Used as references for various `Number` constants. */
var INFINITY$2 = 1 / 0;

/** `Object#toString` result references. */
var funcTag$2 = '[object Function]',
    genTag$2 = '[object GeneratorFunction]',
    symbolTag$2 = '[object Symbol]';

/** Used to match property names within property paths. */
var reLeadingDot$2 = /^\./,
    rePropName$2 = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar$2 = /[\\^$.*+?()[\]{}|]/g;

/** Used to match backslashes in property paths. */
var reEscapeChar$2 = /\\(\\)?/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor$2 = /^\[object .+?Constructor\]$/;

/** Detect free variable `global` from Node.js. */
var freeGlobal$2 = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

/** Detect free variable `self`. */
var freeSelf$2 = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root$2 = freeGlobal$2 || freeSelf$2 || Function('return this')();

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue$2(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject$2(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/** Used for built-in method references. */
var arrayProto$2 = Array.prototype,
    funcProto$2 = Function.prototype,
    objectProto$2 = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData$2 = root$2['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey$2 = (function() {
  var uid = /[^.]+$/.exec(coreJsData$2 && coreJsData$2.keys && coreJsData$2.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/** Used to resolve the decompiled source of functions. */
var funcToString$2 = funcProto$2.toString;

/** Used to check objects for own properties. */
var hasOwnProperty$2 = objectProto$2.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString$2 = objectProto$2.toString;

/** Used to detect if a method is native. */
var reIsNative$2 = RegExp('^' +
  funcToString$2.call(hasOwnProperty$2).replace(reRegExpChar$2, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var Symbol$2 = root$2.Symbol,
    splice$2 = arrayProto$2.splice;

/* Built-in method references that are verified to be native. */
var Map$3 = getNative$2(root$2, 'Map'),
    nativeCreate$2 = getNative$2(Object, 'create');

/** Used to convert symbols to primitives and strings. */
var symbolProto$2 = Symbol$2 ? Symbol$2.prototype : undefined,
    symbolToString$2 = symbolProto$2 ? symbolProto$2.toString : undefined;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash$2(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear$2() {
  this.__data__ = nativeCreate$2 ? nativeCreate$2(null) : {};
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete$2(key) {
  return this.has(key) && delete this.__data__[key];
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet$2(key) {
  var data = this.__data__;
  if (nativeCreate$2) {
    var result = data[key];
    return result === HASH_UNDEFINED$2 ? undefined : result;
  }
  return hasOwnProperty$2.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas$2(key) {
  var data = this.__data__;
  return nativeCreate$2 ? data[key] !== undefined : hasOwnProperty$2.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet$2(key, value) {
  var data = this.__data__;
  data[key] = (nativeCreate$2 && value === undefined) ? HASH_UNDEFINED$2 : value;
  return this;
}

// Add methods to `Hash`.
Hash$2.prototype.clear = hashClear$2;
Hash$2.prototype['delete'] = hashDelete$2;
Hash$2.prototype.get = hashGet$2;
Hash$2.prototype.has = hashHas$2;
Hash$2.prototype.set = hashSet$2;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache$2(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear$2() {
  this.__data__ = [];
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete$2(key) {
  var data = this.__data__,
      index = assocIndexOf$2(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice$2.call(data, index, 1);
  }
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet$2(key) {
  var data = this.__data__,
      index = assocIndexOf$2(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas$2(key) {
  return assocIndexOf$2(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet$2(key, value) {
  var data = this.__data__,
      index = assocIndexOf$2(data, key);

  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache$2.prototype.clear = listCacheClear$2;
ListCache$2.prototype['delete'] = listCacheDelete$2;
ListCache$2.prototype.get = listCacheGet$2;
ListCache$2.prototype.has = listCacheHas$2;
ListCache$2.prototype.set = listCacheSet$2;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache$2(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear$2() {
  this.__data__ = {
    'hash': new Hash$2,
    'map': new (Map$3 || ListCache$2),
    'string': new Hash$2
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete$2(key) {
  return getMapData$2(this, key)['delete'](key);
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet$2(key) {
  return getMapData$2(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas$2(key) {
  return getMapData$2(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet$2(key, value) {
  getMapData$2(this, key).set(key, value);
  return this;
}

// Add methods to `MapCache`.
MapCache$2.prototype.clear = mapCacheClear$2;
MapCache$2.prototype['delete'] = mapCacheDelete$2;
MapCache$2.prototype.get = mapCacheGet$2;
MapCache$2.prototype.has = mapCacheHas$2;
MapCache$2.prototype.set = mapCacheSet$2;

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf$2(array, key) {
  var length = array.length;
  while (length--) {
    if (eq$2(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative$2(value) {
  if (!isObject$2(value) || isMasked$2(value)) {
    return false;
  }
  var pattern = (isFunction$2(value) || isHostObject$2(value)) ? reIsNative$2 : reIsHostCtor$2;
  return pattern.test(toSource$2(value));
}

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString$2(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isSymbol$2(value)) {
    return symbolToString$2 ? symbolToString$2.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY$2) ? '-0' : result;
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData$2(map, key) {
  var data = map.__data__;
  return isKeyable$2(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative$2(object, key) {
  var value = getValue$2(object, key);
  return baseIsNative$2(value) ? value : undefined;
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable$2(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked$2(func) {
  return !!maskSrcKey$2 && (maskSrcKey$2 in func);
}

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath$2 = memoize$2(function(string) {
  string = toString$2(string);

  var result = [];
  if (reLeadingDot$2.test(string)) {
    result.push('');
  }
  string.replace(rePropName$2, function(match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar$2, '$1') : (number || match));
  });
  return result;
});

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource$2(func) {
  if (func != null) {
    try {
      return funcToString$2.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize$2(func, resolver) {
  if (typeof func != 'function' || (resolver && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT$2);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result);
    return result;
  };
  memoized.cache = new (memoize$2.Cache || MapCache$2);
  return memoized;
}

// Assign cache to `_.memoize`.
memoize$2.Cache = MapCache$2;

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq$2(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction$2(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject$2(value) ? objectToString$2.call(value) : '';
  return tag == funcTag$2 || tag == genTag$2;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject$2(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike$2(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol$2(value) {
  return typeof value == 'symbol' ||
    (isObjectLike$2(value) && objectToString$2.call(value) == symbolTag$2);
}

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString$2(value) {
  return value == null ? '' : baseToString$2(value);
}

function select(o, s) {
    return lodash_get(o, s);
}
function set$1(o, s, value) {
    lodash_set(o, s, value);
}

let configStore = {};
let files = {};
let store = {
    fields: {}
};
class FormStore {
    setForm(form) {
        const copy = fastClone(form);
        store = { fields: {} };
        copy.fields.forEach(f => {
            formStore.set(f, {
                fromUser: false,
                field: '',
                value: ''
            });
        });
        Object.keys(copy).forEach(f => {
            if (f === "fields") {
                return;
            }
            //@ts-ignore
            store[f] = copy[f];
        });
        dispatch("form_updated", this.getForm());
    }
    set(field, change = { field: '', value: '', fromUser: false }) {
        if (field.configTarget === 'form') {
            const isSame = fastEquals(configStore[field.id], field);
            if (isSame) {
                return;
            }
            set$1(store, field.configFieldTarget, field.value);
            dispatch("form_updated", this.getForm());
            dispatchFieldChange(fastClone(field), {
                field: field.configFieldTarget,
                value: field.value,
                fromUser: change.fromUser
            });
            return;
        }
        if (field.configTarget) {
            const isSame = fastEquals(configStore[field.id], field);
            if (isSame) {
                return;
            }
            set$1(store.fields[field.configTarget], field.configFieldTarget, field.value);
            const copy = fastClone(field);
            configStore[field.id] = copy;
            dispatchFieldChange(copy, change);
            const newField = lodash_get(store.fields, field.configTarget);
            dispatchFieldChange(fastClone(newField), {
                field: field.configFieldTarget,
                value: field.value,
                fromUser: change.fromUser
            });
            return;
        }
        const isSame = fastEquals(field, lodash_get(store.fields, field.id));
        if (isSame) {
            return;
        }
        const copy = fastClone(field);
        set$1(store.fields, field.id, copy);
        dispatchFieldChange(copy, change);
    }
    get(fieldId) {
        const field = store.fields[fieldId];
        if (!field) {
            return undefined;
        }
        const copy = fastClone(field);
        return copy;
    }
    getValue(fieldId) {
        var _a;
        const copy = this.get(fieldId);
        return (_a = copy === null || copy === void 0 ? void 0 : copy.value) !== null && _a !== void 0 ? _a : undefined;
    }
    getForm() {
        const form = { fields: [] };
        Object.keys(store).forEach(k => {
            if (k === "fields") {
                return;
            }
            form[k] = store[k];
        });
        Object.keys(store.fields).forEach(fieldId => {
            const field = store.fields[fieldId];
            if (field.configTarget) {
                return;
            }
            form.fields.push(fastClone(field));
        });
        return form;
    }
    setFile(id, file) {
        files[id] = file;
    }
    clearFile(id) {
        delete files[id];
    }
    getFile(id) {
        return files[id];
    }
}
const formStore = new FormStore();

function firstNotEmpty(...values) {
    for (let v of values) {
        if (!nullOrEmpty(v)) {
            return v;
        }
    }
    return '';
}

/* src\inputs\Label.svelte generated by Svelte v3.24.1 */

function create_if_block(ctx) {
	let span;
	let t;

	return {
		c() {
			span = element("span");
			t = text("(optional)");
		},
		l(nodes) {
			span = claim_element(nodes, "SPAN", {});
			var span_nodes = children(span);
			t = claim_text(span_nodes, "(optional)");
			span_nodes.forEach(detach);
		},
		m(target, anchor) {
			insert(target, span, anchor);
			append(span, t);
		},
		d(detaching) {
			if (detaching) detach(span);
		}
	};
}

function create_fragment(ctx) {
	let label;
	let t0_value = firstNotEmpty(/*field*/ ctx[0].label, /*field*/ ctx[0].name) + "";
	let t0;
	let t1;
	let label_for_value;
	let if_block = !/*field*/ ctx[0].required && create_if_block();

	return {
		c() {
			label = element("label");
			t0 = text(t0_value);
			t1 = space();
			if (if_block) if_block.c();
			this.h();
		},
		l(nodes) {
			label = claim_element(nodes, "LABEL", { for: true });
			var label_nodes = children(label);
			t0 = claim_text(label_nodes, t0_value);
			t1 = claim_space(label_nodes);
			if (if_block) if_block.l(label_nodes);
			label_nodes.forEach(detach);
			this.h();
		},
		h() {
			attr(label, "for", label_for_value = /*field*/ ctx[0].id);
		},
		m(target, anchor) {
			insert(target, label, anchor);
			append(label, t0);
			append(label, t1);
			if (if_block) if_block.m(label, null);
		},
		p(ctx, [dirty]) {
			if (dirty & /*field*/ 1 && t0_value !== (t0_value = firstNotEmpty(/*field*/ ctx[0].label, /*field*/ ctx[0].name) + "")) set_data(t0, t0_value);

			if (!/*field*/ ctx[0].required) {
				if (if_block) ; else {
					if_block = create_if_block();
					if_block.c();
					if_block.m(label, null);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}

			if (dirty & /*field*/ 1 && label_for_value !== (label_for_value = /*field*/ ctx[0].id)) {
				attr(label, "for", label_for_value);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(label);
			if (if_block) if_block.d();
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	
	let { field } = $$props;

	$$self.$$set = $$props => {
		if ("field" in $$props) $$invalidate(0, field = $$props.field);
	};

	return [field];
}

class Label extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { field: 0 });
	}
}

function debounce(func, wait, immediate = null) {
    let timeout;
    return function () {
        //@ts-ignore
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            //@ts-ignore
            if (!immediate)
                func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        //@ts-ignore
        clearTimeout(timeout);
        //@ts-ignore
        timeout = setTimeout(later, wait);
        //@ts-ignore
        if (callNow)
            func.apply(context, args);
    };
}

/* src\inputs\TextInput.svelte generated by Svelte v3.24.1 */

function create_if_block_2(ctx) {
	let label;
	let current;
	label = new Label({ props: { field: /*field*/ ctx[0] } });

	return {
		c() {
			create_component(label.$$.fragment);
		},
		l(nodes) {
			claim_component(label.$$.fragment, nodes);
		},
		m(target, anchor) {
			mount_component(label, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const label_changes = {};
			if (dirty & /*field*/ 1) label_changes.field = /*field*/ ctx[0];
			label.$set(label_changes);
		},
		i(local) {
			if (current) return;
			transition_in(label.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(label.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(label, detaching);
		}
	};
}

// (44:2) {:else}
function create_else_block(ctx) {
	let input;
	let input_class_value;
	let input_id_value;
	let input_placeholder_value;
	let input_name_value;
	let mounted;
	let dispose;

	return {
		c() {
			input = element("input");
			this.h();
		},
		l(nodes) {
			input = claim_element(nodes, "INPUT", {
				class: true,
				id: true,
				value: true,
				placeholder: true,
				name: true,
				type: true
			});

			this.h();
		},
		h() {
			attr(input, "class", input_class_value = /*field*/ ctx[0].properties?.className ?? "form-control");
			attr(input, "id", input_id_value = /*field*/ ctx[0].id);
			input.value = /*value*/ ctx[1];
			attr(input, "placeholder", input_placeholder_value = /*field*/ ctx[0].placeholder ?? "");
			attr(input, "name", input_name_value = /*field*/ ctx[0].name);
			attr(input, "type", /*type*/ ctx[2]);
		},
		m(target, anchor) {
			insert(target, input, anchor);

			if (!mounted) {
				dispose = [
					listen(input, "click", stop_propagation(/*click_handler_1*/ ctx[5])),
					listen(input, "input", function () {
						if (is_function(/*debouncedOnChange*/ ctx[3])) /*debouncedOnChange*/ ctx[3].apply(this, arguments);
					})
				];

				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;

			if (dirty & /*field*/ 1 && input_class_value !== (input_class_value = /*field*/ ctx[0].properties?.className ?? "form-control")) {
				attr(input, "class", input_class_value);
			}

			if (dirty & /*field*/ 1 && input_id_value !== (input_id_value = /*field*/ ctx[0].id)) {
				attr(input, "id", input_id_value);
			}

			if (dirty & /*value*/ 2 && input.value !== /*value*/ ctx[1]) {
				input.value = /*value*/ ctx[1];
			}

			if (dirty & /*field*/ 1 && input_placeholder_value !== (input_placeholder_value = /*field*/ ctx[0].placeholder ?? "")) {
				attr(input, "placeholder", input_placeholder_value);
			}

			if (dirty & /*field*/ 1 && input_name_value !== (input_name_value = /*field*/ ctx[0].name)) {
				attr(input, "name", input_name_value);
			}

			if (dirty & /*type*/ 4) {
				attr(input, "type", /*type*/ ctx[2]);
			}
		},
		d(detaching) {
			if (detaching) detach(input);
			mounted = false;
			run_all(dispose);
		}
	};
}

// (33:2) {#if field.rows && field.rows > 1}
function create_if_block_1(ctx) {
	let textarea;
	let textarea_rows_value;
	let textarea_class_value;
	let textarea_id_value;
	let textarea_placeholder_value;
	let textarea_name_value;
	let mounted;
	let dispose;

	return {
		c() {
			textarea = element("textarea");
			this.h();
		},
		l(nodes) {
			textarea = claim_element(nodes, "TEXTAREA", {
				rows: true,
				class: true,
				id: true,
				value: true,
				placeholder: true,
				name: true,
				type: true
			});

			children(textarea).forEach(detach);
			this.h();
		},
		h() {
			attr(textarea, "rows", textarea_rows_value = /*field*/ ctx[0].rows);
			attr(textarea, "class", textarea_class_value = /*field*/ ctx[0].properties?.className ?? "form-control");
			attr(textarea, "id", textarea_id_value = /*field*/ ctx[0].id);
			textarea.value = /*value*/ ctx[1];
			attr(textarea, "placeholder", textarea_placeholder_value = /*field*/ ctx[0].placeholder ?? "");
			attr(textarea, "name", textarea_name_value = /*field*/ ctx[0].name);
			attr(textarea, "type", /*type*/ ctx[2]);
		},
		m(target, anchor) {
			insert(target, textarea, anchor);

			if (!mounted) {
				dispose = [
					listen(textarea, "click", stop_propagation(/*click_handler*/ ctx[4])),
					listen(textarea, "input", function () {
						if (is_function(/*debouncedOnChange*/ ctx[3])) /*debouncedOnChange*/ ctx[3].apply(this, arguments);
					})
				];

				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;

			if (dirty & /*field*/ 1 && textarea_rows_value !== (textarea_rows_value = /*field*/ ctx[0].rows)) {
				attr(textarea, "rows", textarea_rows_value);
			}

			if (dirty & /*field*/ 1 && textarea_class_value !== (textarea_class_value = /*field*/ ctx[0].properties?.className ?? "form-control")) {
				attr(textarea, "class", textarea_class_value);
			}

			if (dirty & /*field*/ 1 && textarea_id_value !== (textarea_id_value = /*field*/ ctx[0].id)) {
				attr(textarea, "id", textarea_id_value);
			}

			if (dirty & /*value*/ 2) {
				textarea.value = /*value*/ ctx[1];
			}

			if (dirty & /*field*/ 1 && textarea_placeholder_value !== (textarea_placeholder_value = /*field*/ ctx[0].placeholder ?? "")) {
				attr(textarea, "placeholder", textarea_placeholder_value);
			}

			if (dirty & /*field*/ 1 && textarea_name_value !== (textarea_name_value = /*field*/ ctx[0].name)) {
				attr(textarea, "name", textarea_name_value);
			}

			if (dirty & /*type*/ 4) {
				attr(textarea, "type", /*type*/ ctx[2]);
			}
		},
		d(detaching) {
			if (detaching) detach(textarea);
			mounted = false;
			run_all(dispose);
		}
	};
}

// (55:2) {#if field.helperText}
function create_if_block$1(ctx) {
	let small;
	let raw_value = (/*field*/ ctx[0].helperText ?? "") + "";

	return {
		c() {
			small = element("small");
			this.h();
		},
		l(nodes) {
			small = claim_element(nodes, "SMALL", { class: true });
			var small_nodes = children(small);
			small_nodes.forEach(detach);
			this.h();
		},
		h() {
			attr(small, "class", "form-text text-muted");
		},
		m(target, anchor) {
			insert(target, small, anchor);
			small.innerHTML = raw_value;
		},
		p(ctx, dirty) {
			if (dirty & /*field*/ 1 && raw_value !== (raw_value = (/*field*/ ctx[0].helperText ?? "") + "")) small.innerHTML = raw_value;		},
		d(detaching) {
			if (detaching) detach(small);
		}
	};
}

function create_fragment$1(ctx) {
	let div;
	let t0;
	let t1;
	let current;
	let if_block0 = !/*field*/ ctx[0].hideLabel && create_if_block_2(ctx);

	function select_block_type(ctx, dirty) {
		if (/*field*/ ctx[0].rows && /*field*/ ctx[0].rows > 1) return create_if_block_1;
		return create_else_block;
	}

	let current_block_type = select_block_type(ctx);
	let if_block1 = current_block_type(ctx);
	let if_block2 = /*field*/ ctx[0].helperText && create_if_block$1(ctx);

	return {
		c() {
			div = element("div");
			if (if_block0) if_block0.c();
			t0 = space();
			if_block1.c();
			t1 = space();
			if (if_block2) if_block2.c();
			this.h();
		},
		l(nodes) {
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);
			if (if_block0) if_block0.l(div_nodes);
			t0 = claim_space(div_nodes);
			if_block1.l(div_nodes);
			t1 = claim_space(div_nodes);
			if (if_block2) if_block2.l(div_nodes);
			div_nodes.forEach(detach);
			this.h();
		},
		h() {
			attr(div, "class", "form-group");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			if (if_block0) if_block0.m(div, null);
			append(div, t0);
			if_block1.m(div, null);
			append(div, t1);
			if (if_block2) if_block2.m(div, null);
			current = true;
		},
		p(ctx, [dirty]) {
			if (!/*field*/ ctx[0].hideLabel) {
				if (if_block0) {
					if_block0.p(ctx, dirty);

					if (dirty & /*field*/ 1) {
						transition_in(if_block0, 1);
					}
				} else {
					if_block0 = create_if_block_2(ctx);
					if_block0.c();
					transition_in(if_block0, 1);
					if_block0.m(div, t0);
				}
			} else if (if_block0) {
				group_outros();

				transition_out(if_block0, 1, 1, () => {
					if_block0 = null;
				});

				check_outros();
			}

			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block1) {
				if_block1.p(ctx, dirty);
			} else {
				if_block1.d(1);
				if_block1 = current_block_type(ctx);

				if (if_block1) {
					if_block1.c();
					if_block1.m(div, t1);
				}
			}

			if (/*field*/ ctx[0].helperText) {
				if (if_block2) {
					if_block2.p(ctx, dirty);
				} else {
					if_block2 = create_if_block$1(ctx);
					if_block2.c();
					if_block2.m(div, null);
				}
			} else if (if_block2) {
				if_block2.d(1);
				if_block2 = null;
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block0);
			current = true;
		},
		o(local) {
			transition_out(if_block0);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			if (if_block0) if_block0.d();
			if_block1.d();
			if (if_block2) if_block2.d();
		}
	};
}

function instance$1($$self, $$props, $$invalidate) {
	
	let { field } = $$props;
	let { value = "" } = $$props;
	let { type = "text" } = $$props;
	let debouncedOnChange;

	onMount(() => {
		var _a, _b;

		$$invalidate(3, debouncedOnChange = debounce(
			e => {
				var _a, _b;

				$$invalidate(
					0,
					field.value = (_a = e.target.value) !== null && _a !== void 0
					? _a
					: "",
					field
				);

				formStore.set(field, {
					fromUser: true,
					field: "value",
					value: field.value
				});

				(_b = field.onChange) === null || _b === void 0
				? void 0
				: _b.call(field, field.value);
			},
			500
		));

		$$invalidate(1, value = (_b = formStore.getValue((_a = field.configTarget) !== null && _a !== void 0
		? _a
		: field.id)) !== null && _b !== void 0
		? _b
		: "");

		subscribeFieldChange(newField => {
			var _a;

			if (newField.id === field.id) {
				$$invalidate(1, value = (_a = newField.value) !== null && _a !== void 0
				? _a
				: "");
			}
		});
	});

	function click_handler(event) {
		bubble($$self, event);
	}

	function click_handler_1(event) {
		bubble($$self, event);
	}

	$$self.$$set = $$props => {
		if ("field" in $$props) $$invalidate(0, field = $$props.field);
		if ("value" in $$props) $$invalidate(1, value = $$props.value);
		if ("type" in $$props) $$invalidate(2, type = $$props.type);
	};

	return [field, value, type, debouncedOnChange, click_handler, click_handler_1];
}

class TextInput extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$1, create_fragment$1, safe_not_equal, { field: 0, value: 1, type: 2 });
	}
}

/* node_modules\svelte-select\src\Item.svelte generated by Svelte v3.24.1 */

function create_fragment$2(ctx) {
	let div;
	let raw_value = /*getOptionLabel*/ ctx[0](/*item*/ ctx[1], /*filterText*/ ctx[2]) + "";
	let div_class_value;

	return {
		c() {
			div = element("div");
			this.h();
		},
		l(nodes) {
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);
			div_nodes.forEach(detach);
			this.h();
		},
		h() {
			attr(div, "class", div_class_value = "item " + /*itemClasses*/ ctx[3] + " svelte-bdnybl");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			div.innerHTML = raw_value;
		},
		p(ctx, [dirty]) {
			if (dirty & /*getOptionLabel, item, filterText*/ 7 && raw_value !== (raw_value = /*getOptionLabel*/ ctx[0](/*item*/ ctx[1], /*filterText*/ ctx[2]) + "")) div.innerHTML = raw_value;
			if (dirty & /*itemClasses*/ 8 && div_class_value !== (div_class_value = "item " + /*itemClasses*/ ctx[3] + " svelte-bdnybl")) {
				attr(div, "class", div_class_value);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

function instance$2($$self, $$props, $$invalidate) {
	let { isActive = false } = $$props;
	let { isFirst = false } = $$props;
	let { isHover = false } = $$props;
	let { getOptionLabel = undefined } = $$props;
	let { item = undefined } = $$props;
	let { filterText = "" } = $$props;
	let itemClasses = "";

	$$self.$$set = $$props => {
		if ("isActive" in $$props) $$invalidate(4, isActive = $$props.isActive);
		if ("isFirst" in $$props) $$invalidate(5, isFirst = $$props.isFirst);
		if ("isHover" in $$props) $$invalidate(6, isHover = $$props.isHover);
		if ("getOptionLabel" in $$props) $$invalidate(0, getOptionLabel = $$props.getOptionLabel);
		if ("item" in $$props) $$invalidate(1, item = $$props.item);
		if ("filterText" in $$props) $$invalidate(2, filterText = $$props.filterText);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*isActive, isFirst, isHover, item*/ 114) {
			 {
				const classes = [];

				if (isActive) {
					classes.push("active");
				}

				if (isFirst) {
					classes.push("first");
				}

				if (isHover) {
					classes.push("hover");
				}

				if (item.isGroupHeader) {
					classes.push("groupHeader");
				}

				if (item.isGroupItem) {
					classes.push("groupItem");
				}

				$$invalidate(3, itemClasses = classes.join(" "));
			}
		}
	};

	return [getOptionLabel, item, filterText, itemClasses, isActive, isFirst, isHover];
}

class Item extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance$2, create_fragment$2, safe_not_equal, {
			isActive: 4,
			isFirst: 5,
			isHover: 6,
			getOptionLabel: 0,
			item: 1,
			filterText: 2
		});
	}
}

/* node_modules\svelte-select\src\VirtualList.svelte generated by Svelte v3.24.1 */

const get_default_slot_changes = dirty => ({
	item: dirty & /*visible*/ 32,
	i: dirty & /*visible*/ 32,
	hoverItemIndex: dirty & /*hoverItemIndex*/ 2
});

const get_default_slot_context = ctx => ({
	item: /*row*/ ctx[24].data,
	i: /*row*/ ctx[24].index,
	hoverItemIndex: /*hoverItemIndex*/ ctx[1]
});

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[24] = list[i];
	return child_ctx;
}

// (141:57) Missing template
function fallback_block(ctx) {
	let t;

	return {
		c() {
			t = text("Missing template");
		},
		l(nodes) {
			t = claim_text(nodes, "Missing template");
		},
		m(target, anchor) {
			insert(target, t, anchor);
		},
		d(detaching) {
			if (detaching) detach(t);
		}
	};
}

// (139:2) {#each visible as row (row.index)}
function create_each_block(key_1, ctx) {
	let svelte_virtual_list_row;
	let t;
	let current;
	const default_slot_template = /*$$slots*/ ctx[14].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[13], get_default_slot_context);
	const default_slot_or_fallback = default_slot || fallback_block();

	return {
		key: key_1,
		first: null,
		c() {
			svelte_virtual_list_row = element("svelte-virtual-list-row");
			if (default_slot_or_fallback) default_slot_or_fallback.c();
			t = space();
			this.h();
		},
		l(nodes) {
			svelte_virtual_list_row = claim_element(nodes, "SVELTE-VIRTUAL-LIST-ROW", { class: true });
			var svelte_virtual_list_row_nodes = children(svelte_virtual_list_row);
			if (default_slot_or_fallback) default_slot_or_fallback.l(svelte_virtual_list_row_nodes);
			t = claim_space(svelte_virtual_list_row_nodes);
			svelte_virtual_list_row_nodes.forEach(detach);
			this.h();
		},
		h() {
			set_custom_element_data(svelte_virtual_list_row, "class", "svelte-p6ehlv");
			this.first = svelte_virtual_list_row;
		},
		m(target, anchor) {
			insert(target, svelte_virtual_list_row, anchor);

			if (default_slot_or_fallback) {
				default_slot_or_fallback.m(svelte_virtual_list_row, null);
			}

			append(svelte_virtual_list_row, t);
			current = true;
		},
		p(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && dirty & /*$$scope, visible, hoverItemIndex*/ 8226) {
					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[13], dirty, get_default_slot_changes, get_default_slot_context);
				}
			}
		},
		i(local) {
			if (current) return;
			transition_in(default_slot_or_fallback, local);
			current = true;
		},
		o(local) {
			transition_out(default_slot_or_fallback, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(svelte_virtual_list_row);
			if (default_slot_or_fallback) default_slot_or_fallback.d(detaching);
		}
	};
}

function create_fragment$3(ctx) {
	let svelte_virtual_list_viewport;
	let svelte_virtual_list_contents;
	let each_blocks = [];
	let each_1_lookup = new Map();
	let svelte_virtual_list_viewport_resize_listener;
	let current;
	let mounted;
	let dispose;
	let each_value = /*visible*/ ctx[5];
	const get_key = ctx => /*row*/ ctx[24].index;

	for (let i = 0; i < each_value.length; i += 1) {
		let child_ctx = get_each_context(ctx, each_value, i);
		let key = get_key(child_ctx);
		each_1_lookup.set(key, each_blocks[i] = create_each_block(key, child_ctx));
	}

	return {
		c() {
			svelte_virtual_list_viewport = element("svelte-virtual-list-viewport");
			svelte_virtual_list_contents = element("svelte-virtual-list-contents");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			this.h();
		},
		l(nodes) {
			svelte_virtual_list_viewport = claim_element(nodes, "SVELTE-VIRTUAL-LIST-VIEWPORT", { style: true, class: true });
			var svelte_virtual_list_viewport_nodes = children(svelte_virtual_list_viewport);
			svelte_virtual_list_contents = claim_element(svelte_virtual_list_viewport_nodes, "SVELTE-VIRTUAL-LIST-CONTENTS", { style: true, class: true });
			var svelte_virtual_list_contents_nodes = children(svelte_virtual_list_contents);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(svelte_virtual_list_contents_nodes);
			}

			svelte_virtual_list_contents_nodes.forEach(detach);
			svelte_virtual_list_viewport_nodes.forEach(detach);
			this.h();
		},
		h() {
			set_style(svelte_virtual_list_contents, "padding-top", /*top*/ ctx[6] + "px");
			set_style(svelte_virtual_list_contents, "padding-bottom", /*bottom*/ ctx[7] + "px");
			set_custom_element_data(svelte_virtual_list_contents, "class", "svelte-p6ehlv");
			set_style(svelte_virtual_list_viewport, "height", /*height*/ ctx[0]);
			set_custom_element_data(svelte_virtual_list_viewport, "class", "svelte-p6ehlv");
			add_render_callback(() => /*svelte_virtual_list_viewport_elementresize_handler*/ ctx[17].call(svelte_virtual_list_viewport));
		},
		m(target, anchor) {
			insert(target, svelte_virtual_list_viewport, anchor);
			append(svelte_virtual_list_viewport, svelte_virtual_list_contents);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(svelte_virtual_list_contents, null);
			}

			/*svelte_virtual_list_contents_binding*/ ctx[15](svelte_virtual_list_contents);
			/*svelte_virtual_list_viewport_binding*/ ctx[16](svelte_virtual_list_viewport);
			svelte_virtual_list_viewport_resize_listener = add_resize_listener(svelte_virtual_list_viewport, /*svelte_virtual_list_viewport_elementresize_handler*/ ctx[17].bind(svelte_virtual_list_viewport));
			current = true;

			if (!mounted) {
				dispose = listen(svelte_virtual_list_viewport, "scroll", /*handle_scroll*/ ctx[8]);
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (dirty & /*$$scope, visible, hoverItemIndex*/ 8226) {
				const each_value = /*visible*/ ctx[5];
				group_outros();
				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, svelte_virtual_list_contents, outro_and_destroy_block, create_each_block, null, get_each_context);
				check_outros();
			}

			if (!current || dirty & /*top*/ 64) {
				set_style(svelte_virtual_list_contents, "padding-top", /*top*/ ctx[6] + "px");
			}

			if (!current || dirty & /*bottom*/ 128) {
				set_style(svelte_virtual_list_contents, "padding-bottom", /*bottom*/ ctx[7] + "px");
			}

			if (!current || dirty & /*height*/ 1) {
				set_style(svelte_virtual_list_viewport, "height", /*height*/ ctx[0]);
			}
		},
		i(local) {
			if (current) return;

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o(local) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d(detaching) {
			if (detaching) detach(svelte_virtual_list_viewport);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].d();
			}

			/*svelte_virtual_list_contents_binding*/ ctx[15](null);
			/*svelte_virtual_list_viewport_binding*/ ctx[16](null);
			svelte_virtual_list_viewport_resize_listener();
			mounted = false;
			dispose();
		}
	};
}

function instance$3($$self, $$props, $$invalidate) {
	var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
		function adopt(value) {
			return value instanceof P
			? value
			: new P(function (resolve) {
						resolve(value);
					});
		}

		return new (P || (P = Promise))(function (resolve, reject) {
				function fulfilled(value) {
					try {
						step(generator.next(value));
					} catch(e) {
						reject(e);
					}
				}

				function rejected(value) {
					try {
						step(generator["throw"](value));
					} catch(e) {
						reject(e);
					}
				}

				function step(result) {
					result.done
					? resolve(result.value)
					: adopt(result.value).then(fulfilled, rejected);
				}

				step((generator = generator.apply(thisArg, _arguments || [])).next());
			});
	};

	let { items = undefined } = $$props;
	let { height = "100%" } = $$props;
	let { itemHeight = 40 } = $$props;
	let { hoverItemIndex = 0 } = $$props;
	let { start = 0 } = $$props;
	let { end = 0 } = $$props;

	// local state
	let height_map = [];

	let rows;
	let viewport;
	let contents;
	let viewport_height = 0;
	let visible;
	let mounted;
	let top = 0;
	let bottom = 0;
	let average_height;

	function refresh(items, viewport_height, itemHeight) {
		return __awaiter(this, void 0, void 0, function* () {
			const { scrollTop } = viewport;
			yield tick(); // wait until the DOM is up to date
			let content_height = top - scrollTop;
			let i = start;

			while (content_height < viewport_height && i < items.length) {
				let row = rows[i - start];

				if (!row) {
					$$invalidate(10, end = i + 1);
					yield tick(); // render the newly visible row
					row = rows[i - start];
				}

				const row_height = height_map[i] = itemHeight || row.offsetHeight;
				content_height += row_height;
				i += 1;
			}

			$$invalidate(10, end = i);
			const remaining = items.length - end;
			average_height = (top + content_height) / end;
			$$invalidate(7, bottom = remaining * average_height);
			height_map.length = items.length;
			$$invalidate(2, viewport.scrollTop = 0, viewport);
		});
	}

	function handle_scroll() {
		return __awaiter(this, void 0, void 0, function* () {
			const { scrollTop } = viewport;
			const old_start = start;

			for (let v = 0; v < rows.length; v += 1) {
				height_map[start + v] = itemHeight || rows[v].offsetHeight;
			}

			let i = 0;
			let y = 0;

			while (i < items.length) {
				const row_height = height_map[i] || average_height;

				if (y + row_height > scrollTop) {
					$$invalidate(9, start = i);
					$$invalidate(6, top = y);
					break;
				}

				y += row_height;
				i += 1;
			}

			while (i < items.length) {
				y += height_map[i] || average_height;
				i += 1;
				if (y > scrollTop + viewport_height) break;
			}

			$$invalidate(10, end = i);
			const remaining = items.length - end;
			average_height = y / end;
			while (i < items.length) height_map[i++] = average_height;
			$$invalidate(7, bottom = remaining * average_height);

			// prevent jumping if we scrolled up into unknown territory
			if (start < old_start) {
				yield tick();
				let expected_height = 0;
				let actual_height = 0;

				for (let i = start; i < old_start; i += 1) {
					if (rows[i - start]) {
						expected_height += height_map[i];
						actual_height += itemHeight || rows[i - start].offsetHeight;
					}
				}

				const d = actual_height - expected_height;
				viewport.scrollTo(0, scrollTop + d);
			}
		}); // TODO if we overestimated the space these
		// rows would occupy we may need to add some
		// more. maybe we can just call handle_scroll again?
	}

	// trigger initial refresh
	onMount(() => {
		rows = contents.getElementsByTagName("svelte-virtual-list-row");
		$$invalidate(20, mounted = true);
	});

	let { $$slots = {}, $$scope } = $$props;

	function svelte_virtual_list_contents_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			contents = $$value;
			$$invalidate(3, contents);
		});
	}

	function svelte_virtual_list_viewport_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			viewport = $$value;
			$$invalidate(2, viewport);
		});
	}

	function svelte_virtual_list_viewport_elementresize_handler() {
		viewport_height = this.offsetHeight;
		$$invalidate(4, viewport_height);
	}

	$$self.$$set = $$props => {
		if ("items" in $$props) $$invalidate(11, items = $$props.items);
		if ("height" in $$props) $$invalidate(0, height = $$props.height);
		if ("itemHeight" in $$props) $$invalidate(12, itemHeight = $$props.itemHeight);
		if ("hoverItemIndex" in $$props) $$invalidate(1, hoverItemIndex = $$props.hoverItemIndex);
		if ("start" in $$props) $$invalidate(9, start = $$props.start);
		if ("end" in $$props) $$invalidate(10, end = $$props.end);
		if ("$$scope" in $$props) $$invalidate(13, $$scope = $$props.$$scope);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*items, start, end*/ 3584) {
			 $$invalidate(5, visible = items.slice(start, end).map((data, i) => {
				return { index: i + start, data };
			}));
		}

		if ($$self.$$.dirty & /*mounted, items, viewport_height, itemHeight*/ 1054736) {
			// whenever `items` changes, invalidate the current heightmap
			 if (mounted) refresh(items, viewport_height, itemHeight);
		}
	};

	return [
		height,
		hoverItemIndex,
		viewport,
		contents,
		viewport_height,
		visible,
		top,
		bottom,
		handle_scroll,
		start,
		end,
		items,
		itemHeight,
		$$scope,
		$$slots,
		svelte_virtual_list_contents_binding,
		svelte_virtual_list_viewport_binding,
		svelte_virtual_list_viewport_elementresize_handler
	];
}

class VirtualList extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance$3, create_fragment$3, safe_not_equal, {
			items: 11,
			height: 0,
			itemHeight: 12,
			hoverItemIndex: 1,
			start: 9,
			end: 10
		});
	}
}

/* node_modules\svelte-select\src\List.svelte generated by Svelte v3.24.1 */

function get_each_context$1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[35] = list[i];
	child_ctx[37] = i;
	return child_ctx;
}

// (190:0) {#if isVirtualList}
function create_if_block_3(ctx) {
	let div;
	let virtuallist;
	let current;

	virtuallist = new VirtualList({
			props: {
				items: /*items*/ ctx[4],
				itemHeight: /*itemHeight*/ ctx[7],
				$$slots: {
					default: [
						create_default_slot,
						({ item, i }) => ({ 35: item, 37: i }),
						({ item, i }) => [0, (item ? 16 : 0) | (i ? 64 : 0)]
					]
				},
				$$scope: { ctx }
			}
		});

	return {
		c() {
			div = element("div");
			create_component(virtuallist.$$.fragment);
			this.h();
		},
		l(nodes) {
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);
			claim_component(virtuallist.$$.fragment, div_nodes);
			div_nodes.forEach(detach);
			this.h();
		},
		h() {
			attr(div, "class", "listContainer virtualList svelte-ux0sbr");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			mount_component(virtuallist, div, null);
			/*div_binding*/ ctx[20](div);
			current = true;
		},
		p(ctx, dirty) {
			const virtuallist_changes = {};
			if (dirty[0] & /*items*/ 16) virtuallist_changes.items = /*items*/ ctx[4];
			if (dirty[0] & /*itemHeight*/ 128) virtuallist_changes.itemHeight = /*itemHeight*/ ctx[7];

			if (dirty[0] & /*Item, filterText, getOptionLabel, selectedValue, optionIdentifier, hoverItemIndex, items*/ 4918 | dirty[1] & /*$$scope, item, i*/ 208) {
				virtuallist_changes.$$scope = { dirty, ctx };
			}

			virtuallist.$set(virtuallist_changes);
		},
		i(local) {
			if (current) return;
			transition_in(virtuallist.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(virtuallist.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_component(virtuallist);
			/*div_binding*/ ctx[20](null);
		}
	};
}

// (193:2) <VirtualList {items} {itemHeight} let:item let:i>
function create_default_slot(ctx) {
	let div;
	let switch_instance;
	let current;
	let mounted;
	let dispose;
	var switch_value = /*Item*/ ctx[2];

	function switch_props(ctx) {
		return {
			props: {
				item: /*item*/ ctx[35],
				filterText: /*filterText*/ ctx[12],
				getOptionLabel: /*getOptionLabel*/ ctx[5],
				isFirst: isItemFirst(/*i*/ ctx[37]),
				isActive: isItemActive(/*item*/ ctx[35], /*selectedValue*/ ctx[8], /*optionIdentifier*/ ctx[9]),
				isHover: isItemHover(/*hoverItemIndex*/ ctx[1], /*item*/ ctx[35], /*i*/ ctx[37], /*items*/ ctx[4])
			}
		};
	}

	if (switch_value) {
		switch_instance = new switch_value(switch_props(ctx));
	}

	function mouseover_handler(...args) {
		return /*mouseover_handler*/ ctx[18](/*i*/ ctx[37], ...args);
	}

	function click_handler(...args) {
		return /*click_handler*/ ctx[19](/*item*/ ctx[35], /*i*/ ctx[37], ...args);
	}

	return {
		c() {
			div = element("div");
			if (switch_instance) create_component(switch_instance.$$.fragment);
			this.h();
		},
		l(nodes) {
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);
			if (switch_instance) claim_component(switch_instance.$$.fragment, div_nodes);
			div_nodes.forEach(detach);
			this.h();
		},
		h() {
			attr(div, "class", "listItem");
		},
		m(target, anchor) {
			insert(target, div, anchor);

			if (switch_instance) {
				mount_component(switch_instance, div, null);
			}

			current = true;

			if (!mounted) {
				dispose = [
					listen(div, "mouseover", mouseover_handler),
					listen(div, "click", click_handler)
				];

				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			const switch_instance_changes = {};
			if (dirty[1] & /*item*/ 16) switch_instance_changes.item = /*item*/ ctx[35];
			if (dirty[0] & /*filterText*/ 4096) switch_instance_changes.filterText = /*filterText*/ ctx[12];
			if (dirty[0] & /*getOptionLabel*/ 32) switch_instance_changes.getOptionLabel = /*getOptionLabel*/ ctx[5];
			if (dirty[1] & /*i*/ 64) switch_instance_changes.isFirst = isItemFirst(/*i*/ ctx[37]);
			if (dirty[0] & /*selectedValue, optionIdentifier*/ 768 | dirty[1] & /*item*/ 16) switch_instance_changes.isActive = isItemActive(/*item*/ ctx[35], /*selectedValue*/ ctx[8], /*optionIdentifier*/ ctx[9]);
			if (dirty[0] & /*hoverItemIndex, items*/ 18 | dirty[1] & /*item, i*/ 80) switch_instance_changes.isHover = isItemHover(/*hoverItemIndex*/ ctx[1], /*item*/ ctx[35], /*i*/ ctx[37], /*items*/ ctx[4]);

			if (switch_value !== (switch_value = /*Item*/ ctx[2])) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props(ctx));
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, div, null);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}
		},
		i(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			if (switch_instance) destroy_component(switch_instance);
			mounted = false;
			run_all(dispose);
		}
	};
}

// (212:0) {#if !isVirtualList}
function create_if_block$2(ctx) {
	let div;
	let current;
	let each_value = /*items*/ ctx[4];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	let each_1_else = null;

	if (!each_value.length) {
		each_1_else = create_else_block_1(ctx);
	}

	return {
		c() {
			div = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			if (each_1_else) {
				each_1_else.c();
			}

			this.h();
		},
		l(nodes) {
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(div_nodes);
			}

			if (each_1_else) {
				each_1_else.l(div_nodes);
			}

			div_nodes.forEach(detach);
			this.h();
		},
		h() {
			attr(div, "class", "listContainer svelte-ux0sbr");
		},
		m(target, anchor) {
			insert(target, div, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div, null);
			}

			if (each_1_else) {
				each_1_else.m(div, null);
			}

			/*div_binding_1*/ ctx[23](div);
			current = true;
		},
		p(ctx, dirty) {
			if (dirty[0] & /*getGroupHeaderLabel, items, handleHover, handleClick, Item, filterText, getOptionLabel, selectedValue, optionIdentifier, hoverItemIndex, noOptionsMessage, hideEmptyState*/ 32630) {
				each_value = /*items*/ ctx[4];
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$1(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block$1(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(div, null);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();

				if (!each_value.length && each_1_else) {
					each_1_else.p(ctx, dirty);
				} else if (!each_value.length) {
					each_1_else = create_else_block_1(ctx);
					each_1_else.c();
					each_1_else.m(div, null);
				} else if (each_1_else) {
					each_1_else.d(1);
					each_1_else = null;
				}
			}
		},
		i(local) {
			if (current) return;

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_each(each_blocks, detaching);
			if (each_1_else) each_1_else.d();
			/*div_binding_1*/ ctx[23](null);
		}
	};
}

// (234:2) {:else}
function create_else_block_1(ctx) {
	let if_block_anchor;
	let if_block = !/*hideEmptyState*/ ctx[10] && create_if_block_2$1(ctx);

	return {
		c() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		l(nodes) {
			if (if_block) if_block.l(nodes);
			if_block_anchor = empty();
		},
		m(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert(target, if_block_anchor, anchor);
		},
		p(ctx, dirty) {
			if (!/*hideEmptyState*/ ctx[10]) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block_2$1(ctx);
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		d(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

// (235:4) {#if !hideEmptyState}
function create_if_block_2$1(ctx) {
	let div;
	let t;

	return {
		c() {
			div = element("div");
			t = text(/*noOptionsMessage*/ ctx[11]);
			this.h();
		},
		l(nodes) {
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);
			t = claim_text(div_nodes, /*noOptionsMessage*/ ctx[11]);
			div_nodes.forEach(detach);
			this.h();
		},
		h() {
			attr(div, "class", "empty svelte-ux0sbr");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, t);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*noOptionsMessage*/ 2048) set_data(t, /*noOptionsMessage*/ ctx[11]);
		},
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

// (217:4) { :else }
function create_else_block$1(ctx) {
	let div;
	let switch_instance;
	let t;
	let current;
	let mounted;
	let dispose;
	var switch_value = /*Item*/ ctx[2];

	function switch_props(ctx) {
		return {
			props: {
				item: /*item*/ ctx[35],
				filterText: /*filterText*/ ctx[12],
				getOptionLabel: /*getOptionLabel*/ ctx[5],
				isFirst: isItemFirst(/*i*/ ctx[37]),
				isActive: isItemActive(/*item*/ ctx[35], /*selectedValue*/ ctx[8], /*optionIdentifier*/ ctx[9]),
				isHover: isItemHover(/*hoverItemIndex*/ ctx[1], /*item*/ ctx[35], /*i*/ ctx[37], /*items*/ ctx[4])
			}
		};
	}

	if (switch_value) {
		switch_instance = new switch_value(switch_props(ctx));
	}

	function mouseover_handler_1(...args) {
		return /*mouseover_handler_1*/ ctx[21](/*i*/ ctx[37], ...args);
	}

	function click_handler_1(...args) {
		return /*click_handler_1*/ ctx[22](/*item*/ ctx[35], /*i*/ ctx[37], ...args);
	}

	return {
		c() {
			div = element("div");
			if (switch_instance) create_component(switch_instance.$$.fragment);
			t = space();
			this.h();
		},
		l(nodes) {
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);
			if (switch_instance) claim_component(switch_instance.$$.fragment, div_nodes);
			t = claim_space(div_nodes);
			div_nodes.forEach(detach);
			this.h();
		},
		h() {
			attr(div, "class", "listItem");
		},
		m(target, anchor) {
			insert(target, div, anchor);

			if (switch_instance) {
				mount_component(switch_instance, div, null);
			}

			append(div, t);
			current = true;

			if (!mounted) {
				dispose = [
					listen(div, "mouseover", mouseover_handler_1),
					listen(div, "click", click_handler_1)
				];

				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			const switch_instance_changes = {};
			if (dirty[0] & /*items*/ 16) switch_instance_changes.item = /*item*/ ctx[35];
			if (dirty[0] & /*filterText*/ 4096) switch_instance_changes.filterText = /*filterText*/ ctx[12];
			if (dirty[0] & /*getOptionLabel*/ 32) switch_instance_changes.getOptionLabel = /*getOptionLabel*/ ctx[5];
			if (dirty[0] & /*items, selectedValue, optionIdentifier*/ 784) switch_instance_changes.isActive = isItemActive(/*item*/ ctx[35], /*selectedValue*/ ctx[8], /*optionIdentifier*/ ctx[9]);
			if (dirty[0] & /*hoverItemIndex, items*/ 18) switch_instance_changes.isHover = isItemHover(/*hoverItemIndex*/ ctx[1], /*item*/ ctx[35], /*i*/ ctx[37], /*items*/ ctx[4]);

			if (switch_value !== (switch_value = /*Item*/ ctx[2])) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props(ctx));
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, div, t);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}
		},
		i(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			if (switch_instance) destroy_component(switch_instance);
			mounted = false;
			run_all(dispose);
		}
	};
}

// (215:4) {#if item.isGroupHeader && !item.isSelectable}
function create_if_block_1$1(ctx) {
	let div;
	let t_value = /*getGroupHeaderLabel*/ ctx[6](/*item*/ ctx[35]) + "";
	let t;

	return {
		c() {
			div = element("div");
			t = text(t_value);
			this.h();
		},
		l(nodes) {
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);
			t = claim_text(div_nodes, t_value);
			div_nodes.forEach(detach);
			this.h();
		},
		h() {
			attr(div, "class", "listGroupTitle svelte-ux0sbr");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, t);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*getGroupHeaderLabel, items*/ 80 && t_value !== (t_value = /*getGroupHeaderLabel*/ ctx[6](/*item*/ ctx[35]) + "")) set_data(t, t_value);
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

// (214:2) {#each items as item, i}
function create_each_block$1(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block_1$1, create_else_block$1];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*item*/ ctx[35].isGroupHeader && !/*item*/ ctx[35].isSelectable) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	return {
		c() {
			if_block.c();
			if_block_anchor = empty();
		},
		l(nodes) {
			if_block.l(nodes);
			if_block_anchor = empty();
		},
		m(target, anchor) {
			if_blocks[current_block_type_index].m(target, anchor);
			insert(target, if_block_anchor, anchor);
			current = true;
		},
		p(ctx, dirty) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				}

				transition_in(if_block, 1);
				if_block.m(if_block_anchor.parentNode, if_block_anchor);
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if_blocks[current_block_type_index].d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

function create_fragment$4(ctx) {
	let t;
	let if_block1_anchor;
	let current;
	let mounted;
	let dispose;
	let if_block0 = /*isVirtualList*/ ctx[3] && create_if_block_3(ctx);
	let if_block1 = !/*isVirtualList*/ ctx[3] && create_if_block$2(ctx);

	return {
		c() {
			if (if_block0) if_block0.c();
			t = space();
			if (if_block1) if_block1.c();
			if_block1_anchor = empty();
		},
		l(nodes) {
			if (if_block0) if_block0.l(nodes);
			t = claim_space(nodes);
			if (if_block1) if_block1.l(nodes);
			if_block1_anchor = empty();
		},
		m(target, anchor) {
			if (if_block0) if_block0.m(target, anchor);
			insert(target, t, anchor);
			if (if_block1) if_block1.m(target, anchor);
			insert(target, if_block1_anchor, anchor);
			current = true;

			if (!mounted) {
				dispose = listen(window, "keydown", /*handleKeyDown*/ ctx[15]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (/*isVirtualList*/ ctx[3]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);

					if (dirty[0] & /*isVirtualList*/ 8) {
						transition_in(if_block0, 1);
					}
				} else {
					if_block0 = create_if_block_3(ctx);
					if_block0.c();
					transition_in(if_block0, 1);
					if_block0.m(t.parentNode, t);
				}
			} else if (if_block0) {
				group_outros();

				transition_out(if_block0, 1, 1, () => {
					if_block0 = null;
				});

				check_outros();
			}

			if (!/*isVirtualList*/ ctx[3]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);

					if (dirty[0] & /*isVirtualList*/ 8) {
						transition_in(if_block1, 1);
					}
				} else {
					if_block1 = create_if_block$2(ctx);
					if_block1.c();
					transition_in(if_block1, 1);
					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
				}
			} else if (if_block1) {
				group_outros();

				transition_out(if_block1, 1, 1, () => {
					if_block1 = null;
				});

				check_outros();
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block0);
			transition_in(if_block1);
			current = true;
		},
		o(local) {
			transition_out(if_block0);
			transition_out(if_block1);
			current = false;
		},
		d(detaching) {
			if (if_block0) if_block0.d(detaching);
			if (detaching) detach(t);
			if (if_block1) if_block1.d(detaching);
			if (detaching) detach(if_block1_anchor);
			mounted = false;
			dispose();
		}
	};
}

function isItemActive(item, selectedValue, optionIdentifier) {
	return selectedValue && selectedValue[optionIdentifier] === item[optionIdentifier];
}

function isItemFirst(itemIndex) {
	return itemIndex === 0;
}

function isItemHover(hoverItemIndex, item, itemIndex, items) {
	return hoverItemIndex === itemIndex || items.length === 1;
}

function instance$4($$self, $$props, $$invalidate) {
	var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
		function adopt(value) {
			return value instanceof P
			? value
			: new P(function (resolve) {
						resolve(value);
					});
		}

		return new (P || (P = Promise))(function (resolve, reject) {
				function fulfilled(value) {
					try {
						step(generator.next(value));
					} catch(e) {
						reject(e);
					}
				}

				function rejected(value) {
					try {
						step(generator["throw"](value));
					} catch(e) {
						reject(e);
					}
				}

				function step(result) {
					result.done
					? resolve(result.value)
					: adopt(result.value).then(fulfilled, rejected);
				}

				step((generator = generator.apply(thisArg, _arguments || [])).next());
			});
	};

	const dispatch = createEventDispatcher();
	let { container = undefined } = $$props;
	let { Item: Item$1 = Item } = $$props;
	let { isVirtualList = false } = $$props;
	let { items = [] } = $$props;

	let { getOptionLabel = (option, filterText) => {
		if (option) return option.isCreator
		? `Create \"${filterText}\"`
		: option.label;
	} } = $$props;

	let { getGroupHeaderLabel = option => {
		return option.label;
	} } = $$props;

	let { itemHeight = 40 } = $$props;
	let { hoverItemIndex = 0 } = $$props;
	let { selectedValue = undefined } = $$props;
	let { optionIdentifier = "value" } = $$props;
	let { hideEmptyState = false } = $$props;
	let { noOptionsMessage = "No options" } = $$props;
	let { isMulti = false } = $$props;
	let { activeItemIndex = 0 } = $$props;
	let { filterText = "" } = $$props;
	let isScrollingTimer = 0;
	let isScrolling = false;
	let prev_items;

	onMount(() => {
		if (items.length > 0 && !isMulti && selectedValue) {
			const _hoverItemIndex = items.findIndex(item => item[optionIdentifier] === selectedValue[optionIdentifier]);

			if (_hoverItemIndex) {
				$$invalidate(1, hoverItemIndex = _hoverItemIndex);
			}
		}

		scrollToActiveItem("active");

		container.addEventListener(
			"scroll",
			() => {
				clearTimeout(isScrollingTimer);

				isScrollingTimer = setTimeout(
					() => {
						isScrolling = false;
					},
					100
				);
			},
			false
		);
	});

	onDestroy(() => {
		
	}); // clearTimeout(isScrollingTimer);

	beforeUpdate(() => {
		if (items !== prev_items && items.length > 0) {
			$$invalidate(1, hoverItemIndex = 0);
		}

		// if (prev_activeItemIndex && activeItemIndex > -1) {
		//   hoverItemIndex = activeItemIndex;
		//   scrollToActiveItem('active');
		// }
		// if (prev_selectedValue && selectedValue) {
		//   scrollToActiveItem('active');
		//   if (items && !isMulti) {
		//     const hoverItemIndex = items.findIndex((item) => item[optionIdentifier] === selectedValue[optionIdentifier]);
		//     if (hoverItemIndex) {
		//       hoverItemIndex = hoverItemIndex;
		//     }
		//   }
		// }
		prev_items = items;
	});

	function handleSelect(item) {
		if (item.isCreator) return;
		dispatch("itemSelected", item);
	}

	function handleHover(i) {
		if (isScrolling) return;
		$$invalidate(1, hoverItemIndex = i);
	}

	function handleClick(args) {
		const { item, i, event } = args;
		event.stopPropagation();
		if (selectedValue && !isMulti && selectedValue[optionIdentifier] === item[optionIdentifier]) return closeList();

		if (item.isCreator) {
			dispatch("itemCreated", filterText);
		} else {
			$$invalidate(16, activeItemIndex = i);
			$$invalidate(1, hoverItemIndex = i);
			handleSelect(item);
		}
	}

	function closeList() {
		dispatch("closeList");
	}

	function updateHoverItem(increment) {
		return __awaiter(this, void 0, void 0, function* () {
			if (isVirtualList) return;
			let isNonSelectableItem = true;

			while (isNonSelectableItem) {
				if (increment > 0 && hoverItemIndex === items.length - 1) {
					$$invalidate(1, hoverItemIndex = 0);
				} else if (increment < 0 && hoverItemIndex === 0) {
					$$invalidate(1, hoverItemIndex = items.length - 1);
				} else {
					$$invalidate(1, hoverItemIndex = hoverItemIndex + increment);
				}

				isNonSelectableItem = items[hoverItemIndex].isGroupHeader && !items[hoverItemIndex].isSelectable;
			}

			yield tick();
			scrollToActiveItem("hover");
		});
	}

	function handleKeyDown(e) {
		switch (e.key) {
			case "ArrowDown":
				e.preventDefault();
				items.length && updateHoverItem(1);
				break;
			case "ArrowUp":
				e.preventDefault();
				items.length && updateHoverItem(-1);
				break;
			case "Enter":
				e.preventDefault();
				if (items.length === 0) break;
				const hoverItem = items[hoverItemIndex];
				if (selectedValue && !isMulti && selectedValue[optionIdentifier] === hoverItem[optionIdentifier]) {
					closeList();
					break;
				}
				if (hoverItem.isCreator) {
					dispatch("itemCreated", filterText);
				} else {
					$$invalidate(16, activeItemIndex = hoverItemIndex);
					handleSelect(items[hoverItemIndex]);
				}
				break;
			case "Tab":
				e.preventDefault();
				if (items.length === 0) break;
				if (selectedValue && selectedValue[optionIdentifier] === items[hoverItemIndex][optionIdentifier]) return closeList();
				$$invalidate(16, activeItemIndex = hoverItemIndex);
				handleSelect(items[hoverItemIndex]);
				break;
		}
	}

	function scrollToActiveItem(className) {
		if (isVirtualList || !container) return;
		let offsetBounding;
		const focusedElemBounding = container.querySelector(`.listItem .${className}`);

		if (focusedElemBounding) {
			offsetBounding = container.getBoundingClientRect().bottom - focusedElemBounding.getBoundingClientRect().bottom;
		}

		$$invalidate(0, container.scrollTop -= offsetBounding, container);
	}

	
	
	const mouseover_handler = i => handleHover(i);
	const click_handler = (item, i, event) => handleClick({ item, i, event });

	function div_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			container = $$value;
			$$invalidate(0, container);
		});
	}

	const mouseover_handler_1 = i => handleHover(i);
	const click_handler_1 = (item, i, event) => handleClick({ item, i, event });

	function div_binding_1($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			container = $$value;
			$$invalidate(0, container);
		});
	}

	$$self.$$set = $$props => {
		if ("container" in $$props) $$invalidate(0, container = $$props.container);
		if ("Item" in $$props) $$invalidate(2, Item$1 = $$props.Item);
		if ("isVirtualList" in $$props) $$invalidate(3, isVirtualList = $$props.isVirtualList);
		if ("items" in $$props) $$invalidate(4, items = $$props.items);
		if ("getOptionLabel" in $$props) $$invalidate(5, getOptionLabel = $$props.getOptionLabel);
		if ("getGroupHeaderLabel" in $$props) $$invalidate(6, getGroupHeaderLabel = $$props.getGroupHeaderLabel);
		if ("itemHeight" in $$props) $$invalidate(7, itemHeight = $$props.itemHeight);
		if ("hoverItemIndex" in $$props) $$invalidate(1, hoverItemIndex = $$props.hoverItemIndex);
		if ("selectedValue" in $$props) $$invalidate(8, selectedValue = $$props.selectedValue);
		if ("optionIdentifier" in $$props) $$invalidate(9, optionIdentifier = $$props.optionIdentifier);
		if ("hideEmptyState" in $$props) $$invalidate(10, hideEmptyState = $$props.hideEmptyState);
		if ("noOptionsMessage" in $$props) $$invalidate(11, noOptionsMessage = $$props.noOptionsMessage);
		if ("isMulti" in $$props) $$invalidate(17, isMulti = $$props.isMulti);
		if ("activeItemIndex" in $$props) $$invalidate(16, activeItemIndex = $$props.activeItemIndex);
		if ("filterText" in $$props) $$invalidate(12, filterText = $$props.filterText);
	};

	return [
		container,
		hoverItemIndex,
		Item$1,
		isVirtualList,
		items,
		getOptionLabel,
		getGroupHeaderLabel,
		itemHeight,
		selectedValue,
		optionIdentifier,
		hideEmptyState,
		noOptionsMessage,
		filterText,
		handleHover,
		handleClick,
		handleKeyDown,
		activeItemIndex,
		isMulti,
		mouseover_handler,
		click_handler,
		div_binding,
		mouseover_handler_1,
		click_handler_1,
		div_binding_1
	];
}

class List extends SvelteComponent {
	constructor(options) {
		super();

		init(
			this,
			options,
			instance$4,
			create_fragment$4,
			safe_not_equal,
			{
				container: 0,
				Item: 2,
				isVirtualList: 3,
				items: 4,
				getOptionLabel: 5,
				getGroupHeaderLabel: 6,
				itemHeight: 7,
				hoverItemIndex: 1,
				selectedValue: 8,
				optionIdentifier: 9,
				hideEmptyState: 10,
				noOptionsMessage: 11,
				isMulti: 17,
				activeItemIndex: 16,
				filterText: 12
			},
			[-1, -1]
		);
	}
}

/* node_modules\svelte-select\src\Selection.svelte generated by Svelte v3.24.1 */

function create_fragment$5(ctx) {
	let div;
	let raw_value = /*getSelectionLabel*/ ctx[0](/*item*/ ctx[1]) + "";

	return {
		c() {
			div = element("div");
			this.h();
		},
		l(nodes) {
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);
			div_nodes.forEach(detach);
			this.h();
		},
		h() {
			attr(div, "class", "selection svelte-ch6bh7");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			div.innerHTML = raw_value;
		},
		p(ctx, [dirty]) {
			if (dirty & /*getSelectionLabel, item*/ 3 && raw_value !== (raw_value = /*getSelectionLabel*/ ctx[0](/*item*/ ctx[1]) + "")) div.innerHTML = raw_value;		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

function instance$5($$self, $$props, $$invalidate) {
	let { getSelectionLabel = undefined } = $$props;
	let { item = undefined } = $$props;

	$$self.$$set = $$props => {
		if ("getSelectionLabel" in $$props) $$invalidate(0, getSelectionLabel = $$props.getSelectionLabel);
		if ("item" in $$props) $$invalidate(1, item = $$props.item);
	};

	return [getSelectionLabel, item];
}

class Selection extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$5, create_fragment$5, safe_not_equal, { getSelectionLabel: 0, item: 1 });
	}
}

/* node_modules\svelte-select\src\MultiSelection.svelte generated by Svelte v3.24.1 */

function get_each_context$2(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[7] = list[i];
	child_ctx[9] = i;
	return child_ctx;
}

// (18:2) {#if !isDisabled}
function create_if_block$3(ctx) {
	let div;
	let svg;
	let path;
	let mounted;
	let dispose;

	function click_handler(...args) {
		return /*click_handler*/ ctx[5](/*i*/ ctx[9], ...args);
	}

	return {
		c() {
			div = element("div");
			svg = svg_element("svg");
			path = svg_element("path");
			this.h();
		},
		l(nodes) {
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);

			svg = claim_element(
				div_nodes,
				"svg",
				{
					width: true,
					height: true,
					viewBox: true,
					focusable: true,
					role: true,
					class: true
				},
				1
			);

			var svg_nodes = children(svg);
			path = claim_element(svg_nodes, "path", { d: true }, 1);
			children(path).forEach(detach);
			svg_nodes.forEach(detach);
			div_nodes.forEach(detach);
			this.h();
		},
		h() {
			attr(path, "d", "M34.923,37.251L24,26.328L13.077,37.251L9.436,33.61l10.923-10.923L9.436,11.765l3.641-3.641L24,19.047L34.923,8.124 l3.641,3.641L27.641,22.688L38.564,33.61L34.923,37.251z");
			attr(svg, "width", "100%");
			attr(svg, "height", "100%");
			attr(svg, "viewBox", "-2 -2 50 50");
			attr(svg, "focusable", "false");
			attr(svg, "role", "presentation");
			attr(svg, "class", "svelte-rtzfov");
			attr(div, "class", "multiSelectItem_clear svelte-rtzfov");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, svg);
			append(svg, path);

			if (!mounted) {
				dispose = listen(div, "click", click_handler);
				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
		},
		d(detaching) {
			if (detaching) detach(div);
			mounted = false;
			dispose();
		}
	};
}

// (13:0) {#each selectedValue as value, i}
function create_each_block$2(ctx) {
	let div1;
	let div0;
	let raw_value = /*getSelectionLabel*/ ctx[3](/*value*/ ctx[7]) + "";
	let t0;
	let t1;
	let div1_class_value;
	let if_block = !/*isDisabled*/ ctx[2] && create_if_block$3(ctx);

	return {
		c() {
			div1 = element("div");
			div0 = element("div");
			t0 = space();
			if (if_block) if_block.c();
			t1 = space();
			this.h();
		},
		l(nodes) {
			div1 = claim_element(nodes, "DIV", { class: true });
			var div1_nodes = children(div1);
			div0 = claim_element(div1_nodes, "DIV", { class: true });
			var div0_nodes = children(div0);
			div0_nodes.forEach(detach);
			t0 = claim_space(div1_nodes);
			if (if_block) if_block.l(div1_nodes);
			t1 = claim_space(div1_nodes);
			div1_nodes.forEach(detach);
			this.h();
		},
		h() {
			attr(div0, "class", "multiSelectItem_label svelte-rtzfov");

			attr(div1, "class", div1_class_value = "multiSelectItem " + (/*activeSelectedValue*/ ctx[1] === /*i*/ ctx[9]
			? "active"
			: "") + " " + (/*isDisabled*/ ctx[2] ? "disabled" : "") + " svelte-rtzfov");
		},
		m(target, anchor) {
			insert(target, div1, anchor);
			append(div1, div0);
			div0.innerHTML = raw_value;
			append(div1, t0);
			if (if_block) if_block.m(div1, null);
			append(div1, t1);
		},
		p(ctx, dirty) {
			if (dirty & /*getSelectionLabel, selectedValue*/ 9 && raw_value !== (raw_value = /*getSelectionLabel*/ ctx[3](/*value*/ ctx[7]) + "")) div0.innerHTML = raw_value;
			if (!/*isDisabled*/ ctx[2]) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block$3(ctx);
					if_block.c();
					if_block.m(div1, t1);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}

			if (dirty & /*activeSelectedValue, isDisabled*/ 6 && div1_class_value !== (div1_class_value = "multiSelectItem " + (/*activeSelectedValue*/ ctx[1] === /*i*/ ctx[9]
			? "active"
			: "") + " " + (/*isDisabled*/ ctx[2] ? "disabled" : "") + " svelte-rtzfov")) {
				attr(div1, "class", div1_class_value);
			}
		},
		d(detaching) {
			if (detaching) detach(div1);
			if (if_block) if_block.d();
		}
	};
}

function create_fragment$6(ctx) {
	let each_1_anchor;
	let each_value = /*selectedValue*/ ctx[0];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
	}

	return {
		c() {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty();
		},
		l(nodes) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(nodes);
			}

			each_1_anchor = empty();
		},
		m(target, anchor) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			insert(target, each_1_anchor, anchor);
		},
		p(ctx, [dirty]) {
			if (dirty & /*activeSelectedValue, isDisabled, handleClear, getSelectionLabel, selectedValue*/ 31) {
				each_value = /*selectedValue*/ ctx[0];
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$2(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block$2(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			destroy_each(each_blocks, detaching);
			if (detaching) detach(each_1_anchor);
		}
	};
}

function instance$6($$self, $$props, $$invalidate) {
	const dispatch = createEventDispatcher();
	let { selectedValue = [] } = $$props;
	let { activeSelectedValue = undefined } = $$props;
	let { isDisabled = false } = $$props;
	let { getSelectionLabel = undefined } = $$props;

	function handleClear(i, event) {
		event.stopPropagation();
		dispatch("multiItemClear", { i });
	}

	const click_handler = (i, event) => handleClear(i, event);

	$$self.$$set = $$props => {
		if ("selectedValue" in $$props) $$invalidate(0, selectedValue = $$props.selectedValue);
		if ("activeSelectedValue" in $$props) $$invalidate(1, activeSelectedValue = $$props.activeSelectedValue);
		if ("isDisabled" in $$props) $$invalidate(2, isDisabled = $$props.isDisabled);
		if ("getSelectionLabel" in $$props) $$invalidate(3, getSelectionLabel = $$props.getSelectionLabel);
	};

	return [
		selectedValue,
		activeSelectedValue,
		isDisabled,
		getSelectionLabel,
		handleClear,
		click_handler
	];
}

class MultiSelection extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance$6, create_fragment$6, safe_not_equal, {
			selectedValue: 0,
			activeSelectedValue: 1,
			isDisabled: 2,
			getSelectionLabel: 3
		});
	}
}

function isOutOfViewport(elem) {
  const bounding = elem.getBoundingClientRect();
  const out = {};

  out.top = bounding.top < 0;
  out.left = bounding.left < 0;
  out.bottom = bounding.bottom > (window.innerHeight || document.documentElement.clientHeight);
  out.right = bounding.right > (window.innerWidth || document.documentElement.clientWidth);
  out.any = out.top || out.left || out.bottom || out.right;

  return out;
}

function debounce$1(func, wait, immediate) {
  let timeout;

  return function executedFunction() {
    let context = this;
    let args = arguments;
	    
    let later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    let callNow = immediate && !timeout;
	
    clearTimeout(timeout);

    timeout = setTimeout(later, wait);
	
    if (callNow) func.apply(context, args);
  };
}

/* node_modules\svelte-select\src\Select.svelte generated by Svelte v3.24.1 */

function create_if_block_7(ctx) {
	let switch_instance;
	let switch_instance_anchor;
	let current;
	const switch_instance_spread_levels = [/*iconProps*/ ctx[17]];
	var switch_value = /*Icon*/ ctx[16];

	function switch_props(ctx) {
		let switch_instance_props = {};

		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
		}

		return { props: switch_instance_props };
	}

	if (switch_value) {
		switch_instance = new switch_value(switch_props());
	}

	return {
		c() {
			if (switch_instance) create_component(switch_instance.$$.fragment);
			switch_instance_anchor = empty();
		},
		l(nodes) {
			if (switch_instance) claim_component(switch_instance.$$.fragment, nodes);
			switch_instance_anchor = empty();
		},
		m(target, anchor) {
			if (switch_instance) {
				mount_component(switch_instance, target, anchor);
			}

			insert(target, switch_instance_anchor, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const switch_instance_changes = (dirty[0] & /*iconProps*/ 131072)
			? get_spread_update(switch_instance_spread_levels, [get_spread_object(/*iconProps*/ ctx[17])])
			: {};

			if (switch_value !== (switch_value = /*Icon*/ ctx[16])) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props());
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}
		},
		i(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(switch_instance_anchor);
			if (switch_instance) destroy_component(switch_instance, detaching);
		}
	};
}

// (726:2) {#if isMulti && selectedValue && selectedValue.length > 0}
function create_if_block_6(ctx) {
	let switch_instance;
	let switch_instance_anchor;
	let current;
	var switch_value = /*MultiSelection*/ ctx[7];

	function switch_props(ctx) {
		return {
			props: {
				selectedValue: /*selectedValue*/ ctx[3],
				getSelectionLabel: /*getSelectionLabel*/ ctx[12],
				activeSelectedValue: /*activeSelectedValue*/ ctx[23],
				isDisabled: /*isDisabled*/ ctx[9]
			}
		};
	}

	if (switch_value) {
		switch_instance = new switch_value(switch_props(ctx));
		switch_instance.$on("multiItemClear", /*handleMultiItemClear*/ ctx[27]);
		switch_instance.$on("focus", /*handleFocus*/ ctx[30]);
	}

	return {
		c() {
			if (switch_instance) create_component(switch_instance.$$.fragment);
			switch_instance_anchor = empty();
		},
		l(nodes) {
			if (switch_instance) claim_component(switch_instance.$$.fragment, nodes);
			switch_instance_anchor = empty();
		},
		m(target, anchor) {
			if (switch_instance) {
				mount_component(switch_instance, target, anchor);
			}

			insert(target, switch_instance_anchor, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const switch_instance_changes = {};
			if (dirty[0] & /*selectedValue*/ 8) switch_instance_changes.selectedValue = /*selectedValue*/ ctx[3];
			if (dirty[0] & /*getSelectionLabel*/ 4096) switch_instance_changes.getSelectionLabel = /*getSelectionLabel*/ ctx[12];
			if (dirty[0] & /*activeSelectedValue*/ 8388608) switch_instance_changes.activeSelectedValue = /*activeSelectedValue*/ ctx[23];
			if (dirty[0] & /*isDisabled*/ 512) switch_instance_changes.isDisabled = /*isDisabled*/ ctx[9];

			if (switch_value !== (switch_value = /*MultiSelection*/ ctx[7])) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props(ctx));
					switch_instance.$on("multiItemClear", /*handleMultiItemClear*/ ctx[27]);
					switch_instance.$on("focus", /*handleFocus*/ ctx[30]);
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}
		},
		i(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(switch_instance_anchor);
			if (switch_instance) destroy_component(switch_instance, detaching);
		}
	};
}

// (746:2) {:else}
function create_else_block_1$1(ctx) {
	let input_1;
	let mounted;
	let dispose;

	let input_1_levels = [
		/*_inputAttributes*/ ctx[24],
		{ placeholder: /*placeholderText*/ ctx[26] },
		{ style: /*inputStyles*/ ctx[14] }
	];

	let input_1_data = {};

	for (let i = 0; i < input_1_levels.length; i += 1) {
		input_1_data = assign(input_1_data, input_1_levels[i]);
	}

	return {
		c() {
			input_1 = element("input");
			this.h();
		},
		l(nodes) {
			input_1 = claim_element(nodes, "INPUT", { placeholder: true, style: true });
			this.h();
		},
		h() {
			set_attributes(input_1, input_1_data);
			toggle_class(input_1, "svelte-2eeumy", true);
		},
		m(target, anchor) {
			insert(target, input_1, anchor);
			/*input_1_binding_1*/ ctx[60](input_1);
			set_input_value(input_1, /*filterText*/ ctx[4]);

			if (!mounted) {
				dispose = [
					listen(input_1, "focus", /*handleFocus*/ ctx[30]),
					listen(input_1, "input", /*input_1_input_handler_1*/ ctx[61])
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			set_attributes(input_1, input_1_data = get_spread_update(input_1_levels, [
				dirty[0] & /*_inputAttributes*/ 16777216 && /*_inputAttributes*/ ctx[24],
				dirty[0] & /*placeholderText*/ 67108864 && { placeholder: /*placeholderText*/ ctx[26] },
				dirty[0] & /*inputStyles*/ 16384 && { style: /*inputStyles*/ ctx[14] }
			]));

			if (dirty[0] & /*filterText*/ 16 && input_1.value !== /*filterText*/ ctx[4]) {
				set_input_value(input_1, /*filterText*/ ctx[4]);
			}

			toggle_class(input_1, "svelte-2eeumy", true);
		},
		d(detaching) {
			if (detaching) detach(input_1);
			/*input_1_binding_1*/ ctx[60](null);
			mounted = false;
			run_all(dispose);
		}
	};
}

// (737:2) {#if isDisabled}
function create_if_block_5(ctx) {
	let input_1;
	let mounted;
	let dispose;

	let input_1_levels = [
		/*_inputAttributes*/ ctx[24],
		{ placeholder: /*placeholderText*/ ctx[26] },
		{ style: /*inputStyles*/ ctx[14] },
		{ disabled: true }
	];

	let input_1_data = {};

	for (let i = 0; i < input_1_levels.length; i += 1) {
		input_1_data = assign(input_1_data, input_1_levels[i]);
	}

	return {
		c() {
			input_1 = element("input");
			this.h();
		},
		l(nodes) {
			input_1 = claim_element(nodes, "INPUT", {
				placeholder: true,
				style: true,
				disabled: true
			});

			this.h();
		},
		h() {
			set_attributes(input_1, input_1_data);
			toggle_class(input_1, "svelte-2eeumy", true);
		},
		m(target, anchor) {
			insert(target, input_1, anchor);
			/*input_1_binding*/ ctx[58](input_1);
			set_input_value(input_1, /*filterText*/ ctx[4]);

			if (!mounted) {
				dispose = [
					listen(input_1, "focus", /*handleFocus*/ ctx[30]),
					listen(input_1, "input", /*input_1_input_handler*/ ctx[59])
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			set_attributes(input_1, input_1_data = get_spread_update(input_1_levels, [
				dirty[0] & /*_inputAttributes*/ 16777216 && /*_inputAttributes*/ ctx[24],
				dirty[0] & /*placeholderText*/ 67108864 && { placeholder: /*placeholderText*/ ctx[26] },
				dirty[0] & /*inputStyles*/ 16384 && { style: /*inputStyles*/ ctx[14] },
				{ disabled: true }
			]));

			if (dirty[0] & /*filterText*/ 16 && input_1.value !== /*filterText*/ ctx[4]) {
				set_input_value(input_1, /*filterText*/ ctx[4]);
			}

			toggle_class(input_1, "svelte-2eeumy", true);
		},
		d(detaching) {
			if (detaching) detach(input_1);
			/*input_1_binding*/ ctx[58](null);
			mounted = false;
			run_all(dispose);
		}
	};
}

// (756:2) {#if !isMulti && showSelectedItem}
function create_if_block_4(ctx) {
	let div;
	let switch_instance;
	let current;
	let mounted;
	let dispose;
	var switch_value = /*Selection*/ ctx[6];

	function switch_props(ctx) {
		return {
			props: {
				item: /*selectedValue*/ ctx[3],
				getSelectionLabel: /*getSelectionLabel*/ ctx[12]
			}
		};
	}

	if (switch_value) {
		switch_instance = new switch_value(switch_props(ctx));
	}

	return {
		c() {
			div = element("div");
			if (switch_instance) create_component(switch_instance.$$.fragment);
			this.h();
		},
		l(nodes) {
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);
			if (switch_instance) claim_component(switch_instance.$$.fragment, div_nodes);
			div_nodes.forEach(detach);
			this.h();
		},
		h() {
			attr(div, "class", "selectedItem svelte-2eeumy");
		},
		m(target, anchor) {
			insert(target, div, anchor);

			if (switch_instance) {
				mount_component(switch_instance, div, null);
			}

			current = true;

			if (!mounted) {
				dispose = listen(div, "focus", /*handleFocus*/ ctx[30]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			const switch_instance_changes = {};
			if (dirty[0] & /*selectedValue*/ 8) switch_instance_changes.item = /*selectedValue*/ ctx[3];
			if (dirty[0] & /*getSelectionLabel*/ 4096) switch_instance_changes.getSelectionLabel = /*getSelectionLabel*/ ctx[12];

			if (switch_value !== (switch_value = /*Selection*/ ctx[6])) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props(ctx));
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, div, null);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}
		},
		i(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			if (switch_instance) destroy_component(switch_instance);
			mounted = false;
			dispose();
		}
	};
}

// (765:2) {#if showSelectedItem && isClearable && !isDisabled && !isWaiting}
function create_if_block_3$1(ctx) {
	let div;
	let svg;
	let path;
	let mounted;
	let dispose;

	return {
		c() {
			div = element("div");
			svg = svg_element("svg");
			path = svg_element("path");
			this.h();
		},
		l(nodes) {
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);

			svg = claim_element(
				div_nodes,
				"svg",
				{
					width: true,
					height: true,
					viewBox: true,
					focusable: true,
					role: true,
					class: true
				},
				1
			);

			var svg_nodes = children(svg);
			path = claim_element(svg_nodes, "path", { fill: true, d: true }, 1);
			children(path).forEach(detach);
			svg_nodes.forEach(detach);
			div_nodes.forEach(detach);
			this.h();
		},
		h() {
			attr(path, "fill", "currentColor");
			attr(path, "d", "M34.923,37.251L24,26.328L13.077,37.251L9.436,33.61l10.923-10.923L9.436,11.765l3.641-3.641L24,19.047L34.923,8.124\n          l3.641,3.641L27.641,22.688L38.564,33.61L34.923,37.251z");
			attr(svg, "width", "100%");
			attr(svg, "height", "100%");
			attr(svg, "viewBox", "-2 -2 50 50");
			attr(svg, "focusable", "false");
			attr(svg, "role", "presentation");
			attr(svg, "class", "svelte-2eeumy");
			attr(div, "class", "clearSelect svelte-2eeumy");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, svg);
			append(svg, path);

			if (!mounted) {
				dispose = listen(div, "click", prevent_default(/*handleClear*/ ctx[22]));
				mounted = true;
			}
		},
		p: noop,
		d(detaching) {
			if (detaching) detach(div);
			mounted = false;
			dispose();
		}
	};
}

// (781:2) {#if showIndicator || (showChevron && !selectedValue || (!isSearchable && !isDisabled && !isWaiting && ((showSelectedItem && !isClearable) || !showSelectedItem)))}
function create_if_block_1$2(ctx) {
	let div;

	function select_block_type_1(ctx, dirty) {
		if (/*indicatorSvg*/ ctx[21]) return create_if_block_2$2;
		return create_else_block$2;
	}

	let current_block_type = select_block_type_1(ctx);
	let if_block = current_block_type(ctx);

	return {
		c() {
			div = element("div");
			if_block.c();
			this.h();
		},
		l(nodes) {
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);
			if_block.l(div_nodes);
			div_nodes.forEach(detach);
			this.h();
		},
		h() {
			attr(div, "class", "indicator svelte-2eeumy");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			if_block.m(div, null);
		},
		p(ctx, dirty) {
			if (current_block_type === (current_block_type = select_block_type_1(ctx)) && if_block) {
				if_block.p(ctx, dirty);
			} else {
				if_block.d(1);
				if_block = current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(div, null);
				}
			}
		},
		d(detaching) {
			if (detaching) detach(div);
			if_block.d();
		}
	};
}

// (785:6) {:else}
function create_else_block$2(ctx) {
	let svg;
	let path;

	return {
		c() {
			svg = svg_element("svg");
			path = svg_element("path");
			this.h();
		},
		l(nodes) {
			svg = claim_element(
				nodes,
				"svg",
				{
					width: true,
					height: true,
					viewBox: true,
					focusable: true,
					class: true
				},
				1
			);

			var svg_nodes = children(svg);
			path = claim_element(svg_nodes, "path", { d: true }, 1);
			children(path).forEach(detach);
			svg_nodes.forEach(detach);
			this.h();
		},
		h() {
			attr(path, "d", "M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747\n            3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0\n            1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502\n            0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0\n            0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z");
			attr(svg, "width", "100%");
			attr(svg, "height", "100%");
			attr(svg, "viewBox", "0 0 20 20");
			attr(svg, "focusable", "false");
			attr(svg, "class", "svelte-2eeumy");
		},
		m(target, anchor) {
			insert(target, svg, anchor);
			append(svg, path);
		},
		p: noop,
		d(detaching) {
			if (detaching) detach(svg);
		}
	};
}

// (783:6) {#if indicatorSvg}
function create_if_block_2$2(ctx) {
	let html_tag;
	let html_anchor;

	return {
		c() {
			html_anchor = empty();
			this.h();
		},
		l(nodes) {
			html_anchor = empty();
			this.h();
		},
		h() {
			html_tag = new HtmlTag(html_anchor);
		},
		m(target, anchor) {
			html_tag.m(/*indicatorSvg*/ ctx[21], target, anchor);
			insert(target, html_anchor, anchor);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*indicatorSvg*/ 2097152) html_tag.p(/*indicatorSvg*/ ctx[21]);
		},
		d(detaching) {
			if (detaching) detach(html_anchor);
			if (detaching) html_tag.d();
		}
	};
}

// (802:2) {#if isWaiting}
function create_if_block$4(ctx) {
	let div;
	let svg;
	let circle;

	return {
		c() {
			div = element("div");
			svg = svg_element("svg");
			circle = svg_element("circle");
			this.h();
		},
		l(nodes) {
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);
			svg = claim_element(div_nodes, "svg", { class: true, viewBox: true }, 1);
			var svg_nodes = children(svg);

			circle = claim_element(
				svg_nodes,
				"circle",
				{
					class: true,
					cx: true,
					cy: true,
					r: true,
					fill: true,
					stroke: true,
					"stroke-width": true,
					"stroke-miterlimit": true
				},
				1
			);

			children(circle).forEach(detach);
			svg_nodes.forEach(detach);
			div_nodes.forEach(detach);
			this.h();
		},
		h() {
			attr(circle, "class", "spinner_path svelte-2eeumy");
			attr(circle, "cx", "50");
			attr(circle, "cy", "50");
			attr(circle, "r", "20");
			attr(circle, "fill", "none");
			attr(circle, "stroke", "currentColor");
			attr(circle, "stroke-width", "5");
			attr(circle, "stroke-miterlimit", "10");
			attr(svg, "class", "spinner_icon svelte-2eeumy");
			attr(svg, "viewBox", "25 25 50 50");
			attr(div, "class", "spinner svelte-2eeumy");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, svg);
			append(svg, circle);
		},
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

function create_fragment$7(ctx) {
	let div;
	let t0;
	let t1;
	let t2;
	let t3;
	let t4;
	let t5;
	let div_class_value;
	let current;
	let mounted;
	let dispose;
	let if_block0 = /*Icon*/ ctx[16] && create_if_block_7(ctx);
	let if_block1 = /*isMulti*/ ctx[8] && /*selectedValue*/ ctx[3] && /*selectedValue*/ ctx[3].length > 0 && create_if_block_6(ctx);

	function select_block_type(ctx, dirty) {
		if (/*isDisabled*/ ctx[9]) return create_if_block_5;
		return create_else_block_1$1;
	}

	let current_block_type = select_block_type(ctx);
	let if_block2 = current_block_type(ctx);
	let if_block3 = !/*isMulti*/ ctx[8] && /*showSelectedItem*/ ctx[25] && create_if_block_4(ctx);
	let if_block4 = /*showSelectedItem*/ ctx[25] && /*isClearable*/ ctx[15] && !/*isDisabled*/ ctx[9] && !/*isWaiting*/ ctx[5] && create_if_block_3$1(ctx);
	let if_block5 = (/*showIndicator*/ ctx[19] || (/*showChevron*/ ctx[18] && !/*selectedValue*/ ctx[3] || !/*isSearchable*/ ctx[13] && !/*isDisabled*/ ctx[9] && !/*isWaiting*/ ctx[5] && (/*showSelectedItem*/ ctx[25] && !/*isClearable*/ ctx[15] || !/*showSelectedItem*/ ctx[25]))) && create_if_block_1$2(ctx);
	let if_block6 = /*isWaiting*/ ctx[5] && create_if_block$4();

	return {
		c() {
			div = element("div");
			if (if_block0) if_block0.c();
			t0 = space();
			if (if_block1) if_block1.c();
			t1 = space();
			if_block2.c();
			t2 = space();
			if (if_block3) if_block3.c();
			t3 = space();
			if (if_block4) if_block4.c();
			t4 = space();
			if (if_block5) if_block5.c();
			t5 = space();
			if (if_block6) if_block6.c();
			this.h();
		},
		l(nodes) {
			div = claim_element(nodes, "DIV", { class: true, style: true });
			var div_nodes = children(div);
			if (if_block0) if_block0.l(div_nodes);
			t0 = claim_space(div_nodes);
			if (if_block1) if_block1.l(div_nodes);
			t1 = claim_space(div_nodes);
			if_block2.l(div_nodes);
			t2 = claim_space(div_nodes);
			if (if_block3) if_block3.l(div_nodes);
			t3 = claim_space(div_nodes);
			if (if_block4) if_block4.l(div_nodes);
			t4 = claim_space(div_nodes);
			if (if_block5) if_block5.l(div_nodes);
			t5 = claim_space(div_nodes);
			if (if_block6) if_block6.l(div_nodes);
			div_nodes.forEach(detach);
			this.h();
		},
		h() {
			attr(div, "class", div_class_value = "selectContainer " + /*containerClasses*/ ctx[20] + " svelte-2eeumy");
			attr(div, "style", /*containerStyles*/ ctx[11]);
			toggle_class(div, "hasError", /*hasError*/ ctx[10]);
			toggle_class(div, "multiSelect", /*isMulti*/ ctx[8]);
			toggle_class(div, "disabled", /*isDisabled*/ ctx[9]);
			toggle_class(div, "focused", /*isFocused*/ ctx[2]);
		},
		m(target, anchor) {
			insert(target, div, anchor);
			if (if_block0) if_block0.m(div, null);
			append(div, t0);
			if (if_block1) if_block1.m(div, null);
			append(div, t1);
			if_block2.m(div, null);
			append(div, t2);
			if (if_block3) if_block3.m(div, null);
			append(div, t3);
			if (if_block4) if_block4.m(div, null);
			append(div, t4);
			if (if_block5) if_block5.m(div, null);
			append(div, t5);
			if (if_block6) if_block6.m(div, null);
			/*div_binding*/ ctx[62](div);
			current = true;

			if (!mounted) {
				dispose = [
					listen(window, "click", /*handleWindowClick*/ ctx[31]),
					listen(window, "keydown", /*handleKeyDown*/ ctx[29]),
					listen(window, "resize", /*getPosition*/ ctx[28]),
					listen(div, "click", /*handleClick*/ ctx[32])
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (/*Icon*/ ctx[16]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);

					if (dirty[0] & /*Icon*/ 65536) {
						transition_in(if_block0, 1);
					}
				} else {
					if_block0 = create_if_block_7(ctx);
					if_block0.c();
					transition_in(if_block0, 1);
					if_block0.m(div, t0);
				}
			} else if (if_block0) {
				group_outros();

				transition_out(if_block0, 1, 1, () => {
					if_block0 = null;
				});

				check_outros();
			}

			if (/*isMulti*/ ctx[8] && /*selectedValue*/ ctx[3] && /*selectedValue*/ ctx[3].length > 0) {
				if (if_block1) {
					if_block1.p(ctx, dirty);

					if (dirty[0] & /*isMulti, selectedValue*/ 264) {
						transition_in(if_block1, 1);
					}
				} else {
					if_block1 = create_if_block_6(ctx);
					if_block1.c();
					transition_in(if_block1, 1);
					if_block1.m(div, t1);
				}
			} else if (if_block1) {
				group_outros();

				transition_out(if_block1, 1, 1, () => {
					if_block1 = null;
				});

				check_outros();
			}

			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block2) {
				if_block2.p(ctx, dirty);
			} else {
				if_block2.d(1);
				if_block2 = current_block_type(ctx);

				if (if_block2) {
					if_block2.c();
					if_block2.m(div, t2);
				}
			}

			if (!/*isMulti*/ ctx[8] && /*showSelectedItem*/ ctx[25]) {
				if (if_block3) {
					if_block3.p(ctx, dirty);

					if (dirty[0] & /*isMulti, showSelectedItem*/ 33554688) {
						transition_in(if_block3, 1);
					}
				} else {
					if_block3 = create_if_block_4(ctx);
					if_block3.c();
					transition_in(if_block3, 1);
					if_block3.m(div, t3);
				}
			} else if (if_block3) {
				group_outros();

				transition_out(if_block3, 1, 1, () => {
					if_block3 = null;
				});

				check_outros();
			}

			if (/*showSelectedItem*/ ctx[25] && /*isClearable*/ ctx[15] && !/*isDisabled*/ ctx[9] && !/*isWaiting*/ ctx[5]) {
				if (if_block4) {
					if_block4.p(ctx, dirty);
				} else {
					if_block4 = create_if_block_3$1(ctx);
					if_block4.c();
					if_block4.m(div, t4);
				}
			} else if (if_block4) {
				if_block4.d(1);
				if_block4 = null;
			}

			if (/*showIndicator*/ ctx[19] || (/*showChevron*/ ctx[18] && !/*selectedValue*/ ctx[3] || !/*isSearchable*/ ctx[13] && !/*isDisabled*/ ctx[9] && !/*isWaiting*/ ctx[5] && (/*showSelectedItem*/ ctx[25] && !/*isClearable*/ ctx[15] || !/*showSelectedItem*/ ctx[25]))) {
				if (if_block5) {
					if_block5.p(ctx, dirty);
				} else {
					if_block5 = create_if_block_1$2(ctx);
					if_block5.c();
					if_block5.m(div, t5);
				}
			} else if (if_block5) {
				if_block5.d(1);
				if_block5 = null;
			}

			if (/*isWaiting*/ ctx[5]) {
				if (if_block6) ; else {
					if_block6 = create_if_block$4();
					if_block6.c();
					if_block6.m(div, null);
				}
			} else if (if_block6) {
				if_block6.d(1);
				if_block6 = null;
			}

			if (!current || dirty[0] & /*containerClasses*/ 1048576 && div_class_value !== (div_class_value = "selectContainer " + /*containerClasses*/ ctx[20] + " svelte-2eeumy")) {
				attr(div, "class", div_class_value);
			}

			if (!current || dirty[0] & /*containerStyles*/ 2048) {
				attr(div, "style", /*containerStyles*/ ctx[11]);
			}

			if (dirty[0] & /*containerClasses, hasError*/ 1049600) {
				toggle_class(div, "hasError", /*hasError*/ ctx[10]);
			}

			if (dirty[0] & /*containerClasses, isMulti*/ 1048832) {
				toggle_class(div, "multiSelect", /*isMulti*/ ctx[8]);
			}

			if (dirty[0] & /*containerClasses, isDisabled*/ 1049088) {
				toggle_class(div, "disabled", /*isDisabled*/ ctx[9]);
			}

			if (dirty[0] & /*containerClasses, isFocused*/ 1048580) {
				toggle_class(div, "focused", /*isFocused*/ ctx[2]);
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block0);
			transition_in(if_block1);
			transition_in(if_block3);
			current = true;
		},
		o(local) {
			transition_out(if_block0);
			transition_out(if_block1);
			transition_out(if_block3);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d();
			if_block2.d();
			if (if_block3) if_block3.d();
			if (if_block4) if_block4.d();
			if (if_block5) if_block5.d();
			if (if_block6) if_block6.d();
			/*div_binding*/ ctx[62](null);
			mounted = false;
			run_all(dispose);
		}
	};
}

function instance$7($$self, $$props, $$invalidate) {
	var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
		function adopt(value) {
			return value instanceof P
			? value
			: new P(function (resolve) {
						resolve(value);
					});
		}

		return new (P || (P = Promise))(function (resolve, reject) {
				function fulfilled(value) {
					try {
						step(generator.next(value));
					} catch(e) {
						reject(e);
					}
				}

				function rejected(value) {
					try {
						step(generator["throw"](value));
					} catch(e) {
						reject(e);
					}
				}

				function step(result) {
					result.done
					? resolve(result.value)
					: adopt(result.value).then(fulfilled, rejected);
				}

				step((generator = generator.apply(thisArg, _arguments || [])).next());
			});
	};

	const dispatch = createEventDispatcher();
	let { container = undefined } = $$props;
	let { input = undefined } = $$props;
	let { Item: Item$1 = Item } = $$props;
	let { Selection: Selection$1 = Selection } = $$props;
	let { MultiSelection: MultiSelection$1 = MultiSelection } = $$props;
	let { isMulti = false } = $$props;
	let { isDisabled = false } = $$props;
	let { isCreatable = false } = $$props;
	let { isFocused = false } = $$props;
	let { selectedValue = undefined } = $$props;
	let { filterText = "" } = $$props;
	let { placeholder = "Select..." } = $$props;
	let { items = [] } = $$props;
	let { itemFilter = (label, filterText, option) => label.toLowerCase().includes(filterText.toLowerCase()) } = $$props;
	let { groupBy = undefined } = $$props;
	let { groupFilter = groups => groups } = $$props;
	let { isGroupHeaderSelectable = false } = $$props;

	let { getGroupHeaderLabel = option => {
		return option.label;
	} } = $$props;

	let { getOptionLabel = (option, filterText) => {
		return option.isCreator
		? `Create \"${filterText}\"`
		: option.label;
	} } = $$props;

	let { optionIdentifier = "value" } = $$props;
	let { loadOptions = undefined } = $$props;
	let { hasError = false } = $$props;
	let { containerStyles = "" } = $$props;

	let { getSelectionLabel = option => {
		if (option) return option.label;
	} } = $$props;

	let { createGroupHeaderItem = groupValue => {
		return { value: groupValue, label: groupValue };
	} } = $$props;

	let { createItem = filterText => {
		return { value: filterText, label: filterText };
	} } = $$props;

	let { isSearchable = true } = $$props;
	let { inputStyles = "" } = $$props;
	let { isClearable = true } = $$props;
	let { isWaiting = false } = $$props;
	let { listPlacement = "auto" } = $$props;
	let { listOpen = false } = $$props;
	let { list = undefined } = $$props;
	let { isVirtualList = false } = $$props;
	let { loadOptionsInterval = 300 } = $$props;
	let { noOptionsMessage = "No options" } = $$props;
	let { hideEmptyState = false } = $$props;
	let { filteredItems = [] } = $$props;
	let { inputAttributes = {} } = $$props;
	let { listAutoWidth = true } = $$props;
	let { itemHeight = 40 } = $$props;
	let { Icon = undefined } = $$props;
	let { iconProps = {} } = $$props;
	let { showChevron = false } = $$props;
	let { showIndicator = false } = $$props;
	let { containerClasses = "" } = $$props;
	let { indicatorSvg = undefined } = $$props;
	let target;
	let activeSelectedValue;
	let originalItemsClone;
	let prev_selectedValue;
	let prev_listOpen;
	let prev_filterText;
	let prev_isFocused;
	let prev_filteredItems;

	function resetFilter() {
		return __awaiter(this, void 0, void 0, function* () {
			yield tick();
			$$invalidate(4, filterText = "");
		});
	}

	let getItemsHasInvoked = false;

	const getItems = debounce$1(
		() => __awaiter(void 0, void 0, void 0, function* () {
			getItemsHasInvoked = true;
			$$invalidate(5, isWaiting = true);
			$$invalidate(33, items = yield loadOptions(filterText));
			$$invalidate(5, isWaiting = false);
			$$invalidate(2, isFocused = true);
			$$invalidate(34, listOpen = true);
		}),
		loadOptionsInterval
	);

	let _inputAttributes = {};

	beforeUpdate(() => {
		if (isMulti && selectedValue && selectedValue.length > 1) {
			checkSelectedValueForDuplicates();
		}

		if (!isMulti && selectedValue && prev_selectedValue !== selectedValue) {
			if (!prev_selectedValue || JSON.stringify(selectedValue[optionIdentifier]) !== JSON.stringify(prev_selectedValue[optionIdentifier])) {
				dispatch("select", selectedValue);
			}
		}

		if (isMulti && JSON.stringify(selectedValue) !== JSON.stringify(prev_selectedValue)) {
			if (checkSelectedValueForDuplicates()) {
				dispatch("select", selectedValue);
			}
		}

		if (container && listOpen !== prev_listOpen) {
			if (listOpen) {
				loadList();
			} else {
				removeList();
			}
		}

		if (filterText !== prev_filterText) {
			if (filterText.length > 0) {
				$$invalidate(2, isFocused = true);
				$$invalidate(34, listOpen = true);

				if (loadOptions) {
					getItems();
				} else {
					loadList();
					$$invalidate(34, listOpen = true);

					if (isMulti) {
						$$invalidate(23, activeSelectedValue = undefined);
					}
				}
			} else {
				setList([]);
			}

			if (list) {
				list.$set({ filterText });
			}
		}

		if (isFocused !== prev_isFocused) {
			if (isFocused || listOpen) {
				handleFocus();
			} else {
				resetFilter();
				if (input) input.blur();
			}
		}

		if (prev_filteredItems !== filteredItems) {
			let _filteredItems = [...filteredItems];

			if (isCreatable && filterText) {
				const itemToCreate = createItem(filterText);
				itemToCreate.isCreator = true;

				const existingItemWithFilterValue = _filteredItems.find(item => {
					return item[optionIdentifier] === itemToCreate[optionIdentifier];
				});

				let existingSelectionWithFilterValue;

				if (selectedValue) {
					if (isMulti) {
						existingSelectionWithFilterValue = selectedValue.find(selection => {
							return selection[optionIdentifier] === itemToCreate[optionIdentifier];
						});
					} else if (selectedValue[optionIdentifier] === itemToCreate[optionIdentifier]) {
						existingSelectionWithFilterValue = selectedValue;
					}
				}

				if (!existingItemWithFilterValue && !existingSelectionWithFilterValue) {
					_filteredItems = [..._filteredItems, itemToCreate];
				}
			}

			setList(_filteredItems);
		}

		prev_selectedValue = selectedValue;
		prev_listOpen = listOpen;
		prev_filterText = filterText;
		prev_isFocused = isFocused;
		prev_filteredItems = filteredItems;
	});

	function checkSelectedValueForDuplicates() {
		let noDuplicates = true;

		if (selectedValue) {
			const ids = [];
			const uniqueValues = [];

			selectedValue.forEach(val => {
				if (!ids.includes(val[optionIdentifier])) {
					ids.push(val[optionIdentifier]);
					uniqueValues.push(val);
				} else {
					noDuplicates = false;
				}
			});

			if (!noDuplicates) $$invalidate(3, selectedValue = uniqueValues);
		}

		return noDuplicates;
	}

	function setList(items) {
		return __awaiter(this, void 0, void 0, function* () {
			yield tick();
			if (list) return list.$set({ items });
			if (loadOptions && getItemsHasInvoked && items.length > 0) loadList();
		});
	}

	function handleMultiItemClear(event) {
		const { detail } = event;
		const itemToRemove = selectedValue[detail ? detail.i : selectedValue.length - 1];

		if (selectedValue.length === 1) {
			$$invalidate(3, selectedValue = undefined);
		} else {
			$$invalidate(3, selectedValue = selectedValue.filter(item => {
				return item !== itemToRemove;
			}));
		}

		dispatch("clear", itemToRemove);
		getPosition();
	}

	function getPosition() {
		return __awaiter(this, void 0, void 0, function* () {
			yield tick();
			if (!target || !container) return;
			const { top, height, width } = container.getBoundingClientRect();
			target.style["min-width"] = `${width}px`;
			target.style.width = `${listAutoWidth ? "auto" : "100%"}`;
			target.style.left = "0";

			if (listPlacement === "top") {
				target.style.bottom = `${height + 5}px`;
			} else {
				target.style.top = `${height + 5}px`;
			}

			target = target;

			if (listPlacement === "auto" && isOutOfViewport(target).bottom) {
				target.style.top = ``;
				target.style.bottom = `${height + 5}px`;
			}

			target.style.visibility = "";
		});
	}

	function handleKeyDown(e) {
		if (!isFocused) return;

		switch (e.key) {
			case "ArrowDown":
				e.preventDefault();
				$$invalidate(34, listOpen = true);
				$$invalidate(23, activeSelectedValue = undefined);
				break;
			case "ArrowUp":
				e.preventDefault();
				$$invalidate(34, listOpen = true);
				$$invalidate(23, activeSelectedValue = undefined);
				break;
			case "Tab":
				if (!listOpen) $$invalidate(2, isFocused = false);
				break;
			case "Backspace":
				if (!isMulti || filterText.length > 0) return;
				if (isMulti && selectedValue && selectedValue.length > 0) {
					handleMultiItemClear(activeSelectedValue !== undefined
					? activeSelectedValue
					: selectedValue.length - 1);

					if (activeSelectedValue === 0 || activeSelectedValue === undefined) break;

					$$invalidate(23, activeSelectedValue = selectedValue.length > activeSelectedValue
					? activeSelectedValue - 1
					: undefined);
				}
				break;
			case "ArrowLeft":
				if (list) list.$set({ hoverItemIndex: -1 });
				if (!isMulti || filterText.length > 0) return;
				if (activeSelectedValue === undefined) {
					$$invalidate(23, activeSelectedValue = selectedValue.length - 1);
				} else if (selectedValue.length > activeSelectedValue && activeSelectedValue !== 0) {
					$$invalidate(23, activeSelectedValue -= 1);
				}
				break;
			case "ArrowRight":
				if (list) list.$set({ hoverItemIndex: -1 });
				if (!isMulti || filterText.length > 0 || activeSelectedValue === undefined) return;
				if (activeSelectedValue === selectedValue.length - 1) {
					$$invalidate(23, activeSelectedValue = undefined);
				} else if (activeSelectedValue < selectedValue.length - 1) {
					$$invalidate(23, activeSelectedValue += 1);
				}
				break;
		}
	}

	function handleFocus() {
		$$invalidate(2, isFocused = true);
		if (input) input.focus();
	}

	function removeList() {
		resetFilter();
		$$invalidate(23, activeSelectedValue = undefined);
		if (!list) return;
		list.$destroy();
		$$invalidate(35, list = undefined);
		if (!target) return;
		if (target.parentNode) target.parentNode.removeChild(target);
		target = undefined;
		$$invalidate(35, list);
		target = target;
	}

	function handleWindowClick(event) {
		if (!container) return;

		const eventTarget = event.path && event.path.length > 0
		? event.path[0]
		: event.target;

		if (container.contains(eventTarget)) return;
		$$invalidate(2, isFocused = false);
		$$invalidate(34, listOpen = false);
		$$invalidate(23, activeSelectedValue = undefined);
		if (input) input.blur();
	}

	function handleClick() {
		if (isDisabled) return;
		$$invalidate(2, isFocused = true);
		$$invalidate(34, listOpen = !listOpen);
	}

	function handleClear() {
		$$invalidate(3, selectedValue = undefined);
		$$invalidate(34, listOpen = false);
		dispatch("clear", selectedValue);
		handleFocus();
	}

	function loadList() {
		return __awaiter(this, void 0, void 0, function* () {
			yield tick();
			if (target && list) return;

			const data = {
				Item: Item$1,
				filterText,
				optionIdentifier,
				noOptionsMessage,
				hideEmptyState,
				isVirtualList,
				selectedValue,
				isMulti,
				getGroupHeaderLabel,
				items: filteredItems,
				itemHeight
			};

			if (getOptionLabel) {
				data.getOptionLabel = getOptionLabel;
			}

			target = document.createElement("div");

			Object.assign(target.style, {
				position: "absolute",
				"z-index": 2,
				visibility: "hidden"
			});

			$$invalidate(35, list);
			target = target;
			if (container) container.appendChild(target);
			$$invalidate(35, list = new List({ target, props: data }));

			list.$on("itemSelected", event => {
				const { detail } = event;

				if (detail) {
					const item = Object.assign({}, detail);

					if (!item.isGroupHeader || item.isSelectable) {
						if (isMulti) {
							$$invalidate(3, selectedValue = selectedValue ? selectedValue.concat([item]) : [item]);
						} else {
							$$invalidate(3, selectedValue = item);
						}

						resetFilter();
						(($$invalidate(3, selectedValue), $$invalidate(46, optionIdentifier)), $$invalidate(8, isMulti));

						setTimeout(() => {
							$$invalidate(34, listOpen = false);
							$$invalidate(23, activeSelectedValue = undefined);
						});
					}
				}
			});

			list.$on("itemCreated", event => {
				const { detail } = event;

				if (isMulti) {
					$$invalidate(3, selectedValue = selectedValue || []);
					$$invalidate(3, selectedValue = [...selectedValue, createItem(detail)]);
				} else {
					$$invalidate(3, selectedValue = createItem(detail));
				}

				$$invalidate(4, filterText = "");
				$$invalidate(34, listOpen = false);
				$$invalidate(23, activeSelectedValue = undefined);
				resetFilter();
			});

			list.$on("closeList", () => {
				$$invalidate(34, listOpen = false);
			});

			($$invalidate(35, list), target = target);
			getPosition();
		});
	}

	onMount(() => {
		if (isFocused) input.focus();
		if (listOpen) loadList();

		if (items && items.length > 0) {
			$$invalidate(64, originalItemsClone = JSON.stringify(items));
		}
	});

	onDestroy(() => {
		removeList();
	});

	function input_1_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			input = $$value;
			$$invalidate(1, input);
		});
	}

	function input_1_input_handler() {
		filterText = this.value;
		$$invalidate(4, filterText);
	}

	function input_1_binding_1($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			input = $$value;
			$$invalidate(1, input);
		});
	}

	function input_1_input_handler_1() {
		filterText = this.value;
		$$invalidate(4, filterText);
	}

	function div_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			container = $$value;
			$$invalidate(0, container);
		});
	}

	$$self.$$set = $$props => {
		if ("container" in $$props) $$invalidate(0, container = $$props.container);
		if ("input" in $$props) $$invalidate(1, input = $$props.input);
		if ("Item" in $$props) $$invalidate(37, Item$1 = $$props.Item);
		if ("Selection" in $$props) $$invalidate(6, Selection$1 = $$props.Selection);
		if ("MultiSelection" in $$props) $$invalidate(7, MultiSelection$1 = $$props.MultiSelection);
		if ("isMulti" in $$props) $$invalidate(8, isMulti = $$props.isMulti);
		if ("isDisabled" in $$props) $$invalidate(9, isDisabled = $$props.isDisabled);
		if ("isCreatable" in $$props) $$invalidate(38, isCreatable = $$props.isCreatable);
		if ("isFocused" in $$props) $$invalidate(2, isFocused = $$props.isFocused);
		if ("selectedValue" in $$props) $$invalidate(3, selectedValue = $$props.selectedValue);
		if ("filterText" in $$props) $$invalidate(4, filterText = $$props.filterText);
		if ("placeholder" in $$props) $$invalidate(39, placeholder = $$props.placeholder);
		if ("items" in $$props) $$invalidate(33, items = $$props.items);
		if ("itemFilter" in $$props) $$invalidate(40, itemFilter = $$props.itemFilter);
		if ("groupBy" in $$props) $$invalidate(41, groupBy = $$props.groupBy);
		if ("groupFilter" in $$props) $$invalidate(42, groupFilter = $$props.groupFilter);
		if ("isGroupHeaderSelectable" in $$props) $$invalidate(43, isGroupHeaderSelectable = $$props.isGroupHeaderSelectable);
		if ("getGroupHeaderLabel" in $$props) $$invalidate(44, getGroupHeaderLabel = $$props.getGroupHeaderLabel);
		if ("getOptionLabel" in $$props) $$invalidate(45, getOptionLabel = $$props.getOptionLabel);
		if ("optionIdentifier" in $$props) $$invalidate(46, optionIdentifier = $$props.optionIdentifier);
		if ("loadOptions" in $$props) $$invalidate(47, loadOptions = $$props.loadOptions);
		if ("hasError" in $$props) $$invalidate(10, hasError = $$props.hasError);
		if ("containerStyles" in $$props) $$invalidate(11, containerStyles = $$props.containerStyles);
		if ("getSelectionLabel" in $$props) $$invalidate(12, getSelectionLabel = $$props.getSelectionLabel);
		if ("createGroupHeaderItem" in $$props) $$invalidate(48, createGroupHeaderItem = $$props.createGroupHeaderItem);
		if ("createItem" in $$props) $$invalidate(49, createItem = $$props.createItem);
		if ("isSearchable" in $$props) $$invalidate(13, isSearchable = $$props.isSearchable);
		if ("inputStyles" in $$props) $$invalidate(14, inputStyles = $$props.inputStyles);
		if ("isClearable" in $$props) $$invalidate(15, isClearable = $$props.isClearable);
		if ("isWaiting" in $$props) $$invalidate(5, isWaiting = $$props.isWaiting);
		if ("listPlacement" in $$props) $$invalidate(50, listPlacement = $$props.listPlacement);
		if ("listOpen" in $$props) $$invalidate(34, listOpen = $$props.listOpen);
		if ("list" in $$props) $$invalidate(35, list = $$props.list);
		if ("isVirtualList" in $$props) $$invalidate(51, isVirtualList = $$props.isVirtualList);
		if ("loadOptionsInterval" in $$props) $$invalidate(52, loadOptionsInterval = $$props.loadOptionsInterval);
		if ("noOptionsMessage" in $$props) $$invalidate(53, noOptionsMessage = $$props.noOptionsMessage);
		if ("hideEmptyState" in $$props) $$invalidate(54, hideEmptyState = $$props.hideEmptyState);
		if ("filteredItems" in $$props) $$invalidate(36, filteredItems = $$props.filteredItems);
		if ("inputAttributes" in $$props) $$invalidate(55, inputAttributes = $$props.inputAttributes);
		if ("listAutoWidth" in $$props) $$invalidate(56, listAutoWidth = $$props.listAutoWidth);
		if ("itemHeight" in $$props) $$invalidate(57, itemHeight = $$props.itemHeight);
		if ("Icon" in $$props) $$invalidate(16, Icon = $$props.Icon);
		if ("iconProps" in $$props) $$invalidate(17, iconProps = $$props.iconProps);
		if ("showChevron" in $$props) $$invalidate(18, showChevron = $$props.showChevron);
		if ("showIndicator" in $$props) $$invalidate(19, showIndicator = $$props.showIndicator);
		if ("containerClasses" in $$props) $$invalidate(20, containerClasses = $$props.containerClasses);
		if ("indicatorSvg" in $$props) $$invalidate(21, indicatorSvg = $$props.indicatorSvg);
	};
	let showSelectedItem;
	let placeholderText;

	$$self.$$.update = () => {
		if ($$self.$$.dirty[0] & /*isDisabled*/ 512) ;

		if ($$self.$$.dirty[0] & /*selectedValue, isMulti*/ 264 | $$self.$$.dirty[1] & /*optionIdentifier*/ 32768) {
			 {
				if (typeof selectedValue === "string") {
					$$invalidate(3, selectedValue = {
						[optionIdentifier]: selectedValue,
						label: selectedValue
					});
				} else if (isMulti && Array.isArray(selectedValue) && selectedValue.length > 0) {
					$$invalidate(3, selectedValue = selectedValue.map(item => typeof item === "string"
					? { value: item, label: item }
					: item));
				}
			}
		}

		if ($$self.$$.dirty[1] & /*noOptionsMessage, list*/ 4194320) {
			 {
				if (noOptionsMessage && list) list.$set({ noOptionsMessage });
			}
		}

		if ($$self.$$.dirty[0] & /*selectedValue, filterText*/ 24) {
			 $$invalidate(25, showSelectedItem = selectedValue && filterText.length === 0);
		}

		if ($$self.$$.dirty[0] & /*selectedValue*/ 8 | $$self.$$.dirty[1] & /*placeholder*/ 256) {
			 $$invalidate(26, placeholderText = selectedValue ? "" : placeholder);
		}

		if ($$self.$$.dirty[0] & /*isSearchable*/ 8192 | $$self.$$.dirty[1] & /*inputAttributes*/ 16777216) {
			 {
				$$invalidate(24, _inputAttributes = Object.assign(inputAttributes, {
					autocomplete: "off",
					autocorrect: "off",
					spellcheck: false
				}));

				if (!isSearchable) {
					$$invalidate(24, _inputAttributes.readonly = true, _inputAttributes);
				}
			}
		}

		if ($$self.$$.dirty[0] & /*filterText, isMulti, selectedValue*/ 280 | $$self.$$.dirty[1] & /*items, loadOptions, optionIdentifier, itemFilter, getOptionLabel, groupBy, createGroupHeaderItem, isGroupHeaderSelectable, groupFilter*/ 253444 | $$self.$$.dirty[2] & /*originalItemsClone*/ 4) {
			 {
				let _filteredItems;
				let _items = items;

				if (items && items.length > 0 && typeof items[0] !== "object") {
					_items = items.map((item, index) => {
						return { index, value: item, label: item };
					});
				}

				if (loadOptions && filterText.length === 0 && originalItemsClone) {
					_filteredItems = JSON.parse(originalItemsClone);
					_items = JSON.parse(originalItemsClone);
				} else {
					_filteredItems = loadOptions
					? filterText.length === 0 ? [] : _items
					: _items.filter(item => {
							let keepItem = true;

							if (isMulti && selectedValue) {
								keepItem = !selectedValue.some(value => {
									return value[optionIdentifier] === item[optionIdentifier];
								});
							}

							if (!keepItem) return false;
							if (filterText.length < 1) return true;
							return itemFilter(getOptionLabel(item, filterText), filterText, item);
						});
				}

				if (groupBy) {
					const groupValues = [];
					const groups = {};

					_filteredItems.forEach(item => {
						const groupValue = groupBy(item);

						if (!groupValues.includes(groupValue)) {
							groupValues.push(groupValue);
							groups[groupValue] = [];

							if (groupValue) {
								groups[groupValue].push(Object.assign(createGroupHeaderItem(groupValue, item), {
									id: groupValue,
									isGroupHeader: true,
									isSelectable: isGroupHeaderSelectable
								}));
							}
						}

						groups[groupValue].push(Object.assign({ isGroupItem: !!groupValue }, item));
					});

					const sortedGroupedItems = [];

					groupFilter(groupValues).forEach(groupValue => {
						sortedGroupedItems.push(...groups[groupValue]);
					});

					$$invalidate(36, filteredItems = sortedGroupedItems);
				} else {
					$$invalidate(36, filteredItems = _filteredItems);
				}
			}
		}
	};

	return [
		container,
		input,
		isFocused,
		selectedValue,
		filterText,
		isWaiting,
		Selection$1,
		MultiSelection$1,
		isMulti,
		isDisabled,
		hasError,
		containerStyles,
		getSelectionLabel,
		isSearchable,
		inputStyles,
		isClearable,
		Icon,
		iconProps,
		showChevron,
		showIndicator,
		containerClasses,
		indicatorSvg,
		handleClear,
		activeSelectedValue,
		_inputAttributes,
		showSelectedItem,
		placeholderText,
		handleMultiItemClear,
		getPosition,
		handleKeyDown,
		handleFocus,
		handleWindowClick,
		handleClick,
		items,
		listOpen,
		list,
		filteredItems,
		Item$1,
		isCreatable,
		placeholder,
		itemFilter,
		groupBy,
		groupFilter,
		isGroupHeaderSelectable,
		getGroupHeaderLabel,
		getOptionLabel,
		optionIdentifier,
		loadOptions,
		createGroupHeaderItem,
		createItem,
		listPlacement,
		isVirtualList,
		loadOptionsInterval,
		noOptionsMessage,
		hideEmptyState,
		inputAttributes,
		listAutoWidth,
		itemHeight,
		input_1_binding,
		input_1_input_handler,
		input_1_binding_1,
		input_1_input_handler_1,
		div_binding
	];
}

class Select extends SvelteComponent {
	constructor(options) {
		super();

		init(
			this,
			options,
			instance$7,
			create_fragment$7,
			safe_not_equal,
			{
				container: 0,
				input: 1,
				Item: 37,
				Selection: 6,
				MultiSelection: 7,
				isMulti: 8,
				isDisabled: 9,
				isCreatable: 38,
				isFocused: 2,
				selectedValue: 3,
				filterText: 4,
				placeholder: 39,
				items: 33,
				itemFilter: 40,
				groupBy: 41,
				groupFilter: 42,
				isGroupHeaderSelectable: 43,
				getGroupHeaderLabel: 44,
				getOptionLabel: 45,
				optionIdentifier: 46,
				loadOptions: 47,
				hasError: 10,
				containerStyles: 11,
				getSelectionLabel: 12,
				createGroupHeaderItem: 48,
				createItem: 49,
				isSearchable: 13,
				inputStyles: 14,
				isClearable: 15,
				isWaiting: 5,
				listPlacement: 50,
				listOpen: 34,
				list: 35,
				isVirtualList: 51,
				loadOptionsInterval: 52,
				noOptionsMessage: 53,
				hideEmptyState: 54,
				filteredItems: 36,
				inputAttributes: 55,
				listAutoWidth: 56,
				itemHeight: 57,
				Icon: 16,
				iconProps: 17,
				showChevron: 18,
				showIndicator: 19,
				containerClasses: 20,
				indicatorSvg: 21,
				handleClear: 22
			},
			[-1, -1, -1]
		);
	}

	get handleClear() {
		return this.$$.ctx[22];
	}
}

/* src\inputs\ComboBox.svelte generated by Svelte v3.24.1 */

function create_if_block_4$1(ctx) {
	let label;
	let current;
	label = new Label({ props: { field: /*field*/ ctx[0] } });

	return {
		c() {
			create_component(label.$$.fragment);
		},
		l(nodes) {
			claim_component(label.$$.fragment, nodes);
		},
		m(target, anchor) {
			mount_component(label, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const label_changes = {};
			if (dirty[0] & /*field*/ 1) label_changes.field = /*field*/ ctx[0];
			label.$set(label_changes);
		},
		i(local) {
			if (current) return;
			transition_in(label.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(label.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(label, detaching);
		}
	};
}

// (251:2) {:else}
function create_else_block$3(ctx) {
	let t;
	let if_block1_anchor;
	let current;
	let if_block0 = /*options*/ ctx[3] && create_if_block_3$2(ctx);
	let if_block1 = /*field*/ ctx[0].helperText && create_if_block_2$3(ctx);

	return {
		c() {
			if (if_block0) if_block0.c();
			t = space();
			if (if_block1) if_block1.c();
			if_block1_anchor = empty();
		},
		l(nodes) {
			if (if_block0) if_block0.l(nodes);
			t = claim_space(nodes);
			if (if_block1) if_block1.l(nodes);
			if_block1_anchor = empty();
		},
		m(target, anchor) {
			if (if_block0) if_block0.m(target, anchor);
			insert(target, t, anchor);
			if (if_block1) if_block1.m(target, anchor);
			insert(target, if_block1_anchor, anchor);
			current = true;
		},
		p(ctx, dirty) {
			if (/*options*/ ctx[3]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);

					if (dirty[0] & /*options*/ 8) {
						transition_in(if_block0, 1);
					}
				} else {
					if_block0 = create_if_block_3$2(ctx);
					if_block0.c();
					transition_in(if_block0, 1);
					if_block0.m(t.parentNode, t);
				}
			} else if (if_block0) {
				group_outros();

				transition_out(if_block0, 1, 1, () => {
					if_block0 = null;
				});

				check_outros();
			}

			if (/*field*/ ctx[0].helperText) {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block_2$3(ctx);
					if_block1.c();
					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block0);
			current = true;
		},
		o(local) {
			transition_out(if_block0);
			current = false;
		},
		d(detaching) {
			if (if_block0) if_block0.d(detaching);
			if (detaching) detach(t);
			if (if_block1) if_block1.d(detaching);
			if (detaching) detach(if_block1_anchor);
		}
	};
}

// (249:39) 
function create_if_block_1$3(ctx) {
	let p;
	let t;

	return {
		c() {
			p = element("p");
			t = text("Failed to load.");
		},
		l(nodes) {
			p = claim_element(nodes, "P", {});
			var p_nodes = children(p);
			t = claim_text(p_nodes, "Failed to load.");
			p_nodes.forEach(detach);
		},
		m(target, anchor) {
			insert(target, p, anchor);
			append(p, t);
		},
		p: noop,
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(p);
		}
	};
}

// (245:2) {#if state === LoadState.Loading}
function create_if_block$5(ctx) {
	let div1;
	let div0;
	let span;
	let t;

	return {
		c() {
			div1 = element("div");
			div0 = element("div");
			span = element("span");
			t = text("Loading...");
			this.h();
		},
		l(nodes) {
			div1 = claim_element(nodes, "DIV", {});
			var div1_nodes = children(div1);
			div0 = claim_element(div1_nodes, "DIV", { class: true, role: true });
			var div0_nodes = children(div0);
			span = claim_element(div0_nodes, "SPAN", { class: true });
			var span_nodes = children(span);
			t = claim_text(span_nodes, "Loading...");
			span_nodes.forEach(detach);
			div0_nodes.forEach(detach);
			div1_nodes.forEach(detach);
			this.h();
		},
		h() {
			attr(span, "class", "sr-only");
			attr(div0, "class", "spinner-border");
			attr(div0, "role", "status");
		},
		m(target, anchor) {
			insert(target, div1, anchor);
			append(div1, div0);
			append(div0, span);
			append(span, t);
		},
		p: noop,
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div1);
		}
	};
}

// (252:4) {#if options}
function create_if_block_3$2(ctx) {
	let div;
	let select_1;
	let updating_selectedValue;
	let current;
	let mounted;
	let dispose;

	function select_1_selectedValue_binding(value) {
		/*select_1_selectedValue_binding*/ ctx[8].call(null, value);
	}

	let select_1_props = {
		items: /*options*/ ctx[3],
		isVirtualList: /*options*/ ctx[3].length > 25,
		itemFilter: /*itemFilter*/ ctx[4],
		showChevron: true
	};

	if (/*selectedValue*/ ctx[2] !== void 0) {
		select_1_props.selectedValue = /*selectedValue*/ ctx[2];
	}

	select_1 = new Select({ props: select_1_props });
	binding_callbacks.push(() => bind(select_1, "selectedValue", select_1_selectedValue_binding));
	select_1.$on("select", /*onSelect*/ ctx[5]);
	select_1.$on("clear", /*onClear*/ ctx[6]);

	return {
		c() {
			div = element("div");
			create_component(select_1.$$.fragment);
			this.h();
		},
		l(nodes) {
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);
			claim_component(select_1.$$.fragment, div_nodes);
			div_nodes.forEach(detach);
			this.h();
		},
		h() {
			attr(div, "class", "themed svelte-3dptv7");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			mount_component(select_1, div, null);
			current = true;

			if (!mounted) {
				dispose = listen(div, "click", stop_propagation(/*click_handler*/ ctx[7]));
				mounted = true;
			}
		},
		p(ctx, dirty) {
			const select_1_changes = {};
			if (dirty[0] & /*options*/ 8) select_1_changes.items = /*options*/ ctx[3];
			if (dirty[0] & /*options*/ 8) select_1_changes.isVirtualList = /*options*/ ctx[3].length > 25;

			if (!updating_selectedValue && dirty[0] & /*selectedValue*/ 4) {
				updating_selectedValue = true;
				select_1_changes.selectedValue = /*selectedValue*/ ctx[2];
				add_flush_callback(() => updating_selectedValue = false);
			}

			select_1.$set(select_1_changes);
		},
		i(local) {
			if (current) return;
			transition_in(select_1.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(select_1.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_component(select_1);
			mounted = false;
			dispose();
		}
	};
}

// (257:4) {#if field.helperText}
function create_if_block_2$3(ctx) {
	let div;
	let small;
	let raw_value = (/*field*/ ctx[0].helperText ?? "") + "";

	return {
		c() {
			div = element("div");
			small = element("small");
			this.h();
		},
		l(nodes) {
			div = claim_element(nodes, "DIV", { style: true });
			var div_nodes = children(div);
			small = claim_element(div_nodes, "SMALL", { class: true });
			var small_nodes = children(small);
			small_nodes.forEach(detach);
			div_nodes.forEach(detach);
			this.h();
		},
		h() {
			attr(small, "class", "form-text text-muted");
			set_style(div, "padding-top", "0.3em");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, small);
			small.innerHTML = raw_value;
		},
		p(ctx, dirty) {
			if (dirty[0] & /*field*/ 1 && raw_value !== (raw_value = (/*field*/ ctx[0].helperText ?? "") + "")) small.innerHTML = raw_value;		},
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

function create_fragment$8(ctx) {
	let div;
	let t;
	let current_block_type_index;
	let if_block1;
	let current;
	let if_block0 = !/*field*/ ctx[0].hideLabel && create_if_block_4$1(ctx);
	const if_block_creators = [create_if_block$5, create_if_block_1$3, create_else_block$3];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*state*/ ctx[1] === LoadState.Loading) return 0;
		if (/*state*/ ctx[1] === LoadState.Failed) return 1;
		return 2;
	}

	current_block_type_index = select_block_type(ctx);
	if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	return {
		c() {
			div = element("div");
			if (if_block0) if_block0.c();
			t = space();
			if_block1.c();
		},
		l(nodes) {
			div = claim_element(nodes, "DIV", {});
			var div_nodes = children(div);
			if (if_block0) if_block0.l(div_nodes);
			t = claim_space(div_nodes);
			if_block1.l(div_nodes);
			div_nodes.forEach(detach);
		},
		m(target, anchor) {
			insert(target, div, anchor);
			if (if_block0) if_block0.m(div, null);
			append(div, t);
			if_blocks[current_block_type_index].m(div, null);
			current = true;
		},
		p(ctx, dirty) {
			if (!/*field*/ ctx[0].hideLabel) {
				if (if_block0) {
					if_block0.p(ctx, dirty);

					if (dirty[0] & /*field*/ 1) {
						transition_in(if_block0, 1);
					}
				} else {
					if_block0 = create_if_block_4$1(ctx);
					if_block0.c();
					transition_in(if_block0, 1);
					if_block0.m(div, t);
				}
			} else if (if_block0) {
				group_outros();

				transition_out(if_block0, 1, 1, () => {
					if_block0 = null;
				});

				check_outros();
			}

			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block1 = if_blocks[current_block_type_index];

				if (!if_block1) {
					if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block1.c();
				}

				transition_in(if_block1, 1);
				if_block1.m(div, null);
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block0);
			transition_in(if_block1);
			current = true;
		},
		o(local) {
			transition_out(if_block0);
			transition_out(if_block1);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			if (if_block0) if_block0.d();
			if_blocks[current_block_type_index].d();
		}
	};
}

function instance$8($$self, $$props, $$invalidate) {
	var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
		function adopt(value) {
			return value instanceof P
			? value
			: new P(function (resolve) {
						resolve(value);
					});
		}

		return new (P || (P = Promise))(function (resolve, reject) {
				function fulfilled(value) {
					try {
						step(generator.next(value));
					} catch(e) {
						reject(e);
					}
				}

				function rejected(value) {
					try {
						step(generator["throw"](value));
					} catch(e) {
						reject(e);
					}
				}

				function step(result) {
					result.done
					? resolve(result.value)
					: adopt(result.value).then(fulfilled, rejected);
				}

				step((generator = generator.apply(thisArg, _arguments || [])).next());
			});
	};

	var _a;
	let dropdownId;
	let fuse;
	let { field } = $$props;
	let prevOptions = null;
	let activeToolTip;

	onDestroy(() => {
		disposeToolTip();
	});

	onMount(() => __awaiter(void 0, void 0, void 0, function* () {
		subscribe("show_field_config", props => {
			value = "";
			$$invalidate(3, options = []);
			setup();
		});

		subscribe("combobox_get_options", props => {
			if (props.id === field.id) {
				return options;
			}
		});

		subscribe("combobox_open", props => {
			if (props.id !== field.id) {
				doClose();
			}
		});

		dropdownId = `${field.name}-${randomString()}`;
		value = formStore.getValue(field.id);

		subscribe("option_set_modified", set => {
			if (set.value === field.options) {
				setup();
			}

			if (field.configTarget) {
				setup();
			}
		});

		subscribeFieldChange(newField => {
			var _a;

			if (newField.id === field.id) {
				value = (_a = newField.value) !== null && _a !== void 0
				? _a
				: "";

				normalizeValue();
			}
		});

		yield setup();
	}));

	function createFuse() {
		if (!options) {
			return new Fuse([]);
		}

		return new Fuse(options, { keys: ["label", "value"] });
	}

	function setup() {
		var _a, _b, _c, _d, _e;

		return __awaiter(this, void 0, void 0, function* () {
			$$invalidate(1, state = LoadState.Loading);
			$$invalidate(3, options = []);

			try {
				if (((_a = field.options) === null || _a === void 0
				? void 0
				: _a.type) === "remote" || isString(field.options) || ((_b = field.options) === null || _b === void 0
				? void 0
				: _b.type) === "local" && isString(field.options.value)) {
					const url = field.options.value || field.options;
					const result = yield fetch(url);
					const data = yield result.json();

					if (!data) {
						return;
					}

					const parsed = [];

					if (field.loadTransformer) {
						$$invalidate(3, options = (_c = field.loadTransformer(data)) !== null && _c !== void 0
						? _c
						: []);
					} else {
						Object.keys(data).forEach(key => {
							parsed.push({ value: data[key], label: key });
						});

						$$invalidate(3, options = parsed !== null && parsed !== void 0 ? parsed : []);
					}
				} else {
					const value = (_d = field.options) === null || _d === void 0
					? void 0
					: _d.value;

					const data = isFunction$3(value) ? yield value() : yield value;

					$$invalidate(3, options = (_e = field.loadTransformer
					? field.loadTransformer(data)
					: data) !== null && _e !== void 0
					? _e
					: []);
				}

				fuse = createFuse();
				normalizeValue();
				$$invalidate(1, state = LoadState.Finished);
			} catch(ex) {
				console.log(ex);
				$$invalidate(3, options = []);
				$$invalidate(1, state = LoadState.Failed);
			}
		});
	}

	let state = LoadState.Loading;
	let value = "";
	let selectedValue;
	let options = [];
	let filteredBy = "";
	let filtered = new Set();

	function normalizeValue() {
		var _a;

		const option = options === null || options === void 0
		? void 0
		: options.find(w => stringEquals(w.label, value) || stringEquals(w.value, value));

		if (option) {
			value = (_a = option.label) !== null && _a !== void 0 ? _a : "";
			$$invalidate(2, selectedValue = option);
		}
	}

	function onSearch(query) {
		if (options.length === 0) {
			filtered = new Set();
		} else if (query == null || query === "") {
			filtered = new Set();
		} else {
			const result = fuse.search(query);
			filteredBy = "";
			filtered = new Set(result.map(r => r.item.value));
			filteredBy = query;
		}
	}

	function doClose() {
		disposeToolTip();
		filtered.clear();
		filteredBy = "";
	}

	function disposeToolTip() {
		if (activeToolTip) {
			try {
				activeToolTip.dispose();
			} catch(ex) {
				
			}
		}

		activeToolTip = undefined;
	}

	function itemFilter(label, filterText, option) {
		if (filteredBy != filterText) {
			onSearch(filterText);
		}

		return filtered.has(option.value);
	}

	function onSelect(e) {
		e.stopPropagation();
		$$invalidate(0, field.value = e.detail.value, field);

		formStore.set(field, {
			field: "value",
			value: field.value,
			fromUser: true
		});
	}

	function onClear() {
		$$invalidate(0, field.value = undefined, field);

		formStore.set(field, {
			field: "value",
			value: undefined,
			fromUser: true
		});
	}

	function click_handler(event) {
		bubble($$self, event);
	}

	function select_1_selectedValue_binding(value) {
		selectedValue = value;
		$$invalidate(2, selectedValue);
	}

	$$self.$$set = $$props => {
		if ("field" in $$props) $$invalidate(0, field = $$props.field);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty[0] & /*prevOptions, field, _a*/ 16897) {
			 {
				if (!fastEquals(prevOptions, field.options)) {
					$$invalidate(14, prevOptions = $$invalidate(9, _a = field.options) !== null && _a !== void 0
					? _a
					: []);

					setup();
				}
			}
		}
	};

	return [
		field,
		state,
		selectedValue,
		options,
		itemFilter,
		onSelect,
		onClear,
		click_handler,
		select_1_selectedValue_binding
	];
}

class ComboBox extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$8, create_fragment$8, safe_not_equal, { field: 0 }, [-1, -1]);
	}
}

class FieldValueLoader {
    load(field) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.loadValue((_a = field.value) !== null && _a !== void 0 ? _a : field.defaultValue);
        });
    }
    loadValue(value) {
        return __awaiter(this, void 0, void 0, function* () {
            if (value == null) {
                return;
            }
            if (isString(value)) {
                return value;
            }
            if (value.type === "remote") {
                return yield this.loadRemote(value);
            }
            if (value.type === "local") {
                const localValue = value.value;
                if (isObject$3(localValue) && localValue.type === "remote") {
                    return yield this.loadChildren(localValue);
                }
                return localValue;
            }
            return value;
        });
    }
    loadRemote(value) {
        return __awaiter(this, void 0, void 0, function* () {
            if (isString(value)) {
                return value;
            }
            const response = yield fetch(value.value);
            const result = yield response.json();
            return value.selector ? select(result, value.selector) : result;
        });
    }
    loadChildren(value) {
        return __awaiter(this, void 0, void 0, function* () {
            const keys = Object.keys(value);
            const promises = yield keys.map(w => {
                return this.loadValue(value[w]);
            });
            const results = yield Promise.all(promises);
            const response = {};
            for (let i = 0; i < keys.length; i++) {
                response[keys[i]] = results[i];
            }
            return response;
        });
    }
}

/* src\inputs\StateSelector.svelte generated by Svelte v3.24.1 */

function create_fragment$9(ctx) {
	let combobox;
	let current;

	combobox = new ComboBox({
			props: {
				field: {
					id: /*id*/ ctx[3],
					name: /*name*/ ctx[2],
					label: /*label*/ ctx[0],
					helperText: "Zip Code",
					hideLabel: true,
					required: true,
					type: "combobox",
					value: /*value*/ ctx[1],
					options: {
						type: "remote",
						value: "https://gist.githubusercontent.com/mshafrir/2646763/raw/8b0dbb93521f5d6889502305335104218454c2bf/states_hash.json"
					}
				}
			}
		});

	return {
		c() {
			create_component(combobox.$$.fragment);
		},
		l(nodes) {
			claim_component(combobox.$$.fragment, nodes);
		},
		m(target, anchor) {
			mount_component(combobox, target, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			const combobox_changes = {};

			if (dirty & /*id, name, label, value*/ 15) combobox_changes.field = {
				id: /*id*/ ctx[3],
				name: /*name*/ ctx[2],
				label: /*label*/ ctx[0],
				helperText: "Zip Code",
				hideLabel: true,
				required: true,
				type: "combobox",
				value: /*value*/ ctx[1],
				options: {
					type: "remote",
					value: "https://gist.githubusercontent.com/mshafrir/2646763/raw/8b0dbb93521f5d6889502305335104218454c2bf/states_hash.json"
				}
			};

			combobox.$set(combobox_changes);
		},
		i(local) {
			if (current) return;
			transition_in(combobox.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(combobox.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(combobox, detaching);
		}
	};
}

function instance$9($$self, $$props, $$invalidate) {
	
	let { label = "State" } = $$props;
	let { value = "" } = $$props;
	let { name } = $$props;
	let { id } = $$props;
	let { helperText } = $$props;
	let { hideLabel } = $$props;

	$$self.$$set = $$props => {
		if ("label" in $$props) $$invalidate(0, label = $$props.label);
		if ("value" in $$props) $$invalidate(1, value = $$props.value);
		if ("name" in $$props) $$invalidate(2, name = $$props.name);
		if ("id" in $$props) $$invalidate(3, id = $$props.id);
		if ("helperText" in $$props) $$invalidate(4, helperText = $$props.helperText);
		if ("hideLabel" in $$props) $$invalidate(5, hideLabel = $$props.hideLabel);
	};

	return [label, value, name, id, helperText, hideLabel];
}

class StateSelector extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance$9, create_fragment$9, safe_not_equal, {
			label: 0,
			value: 1,
			name: 2,
			id: 3,
			helperText: 4,
			hideLabel: 5
		});
	}
}

/* src\inputs\Address.svelte generated by Svelte v3.24.1 */

function create_fragment$a(ctx) {
	let label;
	let t0;
	let div7;
	let div6;
	let div0;
	let textinput0;
	let t1;
	let div1;
	let textinput1;
	let t2;
	let div5;
	let div2;
	let textinput2;
	let t3;
	let div3;
	let stateselector;
	let t4;
	let div4;
	let textinput3;
	let current;

	label = new Label({
			props: {
				field: {
					label: "Address",
					type: "address",
					id: randomString()
				}
			}
		});

	textinput0 = new TextInput({
			props: {
				field: {
					required: true,
					name: `${/*field*/ ctx[0].name}.address1`,
					id: `${/*field*/ ctx[0].id}.value.address1`,
					helperText: "Address Line 1",
					hideLabel: true,
					value: /*value*/ ctx[1]?.address1 ?? "",
					type: "string"
				}
			}
		});

	textinput1 = new TextInput({
			props: {
				field: {
					required: true,
					name: `${/*field*/ ctx[0].name}.address2`,
					id: `${/*field*/ ctx[0].id}.value.address2`,
					helperText: "Address Line 2",
					hideLabel: true,
					value: /*value*/ ctx[1]?.address2 ?? "",
					type: "string"
				}
			}
		});

	textinput2 = new TextInput({
			props: {
				field: {
					required: true,
					name: `${/*field*/ ctx[0].name}.city`,
					id: `${/*field*/ ctx[0].id}.value.city`,
					helperText: "City",
					hideLabel: true,
					value: /*value*/ ctx[1]?.city ?? "",
					type: "string"
				}
			}
		});

	stateselector = new StateSelector({
			props: {
				value: /*value*/ ctx[1]?.state ?? "",
				id: `${/*field*/ ctx[0].id}.value.state`,
				name: `${/*field*/ ctx[0].id}.state`,
				helperText: "State",
				hideLabel: true
			}
		});

	textinput3 = new TextInput({
			props: {
				field: {
					required: true,
					name: `${/*field*/ ctx[0].name}.zip`,
					id: `${/*field*/ ctx[0].id}.value.zip`,
					helperText: "Zip Code",
					hideLabel: true,
					value: /*value*/ ctx[1]?.zip ?? "",
					type: "string",
					properties: { pattern: "[d]{5}(-[d]{4})?" }
				}
			}
		});

	return {
		c() {
			create_component(label.$$.fragment);
			t0 = space();
			div7 = element("div");
			div6 = element("div");
			div0 = element("div");
			create_component(textinput0.$$.fragment);
			t1 = space();
			div1 = element("div");
			create_component(textinput1.$$.fragment);
			t2 = space();
			div5 = element("div");
			div2 = element("div");
			create_component(textinput2.$$.fragment);
			t3 = space();
			div3 = element("div");
			create_component(stateselector.$$.fragment);
			t4 = space();
			div4 = element("div");
			create_component(textinput3.$$.fragment);
			this.h();
		},
		l(nodes) {
			claim_component(label.$$.fragment, nodes);
			t0 = claim_space(nodes);
			div7 = claim_element(nodes, "DIV", { class: true, style: true });
			var div7_nodes = children(div7);
			div6 = claim_element(div7_nodes, "DIV", { class: true });
			var div6_nodes = children(div6);
			div0 = claim_element(div6_nodes, "DIV", { class: true });
			var div0_nodes = children(div0);
			claim_component(textinput0.$$.fragment, div0_nodes);
			div0_nodes.forEach(detach);
			t1 = claim_space(div6_nodes);
			div1 = claim_element(div6_nodes, "DIV", { class: true, style: true });
			var div1_nodes = children(div1);
			claim_component(textinput1.$$.fragment, div1_nodes);
			div1_nodes.forEach(detach);
			t2 = claim_space(div6_nodes);
			div5 = claim_element(div6_nodes, "DIV", { class: true, style: true });
			var div5_nodes = children(div5);
			div2 = claim_element(div5_nodes, "DIV", { class: true });
			var div2_nodes = children(div2);
			claim_component(textinput2.$$.fragment, div2_nodes);
			div2_nodes.forEach(detach);
			t3 = claim_space(div5_nodes);
			div3 = claim_element(div5_nodes, "DIV", { class: true });
			var div3_nodes = children(div3);
			claim_component(stateselector.$$.fragment, div3_nodes);
			div3_nodes.forEach(detach);
			t4 = claim_space(div5_nodes);
			div4 = claim_element(div5_nodes, "DIV", { class: true });
			var div4_nodes = children(div4);
			claim_component(textinput3.$$.fragment, div4_nodes);
			div4_nodes.forEach(detach);
			div5_nodes.forEach(detach);
			div6_nodes.forEach(detach);
			div7_nodes.forEach(detach);
			this.h();
		},
		h() {
			attr(div0, "class", "row");
			attr(div1, "class", "row");
			set_style(div1, "padding-top", "0.8em");
			attr(div2, "class", "col-5");
			attr(div3, "class", "col-3");
			attr(div4, "class", "col-4");
			attr(div5, "class", "row");
			set_style(div5, "padding-top", "0.8em");
			attr(div6, "class", "col");
			attr(div7, "class", "row");
			set_style(div7, "width", "100%");
		},
		m(target, anchor) {
			mount_component(label, target, anchor);
			insert(target, t0, anchor);
			insert(target, div7, anchor);
			append(div7, div6);
			append(div6, div0);
			mount_component(textinput0, div0, null);
			append(div6, t1);
			append(div6, div1);
			mount_component(textinput1, div1, null);
			append(div6, t2);
			append(div6, div5);
			append(div5, div2);
			mount_component(textinput2, div2, null);
			append(div5, t3);
			append(div5, div3);
			mount_component(stateselector, div3, null);
			append(div5, t4);
			append(div5, div4);
			mount_component(textinput3, div4, null);
			current = true;
		},
		p(ctx, [dirty]) {
			const textinput0_changes = {};

			if (dirty & /*field, value*/ 3) textinput0_changes.field = {
				required: true,
				name: `${/*field*/ ctx[0].name}.address1`,
				id: `${/*field*/ ctx[0].id}.value.address1`,
				helperText: "Address Line 1",
				hideLabel: true,
				value: /*value*/ ctx[1]?.address1 ?? "",
				type: "string"
			};

			textinput0.$set(textinput0_changes);
			const textinput1_changes = {};

			if (dirty & /*field, value*/ 3) textinput1_changes.field = {
				required: true,
				name: `${/*field*/ ctx[0].name}.address2`,
				id: `${/*field*/ ctx[0].id}.value.address2`,
				helperText: "Address Line 2",
				hideLabel: true,
				value: /*value*/ ctx[1]?.address2 ?? "",
				type: "string"
			};

			textinput1.$set(textinput1_changes);
			const textinput2_changes = {};

			if (dirty & /*field, value*/ 3) textinput2_changes.field = {
				required: true,
				name: `${/*field*/ ctx[0].name}.city`,
				id: `${/*field*/ ctx[0].id}.value.city`,
				helperText: "City",
				hideLabel: true,
				value: /*value*/ ctx[1]?.city ?? "",
				type: "string"
			};

			textinput2.$set(textinput2_changes);
			const stateselector_changes = {};
			if (dirty & /*value*/ 2) stateselector_changes.value = /*value*/ ctx[1]?.state ?? "";
			if (dirty & /*field*/ 1) stateselector_changes.id = `${/*field*/ ctx[0].id}.value.state`;
			if (dirty & /*field*/ 1) stateselector_changes.name = `${/*field*/ ctx[0].id}.state`;
			stateselector.$set(stateselector_changes);
			const textinput3_changes = {};

			if (dirty & /*field, value*/ 3) textinput3_changes.field = {
				required: true,
				name: `${/*field*/ ctx[0].name}.zip`,
				id: `${/*field*/ ctx[0].id}.value.zip`,
				helperText: "Zip Code",
				hideLabel: true,
				value: /*value*/ ctx[1]?.zip ?? "",
				type: "string",
				properties: { pattern: "[d]{5}(-[d]{4})?" }
			};

			textinput3.$set(textinput3_changes);
		},
		i(local) {
			if (current) return;
			transition_in(label.$$.fragment, local);
			transition_in(textinput0.$$.fragment, local);
			transition_in(textinput1.$$.fragment, local);
			transition_in(textinput2.$$.fragment, local);
			transition_in(stateselector.$$.fragment, local);
			transition_in(textinput3.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(label.$$.fragment, local);
			transition_out(textinput0.$$.fragment, local);
			transition_out(textinput1.$$.fragment, local);
			transition_out(textinput2.$$.fragment, local);
			transition_out(stateselector.$$.fragment, local);
			transition_out(textinput3.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(label, detaching);
			if (detaching) detach(t0);
			if (detaching) detach(div7);
			destroy_component(textinput0);
			destroy_component(textinput1);
			destroy_component(textinput2);
			destroy_component(stateselector);
			destroy_component(textinput3);
		}
	};
}

function instance$a($$self, $$props, $$invalidate) {
	
	let { field } = $$props;
	let { value } = $$props;

	$$self.$$set = $$props => {
		if ("field" in $$props) $$invalidate(0, field = $$props.field);
		if ("value" in $$props) $$invalidate(1, value = $$props.value);
	};

	return [field, value];
}

class Address extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$a, create_fragment$a, safe_not_equal, { field: 0, value: 1 });
	}
}

/* src\inputs\FullName.svelte generated by Svelte v3.24.1 */

function create_if_block_5$1(ctx) {
	let div;
	let textinput;
	let current;

	textinput = new TextInput({
			props: {
				field: {
					required: true,
					name: `${/*field*/ ctx[0].name}.prefix`,
					id: `${/*field*/ ctx[0].id}.value.prefix`,
					helperText: "Prefix",
					hideLabel: true,
					value: /*value*/ ctx[1]?.prefix ?? "",
					type: "string"
				}
			}
		});

	return {
		c() {
			div = element("div");
			create_component(textinput.$$.fragment);
			this.h();
		},
		l(nodes) {
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);
			claim_component(textinput.$$.fragment, div_nodes);
			div_nodes.forEach(detach);
			this.h();
		},
		h() {
			attr(div, "class", "col-1 padding svelte-1v8st1f");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			mount_component(textinput, div, null);
			current = true;
		},
		p(ctx, dirty) {
			const textinput_changes = {};

			if (dirty & /*field, value*/ 3) textinput_changes.field = {
				required: true,
				name: `${/*field*/ ctx[0].name}.prefix`,
				id: `${/*field*/ ctx[0].id}.value.prefix`,
				helperText: "Prefix",
				hideLabel: true,
				value: /*value*/ ctx[1]?.prefix ?? "",
				type: "string"
			};

			textinput.$set(textinput_changes);
		},
		i(local) {
			if (current) return;
			transition_in(textinput.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(textinput.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_component(textinput);
		}
	};
}

// (25:2) {#if config.first}
function create_if_block_4$2(ctx) {
	let div;
	let textinput;
	let current;

	textinput = new TextInput({
			props: {
				field: {
					required: true,
					name: `${/*field*/ ctx[0].name}.first`,
					id: `${/*field*/ ctx[0].id}.value.first`,
					helperText: "First Name",
					hideLabel: true,
					value: /*value*/ ctx[1]?.first ?? "",
					type: "string"
				}
			}
		});

	return {
		c() {
			div = element("div");
			create_component(textinput.$$.fragment);
			this.h();
		},
		l(nodes) {
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);
			claim_component(textinput.$$.fragment, div_nodes);
			div_nodes.forEach(detach);
			this.h();
		},
		h() {
			attr(div, "class", "col-3 padding svelte-1v8st1f");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			mount_component(textinput, div, null);
			current = true;
		},
		p(ctx, dirty) {
			const textinput_changes = {};

			if (dirty & /*field, value*/ 3) textinput_changes.field = {
				required: true,
				name: `${/*field*/ ctx[0].name}.first`,
				id: `${/*field*/ ctx[0].id}.value.first`,
				helperText: "First Name",
				hideLabel: true,
				value: /*value*/ ctx[1]?.first ?? "",
				type: "string"
			};

			textinput.$set(textinput_changes);
		},
		i(local) {
			if (current) return;
			transition_in(textinput.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(textinput.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_component(textinput);
		}
	};
}

// (30:2) {#if config.middle}
function create_if_block_3$3(ctx) {
	let div;
	let textinput;
	let current;

	textinput = new TextInput({
			props: {
				field: {
					required: true,
					name: `${/*field*/ ctx[0].name}.middle`,
					id: `${/*field*/ ctx[0].id}.value.middle`,
					helperText: "Middle Name",
					hideLabel: true,
					value: /*value*/ ctx[1]?.middle ?? "",
					type: "string"
				}
			}
		});

	return {
		c() {
			div = element("div");
			create_component(textinput.$$.fragment);
			this.h();
		},
		l(nodes) {
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);
			claim_component(textinput.$$.fragment, div_nodes);
			div_nodes.forEach(detach);
			this.h();
		},
		h() {
			attr(div, "class", "col-3 padding svelte-1v8st1f");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			mount_component(textinput, div, null);
			current = true;
		},
		p(ctx, dirty) {
			const textinput_changes = {};

			if (dirty & /*field, value*/ 3) textinput_changes.field = {
				required: true,
				name: `${/*field*/ ctx[0].name}.middle`,
				id: `${/*field*/ ctx[0].id}.value.middle`,
				helperText: "Middle Name",
				hideLabel: true,
				value: /*value*/ ctx[1]?.middle ?? "",
				type: "string"
			};

			textinput.$set(textinput_changes);
		},
		i(local) {
			if (current) return;
			transition_in(textinput.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(textinput.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_component(textinput);
		}
	};
}

// (35:2) {#if config.middleInitial}
function create_if_block_2$4(ctx) {
	let div;
	let textinput;
	let current;

	textinput = new TextInput({
			props: {
				field: {
					required: true,
					name: `${/*field*/ ctx[0].name}.middleInitial`,
					id: `${/*field*/ ctx[0].id}.value.middleInitial`,
					helperText: "M.I.",
					hideLabel: true,
					value: /*value*/ ctx[1]?.middleInitial ?? "",
					type: "string"
				}
			}
		});

	return {
		c() {
			div = element("div");
			create_component(textinput.$$.fragment);
			this.h();
		},
		l(nodes) {
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);
			claim_component(textinput.$$.fragment, div_nodes);
			div_nodes.forEach(detach);
			this.h();
		},
		h() {
			attr(div, "class", "col-1 padding svelte-1v8st1f");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			mount_component(textinput, div, null);
			current = true;
		},
		p(ctx, dirty) {
			const textinput_changes = {};

			if (dirty & /*field, value*/ 3) textinput_changes.field = {
				required: true,
				name: `${/*field*/ ctx[0].name}.middleInitial`,
				id: `${/*field*/ ctx[0].id}.value.middleInitial`,
				helperText: "M.I.",
				hideLabel: true,
				value: /*value*/ ctx[1]?.middleInitial ?? "",
				type: "string"
			};

			textinput.$set(textinput_changes);
		},
		i(local) {
			if (current) return;
			transition_in(textinput.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(textinput.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_component(textinput);
		}
	};
}

// (41:2) {#if config.last}
function create_if_block_1$4(ctx) {
	let div;
	let textinput;
	let current;

	textinput = new TextInput({
			props: {
				field: {
					required: true,
					name: `${/*field*/ ctx[0].name}.last`,
					id: `${/*field*/ ctx[0].id}.value.last`,
					helperText: "Last Name",
					hideLabel: true,
					value: /*value*/ ctx[1]?.last ?? "",
					type: "string"
				}
			}
		});

	return {
		c() {
			div = element("div");
			create_component(textinput.$$.fragment);
			this.h();
		},
		l(nodes) {
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);
			claim_component(textinput.$$.fragment, div_nodes);
			div_nodes.forEach(detach);
			this.h();
		},
		h() {
			attr(div, "class", "col-3 padding svelte-1v8st1f");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			mount_component(textinput, div, null);
			current = true;
		},
		p(ctx, dirty) {
			const textinput_changes = {};

			if (dirty & /*field, value*/ 3) textinput_changes.field = {
				required: true,
				name: `${/*field*/ ctx[0].name}.last`,
				id: `${/*field*/ ctx[0].id}.value.last`,
				helperText: "Last Name",
				hideLabel: true,
				value: /*value*/ ctx[1]?.last ?? "",
				type: "string"
			};

			textinput.$set(textinput_changes);
		},
		i(local) {
			if (current) return;
			transition_in(textinput.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(textinput.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_component(textinput);
		}
	};
}

// (46:2) {#if config.suffix}
function create_if_block$6(ctx) {
	let div;
	let textinput;
	let current;

	textinput = new TextInput({
			props: {
				field: {
					required: true,
					name: `${/*field*/ ctx[0].name}.suffix`,
					id: `${/*field*/ ctx[0].id}.value.suffix`,
					helperText: "Suffix",
					hideLabel: true,
					value: /*value*/ ctx[1]?.suffix ?? "",
					type: "string"
				}
			}
		});

	return {
		c() {
			div = element("div");
			create_component(textinput.$$.fragment);
			this.h();
		},
		l(nodes) {
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);
			claim_component(textinput.$$.fragment, div_nodes);
			div_nodes.forEach(detach);
			this.h();
		},
		h() {
			attr(div, "class", "col-1 padding svelte-1v8st1f");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			mount_component(textinput, div, null);
			current = true;
		},
		p(ctx, dirty) {
			const textinput_changes = {};

			if (dirty & /*field, value*/ 3) textinput_changes.field = {
				required: true,
				name: `${/*field*/ ctx[0].name}.suffix`,
				id: `${/*field*/ ctx[0].id}.value.suffix`,
				helperText: "Suffix",
				hideLabel: true,
				value: /*value*/ ctx[1]?.suffix ?? "",
				type: "string"
			};

			textinput.$set(textinput_changes);
		},
		i(local) {
			if (current) return;
			transition_in(textinput.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(textinput.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_component(textinput);
		}
	};
}

function create_fragment$b(ctx) {
	let label;
	let t0;
	let div;
	let t1;
	let t2;
	let t3;
	let t4;
	let t5;
	let current;

	label = new Label({
			props: {
				field: {
					label: "Name",
					type: "name",
					id: randomString()
				}
			}
		});

	let if_block0 = /*config*/ ctx[2].prefix && create_if_block_5$1(ctx);
	let if_block1 = /*config*/ ctx[2].first && create_if_block_4$2(ctx);
	let if_block2 = /*config*/ ctx[2].middle && create_if_block_3$3(ctx);
	let if_block3 = /*config*/ ctx[2].middleInitial && create_if_block_2$4(ctx);
	let if_block4 = /*config*/ ctx[2].last && create_if_block_1$4(ctx);
	let if_block5 = /*config*/ ctx[2].suffix && create_if_block$6(ctx);

	return {
		c() {
			create_component(label.$$.fragment);
			t0 = space();
			div = element("div");
			if (if_block0) if_block0.c();
			t1 = space();
			if (if_block1) if_block1.c();
			t2 = space();
			if (if_block2) if_block2.c();
			t3 = space();
			if (if_block3) if_block3.c();
			t4 = space();
			if (if_block4) if_block4.c();
			t5 = space();
			if (if_block5) if_block5.c();
			this.h();
		},
		l(nodes) {
			claim_component(label.$$.fragment, nodes);
			t0 = claim_space(nodes);
			div = claim_element(nodes, "DIV", { class: true, style: true });
			var div_nodes = children(div);
			if (if_block0) if_block0.l(div_nodes);
			t1 = claim_space(div_nodes);
			if (if_block1) if_block1.l(div_nodes);
			t2 = claim_space(div_nodes);
			if (if_block2) if_block2.l(div_nodes);
			t3 = claim_space(div_nodes);
			if (if_block3) if_block3.l(div_nodes);
			t4 = claim_space(div_nodes);
			if (if_block4) if_block4.l(div_nodes);
			t5 = claim_space(div_nodes);
			if (if_block5) if_block5.l(div_nodes);
			div_nodes.forEach(detach);
			this.h();
		},
		h() {
			attr(div, "class", "row");
			set_style(div, "padding-top", "0.3em");
			set_style(div, "width", "100%");
		},
		m(target, anchor) {
			mount_component(label, target, anchor);
			insert(target, t0, anchor);
			insert(target, div, anchor);
			if (if_block0) if_block0.m(div, null);
			append(div, t1);
			if (if_block1) if_block1.m(div, null);
			append(div, t2);
			if (if_block2) if_block2.m(div, null);
			append(div, t3);
			if (if_block3) if_block3.m(div, null);
			append(div, t4);
			if (if_block4) if_block4.m(div, null);
			append(div, t5);
			if (if_block5) if_block5.m(div, null);
			current = true;
		},
		p(ctx, [dirty]) {
			if (/*config*/ ctx[2].prefix) if_block0.p(ctx, dirty);
			if (/*config*/ ctx[2].first) if_block1.p(ctx, dirty);
			if (/*config*/ ctx[2].middle) if_block2.p(ctx, dirty);
			if (/*config*/ ctx[2].middleInitial) if_block3.p(ctx, dirty);
			if (/*config*/ ctx[2].last) if_block4.p(ctx, dirty);
			if (/*config*/ ctx[2].suffix) if_block5.p(ctx, dirty);
		},
		i(local) {
			if (current) return;
			transition_in(label.$$.fragment, local);
			transition_in(if_block0);
			transition_in(if_block1);
			transition_in(if_block2);
			transition_in(if_block3);
			transition_in(if_block4);
			transition_in(if_block5);
			current = true;
		},
		o(local) {
			transition_out(label.$$.fragment, local);
			transition_out(if_block0);
			transition_out(if_block1);
			transition_out(if_block2);
			transition_out(if_block3);
			transition_out(if_block4);
			transition_out(if_block5);
			current = false;
		},
		d(detaching) {
			destroy_component(label, detaching);
			if (detaching) detach(t0);
			if (detaching) detach(div);
			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d();
			if (if_block2) if_block2.d();
			if (if_block3) if_block3.d();
			if (if_block4) if_block4.d();
			if (if_block5) if_block5.d();
		}
	};
}

function instance$b($$self, $$props, $$invalidate) {
	
	let { field } = $$props;
	let { value } = $$props;

	//   export let config: { [key: string]: string }
	let config = {
		prefix: true,
		first: true,
		middle: true,
		middleInitial: false,
		last: true,
		suffix: true
	};

	$$self.$$set = $$props => {
		if ("field" in $$props) $$invalidate(0, field = $$props.field);
		if ("value" in $$props) $$invalidate(1, value = $$props.value);
	};

	return [field, value, config];
}

class FullName extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$b, create_fragment$b, safe_not_equal, { field: 0, value: 1 });
	}
}

/* src\inputs\TextArea.svelte generated by Svelte v3.24.1 */

function create_fragment$c(ctx) {
	let div1;
	let div0;

	return {
		c() {
			div1 = element("div");
			div0 = element("div");
		},
		l(nodes) {
			div1 = claim_element(nodes, "DIV", {});
			var div1_nodes = children(div1);
			div0 = claim_element(div1_nodes, "DIV", {});
			children(div0).forEach(detach);
			div1_nodes.forEach(detach);
		},
		m(target, anchor) {
			insert(target, div1, anchor);
			append(div1, div0);
			/*div0_binding*/ ctx[4](div0);
		},
		p: noop,
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div1);
			/*div0_binding*/ ctx[4](null);
		}
	};
}

function instance$c($$self, $$props, $$invalidate) {
	var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
		function adopt(value) {
			return value instanceof P
			? value
			: new P(function (resolve) {
						resolve(value);
					});
		}

		return new (P || (P = Promise))(function (resolve, reject) {
				function fulfilled(value) {
					try {
						step(generator.next(value));
					} catch(e) {
						reject(e);
					}
				}

				function rejected(value) {
					try {
						step(generator["throw"](value));
					} catch(e) {
						reject(e);
					}
				}

				function step(result) {
					result.done
					? resolve(result.value)
					: adopt(result.value).then(fulfilled, rejected);
				}

				step((generator = generator.apply(thisArg, _arguments || [])).next());
			});
	};

	
	let element;
	let { field } = $$props;
	let { value = { blocks: [] } } = $$props;
	let { onChange } = $$props;

	onMount(() => __awaiter(void 0, void 0, void 0, function* () {
		var _a, _b;

		//@ts-ignore
		import('./quill.f73e04b7.js').then(function (n) { return n.q; });

		//@ts-ignore
		import('./quill.snow.66c4fbce.js');

		const Quill = (yield import('./quill.f73e04b7.js').then(function (n) { return n.q; })).default;

		$$invalidate(2, value = (_b = formStore.getValue((_a = field.configTarget) !== null && _a !== void 0
		? _a
		: field.id)) !== null && _b !== void 0
		? _b
		: "");

		subscribeFieldChange(newField => {
			var _a;

			if (newField.id === field.id) {
				$$invalidate(2, value = (_a = newField.value) !== null && _a !== void 0
				? _a
				: "");
			}
		});

		var toolbarOptions = [
			["bold", "italic", "underline", "strike"],
			[{ list: "ordered" }, { list: "bullet" }],
			[{ header: [1, 2, 3, 4, 5, 6, false] }, { color: [] }, { align: [] }],
			["clean"]
		];

		let quill = new Quill(element,
		{
				theme: "snow",
				placeholder: "Start typing and see the preview on the left side.",
				modules: { toolbar: toolbarOptions }
			});

		//@ts-ignore
		quill.container.firstChild.innerHTML = value;

		quill.on("text-change", function (delta, oldDelta, source) {
			//@ts-ignore
			$$invalidate(1, field.value = quill.container.firstChild.innerHTML, field);

			formStore.set(field, {
				fromUser: true,
				value: field.value,
				field: "value"
			});
		});
	}));

	function div0_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			element = $$value;
			$$invalidate(0, element);
		});
	}

	$$self.$$set = $$props => {
		if ("field" in $$props) $$invalidate(1, field = $$props.field);
		if ("value" in $$props) $$invalidate(2, value = $$props.value);
		if ("onChange" in $$props) $$invalidate(3, onChange = $$props.onChange);
	};

	return [element, field, value, onChange, div0_binding];
}

class TextArea extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$c, create_fragment$c, safe_not_equal, { field: 1, value: 2, onChange: 3 });
	}
}

/* src\inputs\CheckboxGroup.svelte generated by Svelte v3.24.1 */

function get_each_context$3(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[12] = list[i];
	return child_ctx;
}

// (59:0) {#if !field.hideLabel}
function create_if_block_2$5(ctx) {
	let label;
	let current;
	label = new Label({ props: { field: /*field*/ ctx[0] } });

	return {
		c() {
			create_component(label.$$.fragment);
		},
		l(nodes) {
			claim_component(label.$$.fragment, nodes);
		},
		m(target, anchor) {
			mount_component(label, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const label_changes = {};
			if (dirty & /*field*/ 1) label_changes.field = /*field*/ ctx[0];
			label.$set(label_changes);
		},
		i(local) {
			if (current) return;
			transition_in(label.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(label.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(label, detaching);
		}
	};
}

// (62:0) {#if field.options}
function create_if_block$7(ctx) {
	let t;
	let if_block_anchor;
	let each_value = /*field*/ ctx[0].options;
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
	}

	let if_block = /*field*/ ctx[0].includeOther && create_if_block_1$5(ctx);

	return {
		c() {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t = space();
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		l(nodes) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(nodes);
			}

			t = claim_space(nodes);
			if (if_block) if_block.l(nodes);
			if_block_anchor = empty();
		},
		m(target, anchor) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			insert(target, t, anchor);
			if (if_block) if_block.m(target, anchor);
			insert(target, if_block_anchor, anchor);
		},
		p(ctx, dirty) {
			if (dirty & /*field, isChecked, onChange*/ 25) {
				each_value = /*field*/ ctx[0].options;
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$3(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block$3(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(t.parentNode, t);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}

			if (/*field*/ ctx[0].includeOther) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block_1$5(ctx);
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		d(detaching) {
			destroy_each(each_blocks, detaching);
			if (detaching) detach(t);
			if (if_block) if_block.d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

// (63:2) {#each field.options as option}
function create_each_block$3(ctx) {
	let div;
	let input;
	let input_checked_value;
	let input_id_value;
	let t0;
	let label;
	let t1_value = /*option*/ ctx[12] + "";
	let t1;
	let label_for_value;
	let mounted;
	let dispose;

	function change_handler(...args) {
		return /*change_handler*/ ctx[9](/*option*/ ctx[12], ...args);
	}

	return {
		c() {
			div = element("div");
			input = element("input");
			t0 = space();
			label = element("label");
			t1 = text(t1_value);
			this.h();
		},
		l(nodes) {
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);

			input = claim_element(div_nodes, "INPUT", {
				class: true,
				type: true,
				value: true,
				checked: true,
				id: true
			});

			t0 = claim_space(div_nodes);
			label = claim_element(div_nodes, "LABEL", { class: true, for: true });
			var label_nodes = children(label);
			t1 = claim_text(label_nodes, t1_value);
			label_nodes.forEach(detach);
			div_nodes.forEach(detach);
			this.h();
		},
		h() {
			attr(input, "class", "form-check-input");
			attr(input, "type", "checkbox");
			input.value = "";
			input.checked = input_checked_value = /*isChecked*/ ctx[4](/*option*/ ctx[12]);
			attr(input, "id", input_id_value = `${/*field*/ ctx[0].id}-${/*option*/ ctx[12]}`);
			attr(label, "class", "form-check-label");
			attr(label, "for", label_for_value = `${/*field*/ ctx[0].id}-${/*option*/ ctx[12]}`);
			attr(div, "class", "form-check");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, input);
			append(div, t0);
			append(div, label);
			append(label, t1);

			if (!mounted) {
				dispose = [
					listen(input, "click", stop_propagation(/*click_handler*/ ctx[8])),
					listen(input, "change", change_handler)
				];

				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;

			if (dirty & /*field*/ 1 && input_checked_value !== (input_checked_value = /*isChecked*/ ctx[4](/*option*/ ctx[12]))) {
				input.checked = input_checked_value;
			}

			if (dirty & /*field*/ 1 && input_id_value !== (input_id_value = `${/*field*/ ctx[0].id}-${/*option*/ ctx[12]}`)) {
				attr(input, "id", input_id_value);
			}

			if (dirty & /*field*/ 1 && t1_value !== (t1_value = /*option*/ ctx[12] + "")) set_data(t1, t1_value);

			if (dirty & /*field*/ 1 && label_for_value !== (label_for_value = `${/*field*/ ctx[0].id}-${/*option*/ ctx[12]}`)) {
				attr(label, "for", label_for_value);
			}
		},
		d(detaching) {
			if (detaching) detach(div);
			mounted = false;
			run_all(dispose);
		}
	};
}

// (69:2) {#if field.includeOther}
function create_if_block_1$5(ctx) {
	let input0;
	let input0_checked_value;
	let input0_id_value;
	let t0;
	let label;
	let t1;
	let label_for_value;
	let t2;
	let input1;
	let input1_id_value;
	let mounted;
	let dispose;

	return {
		c() {
			input0 = element("input");
			t0 = space();
			label = element("label");
			t1 = text("Other:");
			t2 = space();
			input1 = element("input");
			this.h();
		},
		l(nodes) {
			input0 = claim_element(nodes, "INPUT", {
				class: true,
				type: true,
				value: true,
				checked: true,
				id: true
			});

			t0 = claim_space(nodes);
			label = claim_element(nodes, "LABEL", { class: true, for: true });
			var label_nodes = children(label);
			t1 = claim_text(label_nodes, "Other:");
			label_nodes.forEach(detach);
			t2 = claim_space(nodes);

			input1 = claim_element(nodes, "INPUT", {
				class: true,
				type: true,
				value: true,
				id: true
			});

			this.h();
		},
		h() {
			attr(input0, "class", "form-check-input");
			attr(input0, "type", "checkbox");
			input0.value = "";
			input0.checked = input0_checked_value = /*otherText*/ ctx[1] != "";
			attr(input0, "id", input0_id_value = `${/*field*/ ctx[0].id}-other`);
			attr(label, "class", "form-check-label");
			attr(label, "for", label_for_value = `${/*field*/ ctx[0].id}-other`);
			attr(input1, "class", "form-control");
			attr(input1, "type", "text");
			input1.value = /*otherText*/ ctx[1];
			attr(input1, "id", input1_id_value = `${/*field*/ ctx[0].id}-other`);
		},
		m(target, anchor) {
			insert(target, input0, anchor);
			insert(target, t0, anchor);
			insert(target, label, anchor);
			append(label, t1);
			insert(target, t2, anchor);
			insert(target, input1, anchor);

			if (!mounted) {
				dispose = [
					listen(input0, "click", stop_propagation(/*click_handler_1*/ ctx[7])),
					listen(input1, "click", stop_propagation(/*click_handler_2*/ ctx[6])),
					listen(input1, "input", /*input_handler*/ ctx[10])
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty & /*otherText*/ 2 && input0_checked_value !== (input0_checked_value = /*otherText*/ ctx[1] != "")) {
				input0.checked = input0_checked_value;
			}

			if (dirty & /*field*/ 1 && input0_id_value !== (input0_id_value = `${/*field*/ ctx[0].id}-other`)) {
				attr(input0, "id", input0_id_value);
			}

			if (dirty & /*field*/ 1 && label_for_value !== (label_for_value = `${/*field*/ ctx[0].id}-other`)) {
				attr(label, "for", label_for_value);
			}

			if (dirty & /*otherText*/ 2 && input1.value !== /*otherText*/ ctx[1]) {
				input1.value = /*otherText*/ ctx[1];
			}

			if (dirty & /*field*/ 1 && input1_id_value !== (input1_id_value = `${/*field*/ ctx[0].id}-other`)) {
				attr(input1, "id", input1_id_value);
			}
		},
		d(detaching) {
			if (detaching) detach(input0);
			if (detaching) detach(t0);
			if (detaching) detach(label);
			if (detaching) detach(t2);
			if (detaching) detach(input1);
			mounted = false;
			run_all(dispose);
		}
	};
}

function create_fragment$d(ctx) {
	let t;
	let if_block1_anchor;
	let current;
	let if_block0 = !/*field*/ ctx[0].hideLabel && create_if_block_2$5(ctx);
	let if_block1 = /*field*/ ctx[0].options && create_if_block$7(ctx);

	return {
		c() {
			if (if_block0) if_block0.c();
			t = space();
			if (if_block1) if_block1.c();
			if_block1_anchor = empty();
		},
		l(nodes) {
			if (if_block0) if_block0.l(nodes);
			t = claim_space(nodes);
			if (if_block1) if_block1.l(nodes);
			if_block1_anchor = empty();
		},
		m(target, anchor) {
			if (if_block0) if_block0.m(target, anchor);
			insert(target, t, anchor);
			if (if_block1) if_block1.m(target, anchor);
			insert(target, if_block1_anchor, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			if (!/*field*/ ctx[0].hideLabel) {
				if (if_block0) {
					if_block0.p(ctx, dirty);

					if (dirty & /*field*/ 1) {
						transition_in(if_block0, 1);
					}
				} else {
					if_block0 = create_if_block_2$5(ctx);
					if_block0.c();
					transition_in(if_block0, 1);
					if_block0.m(t.parentNode, t);
				}
			} else if (if_block0) {
				group_outros();

				transition_out(if_block0, 1, 1, () => {
					if_block0 = null;
				});

				check_outros();
			}

			if (/*field*/ ctx[0].options) {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block$7(ctx);
					if_block1.c();
					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block0);
			current = true;
		},
		o(local) {
			transition_out(if_block0);
			current = false;
		},
		d(detaching) {
			if (if_block0) if_block0.d(detaching);
			if (detaching) detach(t);
			if (if_block1) if_block1.d(detaching);
			if (detaching) detach(if_block1_anchor);
		}
	};
}

function instance$d($$self, $$props, $$invalidate) {
	
	let { field } = $$props;
	let { value = {} } = $$props;
	let otherText = "";
	let debouncedOnChange;

	onMount(() => {
		var _a, _b, _c;

		debouncedOnChange = debounce(
			field => {
				formStore.set(field, {
					fromUser: true,
					field: "value",
					value: field.value
				});
			},
			500
		);

		$$invalidate(5, value = (_b = formStore.getValue((_a = field.configTarget) !== null && _a !== void 0
		? _a
		: field.id)) !== null && _b !== void 0
		? _b
		: {});

		$$invalidate(1, otherText = (_c = value.other) !== null && _c !== void 0 ? _c : "");

		subscribeFieldChange(newField => {
			var _a, _b;

			if (newField.id === field.id) {
				$$invalidate(5, value = (_a = newField.value) !== null && _a !== void 0
				? _a
				: {});

				$$invalidate(1, otherText = (_b = value.other) !== null && _b !== void 0 ? _b : "");
			}
		});
	});

	function onOtherChange(e) {
		$$invalidate(1, otherText = e.target.value);

		if (otherText === "" || otherText == null) {
			delete value.other;
		} else {
			$$invalidate(
				5,
				value.other = otherText !== null && otherText !== void 0
				? otherText
				: "",
				value
			);
		}

		$$invalidate(0, field.value = value, field);
		debouncedOnChange(field);
	}

	function onChange(e, option) {
		e.stopPropagation();

		if (e.target.checked) {
			$$invalidate(5, value[option] = option, value);
		} else {
			delete value[option];
		}

		$$invalidate(0, field.value = value, field);

		formStore.set(field, {
			fromUser: true,
			field: "value",
			value: field.value
		});
	}

	function isChecked(option) {
		return value[option] != null && value[option] != "";
	}

	function click_handler_2(event) {
		bubble($$self, event);
	}

	function click_handler_1(event) {
		bubble($$self, event);
	}

	function click_handler(event) {
		bubble($$self, event);
	}

	const change_handler = (option, e) => onChange(e, option);
	const input_handler = e => onOtherChange(e);

	$$self.$$set = $$props => {
		if ("field" in $$props) $$invalidate(0, field = $$props.field);
		if ("value" in $$props) $$invalidate(5, value = $$props.value);
	};

	return [
		field,
		otherText,
		onOtherChange,
		onChange,
		isChecked,
		value,
		click_handler_2,
		click_handler_1,
		click_handler,
		change_handler,
		input_handler
	];
}

class CheckboxGroup extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$d, create_fragment$d, safe_not_equal, { field: 0, value: 5 });
	}
}

/* src\inputs\Spacer.svelte generated by Svelte v3.24.1 */

function create_fragment$e(ctx) {
	let div;
	let div_style_value;

	return {
		c() {
			div = element("div");
			this.h();
		},
		l(nodes) {
			div = claim_element(nodes, "DIV", { style: true });
			children(div).forEach(detach);
			this.h();
		},
		h() {
			attr(div, "style", div_style_value = `margin-bottom:${/*value*/ ctx[0]}em`);
		},
		m(target, anchor) {
			insert(target, div, anchor);
		},
		p(ctx, [dirty]) {
			if (dirty & /*value*/ 1 && div_style_value !== (div_style_value = `margin-bottom:${/*value*/ ctx[0]}em`)) {
				attr(div, "style", div_style_value);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

function instance$e($$self, $$props, $$invalidate) {
	
	let { field } = $$props;
	let { value = 0 } = $$props;

	onMount(() => {
		subscribeFieldChange(newField => {
			var _a;

			if (newField.id === field.id) {
				$$invalidate(0, value = toNumberOrDefault((_a = newField.value) !== null && _a !== void 0 ? _a : 1));
			}
		});
	});

	$$self.$$set = $$props => {
		if ("field" in $$props) $$invalidate(1, field = $$props.field);
		if ("value" in $$props) $$invalidate(0, value = $$props.value);
	};

	return [value, field];
}

class Spacer extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$e, create_fragment$e, safe_not_equal, { field: 1, value: 0 });
	}
}

/* src\inputs\RadioGroup.svelte generated by Svelte v3.24.1 */

function get_each_context$4(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[14] = list[i];
	return child_ctx;
}

// (69:0) {#if !field.hideLabel}
function create_if_block_2$6(ctx) {
	let label;
	let current;
	label = new Label({ props: { field: /*field*/ ctx[0] } });

	return {
		c() {
			create_component(label.$$.fragment);
		},
		l(nodes) {
			claim_component(label.$$.fragment, nodes);
		},
		m(target, anchor) {
			mount_component(label, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const label_changes = {};
			if (dirty & /*field*/ 1) label_changes.field = /*field*/ ctx[0];
			label.$set(label_changes);
		},
		i(local) {
			if (current) return;
			transition_in(label.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(label.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(label, detaching);
		}
	};
}

// (72:0) {#if field.options}
function create_if_block$8(ctx) {
	let t;
	let if_block_anchor;
	let each_value = /*field*/ ctx[0].options;
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$4(get_each_context$4(ctx, each_value, i));
	}

	let if_block = /*field*/ ctx[0].includeOther && create_if_block_1$6(ctx);

	return {
		c() {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t = space();
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		l(nodes) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(nodes);
			}

			t = claim_space(nodes);
			if (if_block) if_block.l(nodes);
			if_block_anchor = empty();
		},
		m(target, anchor) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			insert(target, t, anchor);
			if (if_block) if_block.m(target, anchor);
			insert(target, if_block_anchor, anchor);
		},
		p(ctx, dirty) {
			if (dirty & /*field, isChecked, onChange*/ 97) {
				each_value = /*field*/ ctx[0].options;
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$4(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block$4(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(t.parentNode, t);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}

			if (/*field*/ ctx[0].includeOther) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block_1$6(ctx);
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		d(detaching) {
			destroy_each(each_blocks, detaching);
			if (detaching) detach(t);
			if (if_block) if_block.d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

// (73:2) {#each field.options as option}
function create_each_block$4(ctx) {
	let div;
	let input;
	let input_checked_value;
	let input_id_value;
	let t0;
	let label;
	let t1_value = /*option*/ ctx[14] + "";
	let t1;
	let label_for_value;
	let mounted;
	let dispose;

	function change_handler(...args) {
		return /*change_handler*/ ctx[11](/*option*/ ctx[14], ...args);
	}

	return {
		c() {
			div = element("div");
			input = element("input");
			t0 = space();
			label = element("label");
			t1 = text(t1_value);
			this.h();
		},
		l(nodes) {
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);

			input = claim_element(div_nodes, "INPUT", {
				class: true,
				type: true,
				value: true,
				checked: true,
				id: true
			});

			t0 = claim_space(div_nodes);
			label = claim_element(div_nodes, "LABEL", { class: true, for: true });
			var label_nodes = children(label);
			t1 = claim_text(label_nodes, t1_value);
			label_nodes.forEach(detach);
			div_nodes.forEach(detach);
			this.h();
		},
		h() {
			attr(input, "class", "form-check-input");
			attr(input, "type", "radio");
			input.value = "";
			input.checked = input_checked_value = /*isChecked*/ ctx[6](/*option*/ ctx[14]);
			attr(input, "id", input_id_value = `${/*field*/ ctx[0].id}-${/*option*/ ctx[14]}`);
			attr(label, "class", "form-check-label");
			attr(label, "for", label_for_value = `${/*field*/ ctx[0].id}-${/*option*/ ctx[14]}`);
			attr(div, "class", "form-check");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, input);
			append(div, t0);
			append(div, label);
			append(label, t1);

			if (!mounted) {
				dispose = [
					listen(input, "click", stop_propagation(/*click_handler*/ ctx[10])),
					listen(input, "change", change_handler)
				];

				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;

			if (dirty & /*field*/ 1 && input_checked_value !== (input_checked_value = /*isChecked*/ ctx[6](/*option*/ ctx[14]))) {
				input.checked = input_checked_value;
			}

			if (dirty & /*field*/ 1 && input_id_value !== (input_id_value = `${/*field*/ ctx[0].id}-${/*option*/ ctx[14]}`)) {
				attr(input, "id", input_id_value);
			}

			if (dirty & /*field*/ 1 && t1_value !== (t1_value = /*option*/ ctx[14] + "")) set_data(t1, t1_value);

			if (dirty & /*field*/ 1 && label_for_value !== (label_for_value = `${/*field*/ ctx[0].id}-${/*option*/ ctx[14]}`)) {
				attr(label, "for", label_for_value);
			}
		},
		d(detaching) {
			if (detaching) detach(div);
			mounted = false;
			run_all(dispose);
		}
	};
}

// (79:2) {#if field.includeOther}
function create_if_block_1$6(ctx) {
	let input0;
	let input0_id_value;
	let t0;
	let label;
	let t1;
	let label_for_value;
	let t2;
	let input1;
	let input1_id_value;
	let mounted;
	let dispose;

	return {
		c() {
			input0 = element("input");
			t0 = space();
			label = element("label");
			t1 = text("Other:");
			t2 = space();
			input1 = element("input");
			this.h();
		},
		l(nodes) {
			input0 = claim_element(nodes, "INPUT", {
				class: true,
				type: true,
				value: true,
				checked: true,
				id: true
			});

			t0 = claim_space(nodes);
			label = claim_element(nodes, "LABEL", { class: true, for: true });
			var label_nodes = children(label);
			t1 = claim_text(label_nodes, "Other:");
			label_nodes.forEach(detach);
			t2 = claim_space(nodes);

			input1 = claim_element(nodes, "INPUT", {
				class: true,
				type: true,
				value: true,
				id: true
			});

			this.h();
		},
		h() {
			attr(input0, "class", "form-check-input");
			attr(input0, "type", "radio");
			input0.value = "";
			input0.checked = /*otherSelected*/ ctx[2];
			attr(input0, "id", input0_id_value = `${/*field*/ ctx[0].id}-other`);
			attr(label, "class", "form-check-label");
			attr(label, "for", label_for_value = `${/*field*/ ctx[0].id}-other`);
			attr(input1, "class", "form-control");
			attr(input1, "type", "text");
			input1.value = /*otherText*/ ctx[1];
			attr(input1, "id", input1_id_value = `${/*field*/ ctx[0].id}-other`);
		},
		m(target, anchor) {
			insert(target, input0, anchor);
			insert(target, t0, anchor);
			insert(target, label, anchor);
			append(label, t1);
			insert(target, t2, anchor);
			insert(target, input1, anchor);

			if (!mounted) {
				dispose = [
					listen(input0, "click", stop_propagation(/*click_handler_1*/ ctx[9])),
					listen(input0, "click", /*onOtherRadioChange*/ ctx[4]),
					listen(input1, "click", stop_propagation(/*click_handler_2*/ ctx[8])),
					listen(input1, "input", /*input_handler*/ ctx[12])
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty & /*otherSelected*/ 4) {
				input0.checked = /*otherSelected*/ ctx[2];
			}

			if (dirty & /*field*/ 1 && input0_id_value !== (input0_id_value = `${/*field*/ ctx[0].id}-other`)) {
				attr(input0, "id", input0_id_value);
			}

			if (dirty & /*field*/ 1 && label_for_value !== (label_for_value = `${/*field*/ ctx[0].id}-other`)) {
				attr(label, "for", label_for_value);
			}

			if (dirty & /*otherText*/ 2 && input1.value !== /*otherText*/ ctx[1]) {
				input1.value = /*otherText*/ ctx[1];
			}

			if (dirty & /*field*/ 1 && input1_id_value !== (input1_id_value = `${/*field*/ ctx[0].id}-other`)) {
				attr(input1, "id", input1_id_value);
			}
		},
		d(detaching) {
			if (detaching) detach(input0);
			if (detaching) detach(t0);
			if (detaching) detach(label);
			if (detaching) detach(t2);
			if (detaching) detach(input1);
			mounted = false;
			run_all(dispose);
		}
	};
}

function create_fragment$f(ctx) {
	let t;
	let if_block1_anchor;
	let current;
	let if_block0 = !/*field*/ ctx[0].hideLabel && create_if_block_2$6(ctx);
	let if_block1 = /*field*/ ctx[0].options && create_if_block$8(ctx);

	return {
		c() {
			if (if_block0) if_block0.c();
			t = space();
			if (if_block1) if_block1.c();
			if_block1_anchor = empty();
		},
		l(nodes) {
			if (if_block0) if_block0.l(nodes);
			t = claim_space(nodes);
			if (if_block1) if_block1.l(nodes);
			if_block1_anchor = empty();
		},
		m(target, anchor) {
			if (if_block0) if_block0.m(target, anchor);
			insert(target, t, anchor);
			if (if_block1) if_block1.m(target, anchor);
			insert(target, if_block1_anchor, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			if (!/*field*/ ctx[0].hideLabel) {
				if (if_block0) {
					if_block0.p(ctx, dirty);

					if (dirty & /*field*/ 1) {
						transition_in(if_block0, 1);
					}
				} else {
					if_block0 = create_if_block_2$6(ctx);
					if_block0.c();
					transition_in(if_block0, 1);
					if_block0.m(t.parentNode, t);
				}
			} else if (if_block0) {
				group_outros();

				transition_out(if_block0, 1, 1, () => {
					if_block0 = null;
				});

				check_outros();
			}

			if (/*field*/ ctx[0].options) {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block$8(ctx);
					if_block1.c();
					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block0);
			current = true;
		},
		o(local) {
			transition_out(if_block0);
			current = false;
		},
		d(detaching) {
			if (if_block0) if_block0.d(detaching);
			if (detaching) detach(t);
			if (if_block1) if_block1.d(detaching);
			if (detaching) detach(if_block1_anchor);
		}
	};
}

function instance$f($$self, $$props, $$invalidate) {
	
	let { field } = $$props;
	let { value = {} } = $$props;
	let otherText = "";
	let debouncedOnChange;
	let otherSelected = false;

	onMount(() => {
		var _a, _b, _c;

		debouncedOnChange = debounce(
			field => {
				formStore.set(field, {
					fromUser: true,
					field: "value",
					value: field.value
				});
			},
			500
		);

		$$invalidate(7, value = (_b = formStore.getValue((_a = field.configTarget) !== null && _a !== void 0
		? _a
		: field.id)) !== null && _b !== void 0
		? _b
		: {});

		$$invalidate(1, otherText = (_c = value.other) !== null && _c !== void 0 ? _c : "");
		$$invalidate(2, otherSelected = otherText != null && otherText != "");

		subscribeFieldChange(newField => {
			var _a, _b;

			if (newField.id === field.id) {
				$$invalidate(7, value = (_a = newField.value) !== null && _a !== void 0
				? _a
				: {});

				if (otherText && !value.other) {
					return;
				}

				$$invalidate(1, otherText = (_b = value.other) !== null && _b !== void 0 ? _b : "");
			}
		});
	});

	function onOtherChange(e) {
		$$invalidate(1, otherText = e.target.value);
		$$invalidate(7, value = {});

		if (otherText != "" && otherText != null) {
			$$invalidate(7, value.other = otherText, value);
		}

		$$invalidate(0, field.value = value, field);
		debouncedOnChange(field);
	}

	function onOtherRadioChange() {
		$$invalidate(2, otherSelected = true);
		$$invalidate(7, value = { other: otherText });
		$$invalidate(0, field.value = value, field);

		formStore.set(field, {
			fromUser: true,
			field: "value",
			value: field.value
		});
	}

	function onChange(e, option) {
		e.stopPropagation();
		$$invalidate(7, value = {});
		$$invalidate(7, value[option] = option, value);
		$$invalidate(2, otherSelected = false);
		$$invalidate(0, field.value = value, field);

		formStore.set(field, {
			fromUser: true,
			field: "value",
			value: field.value
		});
	}

	function isChecked(option) {
		return value[option] != null && value[option] != "";
	}

	function click_handler_2(event) {
		bubble($$self, event);
	}

	function click_handler_1(event) {
		bubble($$self, event);
	}

	function click_handler(event) {
		bubble($$self, event);
	}

	const change_handler = (option, e) => onChange(e, option);
	const input_handler = e => onOtherChange(e);

	$$self.$$set = $$props => {
		if ("field" in $$props) $$invalidate(0, field = $$props.field);
		if ("value" in $$props) $$invalidate(7, value = $$props.value);
	};

	return [
		field,
		otherText,
		otherSelected,
		onOtherChange,
		onOtherRadioChange,
		onChange,
		isChecked,
		value,
		click_handler_2,
		click_handler_1,
		click_handler,
		change_handler,
		input_handler
	];
}

class RadioGroup extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$f, create_fragment$f, safe_not_equal, { field: 0, value: 7 });
	}
}

/* src\inputs\RichTextDisplay.svelte generated by Svelte v3.24.1 */

function create_else_block$4(ctx) {
	let div1;
	let div0;
	let span;
	let t;

	return {
		c() {
			div1 = element("div");
			div0 = element("div");
			span = element("span");
			t = text("Loading...");
			this.h();
		},
		l(nodes) {
			div1 = claim_element(nodes, "DIV", { class: true });
			var div1_nodes = children(div1);
			div0 = claim_element(div1_nodes, "DIV", { class: true, role: true });
			var div0_nodes = children(div0);
			span = claim_element(div0_nodes, "SPAN", { class: true });
			var span_nodes = children(span);
			t = claim_text(span_nodes, "Loading...");
			span_nodes.forEach(detach);
			div0_nodes.forEach(detach);
			div1_nodes.forEach(detach);
			this.h();
		},
		h() {
			attr(span, "class", "sr-only");
			attr(div0, "class", "spinner-border text-dark");
			attr(div0, "role", "status");
			attr(div1, "class", "d-flex justify-content-center");
		},
		m(target, anchor) {
			insert(target, div1, anchor);
			append(div1, div0);
			append(div0, span);
			append(span, t);
		},
		p: noop,
		d(detaching) {
			if (detaching) detach(div1);
		}
	};
}

// (70:39) 
function create_if_block_2$7(ctx) {
	let p;
	let t;

	return {
		c() {
			p = element("p");
			t = text("Failed to load content.");
		},
		l(nodes) {
			p = claim_element(nodes, "P", {});
			var p_nodes = children(p);
			t = claim_text(p_nodes, "Failed to load content.");
			p_nodes.forEach(detach);
		},
		m(target, anchor) {
			insert(target, p, anchor);
			append(p, t);
		},
		p: noop,
		d(detaching) {
			if (detaching) detach(p);
		}
	};
}

// (68:41) 
function create_if_block_1$7(ctx) {
	let html_tag;
	let html_anchor;

	return {
		c() {
			html_anchor = empty();
			this.h();
		},
		l(nodes) {
			html_anchor = empty();
			this.h();
		},
		h() {
			html_tag = new HtmlTag(html_anchor);
		},
		m(target, anchor) {
			html_tag.m(/*value*/ ctx[1], target, anchor);
			insert(target, html_anchor, anchor);
		},
		p(ctx, dirty) {
			if (dirty & /*value*/ 2) html_tag.p(/*value*/ ctx[1]);
		},
		d(detaching) {
			if (detaching) detach(html_anchor);
			if (detaching) html_tag.d();
		}
	};
}

// (65:2) {#if isPreview && (value === '' || value == null)}
function create_if_block$9(ctx) {
	let h5;
	let t0;
	let t1;
	let p;
	let t2;

	return {
		c() {
			h5 = element("h5");
			t0 = text("Content Placeholder");
			t1 = space();
			p = element("p");
			t2 = text("From the field configuration settings, select a content block to display.");
			this.h();
		},
		l(nodes) {
			h5 = claim_element(nodes, "H5", {});
			var h5_nodes = children(h5);
			t0 = claim_text(h5_nodes, "Content Placeholder");
			h5_nodes.forEach(detach);
			t1 = claim_space(nodes);
			p = claim_element(nodes, "P", { style: true });
			var p_nodes = children(p);
			t2 = claim_text(p_nodes, "From the field configuration settings, select a content block to display.");
			p_nodes.forEach(detach);
			this.h();
		},
		h() {
			set_style(p, "margin-block-end", "0");
		},
		m(target, anchor) {
			insert(target, h5, anchor);
			append(h5, t0);
			insert(target, t1, anchor);
			insert(target, p, anchor);
			append(p, t2);
		},
		p: noop,
		d(detaching) {
			if (detaching) detach(h5);
			if (detaching) detach(t1);
			if (detaching) detach(p);
		}
	};
}

function create_fragment$g(ctx) {
	let div;

	function select_block_type(ctx, dirty) {
		if (/*isPreview*/ ctx[0] && (/*value*/ ctx[1] === "" || /*value*/ ctx[1] == null)) return create_if_block$9;
		if (/*state*/ ctx[2] === LoadState.Finished) return create_if_block_1$7;
		if (/*state*/ ctx[2] === LoadState.Failed) return create_if_block_2$7;
		return create_else_block$4;
	}

	let current_block_type = select_block_type(ctx);
	let if_block = current_block_type(ctx);

	return {
		c() {
			div = element("div");
			if_block.c();
		},
		l(nodes) {
			div = claim_element(nodes, "DIV", {});
			var div_nodes = children(div);
			if_block.l(div_nodes);
			div_nodes.forEach(detach);
		},
		m(target, anchor) {
			insert(target, div, anchor);
			if_block.m(div, null);
		},
		p(ctx, [dirty]) {
			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
				if_block.p(ctx, dirty);
			} else {
				if_block.d(1);
				if_block = current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(div, null);
				}
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
			if_block.d();
		}
	};
}

function instance$g($$self, $$props, $$invalidate) {
	var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
		function adopt(value) {
			return value instanceof P
			? value
			: new P(function (resolve) {
						resolve(value);
					});
		}

		return new (P || (P = Promise))(function (resolve, reject) {
				function fulfilled(value) {
					try {
						step(generator.next(value));
					} catch(e) {
						reject(e);
					}
				}

				function rejected(value) {
					try {
						step(generator["throw"](value));
					} catch(e) {
						reject(e);
					}
				}

				function step(result) {
					result.done
					? resolve(result.value)
					: adopt(result.value).then(fulfilled, rejected);
				}

				step((generator = generator.apply(thisArg, _arguments || [])).next());
			});
	};

	
	let { field } = $$props;
	let { isPreview = false } = $$props;
	let value = "";
	let lastUrl = "";
	let state = LoadState.NotStarted;

	onMount(() => __awaiter(void 0, void 0, void 0, function* () {
		var _a;

		let url = formStore.getValue((_a = field.configTarget) !== null && _a !== void 0
		? _a
		: field.id);

		subscribeFieldChange(newField => {
			if (newField.id === field.id && lastUrl !== newField.value) {
				url = newField.value;
				load(url);
			}
		});

		load(url);
	}));

	function load(url) {
		return __awaiter(this, void 0, void 0, function* () {
			$$invalidate(2, state = LoadState.Loading);

			try {
				if (!url) {
					return;
				}

				if (!isString(url)) {
					return;
				}

				if (url.startsWith("http")) {
					lastUrl = url;
					const response = yield fetch(url);
					const html = yield response.text();
					$$invalidate(1, value = html !== null && html !== void 0 ? html : "");
				} else {
					$$invalidate(1, value = url);
				}
			} catch(ex) {
				$$invalidate(2, state = LoadState.Failed);
			} finally {
				if (state !== LoadState.Failed) {
					$$invalidate(2, state = LoadState.Finished);
				}
			}
		});
	}

	$$self.$$set = $$props => {
		if ("field" in $$props) $$invalidate(3, field = $$props.field);
		if ("isPreview" in $$props) $$invalidate(0, isPreview = $$props.isPreview);
	};

	return [isPreview, value, state, field];
}

class RichTextDisplay extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$g, create_fragment$g, safe_not_equal, { field: 3, isPreview: 0 });
	}
}

/* src\inputs\Switch.svelte generated by Svelte v3.24.1 */

function create_fragment$h(ctx) {
	let div;
	let input;
	let input_id_value;
	let t0;
	let label;
	let t1_value = firstNotEmpty(/*field*/ ctx[0].label, /*field*/ ctx[0].name) + "";
	let t1;
	let label_for_value;
	let mounted;
	let dispose;

	return {
		c() {
			div = element("div");
			input = element("input");
			t0 = space();
			label = element("label");
			t1 = text(t1_value);
			this.h();
		},
		l(nodes) {
			div = claim_element(nodes, "DIV", { class: true, style: true });
			var div_nodes = children(div);

			input = claim_element(div_nodes, "INPUT", {
				class: true,
				type: true,
				id: true,
				checked: true
			});

			t0 = claim_space(div_nodes);
			label = claim_element(div_nodes, "LABEL", { class: true, for: true, style: true });
			var label_nodes = children(label);
			t1 = claim_text(label_nodes, t1_value);
			label_nodes.forEach(detach);
			div_nodes.forEach(detach);
			this.h();
		},
		h() {
			attr(input, "class", "form-check-input");
			attr(input, "type", "checkbox");
			attr(input, "id", input_id_value = `${/*field*/ ctx[0].id}`);
			input.checked = /*value*/ ctx[1];
			attr(label, "class", "form-check-label");
			attr(label, "for", label_for_value = `${/*field*/ ctx[0].id}`);
			set_style(label, "padding-top", "0.16em");
			attr(div, "class", "form-check form-switch");
			set_style(div, "margin-bottom", "0");
			set_style(div, "vertical-align", "middle");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, input);
			append(div, t0);
			append(div, label);
			append(label, t1);

			if (!mounted) {
				dispose = [
					listen(input, "click", stop_propagation(/*click_handler*/ ctx[3])),
					listen(input, "input", /*input_handler*/ ctx[4])
				];

				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (dirty & /*field*/ 1 && input_id_value !== (input_id_value = `${/*field*/ ctx[0].id}`)) {
				attr(input, "id", input_id_value);
			}

			if (dirty & /*value*/ 2) {
				input.checked = /*value*/ ctx[1];
			}

			if (dirty & /*field*/ 1 && t1_value !== (t1_value = firstNotEmpty(/*field*/ ctx[0].label, /*field*/ ctx[0].name) + "")) set_data(t1, t1_value);

			if (dirty & /*field*/ 1 && label_for_value !== (label_for_value = `${/*field*/ ctx[0].id}`)) {
				attr(label, "for", label_for_value);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
			mounted = false;
			run_all(dispose);
		}
	};
}

function instance$h($$self, $$props, $$invalidate) {
	
	let { config } = $$props;
	let { field } = $$props;
	let { value = undefined } = $$props;

	onMount(() => {
		var _a;

		$$invalidate(1, value = formStore.getValue((_a = field.configTarget) !== null && _a !== void 0
		? _a
		: field.id));

		subscribeFieldChange((newField, change) => {
			if (newField.id === field.id) {
				if (change.field === "defaultValue") {
					$$invalidate(1, value = newField.defaultValue);
				} else {
					$$invalidate(1, value = newField.value);
				}
			}
		});
	});

	function click_handler(event) {
		bubble($$self, event);
	}

	const input_handler = e => {
		e.preventDefault();
		e.stopPropagation();
		$$invalidate(0, field.value = e.target.checked, field);

		formStore.set(field, {
			fromUser: true,
			value: field.value,
			field: "value"
		});

		field.onChange?.(field.value);
	};

	$$self.$$set = $$props => {
		if ("config" in $$props) $$invalidate(2, config = $$props.config);
		if ("field" in $$props) $$invalidate(0, field = $$props.field);
		if ("value" in $$props) $$invalidate(1, value = $$props.value);
	};

	return [field, value, config, click_handler, input_handler];
}

class Switch extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$h, create_fragment$h, safe_not_equal, { config: 2, field: 0, value: 1 });
	}
}

/* src\components\DatePicker.svelte generated by Svelte v3.24.1 */

function create_fragment$i(ctx) {
	let label;
	let t;
	let input;
	let input_id_value;
	let input_value_value;
	let current;
	label = new Label({ props: { field: /*field*/ ctx[0] } });

	return {
		c() {
			create_component(label.$$.fragment);
			t = space();
			input = element("input");
			this.h();
		},
		l(nodes) {
			claim_component(label.$$.fragment, nodes);
			t = claim_space(nodes);

			input = claim_element(nodes, "INPUT", {
				id: true,
				type: true,
				class: true,
				value: true,
				placeholder: true
			});

			this.h();
		},
		h() {
			attr(input, "id", input_id_value = /*field*/ ctx[0].id);
			attr(input, "type", "text");
			attr(input, "class", "form-control date-input-hidden svelte-ig8nfp");
			input.value = input_value_value = /*value*/ ctx[1] ?? "";
			attr(input, "placeholder", "Select a date...");
		},
		m(target, anchor) {
			mount_component(label, target, anchor);
			insert(target, t, anchor);
			insert(target, input, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			const label_changes = {};
			if (dirty & /*field*/ 1) label_changes.field = /*field*/ ctx[0];
			label.$set(label_changes);

			if (!current || dirty & /*field*/ 1 && input_id_value !== (input_id_value = /*field*/ ctx[0].id)) {
				attr(input, "id", input_id_value);
			}

			if (!current || dirty & /*value*/ 2 && input_value_value !== (input_value_value = /*value*/ ctx[1] ?? "") && input.value !== input_value_value) {
				input.value = input_value_value;
			}
		},
		i(local) {
			if (current) return;
			transition_in(label.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(label.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(label, detaching);
			if (detaching) detach(t);
			if (detaching) detach(input);
		}
	};
}

function instance$i($$self, $$props, $$invalidate) {
	var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
		function adopt(value) {
			return value instanceof P
			? value
			: new P(function (resolve) {
						resolve(value);
					});
		}

		return new (P || (P = Promise))(function (resolve, reject) {
				function fulfilled(value) {
					try {
						step(generator.next(value));
					} catch(e) {
						reject(e);
					}
				}

				function rejected(value) {
					try {
						step(generator["throw"](value));
					} catch(e) {
						reject(e);
					}
				}

				function step(result) {
					result.done
					? resolve(result.value)
					: adopt(result.value).then(fulfilled, rejected);
				}

				step((generator = generator.apply(thisArg, _arguments || [])).next());
			});
	};

	
	let { field } = $$props;
	let value = "";
	let picker;

	onMount(() => __awaiter(void 0, void 0, void 0, function* () {
		const flatpickr = yield import('./flatpickr.950788e8.js').then(function (n) { return n.f; });

		//@ts-ignore
		import('./flatpickr.min.f8d48a29.js');

		picker = flatpickr.default(document.getElementById(field.id), {
			onChange: (selectedDates, dateStr, instance) => {
				$$invalidate(1, value = dateStr);
			},
			altInput: true,
			altFormat: "F j, Y h:i K",
			dateFormat: "Y-m-d h:i K",
			enableTime: true
		});
	}));

	$$self.$$set = $$props => {
		if ("field" in $$props) $$invalidate(0, field = $$props.field);
	};

	return [field, value];
}

class DatePicker extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$i, create_fragment$i, safe_not_equal, { field: 0 });
	}
}

/* src\inputs\FileUpload.svelte generated by Svelte v3.24.1 */

function create_else_block$5(ctx) {
	let div;
	let input;
	let input_id_value;
	let t0;
	let label;
	let span0;
	let t1;
	let t2;
	let span1;
	let t3;
	let mounted;
	let dispose;

	return {
		c() {
			div = element("div");
			input = element("input");
			t0 = space();
			label = element("label");
			span0 = element("span");
			t1 = text(/*placeholder*/ ctx[2]);
			t2 = space();
			span1 = element("span");
			t3 = text("Browse");
			this.h();
		},
		l(nodes) {
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);
			input = claim_element(div_nodes, "INPUT", { type: true, class: true, id: true });
			t0 = claim_space(div_nodes);
			label = claim_element(div_nodes, "LABEL", { class: true, for: true });
			var label_nodes = children(label);
			span0 = claim_element(label_nodes, "SPAN", { class: true });
			var span0_nodes = children(span0);
			t1 = claim_text(span0_nodes, /*placeholder*/ ctx[2]);
			span0_nodes.forEach(detach);
			t2 = claim_space(label_nodes);
			span1 = claim_element(label_nodes, "SPAN", { class: true });
			var span1_nodes = children(span1);
			t3 = claim_text(span1_nodes, "Browse");
			span1_nodes.forEach(detach);
			label_nodes.forEach(detach);
			div_nodes.forEach(detach);
			this.h();
		},
		h() {
			attr(input, "type", "file");
			attr(input, "class", "form-file-input svelte-bhgfry");
			attr(input, "id", input_id_value = `${/*field*/ ctx[0].id}-file-input`);
			attr(span0, "class", "form-file-text");
			attr(span1, "class", "form-file-button");
			attr(label, "class", "form-file-label");
			attr(label, "for", "customFile");
			attr(div, "class", "form-file");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, input);
			append(div, t0);
			append(div, label);
			append(label, span0);
			append(span0, t1);
			append(label, t2);
			append(label, span1);
			append(span1, t3);

			if (!mounted) {
				dispose = [
					listen(input, "change", /*input_change_handler*/ ctx[8]),
					listen(input, "click", stop_propagation(/*click_handler_2*/ ctx[7])),
					listen(div, "click", stop_propagation(/*click_handler_1*/ ctx[6]))
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty & /*field*/ 1 && input_id_value !== (input_id_value = `${/*field*/ ctx[0].id}-file-input`)) {
				attr(input, "id", input_id_value);
			}

			if (dirty & /*placeholder*/ 4) set_data(t1, /*placeholder*/ ctx[2]);
		},
		d(detaching) {
			if (detaching) detach(div);
			mounted = false;
			run_all(dispose);
		}
	};
}

// (49:0) {#if hasFile}
function create_if_block$a(ctx) {
	let div;
	let input;
	let input_aria_label_value;
	let t0;
	let span;
	let t1;
	let mounted;
	let dispose;

	return {
		c() {
			div = element("div");
			input = element("input");
			t0 = space();
			span = element("span");
			t1 = text("Clear File");
			this.h();
		},
		l(nodes) {
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);

			input = claim_element(div_nodes, "INPUT", {
				type: true,
				class: true,
				placeholder: true,
				value: true,
				readonly: true,
				"aria-label": true,
				"aria-describedby": true
			});

			t0 = claim_space(div_nodes);
			span = claim_element(div_nodes, "SPAN", { class: true });
			var span_nodes = children(span);
			t1 = claim_text(span_nodes, "Clear File");
			span_nodes.forEach(detach);
			div_nodes.forEach(detach);
			this.h();
		},
		h() {
			attr(input, "type", "text");
			attr(input, "class", "form-control");
			attr(input, "placeholder", /*placeholder*/ ctx[2]);
			input.value = /*placeholder*/ ctx[2];
			input.readOnly = true;
			attr(input, "aria-label", input_aria_label_value = "Uploaded file");
			attr(input, "aria-describedby", "basic-addon2");
			attr(span, "class", "input-group-text form-file-button");
			attr(div, "class", "input-group");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, input);
			append(div, t0);
			append(div, span);
			append(span, t1);

			if (!mounted) {
				dispose = [
					listen(span, "click", stop_propagation(/*clear*/ ctx[4])),
					listen(div, "click", stop_propagation(/*click_handler*/ ctx[5]))
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty & /*placeholder*/ 4) {
				attr(input, "placeholder", /*placeholder*/ ctx[2]);
			}

			if (dirty & /*placeholder*/ 4 && input.value !== /*placeholder*/ ctx[2]) {
				input.value = /*placeholder*/ ctx[2];
			}
		},
		d(detaching) {
			if (detaching) detach(div);
			mounted = false;
			run_all(dispose);
		}
	};
}

function create_fragment$j(ctx) {
	let label;
	let t;
	let if_block_anchor;
	let current;
	label = new Label({ props: { field: /*field*/ ctx[0] } });

	function select_block_type(ctx, dirty) {
		if (/*hasFile*/ ctx[3]) return create_if_block$a;
		return create_else_block$5;
	}

	let current_block_type = select_block_type(ctx);
	let if_block = current_block_type(ctx);

	return {
		c() {
			create_component(label.$$.fragment);
			t = space();
			if_block.c();
			if_block_anchor = empty();
		},
		l(nodes) {
			claim_component(label.$$.fragment, nodes);
			t = claim_space(nodes);
			if_block.l(nodes);
			if_block_anchor = empty();
		},
		m(target, anchor) {
			mount_component(label, target, anchor);
			insert(target, t, anchor);
			if_block.m(target, anchor);
			insert(target, if_block_anchor, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			const label_changes = {};
			if (dirty & /*field*/ 1) label_changes.field = /*field*/ ctx[0];
			label.$set(label_changes);

			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
				if_block.p(ctx, dirty);
			} else {
				if_block.d(1);
				if_block = current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			}
		},
		i(local) {
			if (current) return;
			transition_in(label.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(label.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(label, detaching);
			if (detaching) detach(t);
			if_block.d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

function instance$j($$self, $$props, $$invalidate) {
	
	let { field } = $$props;
	let files;
	let placeholder = "Choose a file...";
	let hasFile = false;
	let fileId = "";

	onMount(() => {
		$$invalidate(2, placeholder = firstNotEmpty(field.placeholder, "Choose a file..."));
	});

	function clear() {
		if (files) {
			$$invalidate(3, hasFile = false);
			$$invalidate(2, placeholder = firstNotEmpty(field.placeholder, "Choose a file..."));
			$$invalidate(1, files = undefined);
			formStore.clearFile(fileId);
			fileId = "";
			$$invalidate(0, field.value = undefined, field);

			formStore.set(field, {
				field: "value",
				value: undefined,
				fromUser: true
			});
		}
	}

	afterUpdate(() => {
		if (files && files[0] && !hasFile) {
			$$invalidate(3, hasFile = true);
			$$invalidate(2, placeholder = files[0].name);
			fileId = randomString();
			formStore.setFile(fileId, files[0]);
			$$invalidate(0, field.value = fileId, field);

			formStore.set(field, {
				field: "value",
				value: fileId,
				fromUser: true
			});
		}
	});

	function click_handler(event) {
		bubble($$self, event);
	}

	function click_handler_1(event) {
		bubble($$self, event);
	}

	function click_handler_2(event) {
		bubble($$self, event);
	}

	function input_change_handler() {
		files = this.files;
		$$invalidate(1, files);
	}

	$$self.$$set = $$props => {
		if ("field" in $$props) $$invalidate(0, field = $$props.field);
	};

	return [
		field,
		files,
		placeholder,
		hasFile,
		clear,
		click_handler,
		click_handler_1,
		click_handler_2,
		input_change_handler
	];
}

class FileUpload extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$j, create_fragment$j, safe_not_equal, { field: 0 });
	}
}

export { Address as A, CheckboxGroup as C, DatePicker as D, FieldValueLoader as F, RadioGroup as R, Switch as S, TextArea as T, FullName as a, FileUpload as b, Spacer as c, RichTextDisplay as d, ComboBox as e, formStore as f, TextInput as g, firstNotEmpty as h, debounce as i, subscribeFieldChange as s };
