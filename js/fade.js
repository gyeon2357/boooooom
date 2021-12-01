
function setup() {
  frameRate(1);
}

window.onload = function () {
  var clock = document.getElementById("clock");
  function pad(num, size) {
    num = String(num);

    return new Array(size + 1 - num.length).join("0") + num;
  }

  function displayTime() {
    var now = new Date();

    clock.innerText = "2021." + "12" + "." + pad(now.getDate(), 2) + " " +
      pad(now.getHours(), 2) +
      ":" +
      pad(now.getMinutes(), 2) +
      ":" +
      pad(now.getSeconds(), 2);
  }
  setInterval(displayTime, 10);
};



    // particle../


var NUM_PARTICLES = ( ( ROWS = window.outerHeight/4) * ( COLS = window.outerWidth/4) ),
THICKNESS = Math.pow( 80, 2 ),
SPACING = 10,
MARGIN = window.innerWidth,
COLOR = 0,
DRAG = 1.15,
EASE = 0.25,


/*

used for sine approximation, but Math.sin in Chrome is still fast enough :)http://jsperf.com/math-sin-vs-sine-approximation


*/

container,
particle,
canvas,
mouse,
stats,
list,
ctx,
tog,
man,
dx, dy,
mx, my,
d, t, f,
a, b,
i, n,
w, h,
p, s,
r, c
;

particle = {
vx: 0,
vy: 0,
x: 0,
y: 0
};

function init() {

container = document.getElementById( 'lineBox' );
canvas = document.createElement( 'canvas' );

ctx = canvas.getContext( '2d' );
man = false;
tog = true;

list = [];

w = canvas.width = COLS * SPACING + MARGIN * 1;
h = canvas.height = ROWS * SPACING + MARGIN * 1;

container.style.marginLeft = Math.round( w * -0.5 ) + 'px';
container.style.marginTop = Math.round( h * -0.5 ) + 'px';

for ( i = 0; i < NUM_PARTICLES; i++ ) {

p = Object.create( particle );
p.x = p.ox = MARGIN + SPACING * ( i % COLS );
p.y = p.oy = MARGIN + SPACING * Math.floor( i / COLS );

list[i] = p;
}

container.addEventListener( 'mousemove', function(e) {

bounds = container.getBoundingClientRect();
mx = e.clientX - bounds.left;
my = e.clientY - bounds.top;
man = true;

});

if ( typeof Stats === 'function' ) {
document.body.appendChild( ( stats = new Stats() ).domElement );
}

container.appendChild( canvas );
}

function step() {

if ( stats ) stats.begin();
if ( tog = !tog ) {
if ( !man ) {

  t = +new Date() * 0.1;
  mx = w * 0.5 + ( Math.cos( t * 2.1 ) * Math.cos( t * 0.9 ) * w * 0.45 );
  my = h * 0.5 + ( Math.sin( t * 3.2 ) * Math.tan( Math.sin( t * 0.8 ) ) * h * 0.45 );
}
  
for ( i = 0; i < NUM_PARTICLES; i++ ) {
  
  p = list[i];
  
  d = ( dx = mx - p.x ) * dx + ( dy = my - p.y ) * dy;
  f = -THICKNESS / d;

  if ( d < THICKNESS ) {
    t = Math.atan2( dy, dx );
    p.vx += f * Math.cos(t);
    p.vy += f * Math.sin(t);
  }

  p.x += ( p.vx *= DRAG ) + (p.ox - p.x) * EASE;
  p.y += ( p.vy *= DRAG ) + (p.oy - p.y) * EASE;

}

} else {

b = ( a = ctx.createImageData( w, h ) ).data;

for ( i = 0; i < NUM_PARTICLES; i++ ) {

  p = list[i];
  b[n = ( ~~p.x + ( ~~p.y * w ) ) * 4] = b[n+1] = b[n+2] = COLOR, b[n+3] = 255;
}

ctx.putImageData( a, 0, 0 );
}

if ( stats ) stats.end();

requestAnimationFrame( step );
}

init();
step();