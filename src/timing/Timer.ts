/*
 * Timer.ts
 * Defines an abstract class that represents a timer
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
 * A timing device
 */
export abstract class Timer {
	//fields
	/**
	 * The current value of the `Timer`
	 */
	protected _ticks: number;

	/**
	 * The ID of the timing interval
	 */
	protected _interval: number | null;

	//methods
	
	/**
	 * Constructs a new `Timer` instance
	 */
	constructor() {
		this._ticks = 0;
		this._interval = null;
	}

	/**
	 * Gets the number of ticks until the `Timer` reaches zero
	 *
	 * @returns The tick value of the `Timer`
	 */
	public get ticks(): number {
		return this._ticks;
	}

	/**
	 * Sets the tick value of the `Timer`.
	 * Doing this with a value greater than 0
	 * will start the timer.
	 *
	 * @param time The number of ticks to set the timer to
	 */
	public set ticks(time: number) {
		//validate the time
		if(time <= 0) {
			return;
		}

		//update the ticks
		this._ticks = time;

		//clear the current interval if there is one
		if(this._interval !== null) {
			window.clearInterval(this._interval);
			this._interval = null;
		}

		//and set the interval
		let that = this;
		this._interval = window.setInterval(
					that.onTick.bind(that), 17);
	}

	/**
	 * Called when the `Timer` ticks
	 */
	protected abstract onTick(): void;
}

//end of file
