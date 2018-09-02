var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth ;
canvas.height = window.innerHeight ;

var context = canvas.getContext('2d');


/*c.fillRect(100, 100, 100, 100);

c.beginPath();
c.moveTo(50,300);
c.lineTo(300,100);
c.strokeStyle = "blue";
c.stroke();



function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

for (var i = 0 ; i < 3; i++) {
	var x = Math.random() * window.innerWidth;
	var y = Math.random() * window.innerHeight;
	c.beginPath();
	c.arc(x, y, 30, 0, Math.PI * 2, false);
	c.strokeStyle = getRandomColor();  
	c.stroke();
}
*/

var mouse = {
	x: undefined,
	y: undefined
}

var maxRadius = 40;
var noOfBall = 700;

var colorArray = [
	'#2c3e50',
	'#e74c3c',
	'#ecf0f1',
	'#3498d8',
	'#2980b9'
];

window.addEventListener('mousemove', function(event){
		mouse.x = event.x;
		mouse.y = event.y;

	});	

window.addEventListener('resize', function(){
		canvas.width = window.innerWidth ;
		canvas.height = window.innerHeight;

		init();
	});

function Circle(x, y, dx, dy, radius) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.minRadius = radius;
	this.color = colorArray[Math.floor(Math.random()* colorArray.length)];

	this.draw = function() {
		context.beginPath();
		context.arc(this.x, this.y, this.radius , 0, Math.PI * 2, false);
		context.fillStyle = this.color;
		context.fill();
	}
	
	this.update = function() {
		if(this.x + this.radius> innerWidth || this.x - this.radius < 0){
		this.dx = -this.dx;
		}

		if(this.y+ this.radius> innerHeight || this.y - this.radius <0 ){
			this.dy = -this.dy;
		}
		this.x += this.dx;
		this.y += this.dy;

		//interactivity
		if((mouse.x - this.x) <50 && (mouse.x - this.x) > -50 && (mouse.y - this.y) <50&& (mouse.y - this.y) > -50){
			if(this.radius<maxRadius){
			this.radius += 1;
		}
		}
		else if(this.radius>this.minRadius){
			this. radius -=1;
		}

		this.draw();
	}	
}

var circleArray = [];

function init(){

	circleArray = [];

	for(var i = 0; i< noOfBall; i++){
		var radius = Math.random() * 3 + 1;
		var x = Math.random() * (window.innerWidth - radius * 2) + radius;
		var y = Math.random() * (window.innerHeight - radius * 2) + radius;
		var dx = Math.random() - 0.5;
		var dy = Math.random() - 0.5;		
		circleArray.push(new Circle(x, y, dx, dy, radius));
	}
}

function animate() {
	requestAnimationFrame(animate);
	
	context.clearRect(0,0, innerWidth ,innerHeight);
	
	for(var i=0; i< circleArray.length; i++){
		circleArray[i].update();
	}
	

}
init();
animate();