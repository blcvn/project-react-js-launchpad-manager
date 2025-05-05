ENV ?= staging
SERVICE=manager

# Cấu hình chung
BUILD_PATH=./dist

# Thiết lập theo ENV
ifeq ($(ENV), staging)
	HOST=10.122.118.228
	HOST_DIR=/opt/launchpad-test/app/launchpad
	CONTAINER_NAME=manager
endif

ifeq ($(ENV), production)
	HOST=10.10.141.52
	HOST_DIR=/opt/launchpad
	CONTAINER_NAME=manager
endif

deploy:
	yarn
	yarn build:$(ENV)
	scp -r $(BUILD_PATH)/* $(HOST):$(HOST_DIR)/$(CONTAINER_NAME)
	ssh $(HOST) "cd $(HOST_DIR) && docker stop $(CONTAINER_NAME) && docker restart $(CONTAINER_NAME)"
