/*
 * index.tsx
 * Renderer entry point for Cookie
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
import './index.css';
import * as serviceWorker from './util/serviceWorker';
import { Renderer } from './gfx/Renderer';

//create the renderer
let rend = new Renderer();

//workaround for setting the renderer's update flag
rend.toggleAtCoords(1, 1);
rend.toggleAtCoords(1, 1);

//update the screen
rend.update();

//and start the service worker
serviceWorker.register();

//end of file
