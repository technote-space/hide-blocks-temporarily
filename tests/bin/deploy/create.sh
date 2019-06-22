#!/usr/bin/env bash

set -e

if [[ -z "$PACKAGE_DIR" ]] || [[ -z "$RELEASE_FILE" ]]; then
  exit 1
fi

composer update --no-dev --working-dir=${TRAVIS_BUILD_DIR}

rm -rdf ${PACKAGE_DIR}
rm -f ${RELEASE_FILE}
mkdir -p ${PACKAGE_DIR}/assets/js/

cp -r ${TRAVIS_BUILD_DIR}/assets/css         ${PACKAGE_DIR}/assets/ 2>/dev/null || :
cp -r ${TRAVIS_BUILD_DIR}/assets/img         ${PACKAGE_DIR}/assets/ 2>/dev/null || :
cp ${TRAVIS_BUILD_DIR}/assets/js/*.min.js    ${PACKAGE_DIR}/assets/js/ 2>/dev/null || :
cp ${TRAVIS_BUILD_DIR}/assets/js/.htaccess   ${PACKAGE_DIR}/assets/js/ 2>/dev/null || :
cp ${TRAVIS_BUILD_DIR}/assets/.htaccess      ${PACKAGE_DIR}/assets/ 2>/dev/null || :

cp -r ${TRAVIS_BUILD_DIR}/configs            ${PACKAGE_DIR}/ 2>/dev/null || :
cp -r ${TRAVIS_BUILD_DIR}/languages          ${PACKAGE_DIR}/ 2>/dev/null || :
cp -r ${TRAVIS_BUILD_DIR}/src                ${PACKAGE_DIR}/ 2>/dev/null || :
cp -r ${TRAVIS_BUILD_DIR}/vendor             ${PACKAGE_DIR}/ 2>/dev/null || :

cp ${TRAVIS_BUILD_DIR}/*.php                 ${PACKAGE_DIR}/ 2>/dev/null || :
#cp ${TRAVIS_BUILD_DIR}/*.json                ${PACKAGE_DIR}/ 2>/dev/null || :
cp ${TRAVIS_BUILD_DIR}/*.gif                 ${PACKAGE_DIR}/ 2>/dev/null || :
cp ${TRAVIS_BUILD_DIR}/*.png                 ${PACKAGE_DIR}/ 2>/dev/null || :

cp ${TRAVIS_BUILD_DIR}/.htaccess             ${PACKAGE_DIR}/ 2>/dev/null || :
#cp ${TRAVIS_BUILD_DIR}/composer.lock         ${PACKAGE_DIR}/ 2>/dev/null || :
cp ${TRAVIS_BUILD_DIR}/LICENSE               ${PACKAGE_DIR}/ 2>/dev/null || :
#cp ${TRAVIS_BUILD_DIR}/README.md             ${PACKAGE_DIR}/ 2>/dev/null || :
cp ${TRAVIS_BUILD_DIR}/readme.txt            ${PACKAGE_DIR}/ 2>/dev/null || :

rm -f ${PACKAGE_DIR}/index.php
rm -rdf ${PACKAGE_DIR}/vendor/bin


pushd ${PACKAGE_DIR}
zip -9 -qr ${TRAVIS_BUILD_DIR}/${RELEASE_FILE} .
pushd

ls -la ${RELEASE_FILE}
