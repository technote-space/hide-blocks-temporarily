#!/usr/bin/env bash

set -e

if [[ -z "${REPO_NAME}" ]]; then
	echo "repo name is required."
	exit 1
fi

set +e
if [[ -z $(svn ls ${SVN_URL}) ]]; then
	echo "repository [${REPO_NAME}] is not exists."
	exit
fi
set -e

echo ""
echo ">> Run svn checkout."
if [[ -d ${SVN_DIR} ]]; then
	chmod -R +w ${SVN_DIR}
	rm -rdf ${SVN_DIR}
fi
mkdir -p ${SVN_DIR}
svn co ${SVN_URL}/trunk ${SVN_DIR}

echo ""
echo ">> Prepare release files."
bash ${TRAVIS_BUILD_DIR}/tests/bin/deploy/prepare_release_files.sh

echo ""
echo ">> Sync build files to svn."
rsync -a --exclude=".svn" --checksum --delete ${PACKAGE_DIR}/ ${SVN_DIR}/

pushd ${SVN_DIR}

echo ""
echo ">> Run svn del."
svn st | grep '^!' | sed -e 's/^\!\s*/svn del -q /g' | sh

echo ""
echo ">> Run svn add."
svn st | grep '^?' | sed -e 's/^\?\s*/svn add -q /g' | sh

pushd
