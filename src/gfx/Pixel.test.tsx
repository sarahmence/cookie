/*
 * Pixel.test.tsx
 * Defines unit tests for the Pixel component
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
import * as ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { Pixel } from './Pixel';

//start of tests
describe('Pixel', () => {
	//this test verifies that the pixel renders without crashing
	it('Renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<Pixel isOn={true} />, div);
		ReactDOM.unmountComponentAtNode(div);
	});

	//this test verifies that the pixel matches its snapshot
	it('Renders to snapshot', () => {
		const pix = shallow(<Pixel isOn={true} />);
		expect(pix).toMatchSnapshot();
	});
});


//end of tests
