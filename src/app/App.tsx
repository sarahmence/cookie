/*
 * App.tsx
 * Defines the main component for Cookie
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
import { AppProps } from '../props/AppProps';
import { AppState } from '../state/AppState';
import { Window } from './Window';

/**
 * The main component of the app
 */
export default class App extends React.Component<AppProps, AppState> {
	//no fields

	/**
	 * Constructs a new `App` component
	 *
	 * @param props The properties of the app
	 */
	constructor(props: AppProps) {
		super(props); //call the superclass constructor
	}

	/**
	 * Renders the component
	 *
	 * @returns A React DOM representing the component
	 */
	public render(): React.ReactNode {
		//render the window
		return (
			<Window />
		);
	}
}

//end of file
