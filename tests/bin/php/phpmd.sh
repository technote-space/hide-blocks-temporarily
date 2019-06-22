#!/usr/bin/env bash

set -ex

bash ${TRAVIS_BUILD_DIR}/tests/bin/php/install-composer.sh
ls -la ${TRAVIS_BUILD_DIR}/vendor/autoload.php

composer phpmd --working-dir=${TRAVIS_BUILD_DIR}
