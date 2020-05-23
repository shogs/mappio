const { app, BrowserWindow, BrowserView, ipcMain } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const { menu } = require("./menu");

let mainWindow;

const isWindows = process.platform === "win32";

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    frame: isWindows ? false : true
  });
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../index.html')}`);
  if (isDev) {
    // Open the DevTools.
    //BrowserWindow.addDevToolsExtension("C:\\Users\\Sahand\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Extensions\\fmkadmapgofadopljbjfkapdkoienihi\\4.7.0_0");
    mainWindow.webContents.openDevTools();
  }

  let windowSize = mainWindow.getSize();

  let view = new BrowserView()
  mainWindow.setBrowserView(view)
  view.setBounds({ x: 48, y: 32, width: windowSize[0]-48, height: windowSize[1]-32 })
  view.webContents.loadURL('https://electronjs.org')

  mainWindow.on('closed', () => mainWindow = null);

  mainWindow.on('will-resize', (e, newBounds) => {
    view.setBounds({ x: 48, y: 32, width: newBounds.width-48, height: newBounds.height-32 });
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// Register an event listener. When ipcRenderer sends mouse click co-ordinates, show menu at that point.
ipcMain.on(`display-app-menu`, function(e, args) {
  if (isWindows && mainWindow) {
    menu.popup({
      window: mainWindow,
      x: args.x,
      y: args.y
    });
  }
});