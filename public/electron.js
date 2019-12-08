/*
 * electron.js
 * Main process entry point for Cookie
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
const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const isDev = require("electron-is-dev");
const MainConstants = require("../src/util/MainConstants").MainConstants;

//declare the main window
let mainWindow;

/**
 * Creates the Electron window
 */
function createWindow() {
	//calculate the width and height of the window
	let winWidth = MainConstants.WIN_WIDTH * MainConstants.PIXEL_DIM;
	let winHeight = MainConstants.WIN_HEIGHT * MainConstants.PIXEL_DIM;

	//create the window object
	mainWindow = new BrowserWindow({ width: winWidth, 
					height: winHeight,
					webPreferences: {
						nodeIntegration: true
					}, 
					autoHideMenuBar: true,
					fullscreenable: false,
					resizable: false,
					maximizable: false,
	icon: path.resolve("assets/icons/png/64x64.png")});

	//load the app
	mainWindow.loadURL(
		isDev ? "http://localhost:3000"
		: `file://${path.join(__dirname, "../build/index.html")}`
	);

	//add the close event to the window
	mainWindow.on("closed", () => (mainWindow = null));
}

//and add app events
app.on("ready", createWindow);
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});
app.on("activate", () => {
	if (mainWindow === null) {
		createWindow();
	}
});

//end of file
