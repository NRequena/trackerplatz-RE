import './style.css';

console.log('trackerplatz');

/* --------------TODO--------------------
  - Get the main 9/8 "E" Sequence Looping correctly
  - Stablish the Core Base Loop
  - Sequencer with Checkboxes each checkbox enables a new Loop element (with certain parameters randomized)
  - Play sequences at a quarter note
  - Looped samples
  - Markov chain for Harmony
  - Markov chain for Melody
  - Export the Waveform from the MAIN js file to the Sketch JS file. HOW?
  - Randomize Note Intensity, Decay, Release and Sustain.
  - Add Swing, Humanity.
--------------------------------------- */

const playButton = document.getElementById('play-button');
const pauseButton = document.getElementById('pause-button');
const audioPlayer = document.getElementById('audio-player');
const bpm = 104;
const timeSignature = [9, 8];
//const now = Tone.now();
let wave;

//SYNTH DEFINITIONS
const synth = new Tone.Synth({
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

//PLAY AND STOP BUTTONS
playButton.addEventListener('click', () => {
  //audioPlayer.currentTime = 0; // set the current time to the beginning
  //audioPlayer.play();
  console.log('Tone started');
  Tone.start();
  Tone.Transport.start();
});
pauseButton.addEventListener('click', () => {
  //audioPlayer.pause();
  console.log('Stop Transport');
  Tone.Transport.stop();
});

function playSample(sample) {
  sample.pause();
  sample.currentTime = 0; // set the current time to the beginning
  sample.play();
}

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
eLoop.start(0);
//gSharpLoop.start(0);
//baseSeq.start(0);

/* TRANSPORT */
Tone.Transport.bpm.value = bpm;
Tone.Transport.timeSignature = timeSignature;
