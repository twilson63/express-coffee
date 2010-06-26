
require.paths.unshift(__dirname + '/../lib')
require('ext')

var path = process.argv[2],
    benchmarks = require(__dirname + '/' + path),
    times = benchmarks.n || 1,
    printf = require('ext').printf

delete benchmarks.n

printf('\n      benchmarking %s %d time(s)\n\n', path, times)

for (var label in benchmarks) {
  var start = +new Date
  benchmarks[label]()
  var duration = (+new Date - start) / 1000
  printf('%45s : %0.3f\n', label, duration)
}
