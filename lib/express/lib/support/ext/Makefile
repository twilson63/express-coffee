
NODE = node

benchmark:
	@node benchmarks/bm.js array
	@node benchmarks/bm.js date
	@node benchmarks/bm.js object
	@node benchmarks/bm.js printf

test:
	@$(NODE) spec/node.js

.PHONY: test benchmark

