const { app, BrowserWindow, Tray, Menu, ipcMain } = require('electron');
const path = require('path');
const fs = require("fs");
const { electron } = require('process');
const gotTheLock = app.requestSingleInstanceLock();
let windowDimensions;

fs.readFile(__dirname + "/save.json",(err,data) => {
  windowDimensions = JSON.parse(data);
  console.log(windowDimensions);
});


if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
    var mainWindow = new BrowserWindow({
    width: 800,
    height: 800,
    minWidth: 800,
    minHeight: 800,
    icon: __dirname + '/clock3.png',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    resizable: true,
  });


  mainWindow.loadFile(__dirname + "/src/timer.html");
  mainWindow.menuBarVisible = false;
  mainWindow.on("close",(e) => {
    e.preventDefault();
    mainWindow.hide();
  });

  var systray = new Tray("clock3.png");
  systray.setToolTip("Timer");
  
  var buttons = [{label: "Open Timer", click: () => {
          mainWindow.show();
  }},{label: "Quit Timer", click: () => {
    app.quit();
    fs.writeFile(__dirname + "/save.json",(content,err) => {
      
    })
  }}];

  systray.setContextMenu(Menu.buildFromTemplate(buttons));
  systray.on("click",() => {
    mainWindow.show();
  })

  // ipcMain.on("topbar_button_activate",(notimportant,data) => {
  //   if (data == "CLOSEPLS") {
  //     mainWindow.close();
  //   }

  //   if (data == "MINIMIZEPLS") {
  //     mainWindow.minimize();
  //   }
  // })
};
    
if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    if (myWindow) {
      if (myWindow.isMinimized()) myWindow.restore()
      myWindow.focus()
    }
  })
}


app.on('ready', createWindow);

app.on('activate', () => {

  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});