#!/usr/bin/env bash

set -e

echo ""
echo ">> Run npm install."
npm install --prefix ${TRAVIS_BUILD_DIR}/assets/js --save-dev
