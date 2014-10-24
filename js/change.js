function change(){
    var content1 = document.getElementById("run").value; 
	var content2 = document.getElementById("status").innerHTMl;
	var lastTime = document.getElementById("time").value; 
	if(content1=="RUN"){ 
	    if(document.getElementById("time").value&&document.getElementById("total").value){
	       document.getElementById("run").value = "STOP";
	       document.getElementById("status").innerHTMl = "Running"; 
	       var t = setTimeout("stop();",lastTime);
	    }
		else{
		   alert("到场人数和限定时间不可为空。");
		}
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