var input;
var isfailLoad=false;      //載入Json的時候如搜尋資料,isfailLoad為true要放棄此筆資料
Parse.initialize("ftFWpXZZqwq5QxJ3KgQxAZDK8Jn7UR7Vjikg6mdZ", "fK0civbSaKPMQn7VOUFqfULf9gSLBfDcYT3UYIRC");
var ReportKeywordObject = Parse.Object.extend("search_keyword");
var ReportObject = Parse.Object.extend("search_Report");


/**
 * 點擊搜尋按鈕時獲取輸入框,並且顯示出來
 */
function isEnter(event){
    console.log(event.keyCode);
    if(event.keyCode==13){
        searchClick();
    }
}
function searchClick(){
    if(document.getElementById("keyword").value!=input){
        isSearchClick=true;
        var TimeLine = document.getElementById('timeline');
        TimeLine.innerHTML="";
        input = document.getElementById("keyword").value;
        if(input==""){
            input=" ";
        }
        document.body.scrollTop=0;
        dataNum=0;
        isBottom=false;
        if(isLoading){
            isfailLoad=true;
        }
        search();
        document.getElementById('circularG').style.display = 'block';
        document.getElementById('Help').style.display = 'none';
        FB.api(
            "/me",
            function(response) {
                if (response && !response.error) {
                    console.log(response);
                    var reportObject = new ReportKeywordObject();
                        reportObject.save({
                            name: response.name,
                            word: input,
                            link: response.link
                            }, {
                          success: function(object) {
                            console.log("sucess");
                          },
                          error: function(model, error) {
                            // $(".error").show();
                          }
                    });
                }
            }
        );
    }
}


/**
 * 使用input裡的關鍵字,遍歷搜尋所有JsonData內的資料,並顯示於網頁上
 * @returns {html} 顯示於網頁上
 */
function search(){
    if(isDataSet){
      for (var i = 0; i < JsonData[dataNum].data.length; i++) { 
          if (!isEmpty(JsonData[dataNum].data[i].message) && 
                JsonData[dataNum].data[i].from.id == id) {
              findKeyWord(i, input);
          }
      }
      isSearchClick=false;
      isOverflowed();
    }else{
        document.getElementById('circularG').style.display = 'block';
    }
}

/**
 * 在timeline新增一個普通動態
 * @param {String} time 傳入該動態的時間
 * @param {String} detail 該該動態的內容
 * @param {String} picUrl 該動態的附圖連結
 * @param {String} like 該動態的讚數
 * @param {String} comment 該動態的留言數
 * @param {String} share 該動態的分享數
 * @param {String} url 該動態的連結網址 
 */
function addtimelineUnitContainer(time, detail, picUrl, like, comment, share, url) {
    var TimeLine = document.getElementById('timeline');
    var insertTimeLine =
        "<div class=\"timelineUnitContainer\">" +
            "<div class=\"head\">" +
                "<div class=\"name\">" +
                    "<img src=\"https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xpa1/v/t1.0-1/p56x56/1240031_746774058719179_3502506887230652003_n.jpg?oh=831c47d812b8d13909146302609df7d9&oe=54FA8BDB&__gda__=1426970376_18a3f1f7338dcdecb63f0c120dcfd607\" class=\"icon\">" +
                    "<a href=\"" + url + "\" target=\"_blank\">" +
                        "<img src=\"pic/detail.png\" class=\"detailicon\">" +
                    "</a>" +
                    "<a href=\"" + url + "\" target=\"_blank\" style=\"text-decoration:none\">" +
                        "<div class=\"title\">高雄。巴豆妖</div>" +
                        "<div class=\"time\">" + time + "</div>" +
                    "</a>" +
                "</div>" +
            "</div>" +
            "<div class=\"detail\">" + detail + "</div>" +
            "<img class=\"pic\" src=\"" + picUrl + "\">" +
            "<div class=\"likebar\">" +
                "<div class=\"like\">" + like + "讚 ‧ " + comment + "留言 ‧ " + share + "分享</div>" +
            "</div>" +
        "</div>";
    TimeLine.innerHTML += insertTimeLine;
}

/**
 * 在timeline新增一個含分享的動態
 * @param {String} time 傳入該動態的時間
 * @param {String} detail 該該動態的內容
 * @param {String} picUrl 分享的附圖連結
 * @param {String} linktitle 分享的title
 * @param {String} link 分享的原文"網域"
 * @param {String} linkdetail 分享的內文
 * @param {String} like 該動態的讚數
 * @param {String} comment 該動態的留言數
 * @param {String} share 該動態的分享數
 * @param {String} url 該動態的連結網址 
 */
function addsharetimeliner(time, detail, picUrl, linktitle, link, linkdetail, like, comment, share, url) {
    var TimeLine = document.getElementById('timeline');
    var insertTimeLine =
        "<div class=\"timelineUnitContainer\">" +
            "<div class=\"head\">" +
                "<div class=\"name\">" +
                    "<img src=\"https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xpa1/v/t1.0-1/p56x56/1240031_746774058719179_3502506887230652003_n.jpg?oh=831c47d812b8d13909146302609df7d9&oe=54FA8BDB&__gda__=1426970376_18a3f1f7338dcdecb63f0c120dcfd607\" class=\"icon\">" +
                    "<a href=\"" + url + "\" target=\"_blank\">" +
                        "<img src=\"pic/detail.png\" class=\"detailicon\">" +
                    "</a>" +
                    "<a href=\"" + url + "\" target=\"_blank\" style=\"text-decoration:none\">" +
                        "<div class=\"title\">高雄。巴豆妖</div>" +
                        "<div class=\"time\">" + time + "</div>" +
                    "</a>" +
                "</div>" +
            "</div>" +
            "<div class=\"detail\">" + detail + "</div>" +
                "<div class=\"outsidelink\">" +
                "<img class=\"linkpic\" src=\"" + picUrl + "\">" +
                "<div class=\"linktitle\">" + linktitle + "</div>" +
                "<div class=\"link\">" + link + "</div>" +
                "<div class=\"linkdetail\">" + linkdetail + "</div>" +
            "</div>" +
            "<div class=\"likebar\">" +
                "<div class=\"like\">" + like + "讚 ‧ " + comment + "留言 ‧ " + share + "分享</div>" +
            "</div>" +
        "</div>";
    TimeLine.innerHTML += insertTimeLine;
}

/**
 * 獲取json內單筆資料,並呼叫addtimelineUnitContainer、addsharetimeliner用於顯示
 * @param {int} a data的位置
 * @param {String} str 使用者搜尋的關鍵字
 */
function getJson(a, str) {
    // console.log(JsonData[dataNum].data[a].created_time);
    var data = JsonData[dataNum].data[a];
    if (data.status_type == "shared_story") {
        addsharetimeliner(processTime(data.created_time),
            processStr(data.message, str),
            data.picture,
            data.name, 
            (isEmpty(data.caption)) ? "" : data.caption, (isEmpty(data.description)) ? "" : data.description, 
                                                         (isEmpty(data.likes)) ? "" : data.likes.data.length + "個", 
                                                         (isEmpty(data.comments)) ? "" : data.comments.data.length + "個", 
                                                         (isEmpty(data.shares)) ? "" : data.shares.count + "個",
                                                          data.actions[0].link);
    } else {
        addtimelineUnitContainer(processTime(data.created_time),
            processStr(data.message, str),
            data.picture,
            (isEmpty(data.likes)) ? "" : data.likes.data.length + "個", (isEmpty(data.comments)) ? "" : data.comments.data.length + "個", 
                                                                        (isEmpty(data.shares)) ? "" : data.shares.count + "個",
            data.actions[0].link);
    }
}


/**
 * 搜尋單筆資料內是否有關鍵字,有的話呼叫getJson
 * @param {int} a data的位置
 * @param {String} str 使用者搜尋的關鍵字
 */
function findKeyWord(a, str) {
    var data = JsonData[dataNum].data[a];
    // console.log(JSON.parse(data.message));
    // console.log(a);
    if (data.status_type == "shared_story") {
        if (find((isEmpty(data.message)) ? "" : data.message, str) ||
            find((isEmpty(data.name)) ? "" : data.name, str) ||
            find((isEmpty(data.caption)) ? "" : data.caption, str) ||
            find((isEmpty(data.description)) ? "" : data.description, str)) {
            getJson(a, str);
        }
    } else {
        if (find((isEmpty(data.message)) ? "" : data.message, str)) {
            getJson(a, str);
        }
    }
}

/**
 * 判斷該字串內是否有關鍵字
 * @param {String} str 被搜尋的內容
 * @param {String} keyword 要搜尋的關鍵字
 * @returns {Boolean} 有關鍵字回傳true,沒有關鍵字回傳false
 */
function find(str, keyword) {
    if (str.toString().indexOf(keyword) != -1)
        return true;
    else
        return false;
}

/**
 * 判斷Object內是否有資料
 * @param {Object} obj
 * @returns {Boolean} 有資料回傳false,沒資料回傳true
 */
function isEmpty(obj) {

    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0) return false;
    if (obj.length === 0) return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}

/**
 * 把Json內的\n替換為<br>,並加上light反白
 * @param {String} str 要被處理的內容
 * @param {String} keyword 要反白的關鍵字
 * @returns {String} 處理完成的內容
 */
function processStr(str, keyword) {
    var re = new RegExp("\n", "g");
    str = str.replace(re, "<br>");
    var find = new RegExp(keyword, "g");
    return str.replace(find, "<span class=\"light\">" + keyword + "</span>");
}

/**
 * FB.api傳送的時間格式為"2014-12-09T12:30:01+0000",把"T"後的所有字剃除變為"2014-12-09"
 * @param {String} str 要被處理的時間
 * @returns {String} 處理完成的時間格式
 */
function processTime(str) {
    return str.split("T")[0];
}
