const levels = 
{ 1: 
    { 
        htmlString : `
            <button id="playPause">Play</button>
            <button id="clarify"> Clarify </button> 
            <button id="confront"> Confront </button>
            <button id="assess"> Assess </button>
            `,
        loops : [
            {notes: [
                ["C2", "8n", "+0:0:0"],
                ["E2", "8n", "+0:0:2"],
                ["G2", "8n", "+0:1:0"],
                ["A2", "8n", "+0:1:2"],
                ["F2", "8n", "+0:2:0"],
                ["G2", "8n", "+0:2:2"],
                ["F2", "8n", "+0:3:0"],
                ["E2", "8n", "+0:3:2"],
            ],
            duration: "1:0:0",
            synth: "FMSynth"},
            {notes: [
                ["G3", "2n", "+0:0:0"],
                ["F3", "4n", "+0:2:0"],
                ["E3", "4n", "+0:3:0"],
            ],
            duration: "1:0:0",
            synth: 'AMSynth'},
            {notes: [
                ["4n", "+0:0:0"],
                ["4n", "+0:1:2"]
            ],
            duration: "1:0:0",
            synth: 'NoiseSynth'}
        ]
    }
}
export {levels};