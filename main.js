// Modules to control application life and create native browser window
const {app, BrowserWindow, BrowserView} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  let win = new BrowserWindow({ 
                                width: 800, 
                                height: 600, 
                                show: false,
                                backgroundColor: '#2e2c29',
                                frame: false,
                              })

  win.on('closed', () => {
    win = null
  })
  win.loadURL('http://google.com')
  win.setBounds({ x: 0, y: 0, width: 800, height: 600 })
    win.once('ready-to-show', () => {
    win.show()
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.


