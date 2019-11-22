/*
 * Window.test.tsx
 * Defines unit tests for the Window component
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
import * as ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { Window } from './Window';

//start of tests
describe('Window', () => {
	//this test verifies that the window renders without crashing
	it('Renders without crashing', () => {
	  const div = document.createElement('div');
	  ReactDOM.render(<Window />, div);
	  ReactDOM.unmountComponentAtNode(div);
	});

	//this test verifies that the window matches its snapshot
	it('Renders to snapshot', () => {
		const win = shallow(<Window />);
		expect(win).toMatchSnapshot();
	});
});


//end of tests
