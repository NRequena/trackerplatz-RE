console.log('trackerplatz');

/* --------------TODO--------------------
  - Get the main 9/8 "E" Sequence Looping correctly- DONE
  - Stablish the Core Base Loop - DONE
  - Sequencer with Checkboxes each checkbox enables a new Loop element (with certain parameters randomized)
  - Looped samples
  - Markov chain for Harmony
  - Markov chain for Melody
  - Export the Waveform from the MAIN js file to the Sketch JS file. HOW?
  - Randomize Note Intensity, Decay, Release and Sustain.
  - Add Swing, Humanity.
  - Add MagentaJS (Dunno how)
--------------------------------------- */

/*
SELECTABLE ELEMENTS FOR THE SEQUENCER:
- Base Note (E)
- Harmonic Base Notes (Pattern of Harmonic Notes)
- Kick Drum Pattern 1 (Pattern)
- Kick Drum Pattern 2 (Randomized Pattern with MagentaJS)
- Pad Synth Waves (Fixed Harmony)
- Bass Notes Long (Fixed Harmony)
- Delay Panned Response Melody Notes (Randomized Notes within the scale)
- Lament like Melody going down (Looped Lament in the scale)
- Melodic Sad Synth (Akai Sample)
- Rythmic Guitars with tons of distortion (Build Up)
- Final Striking Whimper, Hi String note. (Final Note.)
*/

/*
P5JS TO DO VISUALS:
- 
*/

const bpm = 104;
const timeSignature = [9, 8];
const now = Tone.now();
const mainWave = new Tone.Waveform();

//SYNTH DEFINITIONS
const synth = new Tone.Synth({
  oscillator: {
    type: 'triangle',
  },
  envelope: {
    attack: 0,
    decay: 0.2,
    sustain: 0.5,
    release: 0.2,
  },
});
const synth2 = new Tone.Synth({
  oscillator: {
    type: 'sine',
  },
  envelope: {
    attack: 0,
    decay: 0.2,
    sustain: 0.5,
    release: 0.2,
  },
});
const synthBass = new Tone.Synth({
  oscillator: {
    type: 'triangle',
  },
  envelope: {
    attack: 0.8,
    decay: 0.6,
    sustain: 0.6,
    release: 1,
  },
});
const metronome = new Tone.Synth({
  oscillator: {
    type: 'sine',
  },
  envelope: {
    attack: 0,
    decay: 0.1,
    sustain: 0.1,
    release: 0.1,
  },
});

const metronomeGain = new Tone.Gain(0.1).toDestination();
metronome.connect(metronomeGain);
const filter = new Tone.Filter(400, 'lowpass');
const gainNode = new Tone.Gain(0.2);

const metronomeLoop = new Tone.Loop((time) => {
  console.log(time);
  metronome.triggerAttackRelease('E4', '32n', time);
}, '8n');

//MAIN NOTE PATTERN ARRAY
function loopNotes(note) {
  const loopSequence = [note, null, note, null, null, note, null, note, null];
  return loopSequence;
}
const eLoop = new Tone.Sequence(
  (time, note) => {
    synth.triggerAttackRelease(note, '4n', time);
  },
  loopNotes('E3'),
  '8n'
  );
  const gSharpLoop = new Tone.Sequence(
  (time, note) => {
    synth2.triggerAttackRelease(note, '4n', time);
    console.log(note);
  },
  loopNotes('G#3'),
  '8n'
  );
  
  //Downbeat of every bar
const bassLoop = new Tone.Loop(synthLoop, '4m');
function synthLoop(time) {
  console.log('TUUM');
  synthBass.triggerAttackRelease('C#2', '3m', time);
}
const baseSeq = new Tone.Sequence(
  (time, note) => {
    synthBass.triggerAttackRelease(note, '3m', time);
  },
  ['C#2', 'B1', 'A1', 'B1', 'G#1'],
  '3m'
  );
  
/* CONNECTIONS */
synth.volume.value = -6;
synth2.volume.value = -8;
synthBass.volume.value = -3;
synth.connect(filter);
synth2.connect(filter);
synthBass.connect(filter);
filter.connect(gainNode);
gainNode.connect(mainWave);
gainNode.toDestination();

//EXPORT WAVEFORM FOR P5JS
function returnWave(w) {
  w = new Tone.Waveform();
  gainNode.connect(w);
  return w;
}

/* LOOPS*/
//metronomeLoop.start(0);
//seq.start(0);
//bassLoop.start(0);
//eLoop.start(now);
//gSharpLoop.start(0);
//baseSeq.start(0);

/* TRANSPORT */
Tone.Transport.bpm.value = bpm;
Tone.Transport.timeSignature = timeSignature;

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
    drawBuffer(mainWave,'white');
    //fill(255);
    //noStroke();
    //textAlign(CENTER, CENTER);
    //text('PLAYING NOW', width / 2, height / 2);
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