# test1_memo 学習ガイド

このガイドでは、test1_memoの開発に必要な基礎知識を学ぶためのリソースと学習の進め方を紹介します。

## 目次

1. [学習の全体像](#学習の全体像)
2. [HTML基礎](#html基礎)
3. [CSS基礎](#css基礎)
4. [JavaScript基礎](#javascript基礎)
5. [LocalStorage API](#localstorage-api)
6. [コードの読み方](#コードの読み方)
7. [次のステップ](#次のステップ)

---

## 学習の全体像

test1_memoはHTML、CSS、JavaScriptの3つの技術で構成されています。

```
┌─────────────────────────────────┐
│   test1_memo アプリケーション      │
├─────────────────────────────────┤
│                                 │
│  HTML (構造)                     │
│  ├─ ページの骨格を定義            │
│  └─ ボタン、入力欄などの要素を配置  │
│                                 │
│  CSS (見た目)                    │
│  ├─ 色、サイズ、配置を決める       │
│  └─ デザインを整える              │
│                                 │
│  JavaScript (動き)               │
│  ├─ ボタンが押されたときの処理     │
│  ├─ データの保存・読み込み         │
│  └─ 画面の更新                   │
│                                 │
└─────────────────────────────────┘
```

### 推奨学習順序

1. **HTML基礎** (1〜2日) - ページの構造を理解
2. **CSS基礎** (1〜2日) - 見た目を整える方法を学ぶ
3. **JavaScript基礎** (2〜3日) - プログラミングの基礎を習得
4. **LocalStorage API** (半日) - データ保存の仕組みを学ぶ
5. **test1_memoのコードを読む** (1日) - 実際のコードで復習

**合計: 5〜7日**

---

## HTML基礎

### HTMLとは？

HTML (HyperText Markup Language) は、Webページの構造を定義する言語です。

### 学ぶべき内容

- [ ] HTMLの基本構造 (`<!DOCTYPE html>`, `<html>`, `<head>`, `<body>`)
- [ ] よく使うタグ (`<div>`, `<span>`, `<h1>〜<h6>`, `<p>`, `<ul>`, `<li>`)
- [ ] フォーム要素 (`<input>`, `<button>`, `<textarea>`)
- [ ] 属性 (`id`, `class`, `placeholder`)

### おすすめ学習リソース

**日本語**:
- [MDN Web Docs - HTML入門](https://developer.mozilla.org/ja/docs/Learn/HTML/Introduction_to_HTML)
- [ドットインストール - HTML入門](https://dotinstall.com/lessons/basic_html_v5)

**英語**:
- [freeCodeCamp - HTML Tutorial](https://www.freecodecamp.org/)

### test1_memoで使っているHTML

`src/index.html` を開いて、以下の要素を確認してみましょう：

```html
<!-- ヘッダー部分 -->
<header class="header">
    <h1>test1_memo</h1>
    <div class="search-box">
        <input type="text" id="searchInput" placeholder="メモを検索...">
    </div>
</header>
```

- `<header>`: ヘッダーセクション
- `<h1>`: 見出し
- `<input>`: 入力欄
- `id="searchInput"`: JavaScriptから要素を操作するための識別子

---

## CSS基礎

### CSSとは？

CSS (Cascading Style Sheets) は、HTMLで作った構造に色やサイズ、配置などの見た目を付ける言語です。

### 学ぶべき内容

- [ ] CSSの基本構文 (セレクタ、プロパティ、値)
- [ ] よく使うプロパティ (`color`, `background-color`, `font-size`, `padding`, `margin`)
- [ ] レイアウト (`display`, `flex`, `width`, `height`)
- [ ] ボックスモデル
- [ ] クラスとID

### おすすめ学習リソース

**日本語**:
- [MDN Web Docs - CSS入門](https://developer.mozilla.org/ja/docs/Learn/CSS/First_steps)
- [ドットインストール - CSS入門](https://dotinstall.com/lessons/basic_css_v4)

**英語**:
- [freeCodeCamp - CSS Tutorial](https://www.freecodecamp.org/)

### test1_memoで使っているCSS

`src/css/style.css` を開いて、以下のスタイルを確認してみましょう：

```css
.header {
    background-color: #2c3e50;
    color: white;
    padding: 15px 20px;
    display: flex;
}
```

- `.header`: クラス「header」の要素に適用
- `background-color`: 背景色
- `padding`: 内側の余白
- `display: flex`: 柔軟なレイアウト

---

## JavaScript基礎

### JavaScriptとは？

JavaScript は、Webページに動きや機能を追加するプログラミング言語です。

### 学ぶべき内容

#### 基礎編 (優先度: 高)

- [ ] 変数の宣言 (`const`, `let`)
- [ ] データ型 (文字列、数値、真偽値、配列、オブジェクト)
- [ ] 関数の定義と呼び出し
- [ ] 条件分岐 (`if`, `else`)
- [ ] ループ (`for`, `forEach`)
- [ ] DOM操作 (`document.getElementById`, `addEventListener`)

#### 中級編 (優先度: 中)

- [ ] オブジェクトとメソッド
- [ ] 配列の操作 (`push`, `filter`, `find`, `map`)
- [ ] テンプレートリテラル
- [ ] アロー関数

### おすすめ学習リソース

**日本語**:
- [JavaScript Primer](https://jsprimer.net/) - 無料、体系的
- [MDN Web Docs - JavaScript入門](https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide)
- [ドットインストール - JavaScript入門](https://dotinstall.com/lessons/basic_javascript_v4)

**英語**:
- [freeCodeCamp - JavaScript Tutorial](https://www.freecodecamp.org/)
- [JavaScript.info](https://javascript.info/)

### test1_memoで使っているJavaScript

#### 変数とデータ型

```javascript
const STORAGE_KEY = 'test1_memo_data';  // 定数
let searchTimeout;                       // 変数
```

#### 関数

```javascript
// 関数の定義
function renderAll() {
    UI.renderFolders();
    UI.renderMemos();
}

// 関数の呼び出し
renderAll();
```

#### オブジェクト

```javascript
const Storage = {
    load: function() {
        // 処理
    },
    save: function(data) {
        // 処理
    }
};

// メソッドの呼び出し
Storage.load();
```

#### DOM操作

```javascript
// 要素を取得
const button = document.getElementById('saveMemoBtn');

// イベントリスナーを追加
button.addEventListener('click', function() {
    alert('ボタンが押されました！');
});
```

---

## LocalStorage API

### LocalStorageとは？

ブラウザにデータを保存できる仕組みです。ブラウザを閉じてもデータは残ります。

### 基本的な使い方

```javascript
// データを保存
localStorage.setItem('myKey', 'myValue');

// データを読み込み
const value = localStorage.getItem('myKey');
console.log(value);  // 'myValue'

// データを削除
localStorage.removeItem('myKey');
```

### JSONとの組み合わせ

LocalStorageは文字列しか保存できないので、オブジェクトを保存する場合はJSON形式に変換します。

```javascript
// オブジェクトをJSON文字列に変換して保存
const data = { name: '太郎', age: 20 };
localStorage.setItem('user', JSON.stringify(data));

// JSON文字列を読み込んでオブジェクトに変換
const userStr = localStorage.getItem('user');
const user = JSON.parse(userStr);
console.log(user.name);  // '太郎'
```

### test1_memoでの使用例

`src/js/storage.js` を見てください：

```javascript
const Storage = {
    // データを読み込む
    load: function() {
        const dataStr = localStorage.getItem(STORAGE_KEY);
        const data = JSON.parse(dataStr);
        return data;
    },

    // データを保存する
    save: function(data) {
        const dataStr = JSON.stringify(data);
        localStorage.setItem(STORAGE_KEY, dataStr);
    }
};
```

---

## コードの読み方

### test1_memoのコード構成

```
src/
├── index.html       ← まずここを見る（画面の構造）
├── css/
│   └── style.css    ← 次にここを見る（デザイン）
└── js/
    ├── storage.js   ← データの保存・読み込み
    ├── ui.js        ← 画面の表示更新
    └── app.js       ← アプリの起動とイベント処理
```

### コードを読む順序

1. **index.html** - どんな要素があるか確認
2. **app.js** - アプリが起動したときに何が起こるか確認
3. **storage.js** - データ構造を理解
4. **ui.js** - 画面がどう更新されるか確認
5. **style.css** - デザインの詳細を確認

### コメントを活用する

すべてのファイルに日本語のコメントが入っています。コメントを読めば、そのコードが何をしているかわかります。

```javascript
/**
 * フォルダ一覧を表示
 */
UI.renderFolders: function() {
    // 処理の内容
}
```

---

## 次のステップ

### 1. 基礎学習を進める

上記のリソースを使って、HTML/CSS/JavaScriptの基礎を学びましょう。

### 2. test1_memoを実際に動かす

1. [セットアップガイド](/docs/setup-guide.md)に従って環境を準備
2. `src/index.html` をブラウザで開く
3. 実際にメモを作成・編集・削除してみる

### 3. コードを読んで理解する

1. ブラウザの開発者ツール（F12キー）を開く
2. コンソールタブで `debugPrintData()` と入力して実行
3. 保存されているデータの構造を確認
4. コードを1行ずつ読んで、何をしているか確認

### 4. コードを変更してみる

**簡単な変更例**:

- ヘッダーの色を変える (`style.css` の `.header` の `background-color`)
- デフォルトフォルダ名を変える (`storage.js` の `getInitialData()`)
- 検索のプレースホルダーを変える (`index.html` の `<input>`)

### 5. 機能を追加してみる

**チャレンジ例**:

- メモの並び替え順を変更できるようにする
- フォルダの色を変更できるようにする
- メモにタグを追加する機能を作る

---

## 困ったときは

### デバッグのヒント

1. **ブラウザの開発者ツールを開く** (F12キー)
2. **コンソールタブでエラーを確認**
3. **`console.log()` で値を出力**

```javascript
console.log('ここまで実行されました');
console.log('変数の値:', myVariable);
```

### よくあるエラー

| エラーメッセージ | 原因 | 解決方法 |
|---------------|------|---------|
| `Uncaught ReferenceError: xxx is not defined` | 変数や関数が定義されていない | スペルミスを確認、定義されているか確認 |
| `Uncaught TypeError: Cannot read property 'xxx' of null` | 要素が見つからない | IDやクラス名が正しいか確認 |
| `Uncaught SyntaxError` | 文法エラー | 括弧やセミコロンの漏れを確認 |

### 学習コミュニティ

- [teratail](https://teratail.com/) - 日本語のQ&Aサイト
- [Stack Overflow](https://stackoverflow.com/) - 英語のQ&Aサイト
- [MDN Web Docs](https://developer.mozilla.org/ja/) - 公式ドキュメント

---

頑張ってください！分からないことがあれば、一歩ずつ進めていきましょう。
