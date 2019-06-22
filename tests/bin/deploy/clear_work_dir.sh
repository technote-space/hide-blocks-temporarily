#!/usr/bin/env bash

set -e

if [[ -n "${WORK_DIR}" ]] && [[ -d ${WORK_DIR} ]]; then
	chmod -R +w ${WORK_DIR}
	rm -rdf ${WORK_DIR}
fi
