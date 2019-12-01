/*
 * Buzzer.ts
 * Defines a class that represents a buzzer
 * Created on 11/28/2019
 * Created by Andrew Davis
 *
 * Copyright (C) 2019  Andrew Davis
 *
 * This program is free software: you can redistribute it and/or modify   
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

//no imports

/**
 * Generates a tone for the [[SoundTimer]]
 */
export class Buzzer {
	//fields
	/**
	 * The audio context for playing sounds
	 */
	private _ctxt: AudioContext;

	/**
	 * Is the tone currently playing?
	 */
	private _playing: boolean;

	/**
	 * The oscillator for playing sounds
	 */
	private _osc: OscillatorNode;

	/**
	 * The gain for the oscillator
	 */
	private _gain: GainNode;

	//methods
	
	/**
	 * Constructs a new `Buzzer` instance
	 */
	constructor() {
		//init the fields
		this._ctxt = new AudioContext();
		this._playing = false;
		this._osc = this._ctxt.createOscillator();
		this._gain = this._ctxt.createGain();

		//and set up audio
		this._osc.connect(this._gain);
		this._osc.frequency.value = 520;
		this._osc.type = 'square';
		this._gain.connect(this._ctxt.destination);
		this._gain.gain.value = 0.5;
	}

	/**
	 * Gets whether the `Buzzer` is playing
	 *
	 * @returns Whether the `Buzzer` is playing
	 */
	public get playing(): boolean {
		return this._playing;
	}

	/**
	 * Starts playing a tone
	 */
	public start(): void {
		if(!this._playing) {
			this._osc.start(this._ctxt.currentTime);
			this._playing = true;
		}
	}

	/**
	 * Stops playing a tone
	 */
	public stop(): void {
		if(this._playing) {
			this._osc.stop(this._ctxt.currentTime);
			this._playing = false;
			this.refreshContext();
		}
	}

	/**
	 * Refreshes the context
	 */
	private refreshContext(): void {
		this._osc = this._ctxt.createOscillator();
		this._gain = this._ctxt.createGain();

		//and set up audio
		this._osc.connect(this._gain);
		this._osc.frequency.value = 520;
		this._osc.type = 'square';
		this._gain.connect(this._ctxt.destination);
		this._gain.gain.value = 0.5;
	}
}

//end of file
