/*
 * Stack.ts
 * Defines an interface for the Stack ADT
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
 * A generic stack
 */
export interface Stack<T> {
	/**
	 * The size of the `Stack`
	 */
	size: number;

	/**
	 * Adds a value to the top of the `Stack`
	 *
	 * @param val The value to add
	 *
	 * @returns Whether the value was added successfully
	 */
	push(val: T): boolean;

	/**
	 * Removes the value on top of the `Stack`
	 *
	 * @returns The removed value or `null` if the `Stack` is empty
	 */
	pop(): T | null;

	/**
	 * Returns the value on top of the `Stack`
	 *
	 * @returns The value on top of the `Stack`, or `null` if empty
	 */
	peek(): T | null;

	/**
	 * Removes all items from the `Stack`
	 */
	clear(): void;

	/**
	 * Returns whether the `Stack` is empty
	 *
	 * @returns Whether the `Stack` is empty
	 */
	isEmpty(): boolean;
}

//end of file
