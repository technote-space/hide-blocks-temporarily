#!/usr/bin/env bash

set -e

bash ${TRAVIS_BUILD_DIR}/tests/bin/deploy/prepare_svn.sh

if [[ ! -d ${SVN_DIR} ]]; then
	exit;
fi

pushd ${SVN_DIR}

echo ""
echo ">> Run svn st."
svn st

pushd

bash ${TRAVIS_BUILD_DIR}/tests/bin/deploy/clear_work_dir.sh
