"use strict";
//Import Blocks
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path = require('path');
//Global Variables
let mainWindow;
let menu;
function createWindow() {
    mainWindow = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        //frame: process.platform === 'darwin' ? false : true,
        title: 'Untitled', // Set initial title
        // titleBarStyle: process.platform === 'darwin' ? 'hiddenInset' : 'default',
        resizable: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, 'preload.ts'),
            spellcheck: true,
        },
    });
    mainWindow.setMinimumSize(300, 300);
    mainWindow.loadFile(path.join(__dirname, '../src/index.html'));
}
electron_1.app.whenReady().then(() => {
    createWindow();
});
//# sourceMappingURL=main.js.map