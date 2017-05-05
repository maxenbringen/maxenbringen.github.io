var canvas = document.getElementById("random");

var ctx = canvas.getContext('2d'),
    count = Math.round((Math.random() * 6) + 4), // number of random  points
    cx = 150,
    cy = 150,
    radius = 300,
    clickedDot = null,
    lines = null;

ctx.fillStyle = '#1e1e1e';
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.fillStyle = '#000000';

ctx.beginPath();
ctx.moveTo(cx, cy);
ctx.closePath();

ctx.fill();

// create random points
ctx.fillStyle = '#ffffff';
//ctx.arc(cy, cx, 10, 0, 2 * Math.PI);

while (count) {
    var pt_angle = Math.random() * Math.PI * 2;
    var pt_radius_sq = Math.random() * radius * (radius - 20);
    var pt_x = Math.sqrt(pt_radius_sq) * Math.cos(pt_angle);
    var pt_y = Math.sqrt(pt_radius_sq) * Math.sin(pt_angle);
    ctx.fillRect(pt_x + canvas.width / 2, pt_y + canvas.width / 2, 10, 10);
    count--;
}

/*while(count) {
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;
    var xDiff = cx - x;
    var yDiff = cy - y;
    if(Math.sqrt(xDiff*xDiff+yDiff*yDiff)<radius)
    {
        ctx.fillRect(x, y, 2, 2);
        count--;
    } */  

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
