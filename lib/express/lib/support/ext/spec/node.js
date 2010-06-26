
require.paths.unshift('spec', 'spec/lib', 'lib')
require('jspec')
require('ext')

if (process.ARGV[2])
  JSpec.exec('spec/unit/' + process.ARGV[2] + '.spec.js')
else
  JSpec
    .exec('spec/unit/base64.spec.js')
    .exec('spec/unit/printf.spec.js')
    .exec('spec/unit/md5.spec.js')
    .exec('spec/unit/core_ext/number.spec.js')
    .exec('spec/unit/core_ext/regexp.spec.js')
    .exec('spec/unit/core_ext/function.spec.js')
    .exec('spec/unit/core_ext/array/enumerable.spec.js')
    .exec('spec/unit/core_ext/array/extensions.spec.js')
    .exec('spec/unit/core_ext/array/collections.spec.js')
    .exec('spec/unit/core_ext/date/parser.spec.js')
    .exec('spec/unit/core_ext/date/extensions.spec.js')
    .exec('spec/unit/core_ext/object/extensions.spec.js')
    .exec('spec/unit/core_ext/string/extensions.spec.js')
    .exec('spec/unit/core_ext/string/inflections.spec.js')
JSpec.run({ reporter: JSpec.reporters.Terminal, failuresOnly: true })
JSpec.report()

