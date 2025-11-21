/**
 * app.js
 * アプリケーションのメインファイル
 * イベントリスナーの設定とアプリケーションの初期化を担当
 */

/**
 * アプリケーションの初期化
 * ページが読み込まれたら実行される
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('test1_memo アプリケーションを起動しています...');

    // 初期データの確認と設定
    initializeApp();

    // イベントリスナーの設定
    setupEventListeners();

    // 初期表示
    renderAll();

    console.log('test1_memo アプリケーションの起動が完了しました');
});

/**
 * アプリケーションの初期化
 */
function initializeApp() {
    // LocalStorageにデータが存在しない場合、初期データを作成
    const data = Storage.load();

    // フォルダが1つも無い場合、デフォルトフォルダを作成
    if (!data.folders || data.folders.length === 0) {
        console.log('初期データを作成しています...');
        const initialData = Storage.getInitialData();
        Storage.save(initialData);
    }

    // 毎回ガイドを表示するために、選択中のメモをクリア
    SettingsManager.setCurrentMemoId(null);
}

/**
 * すべてのイベントリスナーを設定
 */
function setupEventListeners() {
    // 新規フォルダボタン
    const newFolderBtn = document.getElementById('newFolderBtn');
    if (newFolderBtn) {
        newFolderBtn.addEventListener('click', function() {
            UI.showNewFolderDialog();
        });
    }

    // 新規メモボタン
    const newMemoBtn = document.getElementById('newMemoBtn');
    if (newMemoBtn) {
        newMemoBtn.addEventListener('click', function() {
            UI.createNewMemo();
        });
    }

    // 保存ボタン
    const saveMemoBtn = document.getElementById('saveMemoBtn');
    if (saveMemoBtn) {
        saveMemoBtn.addEventListener('click', function() {
            UI.saveMemo();
        });
    }

    // 削除ボタン
    const deleteMemoBtn = document.getElementById('deleteMemoBtn');
    if (deleteMemoBtn) {
        deleteMemoBtn.addEventListener('click', function() {
            UI.deleteMemo();
        });
    }

    // フォルダ選択
    const memoFolderSelect = document.getElementById('memoFolderSelect');
    if (memoFolderSelect) {
        memoFolderSelect.addEventListener('change', function(e) {
            const currentMemoId = SettingsManager.getCurrentMemoId();
            const newFolderId = e.target.value;

            if (currentMemoId && newFolderId) {
                // メモを新しいフォルダに移動
                MemoManager.moveToFolder(currentMemoId, newFolderId);

                // 現在のフォルダを変更
                SettingsManager.setCurrentFolderId(newFolderId);

                // メモ一覧を更新
                UI.renderMemos();

                // 成功メッセージを表示
                UI.showSuccessMessage('フォルダを移動しました');
            }
        });
    }

    // 検索入力
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        // リアルタイム検索（入力のたびに検索）
        let searchTimeout;
        searchInput.addEventListener('input', function(e) {
            const query = e.target.value;

            // 入力が止まってから300ms後に検索実行（パフォーマンス対策）
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(function() {
                if (query.trim() === '') {
                    // 検索クエリが空の場合は通常のメモ一覧を表示
                    UI.renderMemos();
                } else {
                    // 検索実行
                    UI.renderSearchResults(query);
                }
            }, 300);
        });
    }

    // エクスポートボタン
    const exportDataBtn = document.getElementById('exportDataBtn');
    if (exportDataBtn) {
        exportDataBtn.addEventListener('click', function() {
            UI.exportData();
        });
    }

    // インポートボタン
    const importDataBtn = document.getElementById('importDataBtn');
    const importFileInput = document.getElementById('importFileInput');
    if (importDataBtn && importFileInput) {
        importDataBtn.addEventListener('click', function() {
            importFileInput.click();
        });

        importFileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                if (confirm('現在のデータは上書きされます。続けますか？')) {
                    UI.importData(file);
                }
            }
            // ファイル選択をリセット
            importFileInput.value = '';
        });
    }

    // キーボードショートカット
    setupKeyboardShortcuts();

    // 自動保存機能
    setupAutoSave();
}

/**
 * キーボードショートカットを設定
 */
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl+S または Cmd+S で保存
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault(); // ブラウザのデフォルト保存動作を防ぐ
            UI.saveMemo();

            // 視覚的なフィードバック（保存ボタンを一瞬光らせる）
            const saveBtn = document.getElementById('saveMemoBtn');
            if (saveBtn) {
                saveBtn.style.opacity = '0.5';
                setTimeout(() => { saveBtn.style.opacity = '1'; }, 200);
            }
        }

        // Ctrl+N または Cmd+N で新規メモ
        if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
            e.preventDefault();
            UI.createNewMemo();
        }
    });
}

/**
 * 自動保存機能を設定
 */
function setupAutoSave() {
    const memoTitle = document.getElementById('memoTitle');
    const memoContent = document.getElementById('memoContent');

    // タイトルまたは本文が変更されたら自動保存
    let autoSaveTimeout;

    function scheduleAutoSave() {
        // 入力が止まってから2秒後に自動保存
        clearTimeout(autoSaveTimeout);
        autoSaveTimeout = setTimeout(function() {
            const currentMemoId = SettingsManager.getCurrentMemoId();
            if (currentMemoId) {
                UI.saveMemo();
                console.log('自動保存しました');
            }
        }, 2000);
    }

    if (memoTitle) {
        memoTitle.addEventListener('input', scheduleAutoSave);
    }

    if (memoContent) {
        memoContent.addEventListener('input', scheduleAutoSave);
    }
}

/**
 * すべてのUIを再描画
 */
function renderAll() {
    UI.renderFolders();
    UI.renderMemos();

    // 現在選択中のメモがある場合はエディタに読み込む
    const currentMemoId = SettingsManager.getCurrentMemoId();
    if (currentMemoId) {
        UI.loadMemoToEditor(currentMemoId);
    } else {
        // メモが選択されていない場合はエディタをクリアして無効化
        UI.clearEditor();
    }
}

/**
 * デバッグ用: すべてのデータをコンソールに出力
 */
function debugPrintData() {
    const data = Storage.load();
    console.log('現在のデータ:', data);
}

// グローバルスコープにデバッグ関数を登録（開発者ツールのコンソールから呼び出せるように）
window.debugPrintData = debugPrintData;
window.Storage = Storage;
window.FolderManager = FolderManager;
window.MemoManager = MemoManager;
