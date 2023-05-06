const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('notify', {
    notify: (title) => ipcRenderer.send('set-title', title)
})