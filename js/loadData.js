var JsonData = [];
var id="735087896554462";  //要搜尋的專頁
var isDataSet;
var isSearchfail;
var until;
var comein_position=50;    //卷軸高度,用於lazyLoad
var isLoading;
var dataNum=0;
var limit=150;              //每次載入的數量
var isBottom;
/**
 * 從FB.api撈取巴豆妖資料存進JsonData裡面
 */
function getData() {
    if(isEmpty(until)){
        FB.api(
         id+"/feed", {
                limit: limit
            },
            function(response) {
                if (response && !response.error) {
                    console.log(response);
                    // JsonData = response;
                    JsonData.push(response);
                    // until = getUntil(JsonData[JsonData.length-1].paging.next);
                    if(!isEmpty(JsonData[dataNum].paging.next)){
                        until = getUntil(JsonData[dataNum].paging.next);
                    }else{
                        isBottom=true;
                    }
                    isDataSet=true;
                    if(isSearchfail){
                        search();
                    }
                }
            }
        );
    }else{
        FB.api(
         id+"/feed", {
                limit: limit,
                until: until
            },
            function(response) {
                if (response && !response.error) {
                    console.log(response);
                    // JsonData = response;
                    JsonData.push(response);
                    // until = getUntil(JsonData[JsonData.length-1].paging.next);
                    if(!isEmpty(JsonData[dataNum].paging)){
                        until = getUntil(JsonData[dataNum].paging.next);
                    }else{
                        isBottom=true;
                    }
                    isDataSet=true;
                    isLoading=false;
                    // if(isSearchfail){
                        search();
                    // }
                }
            }
        );
    }
}


$(window).scroll(function(){
    var scroll = $(window).scrollTop(),
      window_h = $(window).height(),
      page_h = $(document).height();

    if(((scroll+window_h) > (page_h*(comein_position/100))) && !isLoading && !isBottom) {
        isLoading=true;
        if(isDataLoaded()){
            isLoading=false;
            dataNum++;
            search();
            console.log("從舊資料中"+dataNum);
        }else{
            getData();
            dataNum++;
            console.log("Post:"+dataNum);
        }
    }

    console.log(page_h*(comein_position/100));

});
/**
 * 擷取Until,FB.api用於呼叫下一筆Json
 * @param {String} str 含Until的網址
 * @returns {String} Until值
 */
function getUntil(str){
    var find =/until=(\d*)/;
    return str.match(find)[1];
}

/**
 * 判斷目前有沒有卷軸
 * @returns {Boolean} 有卷軸回傳true,沒卷軸回傳false
 */
function isOverflowed() {
  return !($(window).height()==$(document).height());
}

/**
 * 判斷資料有沒有先載入下來了
 * @returns {Boolean} 有資料回傳true,沒資料回傳false
 */
function isDataLoaded(){
    if(dataNum<JsonData.length-1){
        return true;
    }else{
        return false;
    }
}