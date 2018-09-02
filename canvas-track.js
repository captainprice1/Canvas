var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth ;
canvas.height = window.innerHeight ;

var context = canvas.getContext('2d');

var mouse = {
	x: canvas.width /2,
	y: canvas.height / 2
}

var colorArray = [
	'#2c3e50',
	'#e74c3c',
	'#ecf0f1',
	'#3498d8',
	'#2980b9'
];

window.addEventListener('mousemove', function(event){
		mouse.x = event.clientX;
		mouse.y = event.clientY;

	});	

window.addEventListener('resize', function(){
		canvas.width = window.innerWidth ;
		canvas.height = window.innerHeight;

	});

function Circle(x, y, dx, dy, radius, ttl) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.timeToLive = ttl;
	this.opacity = 1;
	this.shouldRemove = false;
	this.color = colorArray[Math.floor(Math.random()* colorArray.length)];

	this.update = function() {
		//movement
		this.x += this.dx;
		this.y += this.dy;

		//bounce
		if(this.x + this.radius> innerWidth || this.x - this.radius < 0){
		this.dx = -this.dx;
		}

		if(this.y+ this.radius> innerHeight || this.y - this.radius <0 ){
			this.dy = -this.dy;
		}

		this.x = Math.min(Math.max(this.x, 0 + this.radius), canvas.width - this.radius);
		this.y = Math.min(Math.max(this.y, 0 + this.radius), canvas.height - this.radius);

		context.beginPath();
		context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
		context.strokeStyle = this.color;
		context.stroke();
		context.closePath();

		this.opacity -=1 *(0.1/ttl);
		this.radius -= radius *(0.1/ttl);

		if (this.radius<0) this.radius = 0;

		this.timeToLive -= 0.1;
	}
	this.remove = function() {
		return this.timeToLive <= 0;
	}	
}

function Explosion(x, y){
	this.circleArray = [];

	this.init = function()
{
		var randomVelocity = {
			x: (Math.random() - 0.5) * 3.5,
			y: (Math.random() - 0.5) * 3.5
		};
		this.circleArray.push(new Circle(x, y, randomVelocity.x, randomVelocity.y, 30, 8));
		
	}
	
	this.init();

	this.draw = function() {
		for (var i = 0; i < this.circleArray.length; i++) {
			this.circleArray[i].update();

			if (this.circleArray[i].remove() == true) {
				this.circleArray.splice(i,1);
			};
		}
	}
}

var explosion = [];



function animate() {
	window.requestAnimationFrame(animate);
	
	context.clearRect(0,0, innerWidth ,innerHeight);

	explosion.push(new Explosion(mouse.x, mouse.y));
	
	for(var i=0; i< explosion.length; i++){
		explosion[i].draw();
	}
}

animate();