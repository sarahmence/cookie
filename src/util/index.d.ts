/*
 * index.d.ts
 * TypeScript definitions file for the Constants class
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

//module declaration
declare module 'Constants' {
	/**
	 * Manages constants for the app
	 */
	class Constants {
		/**
		 * The size of a side of an emulator pixel
		 */
		static readonly PIXEL_DIM: number;

		/**
		 * The width of the window in emulator pixels
		 */
		static readonly WIN_WIDTH: number;

		/**
		 * The height of the window in emulator pixels
		 */
		static readonly WIN_HEIGHT: number;
	}

	//export the class
	export = Constants;
}

//end of file
