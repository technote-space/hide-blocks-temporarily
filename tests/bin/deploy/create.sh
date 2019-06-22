#!/usr/bin/env bash

set -e

echo ""
echo ">> Prepare release files."
bash ${TRAVIS_BUILD_DIR}/tests/bin/deploy/prepare_release_files.sh

pushd ${PACKAGE_DIR}
echo ""
echo ">> Create zip file."
zip -9 -qr ${TRAVIS_BUILD_DIR}/${RELEASE_FILE} .
pushd

ls -la ${RELEASE_FILE}
