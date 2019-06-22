#!/usr/bin/env bash

set -ex

bash ${TRAVIS_BUILD_DIR}/tests/bin/php/setup-wp-tests.sh
ls -la ${TRAVIS_BUILD_DIR}/vendor/autoload.php

composer phpunit --working-dir=${TRAVIS_BUILD_DIR}

if [[ ! -z "$COVERAGE_REPORT" ]] && [[ ! -z "$CI" ]] ; then
  ls -la ${TRAVIS_BUILD_DIR}/coverage/clover.xml
  composer coveralls --working-dir=${TRAVIS_BUILD_DIR}
fi
