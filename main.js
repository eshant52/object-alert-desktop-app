const { app, BrowserWindow, Notification } = require('electron')
const path = require('path')
require('@electron/remote/main').initialize()
const isdev = require('electron-is-dev')

const port = 3000;

const NOTIFICATION_TITLE = 'Runway debris detection system'
const NOTIFICATION_BODY = 'An application is running...'

function notificationHandler (noti_title, noti_body) {
  new Notification({ title: noti_title, body: noti_body }).show()
}

function createWindow () {
  const mainWindow = new BrowserWindow({
    icon: './icons/icon.icns',
    width: 800,
    height: 600,
    minHeight: 600,
    maxHeight: 700,
    minWidth: 800,
    maxWidth: 1000,
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true,
      devTools: !app.isPackaged,
      preload: path.join(__dirname, 'preload.js')
    }
  })
  console.log(path.join(__dirname, 'icons/icon.icns'))

  // Load the React app.
  if (isdev) {
    // render window in dev mode
    mainWindow.loadURL(`http://localhost:${port}/`);
  }
  else {
    // render window in prod mode
    mainWindow.loadFile(path.join(__dirname, "./build/index.html"));
  }
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
}).then(() => notificationHandler(NOTIFICATION_TITLE, NOTIFICATION_BODY))

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

