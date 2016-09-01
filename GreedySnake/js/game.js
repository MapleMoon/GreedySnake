/**
 * 全局变量
 */
//定义全局变量box，获取主方块
var box = document.getElementById("box");
//定义lumpWidth变量，指添加在主方块中的小方块的宽度
var lumpWidth = 20;
//定义num变量，指需要在主方块中添加多少个小方块
var num = parseInt(window.getComputedStyle(box,null).width)/20;
//定义坐标数组coordinateArray，以便将所有小方块抽象成坐标，从而可以在上面执行上下左右的移动
var coordinateArray = [];//坐标数组是二维数组
//定义全局蛇对象
var snake = new Snake();
//定义全局果实对象
var fruit = new Fruit();
//定义开始游戏/暂停游戏按钮，并获取按钮
var gameCtrlBt = document.getElementById("gameCtrl");
//定义重置游戏按钮，并获取
var gameReset = document.getElementById("gameReset");
//定义控制游戏引擎刷新时间间隔的变量
var gameInterval = 30;
//定义全局定时器对象
var timer = null;
//定义全局接收控制蛇头方向的变量,并初始化为向右，1上2右3下4左
var dirFlag = 2;
//定义全局积分变量
var score = 0;
//获取计分板元素
var scoreBox = document.getElementById("score");
//获取游戏难度计分板
var level = document.getElementById("level");

/**
 * 定义在主方块中添加小方块的函数，并执行，小方块的部分css属性已在css文件中定义
 * 并给每个小方块设置flag属性，表明它所处的状态,并初始化为black
 * black表示未被占用，white表示蛇身占用，red表示果实占用
 */
!function(){
	function addLump(){
		var lump = document.createElement("p");
		lump.style.width = lumpWidth + "px";
		lump.style.height = lumpWidth + "px";
		lump.flag = "black";
		box.appendChild(lump);
	}
	for(var i = 0; i < num*num; i++){
		addLump();
	}
}();

/**
 * 定义将坐标数组赋值的函数，并执行（坐标数组是二维数组）
 */
!function(){
	//获取所有小方块
	var lumps = document.querySelectorAll("#box>p");
	//定义n用来记录lumps下标走向
	var n = 0;
	//双层循环将所有小方块赋给二维数组coordinateArray
	for(var i = 0; i < num; i++){
		coordinateArray[i] = [];
		for(var j = 0; j < num; j++){
			coordinateArray[i][j] = lumps[n];
			n++;
		}
	}
}();

/**
 * 定义游戏开始函数
 */
function startGame(){
	snake.isMoving = true;
	//运行游戏引擎循环刷新函数
	gameRun();
}

/**
 * 定义游戏暂停函数
 */
function pauseGame(){
	snake.isMoving = false;
	clearInterval(timer);
}

/**
 * 给游戏控制按钮gameCtrlBt添加单击事件
 */
gameCtrlBt.onclick = function(){
	var me = this;
	if(me.innerText == "开始游戏"){
		fruit.createFT();
		me.innerText = "暂停游戏";
		snake.initialize();
		startGame();
	}else if(me.innerText == "继续游戏"){
		me.innerText = "暂停游戏";
		startGame();
	}else{
		me.innerText = "继续游戏";
		pauseGame();
	}
	
};
//去除游戏控制按钮的默认键盘监听事件
gameCtrlBt.onkeyup = function(e){
	if(e.keyCode == 32){
		e.stopPropagation();
	}
};
gameCtrlBt.onkeydown = function(e){
	if(e.keyCode == 32){
		e.stopPropagation();
	}
};
gameCtrlBt.onkeypress = function(e){
	if(e.keyCode == 32){
		e.stopPropagation();
	}
};

/**
 * 定义游戏引擎函数
 */
function gameRun(){
	setLevel_Score()
	setgameInterval();
	snake.changeDirection(dirFlag);
	if(snake.moving() == "gameOver"){
		clearInterval(timer);
		snake.isMoving = false;
		alert("gameOver");
		gameReset.onclick();
		gameCtrlBt.innerText = "开始游戏"
	}
	timer = setTimeout(gameRun,gameInterval);
}

/**
 * 定义监视键盘事件的函数
 */
document.onkeydown = function(e){
	switch(e.keyCode){
		case 37://键盘左键
			dirFlag = 4;
			break;
		case 38://键盘上键
			dirFlag = 1;
			break;
		case 39://键盘右键
			dirFlag = 2;
			break;
		case 40://键盘下键
			dirFlag = 3;
			break;
		case 32://空格键
			gameCtrlBt.onclick();
			break;
		default:
			break;
	}
}

/**
 * 设置重置游戏的函数，并绑定重置按钮单击事件
 */
gameReset.onclick = function (){
	level.innerText = 1;
	score = 0;
	scoreBox.innerText = "得分：" + score;
	snake.initialize();
}

/**
 * 定义重置gameIntervald的函数
 */
function setgameInterval(){
	var speed = parseInt(level.innerText);
	if(speed <= 3){
		gameInterval = 160 - speed*20;
	}else{
		gameInterval = 100 - (speed-3)*10;
	}
}

/**
 * 定义根据分数变化难度的函数
 */
function setLevel_Score(){
	//定义分数与难度匹配的对象
	var levelScoreArr = {
		1 : 0,
		2 : 5,
		3 : 10,
		4 : 20,
		5 : 30,
		6 : 50,
		7 : 70,
		8 : 90,
		9 : 120,
		10: 150
	};
	for(var i in levelScoreArr){
		if(score == levelScoreArr[i]){
			level.innerText = i;
		}
	}
	
	
}
