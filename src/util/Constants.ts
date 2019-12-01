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

/**
 * Manages constants for the app
 */
export class Constants {
	/**
	 * The size of a side of an emulator pixel
	 */
	public static readonly PIXEL_DIM: number = 16;
	
	/**
	 * The width of the window in emulator pixels
	 */
	public static readonly WIN_WIDTH: number = 64;
	
	/**
	 * The height of the window in emulator pixels
	 */
	public static readonly WIN_HEIGHT: number = 32;

	/**
	 * The address of the start of font memory
	 */
	public static readonly FNT_START: number = 0x050;

	/**
	 * The address of the end of font memory
	 */
	public static readonly FNT_END: number = 0x0A0;

	/**
	 * The address of the start of program memory
	 */
	public static readonly PROG_START: number = 0x200;

	/**
	 * The number of total bytes available to the emulator
	 */
	public static readonly MEM_SIZE: number = 0x1000;
}


//end of file
