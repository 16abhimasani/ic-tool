const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
// const Menu = require('menu');
const { Menu } = require('electron');
const { shell } = require('electron');

const path = require('path')
const url = require('url')

function createWindow () {
  // Create the browser window.
  formWindow = new BrowserWindow({width: 300, height: 900, x:1200, y:0})
  garageWindow = new BrowserWindow({width: 1139, height: 250, x:0, y:700})

  formWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  garageWindow.loadURL('http://ec2-52-23-218-165.compute-1.amazonaws.com:3000/admingarage')


  // Emitted when the window is closed.
  formWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    formWindow = null
  })

  garageWindow.on('closed', function () {
  // Dereference the window object, usually you would store windows
  // in an array if your app supports multi windows, this is the time
  // when you should delete the corresponding element.
  garageWindow = null
  })
}

require('electron-context-menu')({
	prepend: (params, browserWindow) => [{
		label: "Reload", click: function() { BrowserWindow.getFocusedWindow().reload(); }
	}]
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
    createWindow()
    // shell.openExternal('https://google.com');
    Menu.setApplicationMenu(Menu.buildFromTemplate([
                {
                label: "Application",
                submenu: [
                    { label: "About Application", selector: "orderFrontStandardAboutPanel:" },
                    { type: "separator" },
                    { label: "Quit", accelerator: "CmdOrCtrl+Q", click: function() { app.quit(); }},
                    { label: "Reload", accelerator: "CmdOrCtrl+R", click: function() { BrowserWindow.getFocusedWindow().reload(); }}
                    ]
                },
                {
				label: 'Edit',
                submenu: [
                    { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
                    { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
                    { type: "separator" },
                    { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
                    { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
                    { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
                    { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
				]
			}
		]));
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (formWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
