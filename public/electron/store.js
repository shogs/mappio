const electron = require('electron');
const path = require('path');
const fs = require('fs');

class Store {
  constructor(configName, defaults) {
    const userDataPath = (electron.app || electron.remote.app).getPath('userData');
    this.path = path.join(userDataPath, configName + '.json');

    console.log('Storing into path: ', this.path);

    try {
      this.data = JSON.parse(fs.readFileSync(this.path));
    } catch(error) {
      this.data = defaults;
    }
  }

  get = (key) => this.data[key]

  set = (key, val) => {
    this.data[key] = val;
    fs.writeFileSync(this.path, JSON.stringify(this.data));
  }
}

module.exports = Store;