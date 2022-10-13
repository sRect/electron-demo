// import { app, BrowserWindow } from "electron";
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const rootDir = process.cwd();

function isDev() {
  return process.env.NODE_ENV === 'development';
}

// https://www.electronjs.org/docs/tutorial/quick-start
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true, // 注入node模块
      contextIsolation: false,
      preload: path.join(rootDir, 'app/main/preload.js'),
      devTools: true,
    },
  });

  // mainWindow.loadURL("./index.html");
  // mainWindow.loadFile(path.join(__dirname, "./index.html"));

  isDev()
    ? mainWindow.loadURL(`http://127.0.0.1:7001`)
    : mainWindow.loadURL(`file://${path.join(rootDir, 'dist/index.html')}`);

  // 打开开发工具
  isDev() && mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();
  // 如果没有窗口打开则打开一个窗口 (macOS)
  app.on('activate', () => {
    if (!BrowserWindow.getAllWindows().length) {
      createWindow();
    }
  });

  // 关闭所有窗口时退出应用 (Windows & Linux)
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  });

  // 监听渲染进程发的消息并回复
  ipcMain.on('get-root-path', (event, arg) => {
    // 为什么要../
    // 因为app.getAppPath获取到的是dist目录
    const rootPath = path.join(app.getAppPath(), '../');
    event.reply('reply-root-path', rootPath);
  });
});
