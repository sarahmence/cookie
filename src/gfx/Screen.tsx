/*
 * Screen.tsx
 * Defines a React component that represents an emulator screen
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
import { ScreenProps } from '../props/ScreenProps';
import { ScreenState } from '../state/ScreenState';
import { PixelRow } from './PixelRow';
import { Constants } from '../util/Constants';

/**
 * An emulator screen
 */
export class Screen extends React.Component<ScreenProps, ScreenState> {
	//no fields

	//methods

	/**
	 * Constructs a new `Screen` component
	 *
	 * @param props The properties of the `Screen`
	 */
	constructor(props: ScreenProps) {
		super(props); //call the superclass constructor
	}

	/**
	 * Renders the `Screen`
	 *
	 * @returns A React DOM representing the `Screen`
	 */
	public render(): React.ReactNode {
		return (
			<table style={this.styling()}>
				<tbody>{this.assembleDOM()}</tbody>
			</table>
		);
	}

	/**
	 * Assembles the React DOM for the `Screen`
	 *
	 * @returns The React DOM for the `Screen`
	 */
	private assembleDOM(): React.ReactNode {
		//declare the return value
		let ret: React.ReactNode[] = [];

		//loop and populate it
		for(let i = 0; i < Constants.WIN_HEIGHT; i++) {
			ret.push(<PixelRow frame={this.props.frame}
					index={i} key={'row ' + i} />);
		}

		//and return it
		return ret;
	}

	/**
	 * Assembles the styling for the `Screen`
	 *
	 * @returns The styling for the `Screen`
	 */
	private styling(): React.CSSProperties {
		//calculate the width and height
		let tWidth = Constants.WIN_WIDTH * Constants.PIXEL_DIM;
		let tHeight = Constants.WIN_HEIGHT * Constants.PIXEL_DIM;

		//and return the CSS
		return {
			borderCollapse: 'collapse',
			top: '0',
			bottom: '0',
			left: '0',
			right: '0',
			position: 'absolute',
			width: tWidth + 'px',
			height: tHeight + 'px'
		};
	}
}
