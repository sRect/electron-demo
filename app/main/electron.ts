import { app, BrowserWindow, Menu, globalShortcut } from 'electron';
import installExtension, { REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import path from 'path';
import customeMenu from './customMenu';
import handleIpcMainListener from "./ipcMainListener";
// const rootDir = process.cwd();

// https://github.com/sindresorhus/electron-store
// electron-store不再提供CommonJS导出
// Requires Electron 30 or later.
import Store from 'electron-store';
// https://github.com/sindresorhus/electron-store/issues/212
// 必须在主进程内调用静态方法initRenderer
Store.initRenderer();

export interface MyBrowserWindow extends BrowserWindow {
  uid?: string
}

function isDev() {
  return process.env.NODE_ENV === 'development';
}

let saveFileWindow: Electron.BrowserWindow & MyBrowserWindow;

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
      devTools: isDev(),
    },
  });

  // 保存文件窗口
  saveFileWindow = new BrowserWindow({
    width: 720,
    height: 240,
    resizable: false,
    show: false, // 初始化时，隐藏窗口
    frame: false,
    webPreferences: {
      nodeIntegration: true, // 注入node模块
      contextIsolation: false,
      // preload: path.join(rootDir, 'app/main/preload.js'),
      devTools: isDev(),
    },
  });

  saveFileWindow.uid = "saveFileWindow"; // 设置唯一窗口属性

  // // 自定义saveFileWindow的关闭事件
  // saveFileWindow.on('close', async (e) => {
  //   saveFileWindow.hide(); // 隐藏窗口
  //   e.preventDefault();
  //   // e.returnValue = false;
  // });

  // mainWindow.loadURL("./index.html");
  // mainWindow.loadFile(path.join(__dirname, "./index.html"));

  try {
    isDev()
      ? mainWindow.loadURL(`http://127.0.0.1:7001`)
      : mainWindow.loadURL(`file://${path.join(__dirname, '../dist/index.html')}`);

    isDev()
      ? saveFileWindow.loadURL(`http://127.0.0.1:7001/saveFile.html`)
      : saveFileWindow.loadURL(`file://${path.join(__dirname, '../dist/saveFile.html')}`);

    // 打开开发工具
    if (isDev()) {
      const devtools = new BrowserWindow();
      
      mainWindow.webContents.setDevToolsWebContents(devtools.webContents);
      mainWindow.webContents.openDevTools({ mode: 'detach' });
      
    } else {
      mainWindow.webContents.closeDevTools();
    }
  } catch (error) {
    console.log(error);
  }

  return mainWindow;
}

app.whenReady().then(() => {
  const mainWindow = createWindow();
  const myMenu = Menu.buildFromTemplate(customeMenu);

  Menu.setApplicationMenu(myMenu);

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

  handleIpcMainListener(saveFileWindow);

  // 注册快捷键
  // if (process.env.NODE_ENV === 'production') {
  //   registryShortcut(mainWindow);
  // }
  if (isDev()) {
    mainWindow && registryShortcut(mainWindow);
  }

  app.on('will-quit', () => {
    globalShortcut.unregisterAll();
  });

  // https://github.com/MarshallOfSound/electron-devtools-installer
  installExtension([REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS])
    .then((name) => console.log(`redux added Extension:  ${name}`))
    .catch((err) => console.log('readux an error occurred: ', err));
});
