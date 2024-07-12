import {MenuItem, MenuItemConstructorOptions, dialog, shell, app, BrowserWindow} from "electron";
import {MyBrowserWindow} from "./electron";

// MacOS有一些系统预定义的菜单，像是Services and Windows。 
// 让你的菜单更像MacOS标准菜单，只需设置菜单role值为如下示之一，Electron便会自动认出并设置成标准菜单
// window
// help
// services

// electron 系统默认菜单
// https://github.com/carter-thaxton/electron-default-menu/blob/master/index.js

type TMenuItem = MenuItem | MenuItemConstructorOptions;

/**
 * Creates a default menu for electron apps
 *
 * @param {Object} app electron.app
 * @param {Object} shell electron.shell
 * @returns {Object}  a menu object to be passed to electron.Menu
 */

const createDefaultMenu = ():TMenuItem[] => {

  const template:TMenuItem[] = [
    {
      label: 'Edit',
      submenu: [
        {
          label: 'Undo',
          accelerator: 'CmdOrCtrl+Z',
          role: 'undo'
        },
        {
          label: 'Redo',
          accelerator: 'Shift+CmdOrCtrl+Z',
          role: 'redo'
        },
        {
          type: 'separator'
        },
        {
          label: 'Cut',
          accelerator: 'CmdOrCtrl+X',
          role: 'cut'
        },
        {
          label: 'Copy',
          accelerator: 'CmdOrCtrl+C',
          role: 'copy'
        },
        {
          label: 'Paste',
          accelerator: 'CmdOrCtrl+V',
          role: 'paste'
        },
        {
          label: 'Select All',
          accelerator: 'CmdOrCtrl+A',
          role: 'selectAll'
        },
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Reload',
          accelerator: 'CmdOrCtrl+R',
          click: function(item, focusedWindow) {
            if (focusedWindow)
              focusedWindow.reload();
          }
        },
        {
          label: 'Toggle Full Screen',
          accelerator: (function() {
            if (process.platform === 'darwin')
              return 'Ctrl+Command+F';
            else
              return 'F11';
          })(),
          click: function(item, focusedWindow) {
            if (focusedWindow)
              focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
          }
        },
        {
          label: 'Toggle Developer Tools',
          accelerator: (function() {
            if (process.platform === 'darwin')
              return 'Alt+Command+I';
            else
              return 'Ctrl+Shift+I';
          })(),
          click: function(item, focusedWindow) {
            if (focusedWindow)
              focusedWindow.webContents.toggleDevTools();
          }
        },
      ]
    },
    {
      label: 'Window',
      role: 'window',
      submenu: [
        {
          label: 'Minimize',
          accelerator: 'CmdOrCtrl+M',
          role: 'minimize'
        },
        {
          label: 'Close',
          accelerator: 'CmdOrCtrl+W',
          role: 'close'
        },
      ]
    },
    {
      label: 'Help',
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click: function() { shell.openExternal('http://electron.atom.io') }
        },
      ]
    },
  ];

  if (process.platform === 'darwin') {
    const { name } = app;
    template.unshift({
      label: name,
      submenu: [
        {
          label: 'About ' + name,
          role: 'about'
        },
        {
          type: 'separator'
        },
        {
          label: 'Services',
          role: 'services',
          submenu: []
        },
        {
          type: 'separator'
        },
        {
          label: 'Hide ' + name,
          accelerator: 'Command+H',
          role: 'hide'
        },
        {
          label: 'Hide Others',
          accelerator: 'Command+Shift+H',
          role: 'hideOthers'
        },
        {
          label: 'Show All',
          role: 'unhide'
        },
        {
          type: 'separator'
        },
        {
          label: 'Quit',
          accelerator: 'Command+Q',
          click: function() { app.quit(); }
        },
      ]
    });

    const windowMenu = template.find(function(m) { return m.role === 'window' });
    if (windowMenu && windowMenu.submenu && Array.isArray(windowMenu.submenu)) {
      windowMenu.submenu.push(
        {
          type: 'separator'
        },
        {
          label: 'Bring All to Front',
          role: 'front'
        }
      );
    }
  }

  return template;
}

const customeMenu: TMenuItem[] = [
  ...createDefaultMenu(),
  {
    label: '自定义菜单1',
    role: 'help',
    submenu: [
      {
        label: "欢迎",
        click: () => {
          dialog.showMessageBox({
            message: "欢迎使用electron",
            type: "info"
          });
        }
      },
      {
        label: '关于',
        click: () => {
          dialog.showMessageBox({
            message: "测试",
            type: "info"
          });
        }
      },
      {
        label: "显示保存文件窗口",
        click: () => {
          const allWindows: MyBrowserWindow[] = BrowserWindow.getAllWindows();
          const saveFileWindow = allWindows.find(item => item.uid ==='saveFileWindow');

          if(saveFileWindow) {
            if(!saveFileWindow.isVisible()) {
              saveFileWindow.show();
              saveFileWindow.focus();
            }

            if(saveFileWindow.isMinimized()) {
              saveFileWindow.restore();
            }
          
          }
        }
      },
      {
        label: '退出',
        click: () => {
          app.quit();
        }
      }
    ]
  },
  {
    label: '自定义菜单2',
    submenu: [
      {
        label: '刷新当前页面',
        accelerator: 'CmdOrCtrl+R',
        click: (item, focusedWindow) => {
          if (focusedWindow) {
            focusedWindow.reload();
          }
        },
      },
      {
        label: '复制',
        accelerator: 'CommandOrControl+C',
        toolTip: "选中文本点击即可自动复制",
        role: 'copy',
      },
      {
        label: '粘贴',
        accelerator: 'CommandOrControl+V',
        toolTip: "鼠标移动到目标位置后点击即可粘贴",
        role: 'paste',
      },
    ]
  },
];

export default customeMenu;
