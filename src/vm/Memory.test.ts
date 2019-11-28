/*
 * Memory.test.ts
 * Defines unit tests for the Memory class
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
import { Memory } from './Memory';

//start of tests
describe('Memory', () => {
	//this test checks reading and writing bytes
	it('Read/write byte', () => {
		let mem = new Memory();
		expect(mem.peekByte(0x0000)).toBe(0);
		mem.pokeByte(0xFF, 0x0000);
		expect(mem.peekByte(0x0000)).toBe(0xFF);
	});

	//this test checks reading and writing words
	it('Read/write word', () => {
		let mem = new Memory();
		expect(mem.peekWord(0x0000)).toBe(0x0000);
		mem.pokeWord(0xFC0A, 0x0000);
		expect(mem.peekWord(0x0000)).toBe(0xFC0A);
	});
});


//end of tests
