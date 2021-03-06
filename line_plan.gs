function myFunction() {
  // カレンダーID
  var calId = "$ Gamil address!";
  // LINE Notifyのアクセストークン
  var key = "$ acess_key!";

  var url = "https://notify-api.line.me/api/notify";


  var cal = CalendarApp.getCalendarById(calId);
  var now = new Date();
  var tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  // googleカレンダーより明日の予定を配列で取得。
  var tomorrowEvent = cal.getEventsForDay(tomorrow);

  // LINE Notifyに送るメッセージ
  var msg = "";
  // 予定がない時
  if(tomorrowEvent.length === 0){
    msg = "明日の予定はありません。";
  }
  // 予定がある時
  else{
    msg += "明日の予定は" + String(tomorrowEvent.length) + "件あります。\n\n";
    msg += allPlanToMsg(tomorrowEvent);
  }

  var jsonData = {
    message: msg
  }

  var options =
  {
    "method" : "post",
    "contentType" : "application/x-www-form-urlencoded",
    "payload" : jsonData,
    "headers": {"Authorization": "Bearer " + key}
  };

  var res = UrlFetchApp.fetch(url, options);
}

// イベントの配列をテキストにして返す
function allPlanToMsg(events/* array */){
  var msg = "";
  events.forEach( function(event, index){
    var title = event.getTitle();
    var start = event.getStartTime().getHours() + ":" + ("0" + event.getStartTime().getMinutes()).slice(-2);
    var end = event.getEndTime().getHours() + ":" + ("0" + event.getEndTime().getMinutes()).slice(-2);
    // 予定が終日の時
    if( event.isAllDayEvent() ){
      msg += String(index + 1) + "件目: " + title + " 終日の予定です。\n\n";
      return;
    }
    msg += String(index + 1) + "件目: " + title + " " + start + "~" + end + "\n\n";
  });
  return msg;
}
