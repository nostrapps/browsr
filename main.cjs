const { app, BrowserWindow, Menu } = require('electron')

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: false
    }
  })

  mainWindow.loadURL('https://nostr.com/') // Load a URL to start with

  const mainMenu = Menu.buildFromTemplate(menuTemplate)
  Menu.setApplicationMenu(mainMenu)
}

const menuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Exit',
        click() {
          app.quit()
        }
      }
    ]
  },
  {
    label: 'Navigation',
    submenu: [
      {
        label: 'Back',
        accelerator: 'CmdOrCtrl+[',
        click(item, focusedWindow) {
          if (focusedWindow) focusedWindow.webContents.goBack()
        }
      },
      {
        label: 'Forward',
        accelerator: 'CmdOrCtrl+]',
        click(item, focusedWindow) {
          if (focusedWindow) focusedWindow.webContents.goForward()
        }
      },
      {
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
        click(item, focusedWindow) {
          if (focusedWindow) focusedWindow.reload()
        }
      }
    ]
  }
]

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
