const path = require('path');

const { app, BrowserWindow } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 730,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
    },
  });

  win.loadFile(path.join(__dirname, '/index.html')) 
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});