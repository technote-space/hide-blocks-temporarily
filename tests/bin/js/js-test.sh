#!/usr/bin/env bash

set -ex

bash ${TRAVIS_BUILD_DIR}/tests/bin/js/install-npm.sh
ls -la ${TRAVIS_BUILD_DIR}/assets/js/node_modules/.bin/webpack

npm run mocha --prefix ${TRAVIS_BUILD_DIR}/assets/js

if [[ ! -z "$COVERAGE_REPORT" ]] && [[ ! -z "$CI" ]] ; then
  ls -la ${TRAVIS_BUILD_DIR}/assets/js/coverage/lcov.info
  npm run coveralls --prefix ${TRAVIS_BUILD_DIR}/assets/js
fi
