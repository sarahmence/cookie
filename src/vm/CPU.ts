/*
 * CPU.ts
 * Defines a class that represents a Chip-8 CPU
 * Created on 12/1/2019
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
import { Executor } from './Executor';
import { Register } from './Register';
import { Program } from './Program';
import { RegisterID } from './RegisterID';
import { Memory } from './Memory';
import { Stack } from '../adt/Stack';
import { ListStack } from '../adt/ListStack';
import { Renderer } from '../gfx/Renderer';
import { Sprite } from '../gfx/Sprite';
import { KeyManager } from '../input/KeyManager';
import { Keycode } from '../input/Keycode';
import { KeyState } from '../input/KeyState';
import { SoundTimer } from '../timing/SoundTimer';
import { DelayTimer } from '../timing/DelayTimer';
import { Constants } from '../util/Constants';
import { TSMap } from 'typescript-map';

/**
 * Executes Chip-8 bytecode
 */
export class CPU {
	//fields
	/**
	 * The processor registers
	 */
	private _regs: Register[];

	/**
	 * The program counter
	 */
	private _pc: number;

	/**
	 * The index register
	 */
	private _I: number;

	/**
	 * The CPU memory
	 */
	private _memory: Memory;

	/**
	 * The call stack
	 */
	private _stack: Stack<number>;

	/**
	 * The rendering device
	 */
	private _rend: Renderer;

	/**
	 * Manages input keys
	 */
	private _keyMgr: KeyManager;

	/**
	 * Used to play sound
	 */
	private _sndTimer: SoundTimer;

	/**
	 * Used to delay actions
	 */
	private _delayTimer: DelayTimer;

	/**
	 * The opcode dispatch table
	 */
	private _dispatchTable: TSMap<number, Executor>;

	/**
	 * Is the CPU currently blocked for an input event?
	 */
	private _blockedForInput: boolean;

	/**
	 * The current opcode being executed
	 */
	private _curOpcode: number;

	//methods
	
	/**
	 * Constructs a new `CPU` instance
	 *
	 * @param prog The `Program` to execute
	 */
	constructor(prog: Program) {
		//initialize the register array
		this._regs = new Array<Register>();
		for(let n = RegisterID.V0; n <= RegisterID.VF; n++) {
			this._regs.push(new Register(n));
		}

		//initialize the program counter
		this._pc = Constants.PROG_START;

		//initialize the index register
		this._I = 0x000;

		//initialize memory
		this._memory = new Memory();

		//initialize the stack
		this._stack = new ListStack<number>();

		//initialize the renderer
		this._rend = new Renderer();

		//initialize the key manager
		this._keyMgr = new KeyManager();

		//initialize the timers
		this._sndTimer = new SoundTimer();
		this._delayTimer = new DelayTimer();

		//initialize the dispatch table
		this._dispatchTable = new TSMap<number, Executor>();
		this.initDispatchTable();

		//initialize the block flag
		this._blockedForInput = false;

		//initialize the opcode
		this._curOpcode = 0x0000;

		//load the program
		let res = this._memory.loadProgram(prog);

		//and make sure the loading succeeded
		if(!res) {
			throw new Error('Failed to load ROM');
		}		
	}

	/**
	 * Emulates one processor cycle
	 */
	public emulateCycle(): void {
		if(!this.checkInputBlock()) {
			return;
		}

		//get the opcode
		this._curOpcode = this._memory.peekWord(this._pc);

		//execute it
		this.executeOpcode(this._curOpcode);

		//and refresh the renderer
		this._rend.update();
	}

	/**
	 * Checks the input blocking flag to see if
	 * emulation should continue, checks for a key event,
	 * stores the key in the proper register, and returns
	 * whether emulation should continue
	 *
	 * @returns Whether emulation should continue for the cycle
	 */
	private checkInputBlock(): boolean {
		//check the input block flag
		if(this._blockedForInput) {
			//check the opcode
			if((this._curOpcode & 0xF0FF) === 0xF00A) {
				//get the register index
				let ridx = (this._curOpcode & 0x0F00) 
						>> 8;

				//check for keydown
				if(this._keyMgr.keysAreDown()) {
					//loop and get the down key
					for(let k = Keycode.K1;
						k <= Keycode.KV; k++) {
						if(this._keyMgr
						.stateForKey(k) ===
						KeyState.DOWN) {
							this._regs[ridx]
							.value = k;
						}
					}
					this._blockedForInput = false;
					return true;
				} else {
					return false;
				}
			} else {
				return false;
			}
		} else {
			return true;
		}
	}

	/**
	 * Executes a single opcode
	 *
	 * @param op The opcode to evaluate
	 */
	private executeOpcode(op: number): void {
		//get the executor from the dispatch table
		let exe = this._dispatchTable.get(op & 0xF000);

		//and execute it
		exe(op);
	}

	/**
	 * Initializes the dispatch table
	 */
	private initDispatchTable(): void {
		//register the methods
		this._dispatchTable.set(0x0000, 
					this.execute0x00XX.bind(this));
		this._dispatchTable.set(0x1000,
					this.execute0x1NNN.bind(this));
		this._dispatchTable.set(0x2000,
					this.execute0x2NNN.bind(this));
		this._dispatchTable.set(0x3000,
					this.execute0x3XNN.bind(this));
		this._dispatchTable.set(0x4000,
					this.execute0x4XNN.bind(this))
		this._dispatchTable.set(0x5000,
					this.execute0x5XY0.bind(this));
		this._dispatchTable.set(0x6000,
					this.execute0x6XNN.bind(this));
		this._dispatchTable.set(0x7000,
					this.execute0x7XNN.bind(this));
		this._dispatchTable.set(0x8000,
					this.execute0x8XXX.bind(this));
		this._dispatchTable.set(0x9000,
					this.execute0x9XY0.bind(this));
		this._dispatchTable.set(0xA000,
					this.execute0xANNN.bind(this)); 
		this._dispatchTable.set(0xB000,
					this.execute0xBNNN.bind(this));
		this._dispatchTable.set(0xC000,
					this.execute0xCXNN.bind(this));
		this._dispatchTable.set(0xD000,
					this.execute0xDXYN.bind(this));
		this._dispatchTable.set(0xE000,
					this.execute0xEXXX.bind(this));
		this._dispatchTable.set(0xF000,
					this.execute0xFXXX.bind(this));
	}

	/**
	 * Executes an opcode of the form 0x00XX
	 *
	 * @param opcode The opcode to execute
	 */
	private execute0x00XX(opcode: number): void {
		//determine which opcode should be executed
		switch(opcode & 0x000F) {
			//clear screen (00E0)
			case 0x0000: {
				//clear the screen
				this._rend.clearScreen();

				//and advance the program counter
				this._pc += 2;

				break;
			}

			//return from subroutine (00EE)
			case 0x000E: {
				//get the new PC value
				let newPC = this._stack.pop();

				//make sure the stack wasn't empty
				if(newPC !== null) {
					//update the program counter
					this._pc = newPC;
				}

				break;
			}

			//unknown opcode
			default: {
				console.log('Unknown opcode [0x0000]: 0x'
						+ opcode.toString(16));
			}
		}
	}

	/**
	 * Executes an opcode of the form 0x1NNN (goto NNN)
	 *
	 * @param opcode The opcode to execute
	 */
	private execute0x1NNN(opcode: number): void {
		//get the address to jump to
		let addr = opcode & 0x0FFF;

		//and jump to that address
		this._pc = addr;
	}

	/**
	 * Executes an opcode of the form 0x2NNN (subroutine call)
	 *
	 * @param opcode The opcode to evaluate
	 */
	private execute0x2NNN(opcode: number): void {
		//get the address of the subroutine
		let addr = opcode & 0x0FFF;

		//advance the program counter
		this._pc += 2;

		//push the program counter onto the call stack
		this._stack.push(this._pc);

		//and jump to the address of the subroutine
		this._pc = addr;
	}

	/**
	 * Executes an opcode of the form 0x3XNN 
	 * (constant equals comparison)
	 *
	 * @param opcode The opcode to execute
	 */
	private execute0x3XNN(opcode: number): void {
		//get the index of the register
		let idx = (opcode & 0x0F00) >> 8;

		//get the constant to compare against
		let cst = opcode & 0x00FF;

		//execute the comparison
		if(this._regs[idx].equalsValue(cst)) {
			this._pc += 2;
		}

		//and advance the program counter
		this._pc += 2;
	}
	
	/**
	 * Executes an opcode of the form 0x4XNN
	 * (constant not-equals comparison)
	 *
	 * @param opcode The opcode to execute
	 */
	private execute0x4XNN(opcode: number): void {
		//get the index of the register to compare
		let idx = (opcode & 0x0F00) >> 8;

		//get the constant to compare against
		let cst = opcode & 0x00FF;

		//execute the comparison
		if(!this._regs[idx].equalsValue(cst)) {
			this._pc += 2;
		}

		//and advance the program counter
		this._pc += 2;
	}

	/**
	 * Executes an opcode of the form 0x5XY0
	 * (register equals comparison)
	 *
	 * @param opcode The opcode to execute
	 */
	private execute0x5XY0(opcode: number): void {
		//get the index of register X
		let xidx = (opcode & 0x0F00) >> 8;

		//get the index of register Y
		let yidx = (opcode & 0x00F0) >> 4;

		//compare the registers
		if(this._regs[xidx].equalsRegister(this._regs[yidx])) {
			this._pc += 2;
		}

		//and advance the program counter
		this._pc += 2;
	}

	/**
	 * Executes a opcode of the form 0x6XNN (constant assignment)
	 *
	 * @param opcode The opcode to execute
	 */
	private execute0x6XNN(opcode: number): void {
		//get the index of the register
		let idx = (opcode & 0x0F00) >> 8;

		//get the new value of the register
		let val = opcode & 0x00FF;

		//update the register value
		this._regs[idx].value = val;

		//and advance the program counter
		this._pc += 2;
	}

	/**
	 * Executes an opcode of the form 0x7XNN (constant addition)
	 *
	 * @param opcode The opcode to execute
	 */
	private execute0x7XNN(opcode: number): void {
		//get the index of the register to modify
		let idx = (opcode & 0x0F00) >> 8;

		//get the value to add
		let val = opcode & 0x00FF;

		//add the value to the register
		this._regs[idx].value += val;

		//mask the updated register
		this._regs[idx].value &= 0xFF;

		//and advance the program counter
		this._pc += 2;
	}

	/**
	 * Executes an opcode of the form 0x8XXX (register operations)
	 *
	 * @param opcode The opcode to evaluate
	 */
	private execute0x8XXX(opcode: number): void {
		//handle different opcodes
		switch(opcode & 0x000F) {
			//register assignment (0x8XY0)
			case 0x0000: {
				//get the LHS register index
				let lidx = (opcode & 0x0F00) >> 8;

				//get the RHS register index
				let ridx = (opcode & 0x00F0) >> 4;

				//and assign the register values
				this._regs[lidx].value = 
					this._regs[ridx].value;

				break;
			}

			//register bitwise OR (0x8XY1)
			case 0x0001: {
				//get the LHS register index
				let lidx = (opcode & 0x0F00) >> 8;

				//get the RHS register index
				let ridx = (opcode & 0x00F0) >> 4;

				//get the values of the registers
				let lval = this._regs[lidx].value;
				let rval = this._regs[ridx].value;

				//and update the LHS register
				this._regs[lidx].value = (lval | rval);

				break;
			}

			//register bitwise AND (0x8XY2)
			case 0x0002: {
				//get the LHS register index
				let lidx = (opcode & 0x0F00) >> 8;

				//get the RHS register index
				let ridx = (opcode & 0x00F0) >> 4;

				//get the values of the registers
				let lval = this._regs[lidx].value;
				let rval = this._regs[ridx].value;

				//and update the LHS register
				this._regs[lidx].value = (lval & rval);

				break;
			}

			//register bitwise XOR (0x8XY3)
			case 0x0003: {
				//get the LHS register index
				let lidx = (opcode & 0x0F00) >> 8;

				//get the RHS register index
				let ridx = (opcode & 0x00F0) >> 4;

				//get the values of the registers
				let lval = this._regs[lidx].value;
				let rval = this._regs[ridx].value;

				//xor them
				let res = lval ^ rval;

				//mask the result
				res &= 0xFF;

				//and update the LHS register
				this._regs[lidx].value = res;

				break;
			}

			//register addition (0x8XY4)
			case 0x0004: {
				//get the LHS register index
				let lidx = (opcode & 0x0F00) >> 8;

				//get the RHS register index
				let ridx = (opcode & 0x00F0) >> 4;

				//get their values
				let lval = this._regs[lidx].value;
				let rval = this._regs[ridx].value;

				//check for a carry
				if(rval > (0xFF - lval)) { //carry
					this._regs[0xF].value = 1;
				} else { //no carry	
					this._regs[0xF].value = 0;
				}

				//calculate the sum
				let res = lval + rval;

				//mask the sum
				res &= 0xFF;

				//and update the LHS register
				this._regs[lidx].value = res;

				break;
			}

			//register subtraction (0x8XY5)
			case 0x0005: {
				//get the LHS register index
				let lidx = (opcode & 0x0F00) >> 8;

				//get the RHS register index
				let ridx = (opcode & 0x00F0) >> 4;

				//get the values of the registers
				let lval = this._regs[lidx].value;
				let rval = this._regs[ridx].value;

				//check for a borrow
				if(rval > lval) { //borrow
					this._regs[0xF].value = 0;
				} else { //no borrow
					this._regs[0xF].value = 1;
				}

				//calculate the difference
				let res = lval - rval;

				//correct the result
				if(res < 0) {
					res = 0xFF - Math.abs(res);
				}

				//mask the result
				res &= 0xFF;

				//and update the LHS register
				this._regs[lidx].value = res;

				break;
			}

			//bitwise right shift (8XY6)
			case 0x0006: {
				//get the register index
				let idx = (opcode & 0x0F00) >> 8;

				//get its value
				let val = this._regs[idx].value;

				//put its LSB in VF
				this._regs[0xF].value = val & 0x1;

				//calculate the shift
				val >>= 1;

				//mask the value
				val &= 0xFF;

				//and update the register
				this._regs[idx].value = val;

				break;
			}

			//register subtraction (0x8XY7)
			case 0x0007: {
				//get the LHS register index
				let lidx = (opcode & 0x0F00) >> 8;

				//get the RHS register index
				let ridx = (opcode & 0x00F0) >> 4;

				//get their values
				let lval = this._regs[lidx].value;
				let rval = this._regs[ridx].value;

				//check for a borrow
				if(lval > rval) { //borrow
					this._regs[0xF].value = 0;
				} else { //no borrow
					this._regs[0xF].value = 1;
				}

				//calculate the difference
				let res = rval - lval;

				//correct the result
				if(res < 0x00) {
					res = 0xFF - Math.abs(res);
				}

				//mask the result
				res &= 0xFF;

				//and update the LHS register
				this._regs[lidx].value = res;

				break;
			}

			//bitwise left shift (8XYE)
			case 0x000E: {
				//get the register index
				let idx = (opcode & 0x0F00) >> 8;

				//get its value
				let val = this._regs[idx].value;

				//put its MSB in VF
				this._regs[0xF].value = (val >> 7);

				//calculate the shift
				val <<= 1;

				//mask the value
				val &= 0xFF;

				//and update the register
				this._regs[idx].value = val;

				break;
			}
			
			//unknown opcode
			default: {
				console.log('Unknown opcode [0x8000]: 0x'
						+ opcode.toString(16));
			}
		}

		//and advance the program counter
		this._pc += 2;
	}

	/**
	 * Executes an opcode of the form 0x9XY0 (register NE comparison)
	 *
	 * @param opcode The opcode to evaluate
	 */
	private execute0x9XY0(opcode: number): void {
		//get the X register index
		let xidx = (opcode & 0x0F00) >> 8;

		//get the Y register index
		let yidx = (opcode & 0x00F0) >> 4;

		//execute the comparison
		if(!this._regs[xidx].equalsRegister(this._regs[yidx])) {
			this._pc += 2;
		}

		//and advance the program counter
		this._pc += 2;
	}

	/**
	 * Executes an opcode of the form 0xANNN (index register set)
	 *
	 * @param opcode The opcode to evaluate
	 */
	private execute0xANNN(opcode: number): void {
		//get the value to set I to
		let val = opcode & 0x0FFF;

		//set the I register to the value
		this._I = val;

		//and advance the program counter
		this._pc += 2;
	}

	/**
	 * Executes an opcode of the form 0xBNNN (calculated goto)
	 *
	 * @param opcode The opcode to evaluate
	 */
	private execute0xBNNN(opcode: number): void {
		//get the value to add to V0
		let val = opcode & 0x0FFF;

		//calculate the address to jump to
		let addr = this._regs[0x0].value + val;

		//and update the program counter
		this._pc = addr;
	}

	/**
	 * Executes an opcode of the form 0xCXNN (random number generation)
	 *
	 * @param opcode The opcode to evaluate
	 */
	private execute0xCXNN(opcode: number): void {
		//get the index of the target register
		let idx = (opcode & 0x0F00) >> 8;

		//get the value to AND against
		let aval = opcode & 0x00FF;

		//get a random value from 0 to 255
		let rval = Math.floor(Math.random() * 0xFF);

		//update the target register
		this._regs[idx].value = rval & aval;

		//and advance the program counter
		this._pc += 2;
	}

	/**
	 * Executes an opcode of the form 0xDXYN (sprite drawing)
	 *
	 * @param opcode The opcode to evaluate
	 */
	private execute0xDXYN(opcode: number): void {
		//get the height of the sprite
		let h = opcode & 0x000F;

		//get the index of the x-coord register
		let xidx = (opcode & 0x0F00) >> 8;

		//get the index of the y-coord register
		let yidx = (opcode & 0x00F0) >> 4;

		//get the sprite to draw
		let spr = this._memory.getSprite(this._I, h);

		//get the sprite coordinates
		let x = this._regs[xidx].value;
		let y = this._regs[yidx].value;

		//draw the sprite
		let didCollide = this._rend.drawSprite(spr, x, y);

		//update collision detection
		if(didCollide) {
			this._regs[0xF].value = 1;
		} else {
			this._regs[0xF].value = 0;
		}

		//and advance the program counter
		this._pc += 2;
	}

	/**
	 * Executes an opcode of the form 0xEXXX (key comparisons)
	 *
	 * @param opcode The opcode to evaluate
	 */
	private execute0xEXXX(opcode: number): void {
		//handle different opcodes
		switch(opcode & 0x00FF) {
			//key is down (0xEX9E)
			case 0x009E: {
				//get the index of the register to check
				let idx = (opcode & 0x0F00) >> 8;

				//get its value
				let val = this._regs[idx].value;

				//get the state of the key
				let st = this._keyMgr.stateForKey(val);

				//and execute the comparison
				if(st === KeyState.DOWN) {
					this._pc += 2;
				}

				break;
			}

			//key is up (0xEXA1)
			case 0x00A1: {
				//get the index of the register to check
				let idx = (opcode & 0x0F00) >> 8;

				//get its value
				let val = this._regs[idx].value;

				//get the state of the key
				let st = this._keyMgr.stateForKey(val);

				//and execute the comparison
				if(st === KeyState.UP) {
					this._pc += 2;
				}

				break;
			}

			//unknown opcode
			default: {
				console.log('Unknown opcode [0xE000]: 0x'
						+ opcode.toString(16));
			}

		}

		//and advance the program counter
		this._pc += 2;
	}

	/**
	 * Executes opcodes of the form 0xFXXX (miscellaneous operations)
	 *
	 * @param opcode The opcode to evaluate
	 */
	private execute0xFXXX(opcode: number): void {
		//handle different opcodes
		switch(opcode & 0x00FF) {
			//get delay timer (0xFX07)
			case 0x0007: {
				//get the index of the register to update
				let idx = (opcode & 0x0F00) >> 8;

				//get the value of the delay timer
				let tv = this._delayTimer.ticks;

				//and update the register
				this._regs[idx].value = tv;

				break;
			}

			//await keypress (0xFX0A)
			case 0x000A: {
				//clear the key states
				this._keyMgr.clearStates();

				//block for an input event
				this._blockedForInput = true;

				break;
			}

			//set delay timer (0xFX15)
			case 0x0015: {
				//get the index of the target register
				let idx = (opcode & 0x0F00) >> 8;

				//get the value of that register
				let val = this._regs[idx].value;

				//and set the delay timer to that value
				this._delayTimer.ticks = val;

				break;
			}

			//set sound timer (0xFX18)
			case 0x0018: {
				//get the index of the target register
				let idx = (opcode & 0x0F00) >> 8;

				//get the value of that register
				let val = this._regs[idx].value;

				//and set the sound timer to that value
				this._sndTimer.ticks = val;

				break;
			}

			//adjust index register (0xFX1E)
			case 0x001E: {
				//get the index of the addend register
				let idx = (opcode & 0x0F00) >> 8;

				//get the value of that register
				let val = this._regs[idx].value;

				//determine whether there is a 
				//range overflow
				if((val + this._I) > 0x0FFF) {
					this._regs[0xF].value = 1;
				} else {
					this._regs[0xF].value = 0;
				}
				
				//adjust the index register
				this._I += val;

				//and mask the register
				this._I &= 0x0FFF;

				break;
			}

			//get sprite address (0xFX29)
			case 0x0029: {
				//get the index of the source register
				let idx = (opcode & 0x0F00) >> 8;

				//get its value
				let val = this._regs[idx].value;

				//ensure it's a valid sprite
				val &= 0x000F;

				//calculate the address of its sprite
				let addr = Constants.FNT_START 
						+ (val * 5);

				//and store the address in the I register
				this._I = addr;

				break;
			}

			//store register as BCD (0xFX33)
			case 0x0033: {
				//get the index of the source register
				let idx = (opcode & 0x0F00) >> 8;

				//get its value
				let val = this._regs[idx].value;

				//calculate its BCD representation
				let b0 = Math.floor(val / 100);
				let b1 = Math.floor(val / 10) % 10;
				let b2 = (val % 100) % 10;

				//and store it in memory
				this._memory.pokeByte(b0, this._I);
				this._memory.pokeByte(b1, this._I + 1);
				this._memory.pokeByte(b2, this._I + 2);

				break;
			}

			//register storage (0xFX55)
			case 0x0055: {
				//get the index of the end of
				//the storage sequence
				let end = (opcode & 0x0F00) >> 8;

				//and store the sequence
				for(let i = 0; i <= end; i++) {
					//get the current value
					let val = this._regs[i].value;

					//and store it in memory
					this._memory.pokeByte(val,
							i + this._I);
				}

				break;
			}

			//register load (0xFX65)
			case 0x0065: {
				//get the index of the end of
				//the load sequence
				let end = (opcode & 0x0F00) >> 8;

				//and load the sequence
				for(let i = 0; i <= end; i++) {
					//get the current memory byte
					let val = this._memory.peekByte(
							i + this._I);

					//and store it in the register
					this._regs[i].value = val;
				}

				break;
			}

			//unknown opcode
			default: {
				console.log('Unknown opcode [0xF000]: 0x'
						+ opcode.toString(16));
			}
		}

		//and advance the program counter
		this._pc += 2;
	}
}

//end of file
