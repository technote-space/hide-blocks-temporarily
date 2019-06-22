#!/usr/bin/env bash

set -ex

bash ${TRAVIS_BUILD_DIR}/tests/bin/php/setup-wp-tests.sh
bash ${TRAVIS_BUILD_DIR}/tests/bin/php/phpcs.sh
bash ${TRAVIS_BUILD_DIR}/tests/bin/php/phpmd.sh

bash ${TRAVIS_BUILD_DIR}/tests/bin/js/js-lint.sh
bash ${TRAVIS_BUILD_DIR}/tests/bin/js/js-test.sh

source ${TRAVIS_BUILD_DIR}/tests/bin/deploy/env.sh
bash ${TRAVIS_BUILD_DIR}/tests/bin/deploy/create.sh

ls -la ${PACKAGE_DIR}
ls -la ${TRAVIS_BUILD_DIR}/${RELEASE_FILE}

rm -rdf ${PACKAGE_DIR}
rm -f ${TRAVIS_BUILD_DIR}/${RELEASE_FILE}
