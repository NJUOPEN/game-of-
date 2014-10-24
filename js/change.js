function change(){
    var content1 = document.getElementById("run").value; 
	var content2 = document.getElementById("status").innerHTMl;
	var lastTime = document.getElementById("time").value; 
	if(content1=="RUN"){ 
	   document.getElementById("run").value = "STOP";
	   document.getElementById("status").innerHTMl = "Running"; 
	   var t = setTimeout("stop();",lastTime);
	}
    else{
	   document.getElementById("run").value = "RUN";
	   document.getElementById("status").innerHTMl = "Stopped";
	}
}

function stop(){ 
    document.getElementById("run").value = "RUN";
	document.getElementById("status").innerHTMl = "Stopped";
}