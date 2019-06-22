#!/usr/bin/env bash

set -e

bash ${TRAVIS_BUILD_DIR}/tests/bin/php/install-composer.sh
ls -la ${TRAVIS_BUILD_DIR}/vendor/autoload.php

echo ""
echo ">> Run composer phpmd."
composer phpmd --working-dir=${TRAVIS_BUILD_DIR}
