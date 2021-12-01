
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


//

var counter = 0;
var counter2 = 0;

function setup() {
createCanvas(windowWidth, windowHeight);


}

function draw() {
var x= 150;
var y= 400;


noFill();
translate(width / 2,height / 2);
stroke("yellow");
counter+=2;

bezier(sin(counter)* 300, cos(counter) * 300,8,2,67,23,98,2);

stroke("#DF0174");
translate(width /8,height / 8);
bezier(sin(counter)* 300, cos(counter) * 300,34,2,67,23,98,2);

stroke("#5858FA");
translate(width/13,height/13 );
bezier(sin(counter)* 150, cos(counter) * 150,80,2,67,23,98,2);

stroke("orange");
translate(width/4 ,sin(height / 2) )
bezier(sin(counter)* 300, cos(counter) * 300,80,2,67,23,98,2);

stroke("#40C6DB");
translate(-200 ,-300 );
bezier(sin(counter)* 300, cos(counter) * 300,80,2,67,23,98,2);


stroke("#FB0D0D");
translate(-250 ,-100 );
bezier(sin(counter)* 300, cos(counter) * 300,40,2,67,23,98,2);

stroke("green");
translate(-250 ,-100 );
bezier(sin(counter)* 300, cos(counter) * 300,80,2,67,23,98,2);

stroke("#AE2CE1");
translate(-300 ,70 );
bezier(sin(counter)* 300, cos(counter) * 300,80,2,67,23,98,2);

stroke("#FDC6FB");
translate(-300 ,120 );
bezier(sin(counter)* 300, cos(counter) * 300,80,2,67,23,98,2);

stroke("#FFA323");
translate(-300 ,200 );
bezier(sin(counter)* 300, cos(counter) * 300,80,2,67,23,98,2);

stroke("#FB0D0D");
translate(400 ,200 );
bezier(sin(counter)* 300, cos(counter) * 300,80,2,67,23,98,2);

stroke("green");
translate(250 ,-100 );
bezier(sin(counter)* 150, cos(counter) * 150,80,2,67,23,98,2);



}

function mousePressed()
{
save("trial"+millis()+".png");
}