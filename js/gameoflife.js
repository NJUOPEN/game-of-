function $(id){
	return document.getElementById(id);
}

// canvas
function getOffset(e){
	if(e.offsetX) return {
		offsetX: e.offsetX,
		offsetY: e.offsetY
	};
	return {
		offsetX: (document.documentElement.scrollLeft + e.clientX - e.currentTarget.offsetLeft),
		offsetY: (document.documentElement.scrollTop + e.clientY - e.currentTarget.offsetTop)
	};
}

var canvas = $("canvas"),
	lPlanck = 5,
	bWidth = Number(canvas.width) / lPlanck,
	bHeight = Number(canvas.height) / lPlanck,
	cell = new Array(bWidth),
	nextCell = new Array(bWidth),
	c = canvas.getContext("2d"),
	cmdRun = $("run"),
	generationHandle,
	running = false,
	drawModeLive = true,
	drawing = false,
	p = 0.5,
	iDown,
	jDown;
for(var i = 0; i != bWidth; ++i){
	cell[i] = new Array(bHeight); nextCell[i] = new Array(bHeight);
	for(var j = 0; j != bHeight; ++j){
		cell[i][j] = nextCell[i][j] = false;
	}
}

function draw(i, j, state){
	c.fillStyle = (state ? "black" : "white");
	c.fillRect(lPlanck * i, lPlanck * j, 5, 5);
}

function judge(c22i, c22j, c11i, c11j, c21i, c21j, c31i, c31j, c12i, c12j, c32i, c32j, c13i, c13j, c23i, c23j, c33i, c33j){
	//Moore's neighborhood
	var liveNeighbor = cell[c11i][c11j] + cell[c21i][c21j] + cell[c31i][c31j] + cell[c12i][c12j] + cell[c32i][c32j] + cell[c13i][c13j] + cell[c23i][c23j] + cell[c33i][c33j];
	return cell[c22i][c22j] ? (liveNeighbor == 2 || liveNeighbor == 3) : liveNeighbor == 3;
}

function generation(){
	//main
	for(var i = 1; i != bWidth - 1; ++i){
		for(var j = 1; j != bHeight - 1; ++j){
			nextCell[i][j] = judge(i, j, i - 1, j - 1, i, j - 1, i + 1, j - 1, i - 1, j, i + 1, j, i - 1, j + 1, i, j + 1, i + 1, j + 1);
		}
	}
	//top
	for(var i = 1; i != bWidth - 1; ++i){
		nextCell[i][0] = judge(i, 0, i - 1, bHeight - 1, i, bHeight - 1, i + 1, bHeight - 1, i - 1, 0, i + 1, 0, i - 1, 1, i, 1, i + 1, 1);
	}
	//down
	for(var i = 1; i != bWidth - 1; ++i){
		nextCell[i][bHeight - 1] = judge(i, bHeight - 1, i - 1, bHeight - 2, i, bHeight - 2, i + 1, bHeight - 2, i - 1, bHeight - 1, i + 1, bHeight - 1, i - 1, 0, i, 0, i + 1, 0);
	}
	//left
	for(var j = 1; j != bHeight - 1; ++j){
		nextCell[0][j] = judge(0, j, bWidth - 1, j - 1, 0, j - 1, 1, j - 1, bWidth - 1, j, 1, j, bWidth - 1, j + 1, 0, j + 1, 1, j + 1);
	}
	//right
	for(var j = 1; j != bHeight - 1; ++j){
		nextCell[bWidth - 1][j] = judge(bWidth - 1, j, bWidth - 2, j - 1, bWidth - 1, j - 1, 0, j - 1, bWidth - 2, j, 0, j, bWidth - 2, j + 1, bWidth - 1, j + 1, 0, j + 1);
	}
	//00
	nextCell[0][0] = judge(0, 0, bWidth - 1, bHeight - 1, 0, bHeight - 1, 1, bHeight - 1, bWidth - 1, 0, 1, 0, bWidth - 1, 1, 0, 1, 1, 1);
	//10
	nextCell[bWidth - 1][0] = judge(bWidth - 1, 0, bWidth - 2, bHeight - 1, bWidth - 1, bHeight - 1, 0, bHeight - 1, bWidth - 2, 0, 0, 0, bWidth - 2, 1, bWidth - 1, 1, 0, 1);
	//01
	nextCell[0][bHeight - 1] = judge(0, bHeight - 1, bWidth - 1, bHeight - 2, 0, bHeight - 2, 1, bHeight - 2, bWidth - 1, bHeight - 1, 1, bHeight - 1, bWidth - 1, 0, 0, 0, 1, 0);
	//11
	nextCell[bWidth - 1][bHeight - 1] = judge(bWidth - 1, bHeight - 1, bWidth - 2, bHeight - 2, bWidth - 1, bHeight - 2, 0, bHeight - 2, bWidth - 2, bHeight - 1, 0, bHeight - 1, bWidth - 2, 0, bWidth - 1, 0, 0, 0);
	//flush
	for(var i = 0; i != bWidth; ++i){
		for(var j = 0; j != bHeight; ++j){
			if(cell[i][j] != nextCell[i][j]) draw(i, j, cell[i][j] = nextCell[i][j]);
		}
	}
}

function cRun(){
	running = !running;
	if(running){
		cmdRun.value = "STOP"
		generationHandle = setInterval("generation();", 0);
		var lastTime = document.getElementById("time").value;
		var t = setTimeout("cRun();",lastTime);
	}else{
		clearInterval(generationHandle);
		cmdRun.value = "RUN"
		result();
	}
}
function cRandom(){
	var tp = Number(prompt("Probability:", p));
	if(isNaN(tp) || tp == "") return;
	p = tp;
	for(var i = 0; i != bWidth; ++i){
		for(var j = 0; j != bHeight; ++j){
			draw(i, j, cell[i][j] = (Math.random() < p));
		}
	}
}
function cClear(){
	for(var i = 0; i != bWidth; ++i){
		for(var j = 0; j != bHeight; ++j){
			cell[i][j] = false;
		}
	}
	c.clearRect(0, 0, lPlanck * bWidth, lPlanck * bHeight);
	running = true;
	cRun();
}
function down(e){
	e = getOffset(e);
	drawing = true;
	iDown = e.offsetX / lPlanck | 0;
	jDown = e.offsetY / lPlanck | 0;
	draw(iDown, jDown, drawModeLive = cell[iDown][jDown] = !cell[iDown][jDown]);
}
function up(){
	drawing = false;
}
function move(e) {
	if(drawing) {
		e = getOffset(e);
		i = e.offsetX / lPlanck | 0;
		j = e.offsetY / lPlanck | 0;
		if(Math.abs(i - iDown) > 1 || Math.abs(j - jDown) > 1){
			if(Math.abs(i - iDown) > Math.abs(j - jDown)){
				for(var ti = iDown; ti != i; ti += sgn(i - iDown)){
					tj = Math.floor(jDown + (j - jDown) * (ti - iDown) / (i - iDown));
					draw(ti, tj, cell[ti][tj] = drawModeLive);
				}
			}else{
				for(var tj = jDown; tj != j; tj += sgn(j - jDown)){
					ti = Math.floor(iDown + (i - iDown) * (tj - jDown) / (j - jDown));
					draw(ti, tj, cell[ti][tj] = drawModeLive);
				}
			}
		}
		draw(iDown = i, jDown = j, cell[i][j] = drawModeLive);
	}
}
function out(){
	drawing = false;
}
function sgn(x){
	return x > 0 ? 1 : -1;
}

function result() {
	var c;
	for (var i = 0; i < bWidth; i++) {
		for (var j = 0; j < bHeight; j++) {
			if (cell[i][j]) c += "1";
			else c += "0";
		}
	}
	$("test").innerHTML = c;
}	
