/*
 * Window.tsx
 * Defines the window component for Cookie
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

//imports
import * as React from 'react';
import { WindowProps } from '../props/WindowProps';
import { WindowState } from '../state/WindowState';
import { Screen } from '../gfx/Screen';

/**
 * The window of the app
 */
export class Window extends React.Component<WindowProps, WindowState> {
	//no fields

	/**
	 * Constructs a new `Window` component
	 *
	 * @param props The properties of the `Window`
	 */
	constructor(props: WindowProps) {
		super(props); //call the superclass constructor
	}

	/**
	 * Renders the `Window`
	 *
	 * @returns A React DOM representing the `Window`
	 */
	public render(): React.ReactNode {
		return (
			<Screen frame={this.props.frame} />
		);
	}
}

//end of file
