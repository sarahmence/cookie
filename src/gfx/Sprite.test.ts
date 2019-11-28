/*
 * Sprite.test.ts
 * Defines unit tests for the Sprite class
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

//import
import { Sprite } from './Sprite';

//start of tests
describe('Sprite', () => {
	//this test checks getting the height of a sprite
	it('Height property', () => {
		let spr = new Sprite([0x20, 0x30, 0x55]);
		expect(spr.height).toEqual(3);
	});

	//this test checks getting set bits of a sprite
	it('isSetAt works', () => {
		let data = [0xF0, 0x90, 0x90, 0x90, 0xF0];
		let spr = new Sprite(data);
		expect(spr.isSetAt(0, 0)).toBeTruthy();
		expect(spr.isSetAt(4, 0)).toBeFalsy();
		expect(spr.isSetAt(1, 1)).toBeFalsy();
	});
});


//end of tests
