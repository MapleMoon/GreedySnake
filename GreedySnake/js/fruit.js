/**
 * 定义果实类
 */
function Fruit(){
	this.fruitTarget = null;
	this.createFT = function(){
		var me = this;
		if(me.fruitTarget != null){
			return;
		}
		var X = 0;
		var Y = 0;
		function createXY(){
			X = parseInt(Math.random()*num);
			Y = parseInt(Math.random()*num);
			if(coordinateArray[X][Y].flag != "black" ){
				createXY();
			}
		}
		createXY();
		me.fruitTarget = coordinateArray[X][Y];
		me.fruitTarget.flag = "red";
		me.fruitTarget.style.backgroundColor = "red";
	};
}
