default: test

#
# Run all tests
#
test:
	node test.js

.PHONY: test
.SILENT: test