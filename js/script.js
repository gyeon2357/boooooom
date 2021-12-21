(function () {

    // a little verbose but...
    function handleMousemove(event) {
        var x = event.clientX;
        var y = event.clientY;
        draw(x, y);
    }

    function handleTouchmove(event) {
        event.preventDefault(); // we don't want to scroll
        var touch = event.touches[0];
        var x = touch.clientX;
        var y = touch.clientY;
        draw(x, y);
    }
    // this one can be shared by both touch and move events
    function activateDrawing(event) {
        event.preventDefault();
        canvas.isDrawing = true;
    }

    function draw(eventX, eventY) {
        var x = eventX - canvas.node.offsetLeft;
        var y = eventY - canvas.node.offsetTop;
        if (!canvas.isDrawing) {
            return;
        }
        var radius = 125; // or whatever
        var fillColor = '#ff0000';
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillCircle(x, y, radius, fillColor);
    }

    function createCanvas(parent, width, height) {
        var canvas = {};
        canvas.node = document.createElement('canvas');
        canvas.context = canvas.node.getContext('2d');
        canvas.node.width = width || 100;
        canvas.node.height = height || 100;
        parent.appendChild(canvas.node);
        return canvas;
    }
    // Colours on random
    var randomColors = ['#ff4000'];
    var bg = randomColors[Math.floor(Math.random() * randomColors.length)];
    var canvas, ctx; // got it out to avoid nesting too deeply my handlers;

    function init(container, width, height, fillColor) {
        canvas = createCanvas(container, width, height);
        ctx = canvas.context;
        // define a custom fillCircle method
        ctx.fillCircle = function (x, y, radius, fillColor) {
            var radgrad = ctx.createRadialGradient(x, y, 0, x, y, radius);
            radgrad.addColorStop(0, 'rgba(255,0,0,1)');
            radgrad.addColorStop(0.8, 'rgba(255,0,0,.9)');
            radgrad.addColorStop(1, 'rgba(255,0,0,0)');

            // draw shape
            ctx.fillStyle = radgrad;
            ctx.fillRect(x - radius, y - radius, x + radius, y + radius);
        };
        ctx.clearTo = function (fillColor) {
            ctx.fillStyle = fillColor;
            ctx.fillRect(0, 1, width, height);
        };
        ctx.clearTo(fillColor || bg);

        // bind mouse events
        canvas.node.onmousemove = throttle(handleMousemove);
        canvas.node.ontouchmove = throttle(handleTouchmove);
        canvas.node.onmouseenter =
            canvas.node.ontouchstart = throttle(activateDrawing);

    }

    var container = document.getElementById('canvas');
    init(container, window.innerWidth, window.innerHeight, bg);

    /* Bonus : throttle these events so they don't fire too often */
    function throttle(callback) {
        var active = false; // a simple flag
        var evt; // to keep track of the last event
        var handler = function () { // fired only when screen has refreshed
            active = false; // release our flag 
            callback(evt);
        }
        return function handleEvent(e) { // the actual event handler
            evt = e; // save our event at each call
            if (!active) { // only if we weren't already doing it
                active = true; // raise the flag
                requestAnimationFrame(handler); // wait for next screen refresh
            };
        }
    }

})();
//No scroll on phone
document.body.addEventListener('touchstart', function (e) {
    e.preventDefault();
});

// Carousel slider
var slideCount = document.querySelectorAll(".slider .slide-item").length;
var slideWidth = document.querySelectorAll(".slider-outer")[0].offsetWidth;
var slideHeight = document.querySelectorAll(".slider-outer")[0].offsetHeight;

var sliderUlWidth = slideCount * slideWidth;
document.querySelectorAll(".slider")[0].style.cssText =
    "width:" + sliderUlWidth + "px";

for (var i = 0; i < slideCount; i++) {
    document.querySelectorAll(".slide-item")[i].style.cssText =
        "width:" + slideWidth + "px;height:" + slideHeight + "px";
}

setInterval(function () {
    moveRight();
}, 2000);
var counter = 1;

function moveRight() {
    var slideNum = counter++;
    if (slideNum < slideCount) {
        var transformSize = slideWidth * slideNum;
        document.querySelectorAll(".slider")[0].style.cssText =
            "width:" +
            sliderUlWidth +
            "px; -webkit-transition:all 800ms ease; -webkit-transform:translate3d(-" +
            transformSize +
            "px, 0px, 0px);-moz-transition:all 800ms ease; -moz-transform:translate3d(-" +
            transformSize +
            "px, 0px, 0px);-o-transition:all 800ms ease; -o-transform:translate3d(-" +
            transformSize +
            "px, 0px, 0px);transition:all 800ms ease; transform:translate3d(-" +
            transformSize +
            "px, 0px, 0px)";
    } else {
        counter = 1;
        document.querySelectorAll(".slider")[0].style.cssText =
            "width:" +
            sliderUlWidth +
            "px;-webkit-transition:all 800ms ease; -webkit-transform:translate3d(0px, 0px, 0px);-moz-transition:all 800ms ease; -moz-transform:translate3d(0px, 0px, 0px);-o-transition:all 800ms ease; -o-transform:translate3d(0px, 0px, 0px);transition:all 800ms ease; transform:translate3d(0px, 0px, 0px)";
    }
}
