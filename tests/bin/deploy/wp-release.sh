#!/usr/bin/env bash

set -e

bash ${TRAVIS_BUILD_DIR}/tests/bin/deploy/prepare_svn.sh

if [[ ! -d ${SVN_DIR} ]]; then
	exit;
fi

if [[ -z "${SVN_USER}" ]] || [[ -z "${SVN_PASS}" ]]; then
	echo "<SVN_USER>, <SVN_PASS> are required."
	exit 1
fi

pushd ${SVN_DIR}

echo ""
echo ">> Run svn st."
svn st

echo ""
echo ">> Run svn commit."
svn commit -m "${SVN_COMMIT_MESSAGE}" --username ${SVN_USER} --password ${SVN_PASS} --non-interactive 2>/dev/null

echo ""
echo ">> Check if tag exist."
if [[ -z $(svn ls ${SVN_URL}/tags | grep "^${WP_TAG}/$") ]]; then
	echo "tags/${WP_TAG} not exists."
	echo ""
	echo ">> Run svn copy."
	svn copy ${REPO_NAME}/trunk ${REPO_NAME}/tags/${WP_TAG} -m "${SVN_TAG_MESSAGE}" --username ${SVN_USER} --password ${SVN_PASS} --non-interactive 2>/dev/null
else
	echo "tags/${WP_TAG} already exists."
fi

pushd

bash ${TRAVIS_BUILD_DIR}/tests/bin/deploy/clear_work_dir.sh
