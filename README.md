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
POSTGRES_CONTAINER_NAME=bihinkanrisuruzo-server-db
POSTGRES_DB=bihinkanrisuruzo-server
POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_HOST_AUTH_METHOD=trust
POSTGRES_PORT=5432

# prisma
DATABASE_URL=postgresql://user:password@localhost:5432/bihinkanrisuruzo-server?schema=public
```

### 1. DB の立ち上げ・マイグレーション・デモデータ挿入

```shell
make up
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
