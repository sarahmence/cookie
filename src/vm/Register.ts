/*
 * Register.ts
 * Defines a class that represents a CPU register
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
import { RegisterID } from './RegisterID';

/**
 * A CPU register
 */
export class Register {
	//fields
	/**
	 * The ID of the `Register`
	 */
	private _id: RegisterID;

	/**
	 * The value of the `Register`
	 */
	private _value: number;

	/**
	 * Constructs a new `Register` instance
	 *
	 * @param id The ID of the `Register`
	 */
	constructor(id: RegisterID) {
		this._id = id;
		this._value = 0x00;
	}

	/**
	 * Gets the ID of the `Register`
	 *
	 * @returns The ID of the `Register`
	 */
	public get id(): RegisterID {
		return this._id;
	}

	/**
	 * Gets the value of the `Register`
	 *
	 * @returns The value of the `Register`
	 */
	public get value(): number {
		return this._value & 0xFF;
	}

	/**
	 * Sets the value of the `Register`
	 *
	 * @param val The new value of the `Register`
	 */
	public set value(val: number) {
		this._value = (val & 0xFF);
	}

	/**
	 * Compares two `Register`s for equality
	 *
	 * @param other The `Register` to compare against
	 *
	 * @returns Whether `this` and `other` are equivalent
	 */
	public equalsRegister(other: Register): boolean {
		return this._value === other._value;
	}

	/**
	 * Compares a register to a value
	 *
	 * @param val The value to compare against
	 *
	 * @returns Whether the value of `this` is equal to `val`
	 */
	public equalsValue(val: number): boolean {
		//mask the value
		let maskedVal = val & 0xFF;

		//and execute the comparison
		return this._value === maskedVal;
	}
}

//end of file
