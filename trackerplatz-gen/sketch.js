console.clear();
console.log('CANVAS ELEMENT');

let isPlaying;

function setup() {
  createCanvas(windowWidth, windowHeight);
  isPlaying = false;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function drawBuffer(wave, color) {
  stroke(color);
  let buffer = wave.getValue(0);
  //Look for point where samples go from negative to positive. Roots of the signal.
  let start = 0;
  for (let i = 1; i < buffer.length; i++) {
    if (buffer[i - 1] < 0 && buffer[i] >= 0) {
      start = i;
      break; // interrupts the for loop
    }
  }
  let end = start + buffer.length / 2;
  for (let i = start; i < end; i++) {
    let x1 = map(i - 1, start, end, 0, width);
    let y1 = map(buffer[i - 1], -1, 1, 0, height);

    let x2 = map(i, start, end, 0, width);
    let y2 = map(buffer[i], -1, 1, 0, height);
    line(x1, y1, x2, y2);
  }
}

function draw() {
  background(0);
  if (isPlaying) {
    //drawBuffer();
    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    text('PLAYING NOW', width / 2, height / 2);
  } else {
    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    text('trackerplatz:RE', width / 2, height / 2);
  }
}

function mousePressed() {
  if (!isPlaying) {
    console.log('Tone started');
    Tone.start();
    Tone.Transport.start();
    isPlaying = true;
  } else {
    console.log('Stop Transport');
    Tone.Transport.stop();
    isPlaying = false;
  }
}
