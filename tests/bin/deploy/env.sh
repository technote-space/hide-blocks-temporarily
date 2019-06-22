#!/usr/bin/env bash

set -ex

export PACKAGE_DIR=${TRAVIS_BUILD_DIR}/packages
export RELEASE_FILE=${TRAVIS_REPO_SLUG##*/}.zip
export RELEASE_TITLE=${TRAVIS_TAG}
