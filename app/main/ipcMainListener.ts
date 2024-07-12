import {app, ipcMain, dialog} from "electron";
import path from 'path';
import fs from 'fs/promises';
import {Buffer} from "buffer";
import {MyBrowserWindow} from "./electron";

export default function handleIpcMainListener(saveFileWindow:MyBrowserWindow):void {
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

  ipcMain.on("saveFileWindowHide", () => {
    if(saveFileWindow.isVisible()) {
      saveFileWindow.hide();
    }
  });

  ipcMain.on("saveFileWindowMin", () => {
    if(saveFileWindow.isVisible()) {
      saveFileWindow.minimize();
    }
  })
}
