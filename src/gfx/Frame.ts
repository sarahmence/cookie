/*
 * Frame.ts
 * Defines a class that represents a rendering frame
 * Created on 11/26/2019
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
import { PixelValue } from './PixelValue';
import { Constants } from '../util/Constants';

/**
 * A rendering frame
 */
export class Frame {
	//field
	/**
	 * The pixels that make up the frame
	 */
	private _pixels: PixelValue[][];

	//methods
	
	/**
	 * Constructs a new `Frame` instance
	 */
	constructor() {
		//allocate the row array
		this._pixels = new Array<Array<PixelValue>>(
						Constants.WIN_WIDTH);

		//allocate the column arrays
		for(let x = 0; x < Constants.WIN_WIDTH; x++) {
			this._pixels[x] = new Array<PixelValue>(
						Constants.WIN_HEIGHT);
		}

		//and initialize the entire array
		for(let x = 0; x < Constants.WIN_WIDTH; x++) {
			for(let y = 0; y < Constants.WIN_HEIGHT; y++) {
				this._pixels[x][y] = PixelValue.OFF;
			}
		}
	}

	/**
	 * Gets the value of the pixel at given x and y coordinates
	 *
	 * @param x The x-coordinate to check
	 * @param y The y-coordinate to check
	 *
	 * @returns The value of the pixel at the given coordinates
	 */
	public valueAtCoords(x: number, y: number): PixelValue {
		//validate the coordinates
		if((x < 0) || (x >= Constants.WIN_WIDTH)) {
			return PixelValue.OFF;
		}
		if((y < 0) || (y >= Constants.WIN_HEIGHT)) {
			return PixelValue.OFF;
		}

		//and return the value
		return this._pixels[x][y];
	}

	/**
	 * Toggles the pixel at given coordinates
	 *
	 * @param x The x-coord of the pixel to toggle
	 * @param y The y-coord of the pixel to toggle
	 *
	 * @returns Whether the pixel was toggled from on to off
	 */
	public toggleAtCoords(x: number, y: number): boolean {
		//validate the coordinates
		if((x < 0) || (x >= Constants.WIN_WIDTH)) {
			return false;
		}
		if((y < 0) || (y >= Constants.WIN_HEIGHT)) {
			return false;
		}

		//and toggle the pixel
		if(this._pixels[x][y] == PixelValue.OFF) {
			this._pixels[x][y] = PixelValue.ON;
			return false;
		} else {
			this._pixels[x][y] = PixelValue.OFF;
			return true;
		}
	}

	/**
	 * Clears the `Frame`
	 */
	public clear(): void {
		//loop and turn off each pixel
		for(let x = 0; x < Constants.WIN_WIDTH; x++) {
			for(let y = 0; y < Constants.WIN_HEIGHT; y++) {
				this._pixels[x][y] = PixelValue.OFF;
			}
		}
	}
}

//end of file
