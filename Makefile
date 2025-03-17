-include .env

.PHONY: help
help:
	@awk -F ':|##' '/^[^\t].+?:.*?##/ { printf "\033[36m%-22s\033[0m %s\n", $$1, $$NF }' $(MAKEFILE_LIST)

.PHONY: up
up: ## ローカルでコンテナを起動する
	docker compose build && docker compose up -d && docker compose logs -f

.PHONY: logs
logs: ## ローカルでコンテナのログを表示する
	docker compose logs -f

.PHONY: connect-db
connect-db: ## ローカルでデータベースに接続する
	docker exec -it ${POSTGRES_CONTAINER_NAME} psql -U $(POSTGRES_USER) -d $(POSTGRES_DB)

.PHONY: connect-server
connect-server: ## ローカルでサーバーに接続する
	docker exec -it ${SERVER_CONTAINER_NAME} /bin/sh
