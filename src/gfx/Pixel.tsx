/*
 * Pixel.tsx
 * Defines a React component that represents an emulator pixel
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
import * as React from 'react';
import { PixelProps } from '../props/PixelProps';
import { PixelState } from '../state/PixelState';
import { Constants } from '../util/Constants';

/**
 * A single emulator pixel
 */
export class Pixel extends React.Component<PixelProps, PixelState> {
	//no fields

	//methods

	/**
	 * Constructs a new `Pixel` instance
	 *
	 * @param props The properties of the Pixel
	 */
	constructor(props: PixelProps) {
		super(props); //call the superclass constructor
	}

	/**
	 * Renders the `Pixel`
	 *
	 * @returns The React DOM for the `Pixel`
	 */
	public render(): React.ReactNode {
		return (
			<td style={this.composeTDStyling()}>
				<div style={this.composeDivStyling()}>
					</div>
			</td>
		);
	}


	/**
	 * Generates the styling for the `Pixel`'s `div` element
	 *
	 * @returns The CSS styling for the `div` element
	 */
	private composeDivStyling(): React.CSSProperties {
		//calculate the background color string
		let bgCol: string;
		if(this.props.isOn) {
			bgCol = '#ffffff';
		} else {
			bgCol = '#000000';
		}

		//and assemble the styling object
		return {
			width: Constants.PIXEL_DIM + 'px',
			height: Constants.PIXEL_DIM + 'px',
			backgroundColor: bgCol 
		};
	}

	/**
	 * Generates the styling for the `Pixel`'s `td` element
	 *
	 * @returns The CSS styling for the `td` element
	 */
	private composeTDStyling(): React.CSSProperties {
		return {
			paddingTop: '0',
			paddingBottom: '0',
			paddingLeft: '0',
			paddingRight: '0'
		};
	}
}

//end of file
