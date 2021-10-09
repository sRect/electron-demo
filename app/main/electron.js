// import { app, BrowserWindow } from "electron";
const { app, BrowserWindow } = require("electron");
const path = require("path");

// https://www.electronjs.org/docs/tutorial/quick-start
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  win.loadFile(path.join(__dirname, "./index.html"));
  // win.loadURL("./index.html");
}

app.whenReady().then(() => {
  createWindow();
  // 如果没有窗口打开则打开一个窗口 (macOS)
  app.on("activate", () => {
    if (!BrowserWindow.getAllWindows().length) {
      createWindow();
    }
  });

  // 关闭所有窗口时退出应用 (Windows & Linux)
  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
  });
});
