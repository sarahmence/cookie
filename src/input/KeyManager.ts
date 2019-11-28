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

	/**
	 * Lambda that waits for a keypress
	 */
	private _readKey: Function;

	//methods
	
	/**
	 * Constructs a new `KeyManager` instance
	 */
	constructor() {
		//create the key array
		this._keys = new Array<Key>();

		//initialize it
		for(let c = Keycode.K1; c <= Keycode.KV; c++) {
			this._keys.push(new Key(c));
		}

		//initialize the keypress handler
		this._readKey = () => new Promise(resolve =>
			window.addEventListener('keypress', resolve,
				{once: true}));

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
	 * Waits for a keypress and returns the pressed key's `Keycode`
	 *
	 * @returns The pressed key's `Keycode`, wrapped in a `Promise`
	 */
	public async getKey(): Promise<Keycode | null> {
		//clear the key states
		this.clearStates();

		//await a keypress
		let code = await this._readKey();

		//convert the input character to a keycode
		let str = String.fromCharCode(code.which).toLowerCase();
		let kc = KeyManager.codeForChar(str);

		//update the key states
		if(kc) {
			this._keys[kc].press();
		}

		//and return the key
		return kc;
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
	 * Registers keypress callbacks
	 */
	private registerCallbacks(): void {
		let that = this;
		window.addEventListener('keydown',
					that.keydown.bind(that), false);
		window.addEventListener('keyup',
					that.keyup.bind(that), false);
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
		if(key) {
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
		if(key) {
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
				ret = Keycode.K4;
				break;
			}
			case 'q': {
				ret = Keycode.KQ;
				break;
			}
			case 'w': {
				ret = Keycode.KW;
				break;
			}
			case 'e': {
				ret = Keycode.KE;
				break;
			}
			case 'r': {
				ret = Keycode.KR;
				break;
			}
			case 'a': {
				ret = Keycode.KA;
				break;
			}
			case 's': {
				ret = Keycode.KS;
				break;
			}
			case 'd': {
				ret = Keycode.KD;
				break;
			}
			case 'f': {
				ret = Keycode.KF;
				break;
			}
			case 'z': {
				ret = Keycode.KZ;
				break;
			}
			case 'x': {
				ret = Keycode.KX;
				break;
			}
			case 'c': {
				ret = Keycode.KC;
				break;
			}
			case 'v': {
				ret = Keycode.KV;
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
