/*
 * Renderer.tsx
 * Defines a class that represents a graphics renderer
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

//imports
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import App from '../app/App';
import { Frame } from './Frame';
import { PixelValue } from './PixelValue';

/**
 * A graphics renderer
 */
export class Renderer {
	//fields
	/**
	 * The current [[Frame]] being drawn
	 */
	private _curFrame: Frame;

	/**
	 * Has the rendering target been updated?
	 */
	private _wasUpdated: boolean;

	//methods

	/**
	 * Constructs a new `Renderer` instance
	 */
	constructor() {
		this._curFrame = new Frame();
		this._wasUpdated = false;
	}

	/**
	 * Toggles the pixel at given coordinates on the screen
	 *
	 * @param x The column the target pixel is on
	 * @param y The row the target pixel is on
	 *
	 * @returns Whether the pixel was on and was then turned off
	 */
	public toggleAtCoords(x: number, y: number): boolean {
		this._wasUpdated = true;
		return this._curFrame.toggleAtCoords(x, y);
	}

	//TODO: Add method for drawing sprites

	/**
	 * Clears the screen
	 */
	public clearScreen(): void {
		this._wasUpdated = true;
		this._curFrame.clear();
	}

	/**
	 * Updates the rendering target
	 */
	public update(): void {
		//make sure the target was updated
		if(!this._wasUpdated) {
			return;
		}

		//render the app screen
		ReactDOM.render(<App frame={this._curFrame} />,
				document.getElementById('root'));

		//and clear the update flag
		this._wasUpdated = false;
	}
}

//end of file
