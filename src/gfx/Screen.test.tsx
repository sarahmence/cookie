/*
 * Screen.test.tsx
 * Defines unit tests for the Screen component
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
import * as ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { Screen } from './Screen';
import { Frame } from './Frame';

//start of tests
describe('Screen', () => {
	//this test verifies that the screen renders without crashing
	it('Renders without crashing', () => {
	  	let frame = new Frame();
		const div = document.createElement('div');
		ReactDOM.render(<Screen frame={frame} />, div);
		ReactDOM.unmountComponentAtNode(div);
	});

	//this test verifies that the screen matches its snapshot
	it('Renders to snapshot', () => {
		let frame = new Frame();
		const scr = shallow(<Screen frame={frame} />);
		expect(scr).toMatchSnapshot();
	});
});


//end of tests
