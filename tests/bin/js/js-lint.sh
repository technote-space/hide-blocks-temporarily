#!/usr/bin/env bash

set -e

bash ${TRAVIS_BUILD_DIR}/tests/bin/js/install-npm.sh
ls -la ${TRAVIS_BUILD_DIR}/assets/js/node_modules/.bin/webpack

echo ""
echo ">> Run npm lint."
npm run lint --prefix ${TRAVIS_BUILD_DIR}/assets/js
