const electron = require('electron');
const { app, BrowserWindow } = electron;

class MainWindow extends BrowserWindow {
  constructor(options, url) {
    super(options);

    this.on('blur', this.onBlur.bind(this));
    this.loadURL(url);
  }

  onBlur() {
    this.hide();
  }
}

module.exports = MainWindow;
