import { app, BrowserWindow, ipcMain, Menu, globalShortcut, dialog } from 'electron';
import installExtension, { REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import path from 'path';
// const rootDir = process.cwd();

// https://github.com/sindresorhus/electron-store
// electron-store不再提供CommonJS导出
// Requires Electron 30 or later.
import Store from 'electron-store';
// https://github.com/sindresorhus/electron-store/issues/212
// 必须在主进程内调用静态方法initRenderer
Store.initRenderer();

function isDev() {
  return process.env.NODE_ENV === 'development';
}

// 快捷键注册
function registryShortcut(mainWindow: any) {
  // https://www.electronjs.org/zh/docs/latest/api/global-shortcut
  globalShortcut.register('CommandOrControl+J+K', () => {
    // 获取当前窗口
    mainWindow.webContents.openDevTools();
  });
}

// https://www.electronjs.org/docs/tutorial/quick-start
function createWindow() {
  // 关闭顶部导航菜单栏
  Menu.setApplicationMenu(null);

  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true, // 注入node模块
      contextIsolation: false,
      // preload: path.join(rootDir, 'app/main/preload.js'),
      devTools: true,
    },
  });
  const devtools = new BrowserWindow()

  // mainWindow.loadURL("./index.html");
  // mainWindow.loadFile(path.join(__dirname, "./index.html"));

  try {
    isDev()
      ? mainWindow.loadURL(`http://127.0.0.1:7001`)
      : mainWindow.loadURL(`file://${path.join(__dirname, '../dist/index.html')}`);
  } catch (error) {
    console.log(error);
  }

  // 打开开发工具
  if (isDev()) {
    mainWindow.webContents.setDevToolsWebContents(devtools.webContents);
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  }

  return mainWindow;
}

app.whenReady().then(() => {
  const mainWindow = createWindow();
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

  ipcMain.on('showErrorBox', (event, arg) => {
    dialog.showErrorBox("提示", arg);
  });

  ipcMain.on('get-redux-persist-data', (event, arg) => {
		// https://github.com/sindresorhus/electron-store
    const userData = app.getPath("userData");

		event.reply('reply-redux-persist-data', userData);
  });

  // 注册快捷键
  // if (process.env.NODE_ENV === 'production') {
  //   registryShortcut(mainWindow);
  // }
  mainWindow && registryShortcut(mainWindow);

  app.on('will-quit', () => {
    globalShortcut.unregisterAll();
  });

  // https://github.com/MarshallOfSound/electron-devtools-installer
  installExtension([REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS])
    .then((name) => console.log(`redux added Extension:  ${name}`))
    .catch((err) => console.log('readux an error occurred: ', err));
});
