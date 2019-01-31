import {
	app,
	BrowserWindow,
	ipcMain
} from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
	global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}
// BrowserWindow.webContents.openDevTools();

let mainWindow
const winURL = process.env.NODE_ENV === 'development' ?
	`http://localhost:9080` :
	`file://${__dirname}/index.html`

function createWindow() {
	/**
	 * Initial window options
	 */
	mainWindow = new BrowserWindow({
		width: 850,
		height: 590,
		minWidth:710,
		minHeight:500,
		useContentSize: true,
		show: false, //为了避免第一次启动时用户看到还未完成得界面
		frame: false, //取消浏览器边框
		webPreferences: {webSecurity: false,'plugins': true},
	})
	mainWindow.loadURL(winURL)
	
	//显示窗口，此时渲染进程完成第一次渲染
	mainWindow.once('ready-to-show', () => {
		mainWindow.show()
	})
	
	//载入vue开发调试工具
	BrowserWindow.addDevToolsExtension(
		"C:/Users/Administrator/AppData/Local/Google/Chrome/User Data/Default/Extensions/nhdogjmejiglipccpnnnanhbledajbpd/4.1.5_0"
	);
	//打开vue开发者工具
	mainWindow.webContents.openDevTools()

	mainWindow.on('closed', () => {
		mainWindow = null
	})

}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	if (mainWindow === null) {
		createWindow()
	}
})

//监听自定义关闭按钮bar
ipcMain.on('min', e=> mainWindow.minimize());
ipcMain.on('max', e=> {
if (mainWindow.isMaximized()) {
mainWindow.unmaximize()
} else {
mainWindow.maximize()
}
});
ipcMain.on('close', e=> mainWindow.close());

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
