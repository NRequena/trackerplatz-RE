import './style.css';
console.clear();
console.log('trackerplatz');

/* --------------TODO--------------------
  - 
  - Stablish the Core Base Loop
  - Clickable checkmarks sequencer with layers of music
  - Play sequences at a quarter note
  - Looped samples
  - Markov chain for Harmony
  - Markov chain for Melody
  -
  -  
--------------------------------------- */

const playButton = document.getElementById('play-button');
const pauseButton = document.getElementById('pause-button');
const audioPlayer = document.getElementById('audio-player');

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

const bpm = 104;
const timeSignature = [9, 8];
const now = Tone.now();
const wave = new Tone.Waveform();
const synth = new Tone.Synth({
  oscillator: {
    type: 'sine',
  },
  envelope: {
    attack: 1,
    decay: 0.5,
    sustain: 1,
    release: 1,
  },
});
const filter = new Tone.Filter(400, 'lowpass');

function playSample(sample) {
  sample.pause();
  sample.currentTime = 0; // set the current time to the beginning
  sample.play();
}

//TimeLog in EightNotes. 9 per Bar
const timeLoop = new Tone.Loop((time) => {
  console.log(time);
}, '8n');

//Downbeat of every bar
const loop = new Tone.Loop(synthLoop, '4m');
function synthLoop(time) {
  console.log('TUUM');
  synth.triggerAttackRelease('C#2', '3m', time);
}

const seq = new Tone.Sequence(
  (time, note) => {
    synth.triggerAttackRelease(note, '1n', time);
    console.log(note);
    // subdivisions are given as subarrays
  },
  ['C#2', 'B1', 'A1', 'B1', 'G#1']
);

const gainNode = new Tone.Gain(0.2);

/* CONNECTIONS */
synth.connect(filter);
filter.connect(gainNode);
gainNode.toDestination();

/* LOOPS*/
timeLoop.start(0);
seq.start(0);
//loop.start(0);

/* TRANSPORT */
Tone.Transport.bpm.value = bpm;
Tone.Transport.timeSignature = timeSignature;
