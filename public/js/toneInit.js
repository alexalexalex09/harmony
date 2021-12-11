import { levels } from './levels.js';
//Tone is available from the html header (unpkg.com/tone)


document.querySelector('#startGame')?.addEventListener('click', async () => {
	console.log("Begin clicked");
	//user clicked, so start Tone
	await Tone.start();

	//load the level into the container, nothing changes as a side effect
	const level = loadLevel("1");
	document.querySelector("#container").innerHTML = level.html;


	//Tone has a global play/pause, it's not per synth
	//So add a play/pause that's global to Tone once the level's been loaded
	const playButton = document.querySelector("#playPause")
	try  {
		playButton.addEventListener('click', () => {
			Tone.Transport.toggle();
			console.log("Play/pause clicked: " + Tone.Transport.state)
		})
	} catch (error) {
		console.log(error)
	}
})

function loadLevel(level) {
	console.log("Loading level")
	//Get the loops from the level and load
	const loadedLoops = levels[level].loops.map((loop) => {
		return loadLoop(loop)
	});
	console.log({loadedLoops})
	//return the status of the loops and the html for displaying the play controls
	return	{
		html : levels[level].htmlString,
		loops : loadedLoops
	}

}
/*
const synthA = new Tone.FMSynth().toDestination();
const synthB = new Tone.AMSynth().toDestination();
//play a note every quarter-note
const loopA = new Tone.Loop(time => {
	synthA.triggerAttackRelease("C2", "8n", time);
}, "4n").start(0);
//play another note every off quarter-note, by starting it "8n"
const loopB = new Tone.Loop(time => {
	synthB.triggerAttackRelease("C4", "8n", time);
}, "4n").start("8n");
*/

function loadLoop(loop) {
	console.log("loading loop: " + loop.synth)
	//Tone is set globally, and so is available here
	if (loop.synth === "NoiseSynth" || loop.synth === "PluckSynth") {
		const lowPass = new Tone.Filter({
			frequency: 8000,
		  }).toMaster();
		  
		const whiteNoise = new Tone.NoiseSynth({
			volume: 5,
			noise: {
				type: 'white',
				playbackRate: 3,
			},
			envelope: {
				attack: 0.1,
				decay: 0.0,
				sustain: .1,
				release: 0.1,
			},
			}).connect(lowPass);
		const toneLoops = loop.notes.map((note) => {
				return new Tone.Loop((time) => {
				whiteNoise.triggerAttackRelease(note[0], note[1])
			}, loop.duration).start(0);
		});
		return toneLoops;
	} else {
		const synth = new Tone.PolySynth(getPolySynth(loop.synth)).toDestination();
		const toneLoops = loop.notes.map((note) => {
			//The act of instantiating a new Loop in the established global Tone
			//registers that loop such that it starts when the Tone starts. I can't
			//find a way to avoid this happening as a side effect.
			return new Tone.Loop((time) => {
					synth.triggerAttackRelease(note[0], note[1], note[2] === "time" ? time : note[2]);
			}, loop.duration).start(0);
		});
		console.log({toneLoops})
		return toneLoops
	}
}

//Returns a synth given a string
function getPolySynth(synthString) {
	switch (synthString) {
		case "AMSynth": return Tone.AMSynth; break;
		case "FMSynth": return Tone.FMSynth; break;
		case "MonoSynth": return Tone.MonoSynth; break;
		case "DuoSynth": return Tone.DuoSynth; break;
		case "MetalSynth": return Tone.MetalSynth; break;
		case "NoiseSynth": throw "Cannot use Monophonic synth here"; break;
		case "PluckSynth": throw "Cannot use Monophonic synth here"; break;
		return Tone.MonoSynth
	}
}

function getMonoSynth(synthString) {
	switch (synthString) {
		case "AMSynth": return Tone.AMSynth; break;
		case "FMSynth": return Tone.FMSynth; break;
		case "MonoSynth": return Tone.MonoSynth; break;
		case "DuoSynth": return Tone.DuoSynth; break;
		case "MetalSynth": return Tone.MetalSynth; break;
		case "NoiseSynth": return Tone.NoiseSynth; break;
		case "PluckSynth": return Tone.PluckSynth; break;
		return Tone.MonoSynth
	}
}