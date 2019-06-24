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

echo ""
echo ">> Check if tag exists."
if [[ -z $(svn ls ${SVN_URL}/tags | grep "^${WP_TAG}/$") ]]; then
	echo "tags/${WP_TAG} not exists."
else
	echo "tags/${WP_TAG} already exists."
fi

pushd

bash ${TRAVIS_BUILD_DIR}/tests/bin/deploy/clear_work_dir.sh
