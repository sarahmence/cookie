/*
 * KeyManager.ts
 * Defines a class that manages input keys
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
import { Key } from './Key';
import { Keycode } from './Keycode';
import { KeyState } from './KeyState';

/**
 * Manages input keys
 */
export class KeyManager {
	//fields
	/**
	 * The managed `Key`s
	 */
	private _keys: Key[];

	//methods
	
	/**
	 * Constructs a new `KeyManager` instance
	 */
	constructor() {
		//create the key array
		this._keys = new Array<Key>();

		//initialize it
		for(let c = Keycode.K0; c <= Keycode.KF; c++) {
			this._keys.push(new Key(c));
		}

		//and register keypress callbacks
		this.registerCallbacks();
	}
	
	/**
	 * Returns the state of the key associated with a [[Keycode]]
	 *
	 * @param code The `Keycode` to access the state for
	 *
	 * @returns The state of the requested `Key`
	 */
	public stateForKey(code: Keycode): KeyState {
		return this._keys[code].state;
	}

	/**
	 * Resets the state of the `Key` associated with a [[Keycode]]
	 *
	 * @param code The `Keycode` to reset the state for
	 */
	public resetKey(code: Keycode): void {
		this._keys[code].release();
	}

	/**
	 * Clears the states of all managed keys
	 */
	public clearStates(): void {
		for(let i = 0x0; i <= 0xF; i++) {
			this._keys[i].release();
		}
	}

	/**
	 * Checks to see if any keys are down
	 *
	 * @returns Whether any keys are down
	 */
	public keysAreDown(): boolean {
		for(let i = 0; i < this._keys.length; i++) {
			if(this._keys[i].state === KeyState.DOWN) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Registers keypress callbacks
	 */
	private registerCallbacks(): void {
		window.addEventListener('keydown',
					this.keydown.bind(this), false);
		window.addEventListener('keyup',
					this.keyup.bind(this), false);
	}

	/**
	 * Handles keydown events
	 *
	 * @param event The event to handle
	 */
	private keydown(event: KeyboardEvent): void {
		//get the character from the event
		let kc = String.fromCharCode(event.which).toLowerCase();

		//get the keycode from the string
		let key = KeyManager.codeForChar(kc);

		//and press the corresponding key
		if(key !== null) {
			this._keys[key].press();
		}
	}

	/**
	 * Handles keyup events
	 *
	 * @param event The event to handle
	 */
	private keyup(event: KeyboardEvent): void {
		//get the character string from the event
		let kc = String.fromCharCode(event.which).toLowerCase();

		//get the keycode from the string
		let key = KeyManager.codeForChar(kc);

		//and release the corresponding key
		if(key !== null) {
			this._keys[key].release();
		}
	}

	/**
	 * Converts a key character to a [[Keycode]] value
	 *
	 * @param kc The key character to convert
	 *
	 * @returns The `Keycode` for the given key character
	 */
	private static codeForChar(kc: string): Keycode | null {
		//calculate the keycode from the string
		let ret: Keycode | null = null;
		switch(kc) {
			case '1': {
				ret = Keycode.K1;
				break;
			}
			case '2': {
				ret = Keycode.K2;
				break;
			}
			case '3': {
				ret = Keycode.K3;
				break;
			}
			case '4': {
				ret = Keycode.KC;
				break;
			}
			case 'q': {
				ret = Keycode.K4;
				break;
			}
			case 'w': {
				ret = Keycode.K5;
				break;
			}
			case 'e': {
				ret = Keycode.K6;
				break;
			}
			case 'r': {
				ret = Keycode.KD;
				break;
			}
			case 'a': {
				ret = Keycode.K7;
				break;
			}
			case 's': {
				ret = Keycode.K8;
				break;
			}
			case 'd': {
				ret = Keycode.K9;
				break;
			}
			case 'f': {
				ret = Keycode.KE;
				break;
			}
			case 'z': {
				ret = Keycode.KA;
				break;
			}
			case 'x': {
				ret = Keycode.K0;
				break;
			}
			case 'c': {
				ret = Keycode.KB;
				break;
			}
			case 'v': {
				ret = Keycode.KF;
				break;
			}
			default: {
				break;
			}
		}

		//and return the derived keycode
		return ret;
	}
}

//end of file
