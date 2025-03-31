ENV=staging
BUILD_PATH=./build
HOST=10.10.141.52
CONTAINER_NAME=manager

deploy1:
	yarn
	yarn build:${ENV}
	scp -r ${BUILD_PATH}/* ${HOST}:/opt/launchpad/${CONTAINER_NAME}
	ssh ${HOST} "cd /opt/launchpad && docker stop ${CONTAINER_NAME} && docker restart ${CONTAINER_NAME}"

deploy2:
	yarn
	yarn build:${ENV}
	scp -r ${BUILD_PATH}/* ${HOST}:/opt/launchpad/${CONTAINER_NAME}-v2
	ssh ${HOST} "cd /opt/launchpad && docker stop ${CONTAINER_NAME}-v2 && docker restart ${CONTAINER_NAME}-v2"