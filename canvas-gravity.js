var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

var maxBall = 400;
var gravity = 1;
var friction= 0.9;

var colorArray = [
	'#2c3e50',
	'#e74c3c',
	'#ecf0f1',
	'#3498d8',
	'#2980b9'
]

window.addEventListener('click', function(){
	init();
})

window.addEventListener('resize', function(){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	init();
})


function Ball(x, y, dx, dy, radius){
	this.x= x;
	this.y = y;
	this.dy = dy;
	this.dx = dx
	this.radius = radius;
	this.colorStroke = colorArray[Math.floor(Math.random() * colorArray.length)];
	this.colorFill = colorArray[Math.floor(Math.random() * colorArray.length)];

	this.update = function(){
		if(this.y+ this.radius + this.dy> innerHeight || this.y - this.radius <0 ){
			this.dy = -this.dy * friction;
		}else {
			this.dy += gravity;
		}
		if (this.x + this.radius + this.dx> innerWidth || this.x - this.radius <0) {
			this.dx = -this.dx ;
		}
		this.x += this.dx;
		this.y += this.dy;

		this.draw(); 
	}

	this.draw = function(){
		context.beginPath();
		context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		context.strokeStyle = this.colorStroke;
		context.fillStyle = this.colorFill;
		context.stroke();
		context.fill();
		context.closePath();
	}
}

var ballArray = [];
function init(){
	ballArray = [];
	for (var i = 0; i < maxBall ; i++) {
		var radius = (Math.random() * 30) + 10;
		var x = Math.random() * (canvas.width - radius*2) + radius;
		var y = Math.random() * (canvas.height - radius*2) + radius;
		var dy = 2;
		var dx = Math.random() * 4 - 2;
		ballArray.push(new Ball(x, y, dx, dy, radius));
	}
}

function animate(){
	window.requestAnimationFrame(animate);
	context.clearRect(0,0,canvas.width, canvas.height);
	for (var i = 0; i < ballArray.length; i++) {
		ballArray[i].update();
	}
}
init();
animate();