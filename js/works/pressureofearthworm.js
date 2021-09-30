//  * Copyright: Park Jeong Gyeon, 2021-08-01
//  * Published under the Creative Commons license NonCommercial 4.0.
//  * Check CC-Attribut-NonCommercial for more information at https://creativecommons.org/licenses/by-nc/4.0/

x = y = s = 300;
f = 0;
draw = (_) => {
  f ||
    createCanvas((w = 2000), windowHeight) +
      background(255) +
      colorMode(RGB, 99) +
      (c = random() * 99);
  r = 300;
  while (r--) {
    stroke((c + (r % 20)) % 99, r % 99, w);
    circle(x, y, 0.3);
    t = noise(x / w, y / w, (f = 1) / w) * TAU;
    x += cos(t);
    y += sin(t);
    if (x < 0 || x > w || y < 0 || y > w) {
      x = random() * w;
      y = random() * w;
    }
  }
};
