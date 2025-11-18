# test1_memo 開発環境セットアップガイド

このガイドでは、test1_memoの開発を始めるための環境セットアップ手順を説明します。

## 前提条件

- Windows / Mac / Linux のいずれかのOS
- インターネット接続

## ステップ1: Visual Studio Code (VSCode) のインストール

### 1.1 VSCodeのダウンロード

1. ブラウザで https://code.visualstudio.com/ にアクセス
2. 「Download」ボタンをクリック（自動的にOSを検出します）
3. ダウンロードしたインストーラーを実行
4. インストールウィザードの指示に従ってインストール

### 1.2 VSCodeの起動

インストール完了後、VSCodeを起動してください。

## ステップ2: VSCode拡張機能のインストール

開発を効率化するために、以下の拡張機能をインストールします。

### 2.1 Live Server（必須）

HTMLファイルをリアルタイムでブラウザにプレビューする拡張機能です。

**インストール手順**:
1. VSCodeの左サイドバーから「拡張機能」アイコンをクリック（または `Ctrl+Shift+X` / `Cmd+Shift+X`）
2. 検索ボックスに「Live Server」と入力
3. 「Live Server」（作者: Ritwick Dey）を選択
4. 「インストール」ボタンをクリック

### 2.2 Prettier（推奨）

コードを自動的に整形してくれる拡張機能です。

**インストール手順**:
1. 拡張機能の検索ボックスに「Prettier」と入力
2. 「Prettier - Code formatter」を選択
3. 「インストール」ボタンをクリック

### 2.3 その他の推奨拡張機能（任意）

- **Japanese Language Pack**: VSCodeを日本語化
- **Auto Rename Tag**: HTMLタグの開始・終了タグを同時に編集

## ステップ3: プロジェクトフォルダの準備

### 3.1 プロジェクトフォルダを開く

1. VSCodeで「ファイル」→「フォルダーを開く」を選択
2. `test1_memo` フォルダを選択
3. 「フォルダーを選択」をクリック

これで、VSCodeの左サイドバーにプロジェクトのファイル構造が表示されます。

## ステップ4: プロジェクト構造の作成

現在のプロジェクト構造は以下のようになっています：

```
test1_memo/
├── docs/                    # ドキュメント（既存）
│   ├── requirements.md
│   ├── architecture/
│   │   └── tech-stack.md
│   ├── setup-guide.md
│   └── SCOPE_PROGRESS.md
│
├── src/                     # ソースコード（これから作成）
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   └── js/
│       ├── app.js
│       ├── storage.js
│       └── ui.js
│
└── README.md
```

`src/` ディレクトリとその中のファイルは、次のステップで作成します。

## ステップ5: ブラウザの準備

開発には以下のいずれかのモダンブラウザを使用します：

- **Google Chrome**（推奨）: https://www.google.com/chrome/
- **Microsoft Edge**（推奨）: Windowsに標準搭載

いずれかのブラウザがインストールされていることを確認してください。

## ステップ6: 動作確認

### 6.1 テストHTMLファイルの作成

1. VSCodeで `test1_memo` フォルダを開いた状態で、新しいファイルを作成
2. ファイル名を `test.html` として保存
3. 以下のコードを入力：

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>動作確認</title>
</head>
<body>
    <h1>test1_memo 開発環境セットアップ完了！</h1>
    <p>この画面が表示されれば、環境セットアップは成功です。</p>

    <script>
        alert('JavaScriptも動作しています！');
    </script>
</body>
</html>
```

### 6.2 Live Serverで表示

1. `test.html` ファイルを開いた状態で、VSCode右下の「Go Live」ボタンをクリック
   - または、ファイル上で右クリック → 「Open with Live Server」を選択
2. ブラウザが自動的に開き、HTMLが表示される
3. JavaScriptのアラートが表示されれば成功！

### 6.3 テストファイルの削除

動作確認ができたら、`test.html` は削除して構いません。

## ステップ7: Git の設定（任意）

バージョン管理を行いたい場合は、Gitをセットアップします。

### 7.1 Gitのインストール確認

ターミナル（VSCodeの「表示」→「ターミナル」）で以下のコマンドを実行：

```bash
git --version
```

バージョン番号が表示されればGitはインストール済みです。

### 7.2 Gitリポジトリの初期化

```bash
git init
git add .
git commit -m "Initial commit: プロジェクトセットアップ完了"
```

## トラブルシューティング

### Live Serverが起動しない

- VSCodeを再起動してみてください
- 拡張機能が正しくインストールされているか確認してください

### ファイルが保存できない

- ファイルの保存先フォルダに書き込み権限があるか確認してください
- 管理者権限でVSCodeを起動してみてください

### ブラウザが開かない

- デフォルトブラウザが設定されているか確認してください
- 手動でブラウザを開き、`http://localhost:5500` にアクセスしてください

## 次のステップ

開発環境のセットアップが完了しました！次は以下を進めます：

1. **基礎学習** - HTML/CSS/JavaScriptの基本（必要に応じて）
2. **プロジェクト構造の作成** - src/ ディレクトリとファイルの作成
3. **プロトタイプ開発開始** - 最初のメモアプリを作成

準備ができたら、次のステップに進みましょう！
