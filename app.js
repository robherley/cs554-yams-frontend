const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

require('dotenv').config();

const isDevelopment = process.env.NODE_ENV === 'development';
let win;

const installExtensions = async () => {
   const installer = require('electron-devtools-installer');
   const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];
   const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
   for (const name of extensions) {
      try {
         await installer.default(installer[name], forceDownload);
      } catch (e) {
         console.log(`Error installing ${name} extension: ${e.message}`);
      }
   }
};

const createWindow = () => {
   // Create the browser window.
   if (process.platform === 'darwin') {
      win = new BrowserWindow({
         width: 800,
         height: 600,
         minWidth: 450,
         minHeight: 500,
         titleBarStyle: 'hidden'
      });
   } else {
      win = new BrowserWindow({
         width: 800,
         height: 600,
         minWidth: 450,
         minHeight: 500
      });
   }

   const APP_URL = isDevelopment
      ? 'http://localhost:1337'
      : url.format({
           pathname: path.join(__dirname, '/build/index.html'),
           protocol: 'file:',
           slashes: true
        });

   win.loadURL(APP_URL);

   // Open the DevTools.
   // win.webContents.openDevTools();

   // Emitted when the window is closed.
   win.on('closed', () => {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      win = null;
   });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
   if (isDevelopment) await installExtensions();
   createWindow();
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
   // On macOS it is common for applications and their menu bar
   // to stay active until the user quits explicitly with Cmd + Q
   if (process.platform !== 'darwin') {
      app.quit();
   }
});

app.on('activate', () => {
   // On macOS it's common to re-create a window in the app when the
   // dock icon is clicked and there are no other windows open.
   if (win === null) {
      createWindow();
   }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
