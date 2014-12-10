var JsonData;

function getData() {
    FB.api(
        "kh.hungry/feed", {
            // "message": "This is a test message"
            limit: "100"
        },
        function(response) {
            if (response && !response.error) {
                console.log(response);
                JsonData = response;
                // document.write(response);
                // print(response);
            }
        }
    );
}

function search(){
  var TimeLine = document.getElementById('timeline');
  TimeLine.innerHTML="";
  for (var i = 0; i < JsonData.data.length; i++) {
      if (!isEmpty(JsonData.data[i].message) && JsonData.data[i].from.id == "735087896554462") {
          findKeyWord(i, document.getElementById("keyword").value);
      }
  }
}

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

function getJson(a, str) {
    // console.log(JsonData.data[a].created_time);
    var data = JsonData.data[a];
    if (data.status_type == "shared_story") {
        addsharetimeliner(processTime(data.created_time),
            processStr(data.message, str),
            data.picture,
            data.name, (isEmpty(data.caption)) ? "" : data.caption, (isEmpty(data.description)) ? "" : data.description, (isEmpty(data.likes)) ? "" : data.likes.data.length + "個", (isEmpty(data.comments)) ? "" : data.comments.data.length + "個", (isEmpty(data.shares)) ? "" : data.shares.count + "個",
            data.actions[0].link);
    } else {
        addtimelineUnitContainer(processTime(data.created_time),
            processStr(data.message, str),
            data.picture, (isEmpty(data.likes)) ? "" : data.likes.data.length + "個", (isEmpty(data.comments)) ? "" : data.comments.data.length + "個", (isEmpty(data.shares)) ? "" : data.shares.count + "個",
            data.actions[0].link);
    }
}

function findKeyWord(a, str) {
    var data = JsonData.data[a];
    // console.log(JSON.parse(data.message));
    console.log(a);
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

function processStr(str, keyword) {
    var re = new RegExp("\n", "g");
    str = str.replace(re, "<br>");
    var find = new RegExp(keyword, "g");
    return str.replace(find, "<span class=\"light\">" + keyword + "</span>");
}

function processTime(str) {
    return str.split("T")[0];
}

function find(str, keyword) {
    if (str.toString().indexOf(keyword) != -1)
        return true;
    else
        return false;
}
