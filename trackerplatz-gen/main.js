import './style.css';

console.log('trackerplatz');

/* --------------TODO--------------------
  - Get the main 9/8 "E" Sequence Looping correctly
  - Stablish the Core Base Loop
  - Clickable checkmarks sequencer with layers of music
  - Play sequences at a quarter note
  - Looped samples
  - Markov chain for Harmony
  - Markov chain for Melody
  - Export the Waveform from the MAIN js file to the Sketch JS file. HOW?
--------------------------------------- */

const playButton = document.getElementById('play-button');
const pauseButton = document.getElementById('pause-button');
const audioPlayer = document.getElementById('audio-player');
const bpm = 104;
const timeSignature = [9, 8];
//const now = Tone.now();
let wave;
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

let loopNotes = ['E3', null, 'E3', null, null, 'E3', null, 'E3', null];
const noteSeq = new Tone.Sequence(
  (time, note) => {
    synth.triggerAttackRelease(note, '4n', time);
  },
  loopNotes,
  '8n'
);

/* CONNECTIONS */
synth.connect(filter);
filter.connect(gainNode);
gainNode.toDestination();

//EXPORT WAVEFORM FOR P5JS
function returnWave(w) {
  w = new Tone.Waveform();
  gainNode.connect(w);
  return w;
}

/* LOOPS*/
metronomeLoop.start(0);
//seq.start(0);
//loop.start(0);
noteSeq.start(0);

/* TRANSPORT */
Tone.Transport.bpm.value = bpm;
Tone.Transport.timeSignature = timeSignature;
