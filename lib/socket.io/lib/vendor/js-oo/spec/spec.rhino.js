
load('/Library/Ruby/Gems/1.8/gems/jspec-2.11.13/lib/jspec.js')
load('lib/oo.js')

JSpec
.exec('spec/spec.core.js')
.run({ formatter : JSpec.formatters.Terminal })
.report()