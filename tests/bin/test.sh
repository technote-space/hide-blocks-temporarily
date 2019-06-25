#!/usr/bin/env bash

set -e

bash ${TRAVIS_BUILD_DIR}/tests/bin/php/phpcs.sh
bash ${TRAVIS_BUILD_DIR}/tests/bin/php/phpmd.sh
bash ${TRAVIS_BUILD_DIR}/tests/bin/php/wp-test.sh

bash ${TRAVIS_BUILD_DIR}/tests/bin/js/js-lint.sh
bash ${TRAVIS_BUILD_DIR}/tests/bin/js/js-test.sh

source ${TRAVIS_BUILD_DIR}/tests/bin/deploy/env.sh
bash ${TRAVIS_BUILD_DIR}/tests/bin/deploy/create.sh

ls -la ${PACKAGE_DIR}
ls -la ${TRAVIS_BUILD_DIR}/${RELEASE_FILE}

bash ${TRAVIS_BUILD_DIR}/tests/bin/deploy/wp-check-diff.sh

bash ${TRAVIS_BUILD_DIR}/tests/bin/deploy/clear_work_dir.sh
rm -f ${RELEASE_FILE}
