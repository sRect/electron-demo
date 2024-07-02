import fs from 'fs';
import { promisify } from 'util';
import { ipcRenderer } from 'electron';

export const readFile = async (path: string): Promise<string> => {
  const fsReadFilePromise = promisify(fs.readFile);

  return await fsReadFilePromise(path, { encoding: 'utf8' });
};

export const getAppPath = () => {
  return new Promise((resolve: (value: string) => void, reject: (value: Error) => void) => {
    // https://www.electronjs.org/zh/docs/latest/api/ipc-renderer
    // 从渲染器进程到主进程的异步通信

    // 向主进程发送
    ipcRenderer.send('get-root-path', '');
    ipcRenderer.on('reply-root-path', (event, arg: string) => {
      if (arg) {
        resolve(arg);
      } else {
        reject(new Error('项目路径错误'));
      }
    });
  });
};

export const showErrorBox = (message:string) => {
  // 向主进程发送
  ipcRenderer.send('showErrorBox', message);
}

export const getReduxPersistData = ():Promise<string> => {
  return new Promise((resolve: (value: string) => void, reject: (value: Error) => void) => {
    ipcRenderer.send('get-redux-persist-data', '');

    ipcRenderer.on('reply-redux-persist-data', (event, arg: string) => {
      if (arg) {
        resolve(arg);
      } else {
        reject(new Error('获取redux持久化数据错误'));
      }
    });
  });
}
