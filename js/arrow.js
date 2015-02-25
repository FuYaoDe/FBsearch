var num = [0,531,1061];
var i = 0;
var timer = setInterval(changePos,200);

function changePos(){
	var val= "0px " + num[i] + "px";
	document.getElementById("Help").style.backgroundPosition = val;
	i++;
	if(i>2){
		i=0;
	}
}