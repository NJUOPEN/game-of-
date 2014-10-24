function change(){
    var content1 = document.getElementById("run").value;
	var content2 = document.getElementById("status").innerHTMl;;
	if(content=="Run"){
	   documnet.getElementById("run").value = "Stop";
	   document.getElementById("status").innerHTMl = "Running";
	}
    else{
	   documnet.getElementById("run").value = "Run";
	   document.getElementById("status").innerHTMl = "Stopped";
	}
}