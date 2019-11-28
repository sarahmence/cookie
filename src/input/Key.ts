/*
 * Key.ts
 * Defines a class that represents an input key
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
import { Keycode } from './Keycode';
import { KeyState } from './KeyState';

/**
 * An input key
 */
export class Key {
	//fields
	/**
	 * The [[Keycode]] associated with the `Key`
	 */
	private _code: Keycode;

	/**
	 * The state of the `Key`
	 */
	private _state: KeyState;

	//methods
	
	/**
	 * Constructs a new `Key` instance
	 *
	 * @param code The `Keycode` associated with the `Key`
	 */
	constructor(code: Keycode) {
		this._code = code;
		this._state = KeyState.UP;
	}

	/**
	 * Gets the keycode for the `Key`
	 *
	 * @returns The keycode for the `Key`
	 */
	public get code(): Keycode {
		return this._code;
	}

	/**
	 * Gets the state of the `Key`
	 *
	 * @returns The state of the `Key`
	 */
	public get state(): KeyState {
		return this._state;
	}

	/**
	 * Puts the `Key` into a pressed state
	 */
	public press(): void {
		this._state = KeyState.DOWN;
	}

	/**
	 * Puts the `Key` into a released state
	 */
	public release(): void {
		this._state = KeyState.UP;
	}
}

//end of file
