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
            document.write(response);
            // print(response);
          }
        }
    );
}


