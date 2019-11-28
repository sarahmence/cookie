/*
 * chooseFile.ts
 * Defines a function that allows the user to select a ROM file
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
import { remote } from 'electron';

/**
 * Shows an open file dialog
 *
 * @returns The path to the chosen file , or `undefined` if not chosen
 */
export function chooseFile(): string | undefined {
	//define options for the open dialog
	const options = {
		title: 'Choose a ROM file',
		openFile: true,
		openDirectory: false,
		multiSelections: false,
		filters: [
			{name: 'Chip-8 ROMs', extensions: ['c8', 'C8']}
		]
	};

	//show the open dialog
	let paths = remote.dialog.showOpenDialogSync(options);

	//and return the chosen path
	if(paths === undefined) {
		return undefined;
	} else {
		return paths[0];
	}
}
