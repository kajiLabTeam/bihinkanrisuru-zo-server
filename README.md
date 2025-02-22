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

### 2. DBの立ち上げ・マイグレーション

```shell
make up
```

```shell
yarn prisma migrate dev --name init
```

### 3. サーバの起動

```shell
yarn dev
```

### 4. サーバにアクセス

`http://localhost:3000/ui`にアクセスすると API ドキュメントが閲覧できます

## その他

### DBに接続したい場合

```shell
make connect-db
```

### prisma studioの起動

```shell
yarn prisma studio
```
