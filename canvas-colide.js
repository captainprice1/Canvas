var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var noOfBall = 400;

var mouse = {
	x: undefined,
	y: undefined
}

var colorArray = [
	'#2c3e50',
	'#e74c3c',
	'#3498d8',
	'#2980b9'
]

window.addEventListener('mousemove', function(event){
	mouse.x = event.clientX;
	mouse.y = event.clientY;
})

function distance(x1, y1, x2, y2){
	var dx = x2 - x1;
	var dy = y2 - y1;
	return Math.sqrt((dx*dx) + (dy*dy));
}

function rotate(dx, dy, angle){
	const rotateVelocities = {
		x: dx *Math.cos(angle) - dy * Math.sin(angle),
		y: dx *Math.sin(angle) + dy * Math.cos(angle)
	};

	return rotateVelocities;
}

function resolveCollision(particle, otherParticle){
	var m1 = particle.mass;
	var m2 = otherParticle.mass;
	var totalMass = m1 + m2;
	var diffA = m1 - m2;
	var diffB = m2 - m1;
	var xVelocityDiff = particle.dx - otherParticle.dx;
	var yVelocityDiff = particle.dy - otherParticle.dy;
	var xDist = otherParticle.x - particle.x;
	var yDist = otherParticle.y - particle.y;

	if (xVelocityDiff * xDist + yVelocityDiff * yDist >=0) {
		const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

		const u1 = rotate(particle.dx, particle.dy, angle);
		const u2 = rotate(otherParticle.dx, otherParticle.dy, angle);

		var d1x = ((diffA*u1.x) +(2*m2*u2.x))/totalMass;
		var d1y = u1.y;
		var d2x = ((diffA*u2.x) +(2*m2*u1.x))/totalMass;
		var d2y = u2.y;

		const vFinal1 = rotate(d1x, d1y, -angle);
		const vFinal2 = rotate(d2x, d2y, -angle);

		particle.dx = vFinal1.x;
		particle.dy = vFinal1.y;

		otherParticle.dx = vFinal2.x;
		otherParticle.dy = vFinal2.y;

	}	
}

function Circle(x, y, dx, dy, radius){
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.opacity = 0;
	this.dx = dx;
	this.dy = dy;
	this.color = colorArray[Math.floor(Math.random()* colorArray.length)];
	this.mass =1;

	this.update = function(circleArray){
		
		this.x += this.dx;
		this.y += this.dy;
		for (var i = 0; i < circleArray.length; i++) {
			if (this === circleArray[i]) continue;
			if (distance(this.x, this.y, circleArray[i].x, circleArray[i].y) < (2*this.radius)) {
				resolveCollision(this, circleArray[i]);
			}
		}
		

		if(this.x + this.radius +this.dx>canvas.width || this.x - this.radius <0){
			this.dx = -this.dx;
		}
		if(this.y + this.radius +this.dy>canvas.height || this.y - this.radius <0){
			this.dy = -this.dy;
		}
		if(distance(mouse.x, mouse.y, this.x, this.y)<120 && this.opacity<.2){
			this.opacity +=0.02;
		}else if(this.opacity>0){
			this.opacity -=0.02;
			this.opacity = Math.max(0,this.opacity);
		}

		this.draw();
	}

	this.draw = function(){
		context.beginPath();
		context.arc(this.x, this.y, this.radius, 0, Math.PI*2,false);
		context.save();
		context.globalAlpha= this.opacity;
		context.fillStyle = this.color;
		context.fill();
		context.restore();
		context.strokeStyle = this.color;
		context.stroke();
		context.closePath();
	}
}

var circleArray = [];

function init(){
	circleArray = [];

	for(var i = 0; i< noOfBall; i++){
		var radius = 15;
		var x = Math.random() * (window.innerWidth - radius * 2) + radius;
		var y = Math.random() * (window.innerHeight - radius * 2) + radius;
		var dx = (Math.random() - 0.5) * 5;
		var dy = (Math.random() - 0.5) * 5;

		if(i!==0){
			for (var j = 0; j < circleArray.length; j++) {
				if (distance(x, y, circleArray[j].x, circleArray[j].y) < (2*radius)) {
					x = Math.random() * (window.innerWidth - radius * 2) + radius;
					y = Math.random() * (window.innerHeight - radius * 2) + radius;
					j= -1; 
				}
			}
		}

		circleArray.push(new Circle(x, y, dx, dy, radius));
	}
}

function animate(){
	window.requestAnimationFrame(animate);
	context.clearRect(0,0,canvas.width,canvas.height);
	for (var i = 0; i < circleArray.length; i++) {
		circleArray[i].update(circleArray);
	}
}
init();
animate();