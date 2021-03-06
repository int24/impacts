.PHONY: docs

install:
	npm ci

test:
	npx jest

test-coverage:
	npx jest --coverage

docs:
	npx typedoc

dev:
	npx tsc -w -p tsconfig.json

build:
	npx tsc -p tsconfig.json

bundle:
	npx webpack