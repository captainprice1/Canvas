var canvas = document.querySelector('canvas');

canvas.width = 400 ;
canvas.height = 400 ;

var context = canvas.getContext('2d');

 context.translate(canvas.width/2 , canvas.height/2);

mouseX = undefined;

var speed ;

canvas.addEventListener('mousemove', function(event){
	mouseX= event.clientX;
})


	

function Star(){
	this.x = (Math.random()*canvas.width)- canvas.width/2;
	this.y = (Math.random()*canvas.height)- canvas.height/2;
	this.z = (Math.random()* canvas.width);
	this.sx;
	this.sy;
	this.pz = this.z;

	this.update  = function(){
		if(speed){
			this.z -= speed;
			

			if (this.z<1) {
				this.z = canvas.width;
				this.x = (Math.random()*canvas.width* 1.5)- canvas.width/2;
				this.y = (Math.random()*canvas.height*1.5)- canvas.height/2;
				this.pz = this.z;
			}

		}
	}

	this.show = function(){
		var sx = (this.x / this.z)* canvas.width;
		var sy = (this.y / this.z)* canvas.height;
		this.radius  = (canvas.width/this.z) * 2;
	

		context.beginPath();
		context.arc(sx, sy , this.radius, 0, Math.PI * 2, false);
		context.fillStyle = "#ffffff";
		context.fill();
		context.closePath();

		var px = (this.x / this.pz)* canvas.width;
		var py = (this.y / this.pz)* canvas.height;
		
		context.beginPath();
		context.moveTo(sx, sy);
		context.lineTo(px, py);
		context.strokeStyle = '#ffffff';
		context.stroke();

		this.pz = this.z;

		
		



	}

}

var starField = []

function init(){
	for (var i = 0; i < 800; i++) {
		var radius = 2;
		
		starField.push(new Star());
	}
}

function animate(){	
	window.requestAnimationFrame(animate);
	speed = (mouseX/canvas.width)*50;
	context.fillStyle = "#000000";
	context.fillRect(-(canvas.width/2),-(canvas.height/2),canvas.width,canvas.height);
	for(var i = 0; i< starField.length; i++){
		starField[i].show();
		starField[i].update();
	}
}
init();
animate();