/**
 * storage.js
 * LocalStorageを使ったデータ保存・読み込みを担当するファイル
 */

// LocalStorageのキー名（データを保存する場所の名前）
const STORAGE_KEY = 'test1_memo_data';

/**
 * データ管理オブジェクト
 * メモやフォルダのデータを保存・読み込みする機能を提供
 */
const Storage = {
    /**
     * LocalStorageからデータを読み込む
     * @returns {Object} 保存されているデータ
     */
    load: function() {
        try {
            // LocalStorageからJSON形式の文字列を取得
            const dataStr = localStorage.getItem(STORAGE_KEY);

            // データが存在しない場合は初期データを返す
            if (!dataStr) {
                return this.getInitialData();
            }

            // JSON文字列をJavaScriptオブジェクトに変換
            const data = JSON.parse(dataStr);
            return data;
        } catch (error) {
            console.error('データの読み込みに失敗しました:', error);
            return this.getInitialData();
        }
    },

    /**
     * LocalStorageにデータを保存する
     * @param {Object} data - 保存するデータ
     */
    save: function(data) {
        try {
            // JavaScriptオブジェクトをJSON文字列に変換
            const dataStr = JSON.stringify(data);

            // LocalStorageに保存
            localStorage.setItem(STORAGE_KEY, dataStr);
        } catch (error) {
            console.error('データの保存に失敗しました:', error);
            alert('データの保存に失敗しました。');
        }
    },

    /**
     * 初期データを返す
     * 初めてアプリを使う時のデフォルトデータ
     * @returns {Object} 初期データ
     */
    getInitialData: function() {
        // デフォルトフォルダのIDを生成
        const defaultFolderId = this.generateId();

        return {
            folders: [
                {
                    id: defaultFolderId,
                    name: '一般',
                    createdAt: new Date().toISOString()
                }
            ],
            memos: [],
            settings: {
                currentFolderId: defaultFolderId,  // 現在選択中のフォルダ
                currentMemoId: null                // 現在選択中のメモ
            }
        };
    },

    /**
     * ユニークなIDを生成する
     * @returns {string} ユニークなID
     */
    generateId: function() {
        // タイムスタンプとランダム数値を組み合わせて一意のIDを生成
        return Date.now().toString() + '-' + Math.random().toString(36).slice(2, 11);
    },

    /**
     * すべてのデータをクリアする（デバッグ用）
     */
    clear: function() {
        localStorage.removeItem(STORAGE_KEY);
    },

    /**
     * データをエクスポート（JSON形式）
     * @returns {string} JSON文字列
     */
    export: function() {
        const data = this.load();
        return JSON.stringify(data, null, 2);
    },

    /**
     * データをインポート（JSON形式）
     * @param {string} jsonString - インポートするJSON文字列
     * @returns {boolean} 成功したかどうか
     */
    import: function(jsonString) {
        try {
            const data = JSON.parse(jsonString);

            // データの検証
            if (!data.folders || !Array.isArray(data.folders)) {
                throw new Error('無効なデータ形式');
            }
            if (!data.memos || !Array.isArray(data.memos)) {
                throw new Error('無効なデータ形式');
            }

            // データを保存
            this.save(data);
            return true;
        } catch (error) {
            console.error('インポートエラー:', error);
            return false;
        }
    }
};

/**
 * フォルダ操作を担当するオブジェクト
 */
const FolderManager = {
    /**
     * すべてのフォルダを取得
     * @returns {Array} フォルダの配列
     */
    getAll: function() {
        const data = Storage.load();
        return data.folders || [];
    },

    /**
     * 新しいフォルダを作成
     * @param {string} name - フォルダ名
     * @returns {Object} 作成されたフォルダ
     */
    create: function(name) {
        const data = Storage.load();

        const newFolder = {
            id: Storage.generateId(),
            name: name,
            createdAt: new Date().toISOString()
        };

        data.folders.push(newFolder);
        Storage.save(data);

        return newFolder;
    },

    /**
     * フォルダを削除
     * @param {string} folderId - 削除するフォルダのID
     */
    delete: function(folderId) {
        const data = Storage.load();

        // 最後の1つのフォルダは削除できないようにする
        if (data.folders.length <= 1) {
            alert('最後のフォルダは削除できません。');
            return;
        }

        // そのフォルダ内のメモも削除
        data.memos = data.memos.filter(memo => memo.folderId !== folderId);

        // フォルダを削除
        data.folders = data.folders.filter(folder => folder.id !== folderId);

        // 削除したフォルダが選択中だった場合、最初のフォルダを選択
        if (data.settings.currentFolderId === folderId) {
            data.settings.currentFolderId = data.folders[0].id;
            data.settings.currentMemoId = null;
        }

        Storage.save(data);
    },

    /**
     * IDでフォルダを取得
     * @param {string} folderId - フォルダID
     * @returns {Object|null} フォルダオブジェクト
     */
    getById: function(folderId) {
        const data = Storage.load();
        return data.folders.find(folder => folder.id === folderId) || null;
    }
};

/**
 * メモ操作を担当するオブジェクト
 */
const MemoManager = {
    /**
     * すべてのメモを取得
     * @returns {Array} メモの配列
     */
    getAll: function() {
        const data = Storage.load();
        return data.memos || [];
    },

    /**
     * 特定のフォルダ内のメモを取得
     * @param {string} folderId - フォルダID
     * @returns {Array} メモの配列
     */
    getByFolder: function(folderId) {
        const data = Storage.load();
        return data.memos.filter(memo => memo.folderId === folderId);
    },

    /**
     * IDでメモを取得
     * @param {string} memoId - メモID
     * @returns {Object|null} メモオブジェクト
     */
    getById: function(memoId) {
        const data = Storage.load();
        return data.memos.find(memo => memo.id === memoId) || null;
    },

    /**
     * 新しいメモを作成
     * @param {string} folderId - フォルダID
     * @returns {Object} 作成されたメモ
     */
    create: function(folderId) {
        const data = Storage.load();

        const now = new Date().toISOString();
        const newMemo = {
            id: Storage.generateId(),
            folderId: folderId,
            title: '無題のメモ',
            content: '',
            createdAt: now,
            updatedAt: now
        };

        data.memos.push(newMemo);
        Storage.save(data);

        return newMemo;
    },

    /**
     * メモを更新
     * @param {string} memoId - メモID
     * @param {Object} updates - 更新内容 { title, content }
     */
    update: function(memoId, updates) {
        const data = Storage.load();

        const memoIndex = data.memos.findIndex(memo => memo.id === memoId);
        if (memoIndex === -1) {
            console.error('メモが見つかりません:', memoId);
            return;
        }

        // メモを更新
        data.memos[memoIndex] = {
            ...data.memos[memoIndex],
            ...updates,
            updatedAt: new Date().toISOString()
        };

        Storage.save(data);
    },

    /**
     * メモを削除
     * @param {string} memoId - 削除するメモのID
     */
    delete: function(memoId) {
        const data = Storage.load();

        // メモを削除
        data.memos = data.memos.filter(memo => memo.id !== memoId);

        // 削除したメモが選択中だった場合、選択を解除
        if (data.settings.currentMemoId === memoId) {
            data.settings.currentMemoId = null;
        }

        Storage.save(data);
    },

    /**
     * メモを検索
     * @param {string} query - 検索クエリ
     * @returns {Array} 検索結果のメモ配列
     */
    search: function(query) {
        const data = Storage.load();

        if (!query || query.trim() === '') {
            return data.memos;
        }

        const lowerQuery = query.toLowerCase();

        return data.memos.filter(memo => {
            const titleMatch = memo.title.toLowerCase().includes(lowerQuery);
            const contentMatch = memo.content.toLowerCase().includes(lowerQuery);
            return titleMatch || contentMatch;
        });
    },

    /**
     * メモを別のフォルダに移動
     * @param {string} memoId - メモID
     * @param {string} newFolderId - 移動先のフォルダID
     */
    moveToFolder: function(memoId, newFolderId) {
        const data = Storage.load();

        const memoIndex = data.memos.findIndex(memo => memo.id === memoId);
        if (memoIndex === -1) {
            console.error('メモが見つかりません:', memoId);
            return;
        }

        // フォルダが存在するか確認
        const folderExists = data.folders.some(folder => folder.id === newFolderId);
        if (!folderExists) {
            console.error('フォルダが見つかりません:', newFolderId);
            return;
        }

        // メモのフォルダを変更
        data.memos[memoIndex].folderId = newFolderId;
        data.memos[memoIndex].updatedAt = new Date().toISOString();

        Storage.save(data);
    }
};

/**
 * 設定管理を担当するオブジェクト
 */
const SettingsManager = {
    /**
     * 現在選択中のフォルダIDを取得
     * @returns {string} フォルダID
     */
    getCurrentFolderId: function() {
        const data = Storage.load();
        return data.settings.currentFolderId;
    },

    /**
     * 現在選択中のフォルダIDを設定
     * @param {string} folderId - フォルダID
     */
    setCurrentFolderId: function(folderId) {
        const data = Storage.load();
        data.settings.currentFolderId = folderId;
        Storage.save(data);
    },

    /**
     * 現在選択中のメモIDを取得
     * @returns {string|null} メモID
     */
    getCurrentMemoId: function() {
        const data = Storage.load();
        return data.settings.currentMemoId;
    },

    /**
     * 現在選択中のメモIDを設定
     * @param {string|null} memoId - メモID
     */
    setCurrentMemoId: function(memoId) {
        const data = Storage.load();
        data.settings.currentMemoId = memoId;
        Storage.save(data);
    }
};
