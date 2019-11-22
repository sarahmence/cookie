/*
 * ListStack.test.ts
 * Defines unit tests for the ListStack class
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
import { ListStack } from './ListStack';

//start of unit tests
describe('ListStack', () => {
	//this test checks pushing a value onto the stack
	it('ListStack::push() works properly', () => {
		let stack = new ListStack<string>();
		expect(stack.size).toEqual(0);
		stack.push('Hello');
		expect(stack.size).toEqual(1);
		expect(stack.peek()).toEqual('Hello');
		stack.push('World');
		expect(stack.size).toEqual(2);
		expect(stack.peek()).toEqual('World');
	});

	//this test checks popping a value off of the stack
	it('ListStack::pop() works properly', () => {
		let stack = new ListStack<string>();
		stack.push('Hello');
		stack.push('World');
		let val = stack.pop();
		expect(val).toEqual('World');
		val = stack.pop();
		expect(val).toEqual('Hello');
		val = stack.pop();
		expect(val).toBeNull();
	});

	//this test checks peeking at the top of the stack
	it('ListStack::peek() works properly', () => {
		let stack = new ListStack<string>();
		expect(stack.peek()).toBeNull();
		stack.push('hello');
		expect(stack.peek()).toBe('hello');
	});

	//this test checks the isEmpty() method
	it('ListStack::isEmpty() works properly', () => {
		let stack = new ListStack<string>();
		expect(stack.isEmpty()).toBeTruthy();
		stack.push('hello');
		expect(stack.isEmpty()).toBeFalsy();
		stack.pop();
		expect(stack.isEmpty()).toBeTruthy();
	});

	//this test checks the clear() method
	it('ListStack::clear() works properly', () => {
		let stack = new ListStack<string>();
		stack.push('Hello');
		stack.push('World');
		expect(stack.isEmpty()).toBeFalsy();
		stack.clear();
		expect(stack.isEmpty()).toBeTruthy();
	});
});

//end of tests
