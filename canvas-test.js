var canvas = document.querySelector('canvas');

canvas.width = 800 ;
canvas.height = 800 ;

var context = canvas.getContext('2d');

function line(x1, y1, x2 , y2){
	context.moveTo(x1, y1);
	context.lineTo(x2, y2);
	context.stroke();
}

line(0,0,200,200);