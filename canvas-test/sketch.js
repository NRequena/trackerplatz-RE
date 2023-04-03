console.clear();
console.log('CANVAS ELEMENT');
console.log(Tone);
console.log(Tonal);

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  text('WE ARE GOING', width / 2, height / 2);
}
