sys: require 'sys'
nodeunit: require '../../nodeunit/lib/nodeunit'
assert: require 'assert'

red:   (str) -> "\033[31m$str\033[39m"
green: (str) -> "\033[32m$str\033[39m"
bold:  (str) -> "\033[1m$str\033[22m"

class Mock
  constructor: ->
    @expectations = []
  expect: (name, fn) ->
    this[name]: or @mockFn(name)
    @expectations.push [name, fn]
    this
  mockFn: (calledName) ->
    return (args...) ->
      [name, fn] = @expectations.pop()
      assert.equal name, calledName, "Mock expected $name to be called. Got $calledName."
      fn(args...) if fn?
exports.Mock: Mock

tests: {}
exports.test: (name, fn) ->
  tests[name]: fn

befores: []
exports.before: (fn) ->
  befores.push fn

afters: []
exports.after: (fn) ->
  afters.push fn

exports.run: (name) ->
  sys.puts bold "\n$name"
  nodeunit.runModule tests, {
    name: name
    testStart: ->
      fn() for fn in befores
    testDone: (name, assertions) ->
      fn() for fn in afters
      if not assertions.failures
        sys.puts "✔ $name"
      else
        sys.puts red "✖ $name"
        for assertion in assertions when assertion.failed()
          sys.puts assertion.error.stack + "\n"
    moduleDone: (name, assertions) ->
      if assertions.failures
        sys.puts bold(red(
          "\nFAILURES ${assertions.failures} / ${assertions.length} " +
          " assertions failed (${assertions.duration} ms)"))
      else
        sys.puts bold(green(
          "\nOK: ${assertions.length} assertions(${assertions.duration} ms)"))
  }