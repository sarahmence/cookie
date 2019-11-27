/*
 * PixelRow.tsx
 * Defines a React component that represents a pixel row
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

//imports
import * as React from 'react';
import { Pixel } from './Pixel';
import { PixelRowProps } from '../props/PixelRowProps';
import { PixelRowState } from '../state/PixelRowState';
import { PixelValue } from './PixelValue';
import { Constants } from '../util/Constants';

/**
 * A row of emulator [[Pixel]]s
 */
export class PixelRow extends React.Component<PixelRowProps, PixelRowState>
{
	//no fields

	//methods

	/**
	 * Constructs a new `PixelRow` instance
	 *
	 * @param props The properties of the `PixelRow`
	 */
	constructor(props: PixelRowProps) {
		super(props); //call the superclass constructor
	}

	/**
	 * Renders the `PixelRow`
	 *
	 * @returns The React DOM for the `PixelRow`
	 */
	public render(): React.ReactNode {
		return (
			<tr>{this.assembleDOM()}</tr>
		);
	}

	/**
	 * Assembles the React DOM for the `PixelRow`
	 *
	 * @returns The React DOM for the `PixelRow`
	 */
	private assembleDOM(): React.ReactNode {
		//declare the return value
		let row: React.ReactNode[] = [];

		//loop and assemble the row
		for(let i = 0; i < Constants.WIN_WIDTH; i++) {
			//get the current pixel value
			let value = this.props.frame.valueAtCoords(
						i, this.props.index);

			//assemble its key
			let key = 'pixel (' + i + ',' + this.props.index
					+ ')';

			//determine whether the pixel is on
			let on = (value === PixelValue.ON);

			//add it to the row
			row.push(<Pixel isOn={on} key={key}/>);
		}

		//and return the assembled table row
		return row;
	}
}

//end of file
