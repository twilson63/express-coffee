/** Socket.IO 0.2.1 - Built with build.js */
/**
 * Socket.IO client
 * 
 * @author Guillermo Rauch <guillermo@rosepad.com>
 * @license The MIT license.
 * @copyright Copyright (c) 2009 RosePad <dev@rosepad.com>
 */

this.io = {
	version: '0.2.1',

	setPath: function(path){
		this.path = /\/$/.test(path) ? path : path + '/';
		
		// this is temporary until we get a fix for injecting Flash WebSocket javascript files dynamically, 
		// as io.js shouldn't be aware of specific transports.
		if ('WebSocket' in window){
			WebSocket.__swfLocation = path + 'lib/vendor/web-socket-js/WebSocketMain.swf';
		}
	}
};

if ('jQuery' in this) jQuery.io = this.io;
/**
 * Socket.IO client
 * 
 * @author Guillermo Rauch <guillermo@rosepad.com>
 * @license The MIT license.
 * @copyright Copyright (c) 2009 RosePad <dev@rosepad.com>
 */

io.util = {};
// Based on Core.js from MooTools (MIT)
// Copyright (c) 2006-2009 Valerio Proietti, <http://mad4milk.net/>

(function(){

	var object = io.util.Object = {

		clone: function(item){
			var clone;
			if (item instanceof Array){
				clone = [];
				for (var i = 0; i < item.length; i++) clone[i] = object.clone(item[i]);
				return clone;
			} else if (typeof item == 'object') {
				clone = {};
				for (var key in object) clone[key] = object.clone(object[key]);
				return clone;
			} else {
				return item;
			}
		},

		merge: function(source, k, v){
			if (typeof k == 'string') return mergeOne(source, k, v);
			for (var i = 1, l = arguments.length; i < l; i++){
				var object = arguments[i];
				for (var key in object) mergeOne(source, key, object[key]);
			}
			return source;
		}

	},

	mergeOne = function(source, key, current){
		if (current instanceof Array){
			source[key] = object.clone(current);
		} else if (typeof current == 'object'){
			if (typeof source[key] == 'object') object.merge(source[key], current);
			else source[key] = object.clone(current);
		} else {
			source[key] = current;
		}
		return source;
	};
  
})();
// Methods from Array.js from MooTools (MIT)
// Copyright (c) 2006-2009 Valerio Proietti, <http://mad4milk.net/>

(function(){

	var array = io.util.Array = {

		include: function(arr, item){
			if (!array.contains(arr, item)) arr.push(item);
			return arr;
		},

		each: function(arr, fn, bind){
			for (var i = 0, l = arr.length; i < l; i++) fn.call(bind, arr[i], i, arr);
		},

		contains: function(arr, item, from){
			return array.indexOf(arr, item, from) != -1;
		},

		indexOf: function(arr, item, from){
			for (var l = arr.length, i = (from < 0) ? Math.max(0, l + from) : from || 0; i < l; i++){
				if (arr[i] === item) return i;
			}
			return -1;
		}

	};

})();
// Based on Mixin.js from MooTools (MIT)
// Copyright (c) 2006-2009 Valerio Proietti, <http://mad4milk.net/>

io.util.Options = {
	
	options: {},
	
	setOption: function(key, value){
		io.util.Object.merge(this.options, key, value);
		return this;
	},
	
	setOptions: function(options){
		for (var key in options) this.setOption(key, options[key]);
		if (this.addEvent){
			for (var i in this.options){
				if (!(/^on[A-Z]/).test(i) || typeof this.options[i] != 'function') return;
				this.addEvent(i, this.options[i]);
				this.options[i] = null;
			}
		} 
		return this;
	}
	
};
// Based on Mixin.js from MooTools (MIT)
// Copyright (c) 2006-2009 Valerio Proietti, <http://mad4milk.net/>

io.util.Events = (function(){
	var array = io.util.Array,

	eventsOf = function(object, type){
		type = type.replace(/^on([A-Z])/, function(full, first){
			return first.toLowerCase();
		});
		var events = object.$events;
		return events[type] || (events[type] = []);
	},

	removeEventsOfType = function(object, type){
		array.each(eventsOf(object, type), function(fn){
			object.removeEvent(type, fn);
		});
	};

	return {
		$events: {},

		addEvent: function(type, fn){
			array.include(eventsOf(this, type), fn);
			return this;
		},

		addEvents: function(events){
			for (var name in events) this.addEvent(name, events[name]);
			return this;
		},

		fireEvent: function(type, args){
			args = [].concat(args);
			array.each(eventsOf(this, type), function(fn){
				fn.apply(this, args);
			}, this);
			return this;
		},

		fireEvents: function(){
			for (var i = 0; i < arguments.length; i++) this.fireEvent(arguments[i]);
			return this;
		},

		removeEvent: function(type, fn){
			var events = eventsOf(this, type), index = events.indexOf(fn);
			if (index != -1) delete events[index];

			return this;
		},

		removeEvents: function(option){
			if (option === null){
				var events = this.$events;
				for (var type in events) removeEventsOfType(this, type);
			} else {
				switch (typeof option){
					case 'string': removeEventsOfType(this, option); break;
					case 'object': for (var name in option) this.removeEvent(name, option[name]); break;
				}
			}  		
			return this;
		}
	};
})();
/*
    http://www.JSON.org/json2.js
    2010-03-20

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html


    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.


    This file creates a global JSON object containing two methods: stringify
    and parse.

        JSON.stringify(value, replacer, space)
            value       any JavaScript value, usually an object or array.

            replacer    an optional parameter that determines how object
                        values are stringified for objects. It can be a
                        function or an array of strings.

            space       an optional parameter that specifies the indentation
                        of nested structures. If it is omitted, the text will
                        be packed without extra whitespace. If it is a number,
                        it will specify the number of spaces to indent at each
                        level. If it is a string (such as '\t' or '&nbsp;'),
                        it contains the characters used to indent at each level.

            This method produces a JSON text from a JavaScript value.

            When an object value is found, if the object contains a toJSON
            method, its toJSON method will be called and the result will be
            stringified. A toJSON method does not serialize: it returns the
            value represented by the name/value pair that should be serialized,
            or undefined if nothing should be serialized. The toJSON method
            will be passed the key associated with the value, and this will be
            bound to the value

            For example, this would serialize Dates as ISO strings.

                Date.prototype.toJSON = function (key) {
                    function f(n) {
                        // Format integers to have at least two digits.
                        return n < 10 ? '0' + n : n;
                    }

                    return this.getUTCFullYear()   + '-' +
                         f(this.getUTCMonth() + 1) + '-' +
                         f(this.getUTCDate())      + 'T' +
                         f(this.getUTCHours())     + ':' +
                         f(this.getUTCMinutes())   + ':' +
                         f(this.getUTCSeconds())   + 'Z';
                };

            You can provide an optional replacer method. It will be passed the
            key and value of each member, with this bound to the containing
            object. The value that is returned from your method will be
            serialized. If your method returns undefined, then the member will
            be excluded from the serialization.

            If the replacer parameter is an array of strings, then it will be
            used to select the members to be serialized. It filters the results
            such that only members with keys listed in the replacer array are
            stringified.

            Values that do not have JSON representations, such as undefined or
            functions, will not be serialized. Such values in objects will be
            dropped; in arrays they will be replaced with null. You can use
            a replacer function to replace those with JSON values.
            JSON.stringify(undefined) returns undefined.

            The optional space parameter produces a stringification of the
            value that is filled with line breaks and indentation to make it
            easier to read.

            If the space parameter is a non-empty string, then that string will
            be used for indentation. If the space parameter is a number, then
            the indentation will be that many spaces.

            Example:

            text = JSON.stringify(['e', {pluribus: 'unum'}]);
            // text is '["e",{"pluribus":"unum"}]'


            text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
            // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

            text = JSON.stringify([new Date()], function (key, value) {
                return this[key] instanceof Date ?
                    'Date(' + this[key] + ')' : value;
            });
            // text is '["Date(---current time---)"]'


        JSON.parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.

            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.

            Example:

            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.

            myData = JSON.parse(text, function (key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });

            myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                var d;
                if (typeof value === 'string' &&
                        value.slice(0, 5) === 'Date(' &&
                        value.slice(-1) === ')') {
                    d = new Date(value.slice(5, -1));
                    if (d) {
                        return d;
                    }
                }
                return value;
            });


    This is a reference implementation. You are free to copy, modify, or
    redistribute.
*/

/*jslint evil: true, strict: false */

/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
    call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/


// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

if (!this.JSON) {
    this.JSON = {};
}

(function () {

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function (key) {

            return isFinite(this.valueOf()) ?
                   this.getUTCFullYear()   + '-' +
                 f(this.getUTCMonth() + 1) + '-' +
                 f(this.getUTCDate())      + 'T' +
                 f(this.getUTCHours())     + ':' +
                 f(this.getUTCMinutes())   + ':' +
                 f(this.getUTCSeconds())   + 'Z' : null;
        };

        String.prototype.toJSON =
        Number.prototype.toJSON =
        Boolean.prototype.toJSON = function (key) {
            return this.valueOf();
        };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ?
            '"' + string.replace(escapable, function (a) {
                var c = meta[a];
                return typeof c === 'string' ? c :
                    '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
            }) + '"' :
            '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

        case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

            if (!value) {
                return 'null';
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0 ? '[]' :
                    gap ? '[\n' + gap +
                            partial.join(',\n' + gap) + '\n' +
                                mind + ']' :
                          '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    k = rep[i];
                    if (typeof k === 'string') {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0 ? '{}' :
                gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' +
                        mind + '}' : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                     typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/.
test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').
replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function' ?
                    walk({'': j}, '') : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
}());
// OO - Class - Copyright TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)
// Based on http://ejohn.org/blog/simple-javascript-inheritance/
// which is based on implementations by Prototype / base2

(function(){

  var global = this, initialize = true
  var referencesSuper = /xyz/.test(function(){ xyz }) ? /\b__super__\b/ : /.*/

  /**
   * Shortcut for ioClass.extend()
   *
   * @param  {hash} props
   * @return {function}
   * @api public
   */

  ioClass = function(props){
    if (this == global)
      return ioClass.extend(props)  
  }
  
  // --- Version
  
  ioClass.version = '1.2.0'
  
  /**
   * Create a new ioClass.
   *
   *   User = ioClass({
   *     init: function(name){
   *       this.name = name
   *     }
   *   })
   *
   * ioClasses may be subioClassed using the .extend() method, and
   * the associated superioClass method via this.__super__().
   *
   *   Admin = User.extend({
   *     init: function(name, password) {
   *       this.__super__(name)
   *       // or this.__super__.apply(this, arguments)
   *       this.password = password
   *     }
   *   })
   *
   * @param  {hash} props
   * @return {function}
   * @api public
   */
  
  ioClass.extend = function(props) {
    var __super__ = this.prototype
    
    initialize = false
    var prototype = new this
    initialize = true

    function ioClass() {
      if (initialize && this.init)
        this.init.apply(this, arguments)
    }
    
    function extend(props) {
      for (var key in props)
        if (props.hasOwnProperty(key))
          ioClass[key] = props[key]
    }
    
    ioClass.include = function(props) {
      for (var name in props)
        if (name == 'include')
          if (props[name] instanceof Array)
            for (var i = 0, len = props[name].length; i < len; ++i)
              ioClass.include(props[name][i])
          else
            ioClass.include(props[name])
        else if (name == 'extend')
          if (props[name] instanceof Array)
            for (var i = 0, len = props[name].length; i < len; ++i)
              extend(props[name][i])
          else
            extend(props[name])
        else if (props.hasOwnProperty(name))
          prototype[name] = 
            typeof props[name] == 'function' &&
            typeof __super__[name] == 'function' &&
            referencesSuper.test(props[name]) ?
              (function(name, fn){
                return function() {
                  this.__super__ = __super__[name]
                  return fn.apply(this, arguments)
                }
              })(name, props[name])
            : props[name]
    }
    
    ioClass.include(props)
    ioClass.prototype = prototype
    ioClass.constructor = ioClass
    ioClass.extend = arguments.callee
    
    return ioClass
  }

})();
/**
 * Socket.IO client
 * 
 * @author Guillermo Rauch <guillermo@rosepad.com>
 * @license The MIT license.
 * @copyright Copyright (c) 2009 RosePad <dev@rosepad.com>
 */

// abstract
io.Transport = ioClass({

	include: [io.util.Events, io.util.Options],

	init: function(base, options){
		this.base = base;
		this.setOptions(options);
	},

	send: function(){
		throw new Error('Missing send() implementation');  
	},

	connect: function(){
		throw new Error('Missing connect() implementation');  
	},

	disconnect: function(){
		throw new Error('Missing disconnect() implementation');  
	},

	_onData: function(data){
		try {
			var msgs = JSON.parse(data);
		} catch(e){}
		if (msgs && msgs.messages){
		  for (var i = 0, l = msgs.messages.length; i < l; i++){
				this._onMessage(msgs.messages[i]);	
			}
		}
	},

	_onMessage: function(message){
		if (!('sessionid' in this)){
			try {
				var obj = JSON.parse(message);
			} catch(e){}
			if (obj && obj.sessionid){
				this.sessionid = obj.sessionid;
				this._onConnect();
			}				
		} else {	
			this.base._onMessage(message);
		}		
	},

	_onConnect: function(){
		this.connected = true;
		this.base._onConnect();
	},

	_onDisconnect: function(){
		if (!this.connected) return;
		this.connected = false;
		this.base._onDisconnect();
	},

	_prepareUrl: function(){
		return (this.base.options.secure ? 'https' : 'http') 
			+ '://' + this.base.host 
			+ ':' + this.base.options.port
			+ '/' + this.base.options.resource
			+ '/' + this.type
			+ (this.sessionid ? ('/' + this.sessionid) : '');
	}

});
/**
 * Socket.IO client
 * 
 * @author Guillermo Rauch <guillermo@rosepad.com>
 * @license The MIT license.
 * @copyright Copyright (c) 2009 RosePad <dev@rosepad.com>
 */

(function(){
  
	var empty = new Function;

	io.Transport.XHR = io.Transport.extend({

		connect: function(){
			this._get();
		},

		send: function(data){
			this._sendXhr = this._request('send', 'POST');
			this._sendXhr.send('data=' + encodeURIComponent(data));
		},

		disconnect: function(){
			if (this._xhr){
				this._xhr.onreadystatechange = empty;
				this._xhr.abort();
			}            
			if (this._sendXhr) this._sendXhr.abort();
			this._onClose();
			this._onDisconnect();
		},

		_request: function(url, method, multipart){
			var req = request();
			if (multipart) req.multipart = true;
			req.open(method || 'GET', this._prepareUrl() + (url ? '/' + url : ''));
			if (method == 'POST'){
				req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=utf-8');
			}
			return req;
		}

	});

	var request = io.Transport.XHR.request = function(){
		if ('XMLHttpRequest' in window) return new XMLHttpRequest();

		try {
			var a = new ActiveXObject('MSXML2.XMLHTTP');
			return a;
		} catch(e){}

		try {
			var b = new ActiveXObject('Microsoft.XMLHTTP');
			return b;      
		} catch(e){}

		return false;
	};

	io.Transport.XHR.check = function(){
		try {
			if (request()) return true;
		} catch(e){}
		return false;
	};

})();
/**
 * Socket.IO client
 * 
 * @author Guillermo Rauch <guillermo@rosepad.com>
 * @license The MIT license.
 * @copyright Copyright (c) 2009 RosePad <dev@rosepad.com>
 */

io.Transport.websocket = io.Transport.extend({

	type: 'websocket',

	connect: function(){
		var self = this;
		this.socket = new WebSocket(this._prepareUrl());
		this.socket.onmessage = function(ev){ self._onData(ev.data); };
		this.socket.onclose = function(ev){ self._onClose(); };
		return this;      
	},

	send: function(data){
		this.socket.send(data);
		return this;
	},

	disconnect: function(){
		this.socket.close();
		return this;      
	},

	_onClose: function(){
		this._onDisconnect();
	},

	_prepareUrl: function(){
		return (this.base.options.secure ? 'wss' : 'ws') 
		+ '://' + this.base.host 
		+ ':' + this.base.options.port
		+ '/' + this.base.options.resource
		+ '/' + this.type
		+ (this.sessionid ? ('/' + this.sessionid) : '');
	}

});

io.Transport.websocket.check = function(){
	// we make sure WebSocket is not confounded with a previously loaded flash WebSocket
	return 'WebSocket' in window && !('__initialize' in WebSocket);
};
/**
 * Socket.IO client
 * 
 * @author Guillermo Rauch <guillermo@rosepad.com>
 * @license The MIT license.
 * @copyright Copyright (c) 2009 RosePad <dev@rosepad.com>
 */

(function(){  
	var empty = new Function, request = io.Transport.XHR.request;

	io.Transport['htmlfile'] = io.Transport.extend({

		type: 'htmlfile',

		connect: function(){
			var self = this;

			this._doc = new ActiveXObject("htmlfile");
			this._doc.open();
			this._doc.write('<html><script>document.domain="'+ document.domain +'"</script></html>');
			this._doc.close();      

			this.iframe = this.doc.createElement('div');
			this._doc.body.appendChild(iframe);
			iframe.innerHTML = '<iframe src="'+ this._prepareUrl() +'"></iframe>';

			this.doc.parentWindow.callback = function(data){ self._onData(data); };      
			window.attachEvent('onunload', function(){ self._destroy(); });
		},

		send: function(data){      
			this._sendXhr = request();
			this._sendXhr.open('POST', this._prepareUrl() + '/send');      
			this._sendXhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=utf-8');        
			this._sendXhr.send('data=' + encodeURIComponent(data));
		},

		disconnect: function(){
			this._destroy();
			if (this._sendXhr) this._sendXhr.abort();	
			this._onClose();
			this._onDisconnect();
		},

		_destroy: function(){
			this._doc = null;
			CollectGarbage();
		}

	});

	io.Transport['htmlfile'].check = function(){
		return false;
		if ('ActiveXObject' in window){
			try {
				var a = new ActiveXObject('htmlfile');
				return io.Transport.XHR.check();
			} catch(e){}
		}
		return false;
	};

})();
/**
 * Socket.IO client
 * 
 * @author Guillermo Rauch <guillermo@rosepad.com>
 * @license The MIT license.
 * @copyright Copyright (c) 2009 RosePad <dev@rosepad.com>
 */

io.Transport['xhr-multipart'] = io.Transport.XHR.extend({

	type: 'xhr-multipart',

	connect: function(){
		var self = this;
		this._xhr = this._request('', 'GET', true);
		this._xhr.onreadystatechange = function(){
			if (self._xhr.readyState == 3) self._onData(self._xhr.responseText);
		};
		this._xhr.send();
	}

});

io.Transport['xhr-multipart'].check = function(){
	return 'XMLHttpRequest' in window && 'multipart' in XMLHttpRequest.prototype;
};
/**
 * Socket.IO client
 * 
 * @author Guillermo Rauch <guillermo@rosepad.com>
 * @license The MIT license.
 * @copyright Copyright (c) 2009 RosePad <dev@rosepad.com>
 */

(function(){

	var empty = new Function();

	io.Transport['xhr-polling'] = io.Transport.XHR.extend({

		type: 'xhr-polling',

		connect: function(){
			var self = this;
			this._xhr = this._request('', 'GET');
			this._xhr.onreadystatechange = function(){
				if (self._xhr.status == 200 && self._xhr.readyState == 4){
					if (self._xhr.responseText.length) self._onData(self._xhr.responseText);
					self._xhr.onreadystatechange = empty;
					self.connect();
				}
			};
			this._xhr.send();
		}

	});

	io.Transport['xhr-polling'].check = function(){
		return io.Transport.XHR.check();
	};

})();
/**
 * Socket.IO client
 * 
 * @author Guillermo Rauch <guillermo@rosepad.com>
 * @license The MIT license.
 * @copyright Copyright (c) 2009 RosePad <dev@rosepad.com>
 */

io.Socket = ioClass({

	include: [io.util.Events, io.util.Options],

	options: {
		secure: false,
		document: document,
		port: document.location.port || 80,
		resource: 'socket.io',
		transports: ['websocket', 'htmlfile', 'xhr-multipart', 'xhr-polling'],
		transportOptions: {},
		rememberTransport: true
	},

	init: function(host, options){
		this.host = host || document.domain;
		this.setOptions(options);
		this.connected = false;
		this.connecting = false;
		this.transport = this.getTransport();
		if (!this.transport && 'console' in window) console.error('No transport available');
	},

	getTransport: function(){
		var transports = this.options.transports, match;
		if (this.options.rememberTransport){
			match = this.options.document.cookie.match('(?:^|;)\\s*socket\.io=([^;]*)');
			if (match) transports = [decodeURIComponent(match[1])];
		} 
		for (var i = 0; transport = transports[i]; i++){
			if (io.Transport[transport] && io.Transport[transport].check()){
				return new io.Transport[transport](this, this.options.transportOptions[transport] || {});
			}
		}
		return null;
	},

	connect: function(){
		if (this.transport && !this.connected && !this.connecting){
			this.connecting = true;
			this.transport.connect();
		}      
		return this;
	},

	send: function(data){
		if (!this.transport || !this.transport.connected) return this._queue(data);
		this.transport.send(JSON.stringify([data]));
		return this;
	},

	disconnect: function(){
		this.transport.disconnect();
		return this;
	},

	_queue: function(message){
		if (!('_queueStack' in this)) this._queueStack = [];
		this._queueStack.push(message);
		return this;
	},

	_doQueue: function(){    
		if (!('_queueStack' in this) || !this._queueStack.length) return this;
		this.transport.send(JSON.stringify([].concat(this._queueStack)));
		this._queueStack = [];
		return this;
	},

	_onConnect: function(){
		this.connected = true;
		this.connecting = false;
		this._doQueue();
		if (this.options.rememberTransport) this.options.document.cookie = 'socket.io=' + encodeURIComponent(this.transport.type);
		this.fireEvent('connect');
	},

	_onMessage: function(data){
		this.fireEvent('message', data);
	},

	_onDisconnect: function(){
		this.fireEvent('disconnect');
	}

});
