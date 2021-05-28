let bbCan = document.createElement("canvas"), // backbuffer
bbCtx = bbCan.getContext("2d"),
canvas = document.getElementById("canvas"), // render canvas
ctx = canvas.getContext("2d");
let size = 16,
size1 = 17,
width = window.innerWidth,
height = window.innerHeight,
perspective = 0,
points = [],
particles = [],
noiseLayers = [],
noiseTime = new Date().getTime(),
noiseMin = 60,
curLayer = 0,
isThrob = false,
radialGrad = null,
setPoint = function (x, y, z, color, nodes) {
this.xp = x;
this.yp = y;
this.zp = z;
this.angle =  Math.random() * 10;
this.x = this.y = this.z = 0;
this.color = color;
this.nodes = nodes;
return this;
}

function init() {
for (var x = 0; x < size; x++) {
for (var y = 0; y < size; y++) {
var xPos = -5800 + x * 950,
    zPos = 215 + y * 555,
    yPos = 600 + Math.random() * 5;

points[y * size1 + x] = new setPoint(xPos, yPos, zPos, [250, 242, 245], [
((y + 1) * size1) + x, (y + 1) * size1 + (x + 1), (y * size1) + (x + 1)]);
}
}



for (var n = 0; n < 10; n++) {
var nCanvas = document.createElement("canvas"),
nCtx = nCanvas.getContext("2d"),
pix = 0;

nCanvas.width = width;
nCanvas.height = height;

var nImageData = nCtx.createImageData(width, height),
nData = nImageData.data;

for (x = 0; x < width; x++) {
for (y = 0; y < height; y++) {
    if (Math.random() > 0.9) {
        for (var w = 0; w < 3; w++) {
            pix = ((x + w) + y * width) * 12;
            nData[pix] = 255;
            nData[pix + 1] = 255;
            nData[pix + 2] = 255;
            nData[pix + 3] = 20;
        }
    }
}
}
nCtx.putImageData(nImageData, 0, 0);
noiseLayers.push(nCanvas);
}


render();
}

// render loop
function render() {
bbCtx.clearRect(0, -220, width, height);
// render the grid
for (j = size - 1; j >= 0; j--) {
for (i = 0; i < size; i++) {
var point = points[j * size1 + i],
    px = point.xp * 12,
    py = point.yp * 126,
    pz = point.zp * 9,
    color = point.color,
    cosY = Math.cos(0.3),
    sinY = Math.sin(0.3);

// the motion
points[j * size1 + i].angle += 0.03;
points[j * size1 + i].yp += Math.sin(points[j * size1 + i].angle) * 0.4;

scl = perspective / pz;
point.x = width/2 + px * scl;
point.y = py * scl  - (height + 200);

// connects all the points
bbCtx.beginPath();
bbCtx.moveTo(~~ (point.x), ~~ (point.y));

for (ve = 0; ve < 3; ve++) {
    if (points[point.nodes[ve]] !== undefined) {
        bbCtx.lineTo(~~ (points[point.nodes[ve]].x), ~~ (points[point.nodes[ve]].y));
    }
}

// connect the corners
bbCtx.moveTo(~~ (point.x), ~~ (point.y));
if (points[point.nodes[1]] !== undefined) {
    bbCtx.lineTo(~~ (points[point.nodes[1]].x), ~~ (points[point.nodes[1]].y));
}
bbCtx.closePath();
/* 
    hack shading. Not correct shading at all, but looks close enough w/o 
    having to create some actual lighting
*/

let red = ~~ (color[0] + ((290 - point.yp)) + point.zp * 0.01),
    green = ~~ (color[0] + ((270  - point.yp)) + point.zp * 0.02),
    blue = ~~ (color[0] + ((311 - point.yp)) + point.zp * 0.03);


bbCtx.fillStyle = 'rgb(' + red + ',' + green + ',' + blue + ')';
bbCtx.fill();
bbCtx.strokeStyle = "rgba(110,110,222,0.1)";
bbCtx.stroke();

// creates the points inbetween each connection
bbCtx.beginPath();
bbCtx.arc(point.x, point.y, scl * 126, 0, Math.PI * 2, true);
bbCtx.closePath();
bbCtx.fillStyle = 'rgba(111,121,113, 0.1)';
bbCtx.fill();
bbCtx.stroke();

}
}



// draw the backbuffer to the display canvas
ctx.fillStyle = "rgba(222,221,221,0.2)";
ctx.fillRect(0, 0, width, height);
ctx.drawImage(bbCan, 0, 0);

ctx.fillStyle = radialGrad;
ctx.fillRect(0, 0, width, height);

requestAnimationFrame(render);
}
window.addEventListener('resize', function(){
width = window.innerWidth;
height = window.innerHeight; 
perspective = height;
canvas.width = bbCan.width = width;
canvas.height = bbCan.height = height;
});
setTimeout(function(){
width = window.innerWidth;
height = window.innerHeight;
perspective = height;
canvas.width = bbCan.width = width;
canvas.height = bbCan.height = height;

init();
},100);