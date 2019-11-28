/*
 * Program.ts
 * Defines a class that represents a Chip-8 program
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

//import
import * as fs from 'fs';

/**
 * A loaded Chip-8 program
 */
export class Program {
	//fields
	/**
	 * The loaded program code
	 */
	private _code: number[];

	/**
	 * The number of bytes in the program
	 */
	private _length: number;

	/**
	 * The path to the ROM file
	 */
	private _path: string;

	//methods
	
	/**
	 * Constructs a new `Program` instance
	 *
	 * @param path The path to the binary ROM file
	 */
	constructor(path: string) {
		//read the file
		let fileData = fs.readFileSync(path).toString('hex');

		//allocate the code array
		this._code = new Array<number>();

		//load the file data into the code array
		for(let i = 0; i < fileData.length; i += 2) {
			let curByte = '0x' + fileData[i]+''+fileData[i+1];
			this._code.push(parseInt(curByte, 16));
		}

		//initialize the path field
		this._path = path;

		//and initialize the length field
		this._length = this._code.length;
	}

	/**
	 * Gets the length of the program
	 *
	 * @returns The length of the program in bytes
	 */
	public get length(): number {
		return this._length;
	}

	/**
	 * Gets the path to the ROM file
	 *
	 * @returns The path to the ROM file
	 */
	public get path(): string {
		return this._path;
	}

	/**
	 * Gets the byte at a given offset into the program
	 *
	 * @param offset The offset of the desired byte
	 *
	 * @returns The byte at the offset, or `null` if out of bounds
	 */
	public byteAtOffset(offset: number): number | null {
		//validate the offset
		if(offset >= this._length) {
			return null;
		} else {
			return this._code[offset];
		}
	}
}

//end of file
