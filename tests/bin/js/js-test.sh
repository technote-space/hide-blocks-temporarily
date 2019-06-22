#!/usr/bin/env bash

set -e

bash ${TRAVIS_BUILD_DIR}/tests/bin/js/install-npm.sh
ls -la ${TRAVIS_BUILD_DIR}/assets/js/node_modules/.bin/webpack

echo ""
echo ">> Run npm mocha."
npm run mocha --prefix ${TRAVIS_BUILD_DIR}/assets/js

if [[ ! -z "${COVERAGE_REPORT}" ]] && [[ ! -z "${CI}" ]]; then
	ls -la ${TRAVIS_BUILD_DIR}/assets/js/coverage/lcov.info
	echo ""
	echo ">> Run npm coveralls."
	npm run coveralls --prefix ${TRAVIS_BUILD_DIR}/assets/js
fi
