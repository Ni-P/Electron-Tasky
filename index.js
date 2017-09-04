const electron = require('electron');
const path = require('path');
const { app, ipcMain } = electron;

const TimerTray = require('./app/TimerTray');
const MainWindow = require('./app/MainWindow');

let mainWindow;
let tray;

var url = `file://${__dirname}/src/index.html`;

app.on('ready', () => {
  // app.dock.hide(); // macOS only!
  mainWindow = new MainWindow(
    {
      height: 500,
      width: 300,
      frame: false, // shows the entire window
      resizable: false,
      show: false, // shows window
      webPreferences: {
        backgroundThrottling: false // allows js to run in background
      },
      skipTaskbar: true // hides app from taskbar
    },
    url
  );

  const iconName =
    process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
  const iconPath = path.join(__dirname, `./src/assets/${iconName}`);
  tray = new TimerTray(iconPath, mainWindow);
});

ipcMain.on('update-timer', (event, timeLeft) => {
  tray.setTitle(timeLeft); // macOS only?
});
