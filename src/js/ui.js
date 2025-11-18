/**
 * ui.js
 * UIの表示更新を担当するファイル
 */

/**
 * UI管理オブジェクト
 * 画面の表示更新を担当
 */
const UI = {
    /**
     * フォルダ一覧を表示
     */
    renderFolders: function() {
        const folders = FolderManager.getAll();
        const currentFolderId = SettingsManager.getCurrentFolderId();
        const folderList = document.getElementById('folderList');

        // 既存のリストをクリア
        folderList.innerHTML = '';

        // フォルダが存在しない場合
        if (folders.length === 0) {
            folderList.innerHTML = '<li class="empty-message">フォルダがありません</li>';
            return;
        }

        // 各フォルダを表示
        folders.forEach(folder => {
            const li = document.createElement('li');
            li.className = 'folder-item';
            if (folder.id === currentFolderId) {
                li.classList.add('active');
            }

            // フォルダ名
            const nameSpan = document.createElement('span');
            nameSpan.className = 'folder-name';
            nameSpan.textContent = folder.name;

            // 削除ボタン
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'folder-delete-btn';
            deleteBtn.textContent = '×';
            deleteBtn.title = 'フォルダを削除';

            // 削除ボタンのクリックイベント
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // 親要素のクリックイベントを発火させない

                if (confirm(`フォルダ「${folder.name}」とその中のメモをすべて削除しますか？`)) {
                    FolderManager.delete(folder.id);
                    this.renderFolders();
                    this.renderMemos();
                    this.clearEditor();
                }
            });

            // フォルダ項目のクリックイベント
            li.addEventListener('click', () => {
                SettingsManager.setCurrentFolderId(folder.id);
                SettingsManager.setCurrentMemoId(null);
                this.renderFolders();
                this.renderMemos();
                this.clearEditor();
            });

            li.appendChild(nameSpan);
            li.appendChild(deleteBtn);
            folderList.appendChild(li);
        });
    },

    /**
     * メモ一覧を表示
     */
    renderMemos: function() {
        const currentFolderId = SettingsManager.getCurrentFolderId();
        const memos = MemoManager.getByFolder(currentFolderId);
        const currentMemoId = SettingsManager.getCurrentMemoId();
        const memoList = document.getElementById('memoList');

        // 既存のリストをクリア
        memoList.innerHTML = '';

        // メモが存在しない場合
        if (memos.length === 0) {
            memoList.innerHTML = '<li class="empty-message">メモがありません<br>「+ 新規メモ」ボタンで作成してください</li>';
            return;
        }

        // 更新日時の新しい順に並び替え
        memos.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

        // 各メモを表示
        memos.forEach(memo => {
            const li = document.createElement('li');
            li.className = 'memo-item';
            if (memo.id === currentMemoId) {
                li.classList.add('active');
            }

            // メモタイトル
            const titleDiv = document.createElement('div');
            titleDiv.className = 'memo-item-title';
            titleDiv.textContent = memo.title || '無題のメモ';

            // メモプレビュー（本文の最初の50文字）
            const previewDiv = document.createElement('div');
            previewDiv.className = 'memo-item-preview';
            const previewText = memo.content.substring(0, 50);
            previewDiv.textContent = previewText || '（内容なし）';

            // 更新日時
            const dateDiv = document.createElement('div');
            dateDiv.className = 'memo-item-date';
            dateDiv.textContent = this.formatDate(memo.updatedAt);

            // メモ項目のクリックイベント
            li.addEventListener('click', () => {
                SettingsManager.setCurrentMemoId(memo.id);
                this.renderMemos();
                this.loadMemoToEditor(memo.id);
            });

            li.appendChild(titleDiv);
            li.appendChild(previewDiv);
            li.appendChild(dateDiv);
            memoList.appendChild(li);
        });
    },

    /**
     * 検索結果を表示
     * @param {string} query - 検索クエリ
     */
    renderSearchResults: function(query) {
        const memos = MemoManager.search(query);
        const currentMemoId = SettingsManager.getCurrentMemoId();
        const memoList = document.getElementById('memoList');

        // 既存のリストをクリア
        memoList.innerHTML = '';

        // 検索結果が存在しない場合
        if (memos.length === 0) {
            memoList.innerHTML = '<li class="empty-message">検索結果が見つかりません</li>';
            return;
        }

        // 更新日時の新しい順に並び替え
        memos.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

        // 各メモを表示
        memos.forEach(memo => {
            const li = document.createElement('li');
            li.className = 'memo-item';
            if (memo.id === currentMemoId) {
                li.classList.add('active');
            }

            // メモタイトル
            const titleDiv = document.createElement('div');
            titleDiv.className = 'memo-item-title';
            titleDiv.textContent = memo.title || '無題のメモ';

            // メモプレビュー
            const previewDiv = document.createElement('div');
            previewDiv.className = 'memo-item-preview';
            const previewText = memo.content.substring(0, 50);
            previewDiv.textContent = previewText || '（内容なし）';

            // フォルダ名も表示
            const folder = FolderManager.getById(memo.folderId);
            const folderDiv = document.createElement('div');
            folderDiv.className = 'memo-item-date';
            folderDiv.textContent = `フォルダ: ${folder ? folder.name : '不明'} | ${this.formatDate(memo.updatedAt)}`;

            // メモ項目のクリックイベント
            li.addEventListener('click', () => {
                SettingsManager.setCurrentMemoId(memo.id);
                SettingsManager.setCurrentFolderId(memo.folderId);
                this.renderFolders();
                this.renderMemos();
                this.loadMemoToEditor(memo.id);
            });

            li.appendChild(titleDiv);
            li.appendChild(previewDiv);
            li.appendChild(folderDiv);
            memoList.appendChild(li);
        });
    },

    /**
     * メモをエディタに読み込む
     * @param {string} memoId - メモID
     */
    loadMemoToEditor: function(memoId) {
        const memo = MemoManager.getById(memoId);

        if (!memo) {
            console.error('メモが見つかりません:', memoId);
            return;
        }

        // タイトルと本文を設定
        document.getElementById('memoTitle').value = memo.title;
        document.getElementById('memoContent').value = memo.content;

        // メモ情報を表示
        this.updateMemoInfo(memo);
    },

    /**
     * エディタをクリア
     */
    clearEditor: function() {
        document.getElementById('memoTitle').value = '';
        document.getElementById('memoContent').value = '';
        document.getElementById('memoInfo').textContent = '';
    },

    /**
     * メモ情報（作成日時、更新日時、文字数）を表示
     * @param {Object} memo - メモオブジェクト
     */
    updateMemoInfo: function(memo) {
        const charCount = memo.content.length;
        const createdDate = this.formatDate(memo.createdAt);
        const updatedDate = this.formatDate(memo.updatedAt);

        const infoText = `作成: ${createdDate} | 更新: ${updatedDate} | 文字数: ${charCount.toLocaleString()}`;
        document.getElementById('memoInfo').textContent = infoText;
    },

    /**
     * 日時を読みやすい形式にフォーマット
     * @param {string} isoString - ISO形式の日時文字列
     * @returns {string} フォーマットされた日時
     */
    formatDate: function(isoString) {
        const date = new Date(isoString);
        const now = new Date();

        // 今日の日付かどうか
        const isToday = date.toDateString() === now.toDateString();

        if (isToday) {
            // 今日の場合は時刻のみ表示
            return date.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' });
        } else {
            // それ以外は日付を表示
            return date.toLocaleDateString('ja-JP', { month: '2-digit', day: '2-digit' });
        }
    },

    /**
     * 新規フォルダ作成ダイアログを表示
     */
    showNewFolderDialog: function() {
        const folderName = prompt('新しいフォルダ名を入力してください:');

        if (folderName && folderName.trim() !== '') {
            const newFolder = FolderManager.create(folderName.trim());
            SettingsManager.setCurrentFolderId(newFolder.id);
            this.renderFolders();
            this.renderMemos();
            this.clearEditor();
        }
    },

    /**
     * 新規メモを作成
     */
    createNewMemo: function() {
        const currentFolderId = SettingsManager.getCurrentFolderId();
        const newMemo = MemoManager.create(currentFolderId);

        SettingsManager.setCurrentMemoId(newMemo.id);
        this.renderMemos();
        this.loadMemoToEditor(newMemo.id);

        // タイトル入力欄にフォーカス
        document.getElementById('memoTitle').focus();
    },

    /**
     * メモを保存
     */
    saveMemo: function() {
        const currentMemoId = SettingsManager.getCurrentMemoId();

        if (!currentMemoId) {
            alert('保存するメモがありません。先に新規メモを作成してください。');
            return;
        }

        const title = document.getElementById('memoTitle').value;
        const content = document.getElementById('memoContent').value;

        MemoManager.update(currentMemoId, { title, content });

        // メモ一覧を更新
        this.renderMemos();

        // メモ情報を更新
        const memo = MemoManager.getById(currentMemoId);
        this.updateMemoInfo(memo);

        // 保存完了メッセージ（簡易版）
        console.log('メモを保存しました');
    },

    /**
     * メモを削除
     */
    deleteMemo: function() {
        const currentMemoId = SettingsManager.getCurrentMemoId();

        if (!currentMemoId) {
            alert('削除するメモがありません。');
            return;
        }

        const memo = MemoManager.getById(currentMemoId);
        if (!memo) {
            return;
        }

        if (confirm(`メモ「${memo.title}」を削除しますか？`)) {
            MemoManager.delete(currentMemoId);
            SettingsManager.setCurrentMemoId(null);
            this.renderMemos();
            this.clearEditor();
        }
    }
};
