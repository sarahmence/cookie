/*
 * Register.test.ts
 * Defines unit tests for the Register class
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
import { Register } from './Register';
import { RegisterID } from './RegisterID';

//start of tests
describe('Register', () => {
	//this test checks that a Register starts with a value of 0
	it('Initial value is zero', () => {
		let reg = new Register(RegisterID.V0);
		expect(reg.value).toBe(0x00);
	});

	//this test checks that a Register instance masks its value
	it('Value is masked on read/write', () => {
		let reg = new Register(RegisterID.V0);
		reg.value = 0xFFFF;
		expect(reg.value).toBe(0xFF);
	});

	//this test checks the equalsRegister method
	it('Register-to-register comparison works', () => {
		let r1 = new Register(RegisterID.V0);
		let r2 = new Register(RegisterID.V1);
		r1.value = 0x34;
		expect(r1.equalsRegister(r2)).toBeFalsy();
		expect(r2.equalsRegister(r1)).toBeFalsy();
		expect(r1.equalsRegister(r1)).toBeTruthy();
		r2.value = 0x34;
		expect(r1.equalsRegister(r2)).toBeTruthy();
		expect(r2.equalsRegister(r1)).toBeTruthy();
	});

	//this test checks the equalsValue method
	it('Register-to-value comparison works', () => {
		let reg = new Register(RegisterID.V0);
		const val = 0x22;
		expect(reg.equalsValue(val)).toBeFalsy();
		reg.value = val;
		expect(reg.equalsValue(val)).toBeTruthy();
	});

	//this test checks that value comparisons are
	//limited to checking the first byte only
	it('Register-to-value comparison masks value', () => {
		let reg = new Register(RegisterID.V0);
		const val = 0xFF00;
		expect(reg.equalsValue(val)).toBeTruthy();
	});
});


//end of tests
