$(function () {
  //初回ロード
  loadMembersList();

  // 「すべての設定をクリア」ボタンクリック
  $("#clear").on("click", function () {
    if (window.confirm("本当に削除しても良いですか？")) {
      clearAll();
      loadMembersList();
    }
  });
});

/**
 * ローカルストレージから取得しリスト化する
 * 削除ボタンも描画する
 */
function loadMembersList() {
  chrome.storage.local.get(function (settings) {
    $("#settings").html("");
    for (const [key, value] of Object.entries(settings)) {
      $("#settings").append(`<h2>${key}</h2>`);
      $("#settings").append(`<pre>${value}</pre>`);
      $("#settings").append(`<button id="${key}" class="clear-one">削除</button>`);
    }

    $(".clear-one").on("click", function (event) {
      if (window.confirm(`${event.target.id}削除しても良いですか？`)) {
        clearOne(event.target.id);
        loadMembersList();
      }
    });
  });
}

/**
 * 設定ファイルをすべて削除する
 */
function clearAll() {
  console.log("clear!");
  chrome.storage.local.clear();
}

/**
 * 設定ファイルを個別に削除する
 */
function clearOne(meet_id) {
  console.log(`clear ${meet_id}`);
  chrome.storage.local.remove(meet_id);
}
