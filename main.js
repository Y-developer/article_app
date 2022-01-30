const { app, BrowserWindow, Menu } = require("electron");
require("electron-reload")(__dirname)

function createWindow() {

    // create main window object
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600
    });

    // load files
    mainWindow.loadFile('src/index.html');

    // enable dev tools
    // mainWindow.webContents.openDevTools();

    // create custom menu
    const menu = Menu.buildFromTemplate([
        {
            label: 'File',
            submenu: [
                { label: 'Get Artical' },
                { label: 'Exit', click() { app.quit() } }
            ]
        },
        { label: 'About' }
    ]);
    Menu.setApplicationMenu(menu)
}

// run the application
app.whenReady().then(() => {
    createWindow();
});