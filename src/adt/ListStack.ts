/*
 * ListStack.ts
 * Defines a linked-list implementation of the Stack ADT
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

//import
import { Stack } from './Stack';

/**
 * A linked-list implementation of a [[Stack]]
 */
export class ListStack<T> implements Stack<T> {
	//fields
	/**
	 * The top of the `ListStack`
	 */
	private _top: ListNode<T> | null;

	/**
	 * The size of the `ListStack`
	 */
	private _size: number;

	//methods
	
	/**
	 * Constructs a new `ListStack` instance
	 */
	constructor() {
		this._top = null;
		this._size = 0;
	}

	/**
	 * Gets the size of the stack
	 *
	 * @returns The size of the stack
	 */
	public get size(): number {
		return this._size;
	}

	/**
	 * Adds a value to the top of the stack
	 *
	 * @param val The value to add
	 *
	 * @returns Whether the value was added successfully
	 */
	public push(val: T): boolean {
		//add the value to the stack
		this._top = new ListNode<T>(val, this._top);

		//increment the size
		this._size++;

		//and return a success
		return true;
	}

	/**
	 * Removes the value on top of the stack
	 *
	 * @returns The removed value, or `null` if the stack is empty
	 */
	public pop(): T | null {
		//make sure the stack isn't empty
		if(this.isEmpty()) {
			return null;
		}

		//handle a stack with one entry
		if(this._size === 1) {
			//get the top item
			let ret = this.peek();

			//remove the top element
			this._top = null;

			//decrement the size
			this._size--;

			//and return the former top item
			return ret;
		}

		//if control reaches here, then the stack
		//has more than one entry
		
		//get the item at the top of the stack
		let ret = this.peek();

		//remove the top node
		this._top = this._top.next;

		//decrement the size
		this._size--;

		//and return the former top item
		return ret;
	}

	/**
	 * Clears the stack
	 */
	public clear(): void {
		//loop and clear the stack
		while(!this.isEmpty()) {
			this.pop();
		}
	}

	/**
	 * Returns the item on top of the stack
	 *
	 * @returns The top item, or `null` if the stack is empty
	 */
	public peek(): T | null {
		if(this.isEmpty()) {
			return null;
		} else {
			return this._top!.value;
		}
	}

	/**
	 * Returns whether the stack is empty
	 *
	 * @returns Whether the stack is empty
	 */
	public isEmpty(): boolean {
		return this._top === null;
	}
}

/**
 * A node in a linked list
 */
class ListNode<T> {
	//fields
	/**
	 * The value of the node
	 */
	private _value: T;

	/**
	 * The next node in the list
	 */
	private _next: ListNode<T> | null;

	//methods
	
	/**
	 * Constructs a new `ListNode` instance
	 *
	 * @param val The value of the node
	 * @param next The next node in the list
	 */
	constructor(val: T, next: ListNode<T> | null) {
		this._value = val;
		this._next = next;
	}

	/**
	 * Gets the value of the `ListNode`
	 *
	 * @returns The value of the node
	 */
	public get value(): T {
		return this._value;
	}

	/**
	 * Gets the next node in the list
	 *
	 * @returns The next node in the list, or `null` if at the end
	 */
	public get next(): ListNode<T> | null {
		return this._next;
	}
}

//end of file
