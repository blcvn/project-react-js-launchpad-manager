ENV=staging
BUILD_PATH=./dist
HOST=10.122.118.228
CONTAINER_NAME=manager
HOST_DIR=/opt/launchpad-test/app/launchpad
deploy1:
	yarn
	yarn build:${ENV}
	scp -r ${BUILD_PATH}/* ${HOST}:${HOST_DIR}/${CONTAINER_NAME}
	ssh ${HOST} "cd ${HOST_DIR} && docker stop ${CONTAINER_NAME} && docker restart ${CONTAINER_NAME}"
