/*
 * Constants.js
 * Defines a class that manages constants
 * Created on 11/22/2019
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

//class definition
// @ts-ignore
class Constants {
	//the size of a side of an emulator pixel
	static get PIXEL_DIM() {
		return 16;
	}

	//the width of the window in emulator pixels
	static get WIN_WIDTH() {
		return 64;
	}

	//the height of the window in emulator pixels
	static get WIN_HEIGHT() {
		return 32;
	}

	//the address of the start of font memory
	static get FNT_START() {
		return 0x050;
	}

	//the address of the end of font memory
	static get FNT_END() {
		return 0x0A0;
	}

	//the address of the start of program memory
	static get PROG_START() {
		return 0x200;
	}

	//the number of total bytes available to the emulator
	static get MEM_SIZE() {
		return 0x1000;
	}
}

//export the class
exports.Constants = Constants;

//end of file
