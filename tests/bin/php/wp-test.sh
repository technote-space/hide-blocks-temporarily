#!/usr/bin/env bash

set -e

bash ${TRAVIS_BUILD_DIR}/tests/bin/php/setup-wp-tests.sh
ls -la ${TRAVIS_BUILD_DIR}/vendor/autoload.php

echo ""
echo ">> Run composer phpunit."
composer phpunit --working-dir=${TRAVIS_BUILD_DIR}

if [[ ! -z "${COVERAGE_REPORT}" ]] && [[ ! -z "${CI}" ]]; then
	ls -la ${TRAVIS_BUILD_DIR}/coverage/clover.xml
	echo ""
	echo ">> Run composer coveralls."
	composer coveralls --working-dir=${TRAVIS_BUILD_DIR}
fi
