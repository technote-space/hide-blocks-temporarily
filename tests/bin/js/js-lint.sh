#!/usr/bin/env bash

set -ex

bash ${TRAVIS_BUILD_DIR}/tests/bin/js/install-npm.sh
ls -la ${TRAVIS_BUILD_DIR}/assets/js/node_modules/.bin/webpack

npm run lint --prefix ${TRAVIS_BUILD_DIR}/assets/js
