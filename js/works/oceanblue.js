function setup(){
  createCanvas(windowWidth,windowHeight+100,WEBGL);
  stroke(0);
  angleMode(DEGREES);
  
}

function draw(){
  background(0);
  noStroke()
  t=frameCount/50;
  nj=int(width/(width/30))
  ni=int(height/(width/30));
  m=10*sin(t)
  ambientMaterial(20+m,200-m,250+m)
  pointLight(255,255,255,200,200,200)
  orbitControl();
  translate(-width/2,-height/2)
  for(let j=0;j<ni+1;j++){
    for(let i=0;i<nj+1;i++){
      push()
      translate(i*width/30,width/30*j,0);
      rotateY(i*t+t)
      rotateX(j*t+t)
      circle(width/30,10,24,16);
      pop()
    }
  }
}