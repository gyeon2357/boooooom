

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

    function setup() {
      createCanvas(windowWidth, windowHeight);
      frameRate(24);
      
    
    }
    
    function draw() {
      var r = random(0.2, 6);
      var r1 = pow(r,3);
      var r2 = r1*0.8;
      var r3 = r2*0.8;
      var randomcenterX = width/2 + random(-300, 300);
      var randomcenterY = height/2 + random(-200, 200);
      var setonea = random(1,8);
      var setRange1 = random(720, windowHeight);
      var setRange2 = setRange1 * 0.8;
      
      drawCircle(randomcenterX, randomcenterY, r3, setRange1, random(1,255), random(1,255), random(1,255),random(30,60), setonea); 	
      drawLines(randomcenterX, randomcenterY, r1, setRange2, random(1,255),random(1,255),random(1,255),random(40,70),setonea);
      drawLines(randomcenterX, randomcenterY, r2, setRange2, random(1,255),random(1,255),random(1,255),random(40,70),setonea);
      drawLines(randomcenterX, randomcenterY, r2, setRange2, random(1,255),random(1,255),random(1,255),random(40,70),setonea);
      
      if (mouseIsPressed){
        noLoop();
      }
    
    }
    
    
    function drawCircle(centX, centY, R, range, color1, color2, color3, trans, seta){
      stroke(color1, color2, color3, trans);
      strokeWeight(1);
      
      var x, y;
      var centerX = centX;
      var centerY = centY;
      var Radius, rad;
      var thisRadius;
      var rangecircle = range;
      
      Radius = R;
      
      beginShape();
      noFill();
      //fill(color3, color1, color2);
      for (var ang = 0; ang <rangecircle; ang += 1){
        rad = radians(ang);
        var noiseVal = random(10);
        Radius += 0.1;
        thisRadius = Radius - customRadius(noiseVal, seta);
        // thisRadius = Radius;
        x = centerX + thisRadius*cos(rad);
        y = centerY + thisRadius*sin(rad);
        curveVertex(x, y);
        //curveVertex  Specifies vertex coordinates for curves. This function may only be used between beginShape() and endShape() and only when there is no MODE parameter specified to beginShape(). 
      }
      endShape();
    }
    
    function drawLines(centX, centY, R, range, color1, color2, color3, trans, seta){
      stroke(color1, color2, color3, trans);
      strokeWeight(1);
      
      var x, y;
      var centerX = centX;
      var centerY = centY;
      var Radius, rad;
      var thisRadius;
      var rangeline = range;
      
      
      Radius = R;
    
      for (var ang = 0; ang <rangeline; ang += 1){
        rad = radians(ang);
        var noiseVal = random(10);
        Radius += 0.1;
        thisRadius = Radius - customRadius(noiseVal, seta);
        //thisRadius = Radius;
        x = centerX + thisRadius*cos(rad);
        y = centerY + thisRadius*sin(rad);
        line(centX, centY, x, y);
        //curveVertex  Specifies vertex coordinates for curves. This function may only be used between beginShape() and endShape() and only when there is no MODE parameter specified to beginShape(). 
      }
    
      
    }
    
    function customRadius(value, a){
      var count = int(value%12);
      var retvalue = a * count;
      return retvalue;
    }
