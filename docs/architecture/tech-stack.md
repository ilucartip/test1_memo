# test1_memo 技術スタック

**バージョン**: 1.0.0
**最終更新日**: 2025-11-18
**ステータス**: 決定済み

## 1. 技術選定の方針

test1_memoは**初心者の学習プロジェクト**であるため、以下の方針で技術を選定しました：

1. **学習コストの最小化**: 最もシンプルで基礎的な技術を選択
2. **即座に開始可能**: 複雑な環境構築を避ける
3. **段階的な発展**: Phase 2以降で技術を拡張できる設計
4. **基礎の習得**: Web開発の根本的な仕組みを理解できる

## 2. Phase 1（プロトタイプ）技術スタック

### 2.1 フロントエンド

| カテゴリ | 技術 | バージョン | 選定理由 |
|---------|------|-----------|---------|
| マークアップ | HTML5 | 最新 | Web開発の基礎、フレームワーク不要 |
| スタイリング | CSS3 | 最新 | Pure CSS（フレームワーク不要） |
| プログラミング | Vanilla JavaScript | ES6+ | フレームワーク不要、Web開発の基礎を学べる |

### 2.2 データ保存

| カテゴリ | 技術 | 説明 |
|---------|------|------|
| ローカルストレージ | LocalStorage API | ブラウザ標準機能、サーバー不要 |

### 2.3 開発ツール

| カテゴリ | ツール | 説明 |
|---------|-------|------|
| エディタ | Visual Studio Code (VSCode) | 無料、軽量、拡張機能が豊富 |
| ブラウザ | Chrome または Edge | 開発者ツールが充実 |
| バージョン管理 | Git | （任意）コード管理 |

### 2.4 ファイル構造（Phase 1）

```
test1_memo/
├── docs/                    # ドキュメント
│   ├── requirements.md
│   ├── architecture/
│   │   └── tech-stack.md
│   └── SCOPE_PROGRESS.md
│
├── src/                     # Phase 1のソースコード
│   ├── index.html          # メインHTML
│   ├── css/
│   │   └── style.css       # スタイルシート
│   └── js/
│       ├── app.js          # メインアプリケーションロジック
│       ├── storage.js      # LocalStorage操作
│       └── ui.js           # UI操作
│
└── README.md
```

## 3. Phase 2（デスクトップアプリ化）技術スタック

Phase 1完了後に以下の技術を追加します：

| カテゴリ | 技術 | 説明 |
|---------|------|------|
| デスクトップアプリ化 | Electron | Webアプリをデスクトップアプリにラップ |
| データ保存 | Node.js File System (fs) | ローカルファイルシステムへの読み書き |
| データ形式 | JSON | メモとフォルダ情報をJSON形式で保存 |

## 4. Phase 3（機能拡張）技術スタック

必要に応じて以下を検討：

| カテゴリ | 技術候補 | 用途 |
|---------|---------|------|
| フロントエンド | React または Vue.js | コード保守性の向上 |
| 差分表示 | diff library | 編集履歴の差分表示 |
| エクスポート | JSZip | 複数ファイルのZIP圧縮 |

## 5. 学習リソース

### 5.1 HTML/CSS/JavaScript基礎

**推奨学習順序**:
1. HTML基礎（1〜2日）
2. CSS基礎（1〜2日）
3. JavaScript基礎（2〜3日）
4. LocalStorage API（半日）

**学習リソース**:
- [MDN Web Docs](https://developer.mozilla.org/ja/) - 公式ドキュメント
- [JavaScript Primer](https://jsprimer.net/) - 日本語の無料教材
- [freeCodeCamp](https://www.freecodecamp.org/) - 無料のインタラクティブ学習

### 5.2 開発環境のセットアップ

**必要なソフトウェア**:
1. **VSCode** - https://code.visualstudio.com/
   - インストール後、推奨拡張機能:
     - Live Server（HTMLをリアルタイムプレビュー）
     - Prettier（コード整形）
     - ESLint（JavaScript文法チェック）

2. **モダンブラウザ**（いずれか）
   - Google Chrome
   - Microsoft Edge

## 6. 技術的な制約と注意点

### 6.1 LocalStorageの制限

- **容量制限**: 5〜10MB程度（ブラウザによる）
- **永続性**: ブラウザデータを消すとメモも消える
- **セキュリティ**: 暗号化されない（個人専用なので問題なし）

### 6.2 Phase 1の制限事項

- **オフライン動作**: ローカルHTMLファイルを開くだけなので常にオフライン動作
- **モバイル対応**: Phase 1では対応しない（Phase 3で検討）
- **複数タブ対応**: 同じブラウザの複数タブで同時編集すると競合の可能性あり

## 7. Phase 1実装の技術的なアプローチ

### 7.1 データ構造（LocalStorage）

```javascript
// LocalStorageに保存するデータ構造
{
  "folders": [
    {
      "id": "uuid-1",
      "name": "仕事",
      "createdAt": "2025-11-18T00:00:00Z"
    }
  ],
  "memos": [
    {
      "id": "uuid-1",
      "folderId": "folder-uuid-1",
      "title": "メモのタイトル",
      "content": "メモの本文",
      "createdAt": "2025-11-18T00:00:00Z",
      "updatedAt": "2025-11-18T12:00:00Z"
    }
  ],
  "settings": {
    "currentFolderId": "uuid-1",  // 現在選択中のフォルダ
    "currentMemoId": "uuid-1"     // 現在選択中のメモ
  }
}
```

### 7.2 主要な技術的課題と解決策

| 課題 | 解決策 |
|------|--------|
| 10万文字の長文対応 | `<textarea>`要素で十分対応可能 |
| 検索の高速化 | JavaScriptの`indexOf()`や`includes()`で十分 |
| IDの生成 | `Date.now() + Math.random()`で簡易的なユニークID生成 |

## 8. 次のステップ

技術スタックが決定しました。次は以下を進めます：

1. **開発環境のセットアップ**
   - VSCodeのインストール
   - Live Server拡張機能のインストール
   - プロジェクトフォルダの作成

2. **基礎学習**
   - HTML/CSS/JavaScriptの基礎（必要に応じて）
   - LocalStorage APIの学習

3. **プロトタイプ開発開始**
   - 基本的なHTMLファイルの作成
   - シンプルなメモアプリの実装
