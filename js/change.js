function change(){
    var content1 = document.getElementById("run").value;
	var content2 = document.getElementById("status").innerHTMl;
	var lastTime = document.getElementById("time").value;
	if(content=="RUN"){
	   documnet.getElementById("run").value = "Stop";
	   document.getElementById("status").innerHTMl = "Running";
	   var t = setTimeOut("stop();",lastTime);
	}
    else{
	   documnet.getElementById("run").value = "Run";
	   document.getElementById("status").innerHTMl = "Stopped";
	}
}

function stop(){
    documnet.getElementById("run").value = "Run";
	document.getElementById("status").innerHTMl = "Stopped";
}