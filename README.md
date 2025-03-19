# 備品管理する蔵バックエンド

## 実行方法

### 0. 準備

#### ライブラリのインストール

```shell
yarn install
```

#### 環境変数の追加

`.env.example`と同じ場所に以下のファイルを追加

```.env
# db container
POSTGRES_CONTAINER_NAME=bihinkanrisuruzo-db
POSTGRES_DB=bihinkanrisuruzo-db
POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_PORT=5432

# server container
SERVER_CONTAINER_NAME=bihinkanrisuruzo-server
SERVER_PORT=8000

# prisma
DATABASE_URL=postgresql://user:password@bihinkanrisuruzo-db:5432/bihinkanrisuruzo-db?schema=public
```

### 1. DB の立ち上げ・マイグレーション・デモデータ挿入

```shell
make up
```

```shell
make connect-server
```

```shell
yarn prisma:init
```

```shell
yarn seed
```

### 2. サーバの起動

```shell
yarn dev
```

### 3. サーバにアクセス

`http://localhost:3000/docs`にアクセスすると API ドキュメントが閲覧できます

## その他

### DB に接続したい場合

```shell
make connect-db
```

### prisma studio の起動

```shell
yarn prisma studio
```
