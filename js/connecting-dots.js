var data = {
    canvas: null,
    ctx: null,
    clickedDot: null,
    lines: null, 
	dots: [{x: Math.random() * 1500 + 1, y: Math.random() * 1000 + 1}, {x: Math.random() * 1500 + 1, y: Math.random() * 1000 + 1}, {x: Math.random() * 1500 + 1, y: Math.random() * 1000 + 1}, {x: Math.random() * 1500 + 1, y: Math.random() * 1000 + 1}, {x: Math.random() * 1500 + 1, y: Math.random() * 1000 + 1}, {x: Math.random() * 1500 + 1, y: Math.random() * 1000 + 1}]
};

/* 
var = dots [];

for (var i = 0; i < col; i++) {
    dots[i] = [];
   	for (var j = 0; j < row; j++) {
   		dots[i][j] = Math.floor(Math.random() * 1000 + 1);
   		document.write(dots[i][j] + "<br/>")
   }
} 
*/

function circleCollision (c1, c2) {
	var a = c1.r + c2.r,
		x = c1.x - c2.x,
		y = c1.y - c2.y;

	if ( a > Math.sqrt( (x*x) + (y*y) ) ) return true;
	else return false;
}

function prepCanvas () {
	var res = window.devicePixelRatio || 1,
		scale = 1 / res;
	data.canvas = document.getElementById('dots');
	data.ctx = data.canvas.getContext('2d');

	data.canvas.width = window.innerWidth * res;
	data.canvas.height = window.innerHeight * res;
	data.canvas.style.width = window.innerWidth + 'px';
	data.canvas.style.height = window.innerHeight + 'px';

	data.ctx.scale(res, res);

	data.canvas.addEventListener('mousedown', function (e) {
		checkForDot(e);
	});
}


function drawDots () {
	var i = 0;
	for (; i < data.dots.length; i++) {
		var d = data.dots[i];
		data.ctx.beginPath();
		data.ctx.arc(d.x, d.y, 10, 0, 2 * Math.PI);
		data.ctx.fillStyle = '#d8d8d8';
		data.ctx.fill();
		data.ctx.closePath();
	}

	//if (i == 0) alert('Congratulations, you found an Eulerian path!');
}

function drawLine (toDot) {
	data.ctx.beginPath();
	data.ctx.moveTo(data.clickedDot.x, data.clickedDot.y);
	data.ctx.lineTo(toDot.x, toDot.y);
	data.ctx.lineWidth = 6;
	data.ctx.strokeStyle = '#d8d8d8';
	data.ctx.stroke();
	data.ctx.closePath();
}

function checkForDot (e) {
	var i = 0, col = null;
	for (; i < data.dots.length; i++) {
		var d = data.dots[i],
			c1 = {x: d.x, y: d.y, r: 20},
			c2 = {x: e.pageX, y: e.pageY, r: 20};
		if (circleCollision(c1, c2)) col = d;
	}

	if (col !== null) {
		if (data.clickedDot !== null) drawLine(col);
		data.clickedDot = col;
	}
}

prepCanvas();
drawDots();