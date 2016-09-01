/**
 * 创建蛇类
 */
function Snake(){
	//定义蛇类行进的方向属性，并初始化为向右
	//1表示上，2表示右，3表示下，4表示左
	this.direction = 2;
	//定义蛇类是否在行进的属性，初始化为false
	this.isMoving = false;
	//定义蛇身的数组属性，指蛇身包括哪些连续的小方块
	this.sBody = [];
	//定义当前蛇头所处的坐标对象
	this.pos = null;
	
	//定义蛇的初始化函数
	this.initialize = function(){
		var me = this;
		//初始化方向为右
		me.direction = 2;
		//初始化全局方向为右
		dirFlag = 2;
		me.isMoving = false;
		//将蛇身置空
		while(me.sBody.length != 0){
			me.sBody[0].style.backgroundColor = "black";
			me.sBody[0].flag = "black";
			me.sBody.shift();
		}
		//初始化蛇身数组，蛇身的颜色是白色
		me.sBody[0] = coordinateArray[0][0];
		//初始化蛇身的颜色是白色
		me.sBody[0].style.backgroundColor = "greenyellow";
		//初始化蛇身的被占用状态
		me.sBody[0].flag = "white";
		//定义当前蛇头所处的坐标对象,并初始化为0
		me.pos = {x:0,y:0};
	};
	
	//定义往蛇头添加元素的方式
	this.addEle = function(target){
		var me = this;
		me.sBody.unshift(target);
		target.style.backgroundColor = "greenyellow";
		target.flag = "white";
	}
	//定义在蛇尾删除元素的方式
	this.deleteEle = function(){
		var me = this;
		var tail = me.sBody.pop();
		tail.style.backgroundColor = "black";
		tail.flag = "black";
	}
	
	//定义改变蛇头方向的函数
	this.changeDirection = function(dirFlag){
		var me = this;
		if(me.sBody.length == 1){
			me.direction = dirFlag;
		}else{
			//当蛇身长度超过1时，蛇头不能往回走
			if(Math.abs(me.direction - dirFlag) != 2){
				me.direction = dirFlag;
			}
		}    
	};
	
	//定义蛇类的行进函数
	this.moving = function(){
		var me = this; 
		//首先判断蛇身是否处于移动状态下
		if(me.isMoving == false){
			return false;
		}
		//封装重复使用的变色函数
		function fun(target){
			if(target.flag == "white"){
				return "gameOver";
			}else if(target.flag == "red"){
				me.addEle(target);
				score ++;
				scoreBox.innerText = "得分：" + score;
				fruit.fruitTarget =null;
				fruit.createFT();
			}else{
				me.addEle(target);
				me.deleteEle();
			}
		}
		
		//判断下一个方块的位置是否仍然处在大方块区域中
		//判断下一个行进方块的被占用状态，如果被占用状态为white,撞到自己，
		switch(me.direction){
			case 1:
				if(me.pos.x - 1 < 0){
					return "gameOver";
				}
				//单独提取提高复用性
				var target = coordinateArray[me.pos.x - 1][me.pos.y];
				if(fun(target) == "gameOver"){
					return "gameOver";
				}
				me.pos.x -= 1;
				break;
			case 2:
				if(me.pos.y + 1 > num-1){
					return "gameOver";
				}
				//单独提取提高复用性
				var target = coordinateArray[me.pos.x][me.pos.y + 1];
				if(fun(target) == "gameOver"){
					return "gameOver";
				}
				me.pos.y += 1;
				break;
			case 3:
				if(me.pos.x + 1 > num-1){
					return "gameOver";
				}
				//单独提取提高复用性
				var target = coordinateArray[me.pos.x + 1][me.pos.y];
				if(fun(target) == "gameOver"){
					return "gameOver";
				}
				me.pos.x += 1;
				break;
			case 4:
				if(me.pos.y - 1 < 0){
					return "gameOver";
				}
				//单独提取提高复用性
				var target = coordinateArray[me.pos.x][me.pos.y - 1];
				if(fun(target) == "gameOver"){
					return "gameOver";
				}
				me.pos.y -= 1;
				break;
			default:
				break;
		}
		
		
	};
	
}

