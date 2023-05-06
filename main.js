const { app, BrowserWindow, Notification } = require('electron')
const path = require('path')
require('@electron/remote/main').initialize()
const isdev = require('electron-is-dev')

const port = 3000;

const NOTIFICATION_TITLE = 'Basic Notification'
const NOTIFICATION_BODY = 'Notification from the Main process'

function notificationHandler (NOTIFICATION_TITLE, NOTIFICATION_BODY) {
  new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY }).show()
}

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true,
      devTools: !app.isPackaged,
      preload: path.join(__dirname, 'preload.js')
    }
  })

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
}).then(notificationHandler)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

