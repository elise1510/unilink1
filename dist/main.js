//Import Blocks
import { app, BrowserWindow } from 'electron';
import path from 'path';
//Global Variables
let mainWindow;
let menu;
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        //frame: process.platform === 'darwin' ? false : true,
        title: 'Untitled', // Set initial title
        // titleBarStyle: process.platform === 'darwin' ? 'hiddenInset' : 'default',
        resizable: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            // preload: path.join('../src/preload.js'),
            spellcheck: true,
        },
    });
    mainWindow.setMinimumSize(300, 300);
    mainWindow.loadFile(path.join('../src/registration.html'));
}
app.whenReady().then(() => {
    createWindow();
});
//# sourceMappingURL=main.js.map