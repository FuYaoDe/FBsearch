var Data;

function getData(){
    FB.api(
        "kh.hungry/feed",
        {
            // "message": "This is a test message"
            limit: "50"
        },
        function (response) {
          if (response && !response.error) {
            console.log(response);
            // document.write(response);
            // print(response);
          }
        }
    );
}



function addtimelineUnitContainer(){
    var TimeLine = document.getElementById('timeline');
    var insertTimeLine =
    "<div class=\"timelineUnitContainer\">"+
      "<div class=\"head\">"+
        "<div class=\"name\">"+
           "<img src=\"https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xpa1/v/t1.0-1/p56x56/1240031_746774058719179_3502506887230652003_n.jpg?oh=831c47d812b8d13909146302609df7d9&oe=54FA8BDB&__gda__=1426970376_18a3f1f7338dcdecb63f0c120dcfd607\" class=\"icon\">"+
           "<img src=\"pic/detail.png\" class=\"detailicon\">"+
           "<div class=\"title\">高雄。巴豆妖</div>"+
           "<div class=\"time\">"+"time"+"</div>"+
        "</div>"+
      "</div>"+
      "<div class=\"detail\">"+"內容"+"</div>"+
       "<img src=\""+"url"+"\">"+
      "<div class=\"likebar\">"+
        "<div class=\"like\">讚 ‧ 留言 ‧ 分享</div>"+
      "</div>"+
    "</div>";
    TimeLine.innerHTML+=insertTimeLine;
}


