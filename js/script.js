

$(document).ready(function() {
  $('html, body').scrollTop(0);
  $content = $('.content');
  $link = $content.find('a');
  $link.on('click', function(e) {
    e.preventDefault();
    var href = $(this).attr('href');
    var options = 'width=640, height=480, status=no, menubar=no, toolbar=no';
    window.open(href, '', options);
  });
});

$(window).on('load', function() {
  var $header = $('.header');
  var $title = $('.title');
  var $main = $('.main');
  var delay = 500;

  setTimeout(function() {
    $title.fadeIn(delay);

    setTimeout(function() {
      $title.find('div').eq(0).show(0);

                  setTimeout(function() {
                    $title.find('div').eq(1).fadeOut(delay, function() {
                      $header.fadeOut(delay+100);
                      $main.animate({
                        'margin-top': 0
                      }, delay);
                      $('html, body').scrollTop(0);
                      $('body').removeClass('fixed');
                    });
                    
                  }, delay * 4);
                });
              }, delay);
            });

//  * Copyright: Park Jeong Gyeon, 2021-08-01
//  * Published under the Creative Commons license NonCommercial 4.0.
//  * Check CC-Attribut-NonCommercial for more information at https://creativecommons.org/licenses/by-nc/4.0/

window.addEventListener(
  "load",
  function () {
    document.body.style.height =
      document.documentElement.clientHeight + 5 + "px";
    setTimeout(scrollTo, 0, 0, 1);
  },
  false
);

$(document).bind("mobileinit", function () {
  $.mobile.defaultPageTransition = "fadeIn";
  $.mobile.ajaxLinksEnabled = false;
  $.mobile.ajaxFormsEnabled = false;
  $.mobile.ajaxEnabled = false;
});
var s = "쉬어가는 닻    The  Resting  Anchor";
let topleft;
let topright;
let bottomright;
let bottomleft;
let n;
let over;
let percent;




function setup() {
  createCanvas(windowWidth, windowHeight);
  over = 0;
  percent = 7/ 9;
  topleft = over + windowWidth/4 * percent;
  topright = over + topleft + windowHeight *4 * percent;
  bottomright = over + topright + windowWidth/4 * percent;
  bottomleft = over + bottomright + windowHeight/4 * percent;
 yy = 0;
  n = 0;
  
}
let mover = 0;
let yy = 200;
let xx = 20;

function draw() {
  background(255);
  smooth();
  fill(0, 0, 0);
  textFont("Courier");
  textSize(12);

  // beginShape();
  // vertex(windowWidth / 9, windowHeight / 9);
  // vertex(windowWidth / 9, (windowHeight * 8) / 9);
  // vertex((windowWidth * 8) / 9, (windowHeight * 8) / 9);
  // vertex((windowWidth * 8) / 9, windowHeight / 9);
  // endShape(CLOSE);
  
  let x = 0;
  let targetX = 0;
  targetX = mouseX;
  let dx = targetX - x;
  x += dx * 0.01;

  let m = mover + x;
  textAlign(LEFT, BOTTOM);
  translate(windowWidth / 9 - over, windowHeight / 9);
  for (i = 0; i < s.length; i++) {
    var c = s.charAt(i);
    m = m % bottomleft;

    if (m < topleft) {
      xx = m;
      yy = n;
      push();
      translate(xx, yy);
      if (xx < 10) {
        rotate(map(xx, 0, 10, TAU * 0.75, TAU));
      } else {
        rotate(0);
      }
      text(c, 0, 0);
      pop();
      m = m + textWidth(c * 1.2);
    } else if (m <= topright) {
      xx = topleft;
      yy = m - topleft;
      push();
      translate(xx, yy - over);
      if (yy < 10) {
        rotate(map(yy, 0, 10, 0, PI / 2));
      } else {
        rotate(PI / 2);
      }
      text(c, 0, 0);
      m = m + textWidth(c * 1.2);
      pop();
    } else if (m <= bottomright) {
      yy = windowHeight * percent;
      let bottom = windowWidth * percent - (m - topright);
      xx = bottom;
      push();
      translate(xx + 2 * over, yy);
      if (xx < 10) {
        rotate(map(xx, 0, 10, (TWO_PI * 3) / 4, PI));
      } else if (xx > windowWidth * percent - 10) {
        rotate(map(xx, windowWidth * percent - 10, windowWidth * percent, PI, PI / 2));
      } else {
        rotate(PI);
      }
      text(c, 0, 0);
      m = m + textWidth(c * 1.2);
      pop();
    } else if (m <= bottomleft) {
      xx = 0;
      yy = windowHeight * percent - (m - bottomright);
      push();
      translate(xx + over, yy + over);
      rotate((TWO_PI * 3) / 4);
      text(c, 0, 0);
      m = m + textWidth(c * 1.2);
      pop();
    }

    //yy=n;
  }

  mover++;
  mover = mover % bottomleft;
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}