import { app, BrowserWindow, ipcMain, Menu, globalShortcut, dialog } from 'electron';
import installExtension, { REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import path from 'path';
import fs from 'fs/promises';
import {Buffer} from "buffer";
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

let saveFileWindow: Electron.BrowserWindow;

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

  // 保存文件窗口
  saveFileWindow = new BrowserWindow({
    width: 720,
    height: 240,
    resizable: false,
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

    isDev()
      ? saveFileWindow.loadURL(`http://127.0.0.1:7001/saveFile.html`)
      : saveFileWindow.loadURL(`file://${path.join(__dirname, '../dist/saveFile.html')}`);
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

  ipcMain.on("changeSavePath", (event) => {
    if(saveFileWindow) {
      dialog.showOpenDialog(saveFileWindow, { 
        title: "选择保存路径",
        defaultPath: "/Users/fangchaoqun/Desktop",
        properties: ['openDirectory'] 
      })
        .then((res) => {
          if (res.canceled) {
            event.reply("confirmChangeSavePath", "");
            return;
          }
          const { filePaths } = res;
          event.reply("confirmChangeSavePath", filePaths[0]);
        })
        .catch(error => {
          console.log(error);
          event.reply("confirmChangeSavePath", error);
        });
    } else {
      event.reply("confirmChangeSavePath", new Error("saveFileWindow不存在"));
    }
  });

  ipcMain.on("showSaveDialog", (event, arg: TSaveFileProps) => {
    if(saveFileWindow) {
      dialog.showSaveDialog(saveFileWindow, {
        title: "保存文件",
        message: "保存文件到目标文件夹测试",
        defaultPath: `${arg.filePath}/${arg.fileName}.${arg.fileExtensions}`,
        filters: [  
          { name: `${arg.fileName}`, extensions: [arg.fileExtensions] } // 替换为你的文件类型  
        ]
      })
        .then(async res => {
          if(res.canceled) {
            event.reply("confirmSaveFile", "");
            return;
          }

          const { filePath } = res;
          await fs.writeFile(`${filePath}`, Buffer.from(arg.arrayBuffer)); // 注意：这里 fileData 应该是 Buffer 

          event.reply("confirmSaveFile", filePath);
          dialog.showMessageBox(saveFileWindow, {
            title: "提示",
            message: "保存成功",
            type: "info"
          });
        })
        .catch(error => {
          console.log(error);
          event.reply("confirmSaveFile", error);
        });
    } else {
      event.reply("confirmSaveFile", new Error("saveFileWindow不存在"));
    }
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
