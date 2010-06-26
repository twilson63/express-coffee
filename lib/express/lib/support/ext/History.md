
0.6.0 / 2010-04-29
==================

  * Added Object.merge(a, b)
  * Added Object.mergeDeep(a, b)
  * Added Object.values(obj)
  * Removed all Object.prototype methods
  * Removed Enumerable mixin (moved some of the methods to Array.prototype)

0.5.0 / 2010-04-23
==================

  * Added Number#octal
  * Added Number#hex
  * Increase performance Object#each() by %50
  * Increase performance of Object#merge()

0.4.1 / 2010-04-20
==================

  * Object#reject() and Object#filter() now return arrays at all times

0.4.0 / 2010-04-20
==================

  * Changed; renamed String#base64Encode -> String#base64Encoded
  * Removed String lambdas
  * Removed String#digitize
  * Removed Array#flatten

0.3.0 / 2010-04-14
==================

  * Added Object#mergeDeep()
  * Fixed issue with Object#{keys,values} having no setters once assigned a value
  * Changed; String#strip now using native String#trim()
  * Changed; Object#merge() accepts undefined, defaulting to {}
  * Changed; Object#mergeDeep() accepts undefined, defaulting to {}

0.2.6 / 2010-03-18
==================

  * Added Number#{gigabyte,megabyte,kilobyte,byte}[s]
  * Changed; String#lambda etc no longer depricated. Benchmarks proved to be invalid
  * Depricated String#digitize in favour of String#digits
  * Depricated Array#flatten in favour of Array#flattened

0.2.5 / 2010-03-16
==================

  * Removed Object#include()
  * Removed last process.mixin() call
  * Deprecated String#lambda() etc. Closes #64

0.2.4 / 2010-03-15
==================

  * APIs including Number#{seconds,minutes,hours, ...} working in milliseconds not seconds. Closes #63

0.2.3 / 2010-03-15
==================

  * Added Function#curry(), fixed Enumerable#map() which always returns an array now
  * Removed some process.mixin() calls
  * Fixed Object#{keys,values}; can be properly overwritten

0.2.2 / 2010-03-11
==================

  * Fixed Object#keys= allowing custom values to take precedence over Object#keys

0.2.1 / 2010-03-10
==================

  * Added Object#join([str])
  * Fixed reduce() bug in which Object#reduce() was previously skipping
    the first value when a memo object was passed.

0.2.0 / 2010-03-04
==================

  * Added Object#alias()
  * Added Object#include().
  * Added Object#reduce()
  * Aliased Enumerable#reduce() as Enumerable#inject()
  * Added Array#transposed
  * Added String#apply()
  * Added String#call()
  * Added String#lambda
  * Added seed.yml for kiwi support

0.1.0 / 2010-03-01
==================

  * Pretty much everything :)

0.0.1 / 2010-01-05
==================

  * Initial release

