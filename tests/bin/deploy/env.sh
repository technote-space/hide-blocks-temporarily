#!/usr/bin/env bash

set -e

export WORK_DIR=${TRAVIS_BUILD_DIR}/.work
export PACKAGE_DIR=${WORK_DIR}/packages
export SVN_DIR=${WORK_DIR}/svn
export REPO_NAME=${TRAVIS_REPO_SLUG##*/}
export RELEASE_FILE=${REPO_NAME}.zip
export RELEASE_TITLE=${TRAVIS_TAG}
export RELEASE_TAG=${TRAVIS_TAG}
export WP_TAG=${TRAVIS_TAG#v}
export SVN_URL=https://plugins.svn.wordpress.org/${REPO_NAME}
export SVN_COMMIT_MESSAGE="Commit release ${TRAVIS_TAG}"
export SVN_TAG_MESSAGE="Take snapshot of ${TRAVIS_TAG}"

#if [[ ${TRAVIS_BUILD_STAGE_NAME} = "Deploy" ]]; then
#	TAGS=($(git for-each-ref --sort=-taggerdate --format='%(tag)' refs/tags))
#	if [[ ${#TAGS[@]} -lt 2 ]]; then
#		COMMIT_RANGE=${TRAVIS_COMMIT}...$(git rev-list --max-parents=0 HEAD)
#	else
#		COMMIT_RANGE=${TRAVIS_COMMIT}...$(git log -1 --format=format:"%H" ${TAGS[1]})
#	fi
#
#	LOGS=$(git log ${COMMIT_RANGE} --no-merges --oneline)
#	export COMMIT_MESSAGE="## What’s Changed"$'\n'"* "${LOGS//$'\n'/$'\n'* }
#fi
