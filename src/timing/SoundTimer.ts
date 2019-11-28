/*
 * SoundTimer.ts
 * Defines a class that represents a sound timer
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

//imports
import { Timer } from './Timer';
import { Buzzer } from './Buzzer';

/**
 * A sound timer
 */
export class SoundTimer extends Timer {
	//field
	/**
	 * Used to play sounds
	 */
	private _buzzer: Buzzer;

	//methods
	
	/**
	 * Constructs a new `SoundTimer` instance
	 */
	constructor() {
		super();
		this._buzzer = new Buzzer();
	}

	/**
	 * Called when the timer ticks
	 */
	protected onTick(): void {
		//check for the end of the timer
		if(this._ticks === 0 && this._interval) {
			window.clearInterval(this._interval);
			this._interval = null;
			this._buzzer.stop();
		} else {
			this._ticks--;
			this._buzzer.start();
		}
	}
}

//end of file
