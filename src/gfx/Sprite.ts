/*
 * Sprite.ts
 * Defines a class that represents a graphical sprite
 * Created on 11/27/2019
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
 * A graphical sprite
 */
export class Sprite {
	//fields
	/**
	 * The bytes that make up the `Sprite`
	 */
	private _data: number[];

	/**
	 * The height of the `Sprite` in pixels
	 */
	private _height: number;

	//methods
	
	/**
	 * Constructs a new `Sprite` instance
	 *
	 * @param data The binary sprite data
	 */
	constructor(data: number[]) {
		//allocate the data array
		this._data = new Array<number>();

		//loop and copy the data
		for(let i = 0; i < data.length; i++) {
			this._data.push(data[i] & 0xFF);
		}

		//and initialize the height field
		this._height = data.length;
	}

	/**
	 * Gets the height of the `Sprite`
	 *
	 * @returns The height of the `Sprite`
	 */
	public get height(): number {
		return this._height;
	}

	/**
	 * Determines whether the bit at a given
	 * position in the sprite is set
	 *
	 * @param x The column to check at
	 * @param y The row to check at
	 *
	 * @returns Whether the specified bit is set
	 */
	public isSetAt(x: number, y: number): boolean {
		//get the byte corresponding to the row
		let curByte = this._data[y];

		//flip the x-coord around so it
		//indexes from the right side,
		//making the math easier
		let xComp = 7 - x;

		//calculate whether the bit
		//corresponding to the x-coord is set
		let ret = ((curByte & (1 << xComp)) !== 0);

		//and return the result
		return ret;
	}
}

//end of file
