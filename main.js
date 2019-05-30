// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcRenderer} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  mainWindow.webContents.on('ipc-message', function (event, eventName, path) {
    if ('print' === eventName) {
      console.log(path)
      sendFileToPrint(path)
    }
  });

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

function sendFileToPrint (path) {
  printWindow = new BrowserWindow({
    width: 400,
    height: 400,
    show: false
  }); 

  printWindow.loadURL(path);

  printWindow.webContents.on('did-finish-load', () => {
    let printers = printWindow.webContents.getPrinters();
    printWindow.webContents.print({silent:false}, function (error, data) {
      if (!error) {
        console.log('PRINTED');
        printWindow = null;
      } else {
        console.log('PROBLEM');
      }
    });
    console.log('FIM do print')
  });
    
}

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
