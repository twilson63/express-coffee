
# ext.js - JavaScript Extensions &amp; Utilities

High quality JavaScript extensions for various tasks such as
formatting dates, currency helpers, and more. This library targets node.js and
server-side frameworks such as [Express](http://github.com/visionmedia/express).

Ext.js uses the CommonJS module pattern when needed.
Additionally, **all** of the native object extensions are _non-enumerable_,
and you may create your own via `require('ext').extend(prototype, methods).

## Installation

  Install the [Kiwi package manager for nodejs](http://github.com/visionmedia/kiwi)
  and run:
  
      $ kiwi install ext

## Extensions

To use simply:
    require('ext')

### Object

  * Object.values(obj)
  * Object.merge(a, b)
  * Object.mergeDeep(a, b)

### Array

  * Array#each(fn[, context])
  * Array#excludes(item[, item, ...])
  * Array#includes(item[, item, ...])
  * Array#clear
  * Array#flattened
  * Array#first
  * Array#last
  * Array#sample
  * Array#compact([removableValues])
  * Array#at(index)
  * Array#drop(n)
  * Array#take(n)
  * Array#grep(pattern)
  * Array#remove(obj[, fn[, context]])
  * Array#transposed
  * Array#isEmpty
  * Array#reject(fn[, context])
  * Array#none(fn[, context])
  * Array#find(fn[, context])
  * Array#each() alias of #forEach()
  * Array#select() alias of #filter()
  * Array#find() alias of #every()
  * Array#any() alias of #some()

#### Collection Operators

  * Array#sum
  * Array#avg
  * Array#min
  * Array#max

### Number

  * Number#ordinalize
  * Number#currency
  * Number#second     / Number#seconds
  * Number#minute     / Number#minutes
  * Number#hour       / Number#hours
  * Number#day        / Number#days
  * Number#week       / Number#weeks
  * Number#month      / Number#months
  * Number#year       / Number#years
  * Number#toSeconds
  * Number#toMinutes
  * Number#toHours
  * Number#toDays
  * Number#toWeeks
  * Number#toMonths
  * Number#toYears
  * Number#byte       / Number#bytes
  * Number#kilobyte   / Number#kilobytes
  * Number#megabyte   / Number#megabytes
  * Number#gigabyte   / Number#gigabytes
  * Number#ago
  * Number#times(fn[, context])
  * Number#isFloat
  * Number#hex
  * Number#octal

### String

  * String#variable
  * String#uppercase
  * String#lowercase
  * String#camelcase
  * String#digits
  * String#strip
  * String#drop(n)
  * String#take(n)
  * String#before(str)
  * String#after(str)
  * String#padLeft(width[, char])
  * String#padRight(width[, char])
  * String#remove(pattern)
  * String#startsWith(str)
  * String#endsWith(str)
  * String#capitalize([all])
  * String#wrap(prefix[, suffix])
  * String#singular
  * String#plural
  * String#isPlural
  * String#isSingular
  * String#includes(str)
  * String#count(str)

### Date

  * Date#year
  * Date#month
  * Date#date
  * Date#day
  * Date#hours
  * Date#minutes
  * Date#seconds
  * Date#milliseconds
  * Date#monthName
  * Date#shortMonthName
  * Date#dayName
  * Date#shortDayName
  * Date#format(str)
  * Date#inWordsSince(date)
  * Date#inWordsSinceNow
  * Date#parse(str)
  * parse(str[, date])

### RegExp

  * RegExp.escape(str[, chars])

### Function

  * Function#bind(context[, ...])
  * Function#curry(...)

### Base64

  * String#base64Encoded / encode(str)
  * String#base64Decoded / decode(str)

### Error

  * Error.raise([name[, message[, object]]])

## MD5

  * String#md5 / hash(str)

### printf

  * sprintf(str[, arg[, ...]])
  * eprintf(str[, arg[, ...]])
  * printf(str[, arg[, ...]])

## Date Parsing

The module _ext/date_ exports the **parse()** function which accepts
a _string_ to parse, as well as an optional _date_ which represents "now".

Below are some examples:

    new Date
    // => Fri, 26 Feb 2010 19:16:47 GMT

    parse('today')
    // => Fri, 26 Feb 2010 19:16:47 GMT

    parse('yesterday')
    // => Thu, 25 Feb 2010 19:16:47 GMT

    parse('in 5 hours')
    // => Sat, 27 Feb 2010 00:16:47 GMT

    parse('in 2 days')
    // => Sun, 28 Feb 2010 19:16:47 GMT

    parse('next tuesday')
    // => Tue, 02 Mar 2010 19:16:47 GMT

More examples:

    'in a year'
    'in one year'
    'in five days'
    'in three hundred minutes'
    'in fifty two minutes'
    'in seventy five trillion seconds'
    'in five and a half minutes'

## Running Tests

    $ make test

## Contributors

  * TJ Holowaychuk (visionmedia)
  * Tobias Svensson (tobiassvn)
  
### Style Guide

These guidlines must be met before commit(s) or patches 
will be accepted.

  * Use 2 space indents
  * No trailing whitespace
  * Blank line before EOF
  * Omit semi-colons unless required (very rarely is this needed)
  * Never bump the version
  
File comments should take the following form:

    // ext.js - <category> [- subcategory ...] - Copyright TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)

Method comments should take the following form, and
<type>'s should be lowercase. _"mixed"_ should be used
when multiple types are acceptable, **not** _"object"_.

When accepting an _options_ object for example, you
may use _"hash"_ as this indicates that common usage
of this parameter is to pass a literal object using
brace syntax.

All examples should be indented 2 spaces.

    /**
     * <description>
     *
     *  <example ...>
     *
     * @param  {<type>} <name>
     * @param  {<type>} <name>
     * @param  {<type>} <name>
     * @return {<type>}
     * @api <public|private|protected>
     */

No trailing whitespace after hash keys:

    { foo: 'bar' }
    // good
    
    { foo : 'bar' }
    // bad
    
Hash whitespace:

    { foo: 'bar', baz: 'raz' }
    // good
    
    {foo:'bar', baz: 'raz'}
    // bad
    
    {
      foo: 'bar',
      baz: 'raz'
    }
    // good
    
Chained methods should be indented to indicate context:

    str
      .strip
      .replace(...)
      .replace(...)
    // good
    
    str
    .strip
    .replace(...)
    .replace(...)
    // bad
    
    str.
      strip.
      replace(...).
      replace(...)
    // bad
    
Use single quoted strings when possible:

    'yay'
    // good
    
    "he said 'yay'"
    // good
    
    "yay"
    // bad

Large ternary conditional should take the following form:

    foo = some.largeProperty === undefined
      ? 'some large value'
      : some.largeProperty + 'whatever'
    
Conditionals should be functional when possible (I hate braces):

    if (foo)
      bar(),
      baz()
    else
      if (somethingElse)
        whateves()
    // goood
    
    if (foo) {
      bar()
      baz()
    }
    else {
      if (somethingElse) {
        whateves()
      }
    }
    // bad
    
Closures:

    function(){
      
    }
    // good
    
    function () {
      
    }
    // bad
    
Methods:

    foo.bar = function() {
      
    }
    // good
    
    foo.bar = function (){
      
    }
    // bad 
  

## License

(The MIT License)

Copyright (c) 2009 TJ Holowaychuk &lt;tj@vision-media.ca&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

