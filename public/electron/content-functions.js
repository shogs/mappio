const { remote } = require("electron");

function getCurrentWindow() {
  return remote.getCurrentWindow();
}

function setContent(url, browserWindow = getCurrentWindow()) {
  browserWindow.getBrowserView().webContents.loadURL(url);
}

module.exports = {
  setContent
}