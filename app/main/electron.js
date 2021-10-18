// import { app, BrowserWindow } from "electron";
const { app, BrowserWindow } = require("electron");
const path = require("path");
const rootDir = process.cwd();

function isDev() {
	// 👉 还记得我们配置中通过 webpack.DefinePlugin 定义的构建变量吗
	return process.env.NODE_ENV === "development";
}

// https://www.electronjs.org/docs/tutorial/quick-start
function createWindow() {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true, // 注入node模块
			devTools: true,
		},
	});

	// win.loadURL("./index.html");
	// win.loadFile(path.join(__dirname, "./index.html"));

	isDev()
		? win.loadURL(`http://127.0.0.1:7001`)
		: win.loadURL(`file://${path.join(rootDir, "dist/index.html")}`);
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
