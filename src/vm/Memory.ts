/*
 * Memory.ts
 * Defines a class that represents emulator RAM
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
import { Constants } from '../util/Constants';
import { Sprite } from '../gfx/Sprite';

/**
 * Manages emulator RAM
 */
export class Memory {
	//field
	/**
	 * The actual memory array
	 */
	private _data: number[];

	//methods
	
	/**
	 * Constructs a new `Memory` instance
	 */
	constructor() {
		//allocate the data
		this._data = new Array<number>();

		//load it with zeroes
		for(let i = 0; i < Constants.MEM_SIZE; i++) {
			this._data.push(0x00);
		}

		//and initialize font ROM
		this.initFont();
	}

	/**
	 * Reads the byte at a given memory address
	 *
	 * @param addr The address to read from
	 *
	 * @returns The byte at the given address
	 */
	public peekByte(addr: number): number {
		return this._data[addr & 0x0FFF] & 0xFF;
	}

	/**
	 * Writes the byte at a given memory address
	 *
	 * @param val The byte to write
	 * @param addr The address to write to
	 */
	public pokeByte(val: number, addr: number): void {
		this._data[addr & 0x0FFF] = (val & 0xFF);
	}

	/**
	 * Reads the word at a given memory address
	 *
	 * @param addr The address to read from
	 *
	 * @returns The word at the given address
	 */
	public peekWord(addr: number): number {
		//get the individual bytes
		let msb = this.peekByte(addr);
		let lsb = this.peekByte(addr + 1);

		//merge them
		let ret = ((msb << 8) | lsb) & 0xFFFF;

		//and return the result
		return ret;
	}

	/**
	 * Writes the word at a given memory address
	 *
	 * @param word The word to write
	 * @param addr The address to write to
	 */
	public pokeWord(word: number, addr: number): void {
		//mask the word to simulate a 16-bit value
		let maskedWord = word & 0xFFFF;

		//split the word into two bytes
		let lsb = maskedWord & 0xFF;
		let msb = maskedWord >> 8;

		//and store the bytes into memory
		this.pokeByte(msb, addr);
		this.pokeByte(lsb, addr + 1);
	}

	/**
	 * Retrieves a [[Sprite]] from memory
	 * with a given height
	 *
	 * @param addr The address of the first byte of the `Sprite`
	 * @param height The height of the `Sprite` (in pixels)
	 *
	 * @returns The sprite described by the arguments
	 */
	public getSprite(addr: number, height: number): Sprite {
		//create an array to hold the sprite data
		let sprData = new Array<number>();

		//loop and get the sprite data
		for(let i = 0; i < height; i++) {
			sprData.push(this.peekByte(addr + i));
		}

		//and return the retrieved sprite
		return new Sprite(sprData);
	}
	
	//TODO: Add method for loading a program
	
	/**
	 * Initializes font ROM
	 */
	private initFont(): void {
		//get the number of bytes in the font
		let fontSize = Constants.FNT_END - Constants.FNT_START;

		//create an array of the font symbols
		let font = [
			0xF0, 0x90, 0x90, 0x90, 0xF0, //0
			0x20, 0x60, 0x20, 0x20, 0x70, //1
			0xF0, 0x10, 0xF0, 0x80, 0xF0, //2
			0xF0, 0x10, 0xF0, 0x10, 0xF0, //3
			0x90, 0x90, 0xF0, 0x10, 0x10, //4
			0xF0, 0x80, 0xF0, 0x10, 0xF0, //5
			0xF0, 0x80, 0xF0, 0x90, 0xF0, //6
			0xF0, 0x10, 0x20, 0x40, 0x40, //7
			0xF0, 0x90, 0xF0, 0x90, 0xF0, //8
			0xF0, 0x90, 0xF0, 0x10, 0xF0, //9
			0xF0, 0x90, 0xF0, 0x90, 0x90, //A
			0xE0, 0x90, 0xE0, 0x90, 0xE0, //B
			0xF0, 0x80, 0x80, 0x80, 0xF0, //C
			0xE0, 0x90, 0x90, 0x90, 0xE0, //D
			0xF0, 0x80, 0xF0, 0x80, 0xF0, //E
			0xF0, 0x80, 0xF0, 0x80, 0x80  //F
		];

		//loop and load the fontset into memory
		for(let i = 0; i < fontSize; i++) {
			this.pokeByte(font[i], i + Constants.FNT_START);
		}
	}
}

//end of file
