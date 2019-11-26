/*
 * Frame.test.ts
 * Defines unit tests for the Frame class
 * Created on 11/26/2019
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
import { Frame } from './Frame';
import { PixelValue } from './PixelValue';
import { Constants } from '../util/Constants';

//start of tests
describe('Frame', () => {
	//this test checks reading and toggling pixel values
	it('Read and toggle pixel values', () => {
		let frame = new Frame();
		expect(frame.valueAtCoords(0, 0)).toBe(PixelValue.OFF);
		expect(frame.toggleAtCoords(0, 0)).toBeFalsy();
		expect(frame.valueAtCoords(0, 0)).toBe(PixelValue.ON);
		expect(frame.toggleAtCoords(0, 0)).toBeTruthy();
		expect(frame.valueAtCoords(0, 0)).toBe(PixelValue.OFF);
	});

	//this test checks out of bounds reading
	it('Out of bounds read', () => {
		let frame = new Frame();
		expect(frame.valueAtCoords(-1, -3)).toBe(PixelValue.OFF);
		expect(frame.valueAtCoords(Constants.WIN_WIDTH,
						Constants.WIN_HEIGHT))
					.toBe(PixelValue.OFF);
	});

	//this test checks out of bounds toggling
	it('Out of bounds toggle', () => {
		let frame = new Frame();
		expect(frame.toggleAtCoords(-1, -3)).toBeFalsy();
		expect(frame.toggleAtCoords(Constants.WIN_WIDTH,
						Constants.WIN_HEIGHT))
					.toBeFalsy();
	});

	//this test checks clearing the frame
	it('Clear frame', () => {
		let frame = new Frame();
		frame.toggleAtCoords(0, 0);
		frame.toggleAtCoords(1, 1);
		expect(frame.valueAtCoords(0, 0)).toBe(PixelValue.ON);
		expect(frame.valueAtCoords(1, 1)).toBe(PixelValue.ON);
		frame.clear();
		expect(frame.valueAtCoords(0, 0)).toBe(PixelValue.OFF);
		expect(frame.valueAtCoords(1, 1)).toBe(PixelValue.OFF);
	});
});


//end of tests
