
let beat = 0;


function makeSynths(count) {
    const synths = [];
    for (let i=0; i < count; i++) {
        let synth =  new Tone.Synth({ oscillator: {type: "square8"} }).toDestination();
        synths.push(synth);
    }
    return synths;
};

const cMajor = Tonal.Scale.get("C major").notes;
function makeGrid(notes) {
    const rows = [];
    for (const note of notes) {
        const row = [];
        for (i=0; i<8;i++){
            row.push({ 
                note: note,
                isActive: false
            })
        }
        rows.push(row);
    }
    return rows;
}

const grid = makeGrid();