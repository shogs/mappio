const { remote, ipcRenderer } = require("electron");

function getCurrentWindow() {
  return remote.getCurrentWindow();
}

function setContent({title, contentUrl}, browserWindow = getCurrentWindow()) {
  if (contentUrl==='settings') {
    browserWindow.getBrowserView().destroy();
  } else {
    ipcRenderer.send('add-content-view', { title, contentUrl });
    //browserWindow.getBrowserView().webContents.loadURL(contentUrl);
  }
}

module.exports = {
  setContent
}