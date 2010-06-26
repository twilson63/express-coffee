
RHINO = java org.mozilla.javascript.tools.shell.Main

benchmark: benchmarks/benchmark.js
	 @$(RHINO) benchmarks/benchmark.js

test:
	@jspec run --rhino
	
.PHONY: benchmark test	