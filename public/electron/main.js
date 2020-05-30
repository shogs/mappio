const { app, BrowserWindow, BrowserView, ipcMain } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const { menu } = require('./menu');
const Store = require('./store');

if (isDev) {
  require('electron-reload')(__dirname);
}

let mainWindow;
let contentView;

const isWindows = process.platform === "win32";

let views = {};

const store = new Store(
  'user-prefs',
  {
    windowBounds: {width: 800, height: 680 }
  }
);

function createWindow() {
  let { x, y, width, height } = store.get('windowBounds');

  mainWindow = new BrowserWindow({
    x,
    y,
    width,
    height,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    frame: isWindows ? false : true
  });
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../index.html')}`);
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  let windowSize = mainWindow.getSize();

  contentView = new BrowserView();
  contentView.setBounds({ x: 48, y: 32, width: windowSize[0]-48, height: windowSize[1]-32 });
  mainWindow.addBrowserView(contentView);

  mainWindow.on('closed', () => mainWindow = null);

  mainWindow.on('will-resize', (e, newBounds) =>
    contentView.setBounds({ x: 48, y: 32, width: newBounds.width-48, height: newBounds.height-32 })
  );

  mainWindow.on('resize', () => store.set('windowBounds', mainWindow.getBounds()));

  mainWindow.on('move', () => store.set('windowBounds', mainWindow.getBounds()));
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

ipcMain.on('add-content-view', function(e, {title, contentUrl}) {
  let contentView = views[title];
  if (!contentView) {
    contentView = new BrowserView({alwaysOnTop: true, show: true});
    contentView.webContents.loadURL(contentUrl);
    views[title] = contentView;
    mainWindow.addBrowserView(contentView);
  }
  let windowSize = mainWindow.getSize();
  contentView.setBounds({ x: 48, y: 32, width: windowSize[0]-48, height: windowSize[1]-32 });
  mainWindow.setBrowserView(contentView);
});