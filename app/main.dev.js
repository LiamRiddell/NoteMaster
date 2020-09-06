/* eslint-disable import/no-extraneous-dependencies */
/* eslint global-require: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */
import { app, BrowserWindow } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import installExtension, {
  REDUX_DEVTOOLS,
  REACT_DEVELOPER_TOOLS,
  REACT_PERF
} from 'electron-devtools-installer';
import AppTray from './tray';
import { debounce } from './utils/eventUtils';
import {
  isAppOffScreen,
  getPrimaryScreenCenterBounds
} from './utils/screenUtils';
import store from './service/LocalStoreService';

const path = require('path');

const electron = require('electron');

const { ipcMain, nativeImage, globalShortcut } = electron;

// LR: Auto Updater
export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

// LR: Environment Specific Imports
if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
}

// LR: Defines
let mainWindow: Object;
// eslint-disable-next-line no-unused-vars
let tray;
const appIconPath = path.join(app.getAppPath(), '/static/icon.png');
const appIcon = nativeImage.createFromPath(appIconPath);
const singleInstanceLock = app.requestSingleInstanceLock();

// LR: Prevent flickering on restore
app.commandLine.appendSwitch('wm-window-animations-disabled');

// LR: Auto Launch Config
app.setLoginItemSettings({
  openAtLogin: store.get('preferences.autoLaunch') || true
  // path: app.getPath('exe')
});

const installExtensions = async () => {
  // eslint-disable-next-line no-console
  console.log('Installing Dev Addons');

  installExtension([REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS, REACT_PERF])
    // eslint-disable-next-line no-console
    .then(name => console.log(`Added Extension:  ${name}`))
    // eslint-disable-next-line no-console
    .catch(err => console.log('An error occurred: ', err));

  // eslint-disable-next-line no-console
  console.log('Finished Installing Dev Addons');
};

const createWindow = async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  const isFirstLoad = !store.has('window.bounds');
  const savedWindowBounds = store.get('window.bounds') || {
    x: 0,
    y: 0,
    width: 425,
    height: 425
  };

  mainWindow = new BrowserWindow({
    title: 'NoteMaster',
    icon: appIcon,
    show: false,
    frame: false,
    minWidth: 362,
    minHeight: 362,
    width: savedWindowBounds.width,
    height: savedWindowBounds.height,
    center: isFirstLoad,
    transparent: true,
    fullscreen: false,
    fullscreenable: false,
    defaultFontSize: 12,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // LR: Set the minimum size. Looks like minWidth and minHeight are ignored.
  mainWindow.setMinimumSize(362, 362);

  // Rewrite getNormalBounds, maximize, unmaximize and isMaximized API for the transparent window
  // https://github.com/electron/electron/issues/19934#issuecomment-602062202
  if (mainWindow.webContents.browserWindowOptions.transparent) {
    let { resizable } = mainWindow.webContents;
    let normalBounds = mainWindow.getNormalBounds
      ? mainWindow.getNormalBounds()
      : mainWindow.getBounds();

    // eslint-disable-next-line func-names
    mainWindow.getNormalBounds = function() {
      if (!this.isMaximized()) {
        if (BrowserWindow.prototype.getNormalBounds) {
          normalBounds = BrowserWindow.prototype.getNormalBounds.call(this);
        } else {
          normalBounds = BrowserWindow.prototype.getBounds.call(this);
        }
      }
      return normalBounds;
    }.bind(mainWindow);

    // eslint-disable-next-line func-names
    mainWindow.maximize = function() {
      normalBounds = this.getNormalBounds(); // store the bounds of normal window
      resizable = mainWindow.webContents.resizable; // store resizable value
      BrowserWindow.prototype.maximize.call(this);
      if (!BrowserWindow.prototype.isMaximized.call(this)) {
        // while isMaximized() was returning false, it will not emit 'maximize' event
        this.emit('maximize', { sender: this, preventDefault: () => {} });
      }
      mainWindow.webContents.resizable = false; // disable resize when the window is maximized
    }.bind(mainWindow);

    // eslint-disable-next-line func-names
    mainWindow.unmaximize = function() {
      const fromMaximized = BrowserWindow.prototype.isMaximized.call(this);
      BrowserWindow.prototype.unmaximize.call(this);
      if (!fromMaximized) {
        // isMaximized() returned false before unmaximize was called, it will not emit 'unmaximize' event
        this.emit('unmaximize', { sender: this, preventDefault: () => {} });
      }
      mainWindow.webContents.resizable = resizable; // restore resizable
    }.bind(mainWindow);

    // eslint-disable-next-line func-names
    mainWindow.isMaximized = function() {
      const nativeIsMaximized = BrowserWindow.prototype.isMaximized.call(this);
      if (!nativeIsMaximized) {
        // determine whether the window is full of the screen work area
        const bounds = this.getBounds();
        const { workArea } = electron.screen.getDisplayMatching(bounds);
        if (
          bounds.x <= workArea.x &&
          bounds.y <= workArea.y &&
          bounds.width >= workArea.width &&
          bounds.height >= workArea.height
        ) {
          return true;
        }
      }
      return nativeIsMaximized;
    }.bind(mainWindow);
  }

  // LR: Check on-startup whether the window is offscreen
  if (!isFirstLoad) {
    if (isAppOffScreen(savedWindowBounds)) {
      const resetBounds = getPrimaryScreenCenterBounds(savedWindowBounds);
      mainWindow.setBounds(resetBounds);
    } else {
      mainWindow.setBounds(savedWindowBounds);
    }
  }

  // LR: Load our app page
  mainWindow.loadURL(`file://${__dirname}/app.html`);

  // LR: Register Event Handlers
  const mainWindowUpdate = (e, newBounds) => {
    const isResizeOrMoveEvent = newBounds !== null;
    if (isResizeOrMoveEvent) {
      mainWindow.webContents.send('ipc-redux-windowUpdate', {
        bounds: newBounds,
        isMinimized: mainWindow.isMinimized(),
        isMaximized: mainWindow.isMaximized(),
        isNormal: mainWindow.isNormal(),
        isFullscreen: mainWindow.isFullScreen(),
        isPinned: mainWindow.isAlwaysOnTop()
      });
    } else {
      mainWindow.webContents.send('ipc.redux.windowUpdate', {
        isMinimized: mainWindow.isMinimized(),
        isMaximized: mainWindow.isMaximized(),
        isNormal: mainWindow.isNormal(),
        isFullscreen: mainWindow.isFullScreen(),
        isPinned: mainWindow.isAlwaysOnTop()
      });
    }
  };

  const mainWindowResizeEvent = (e, newBounds) => {
    store.set('window.bounds', newBounds);
    mainWindowUpdate(e, newBounds);
  };

  const mainWindowMoveEvent = (e, newBounds) => {
    store.set('window.bounds', newBounds);
    mainWindowUpdate(e, newBounds);
  };

  // LR: Register Event Listeners
  // @TODO: Use 'ready-to-show' event
  // https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }

    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }

    // LR: Send update to renderer for the initial windows state
    mainWindowUpdate(null, savedWindowBounds);
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.on('will-resize', debounce(mainWindowResizeEvent, 100));
  mainWindow.on('will-move', debounce(mainWindowMoveEvent, 100));

  mainWindow.on('minimize', mainWindowUpdate);
  mainWindow.on('maximize', mainWindowUpdate);
  mainWindow.on('unmaximize', mainWindowUpdate);
  mainWindow.on('show', mainWindowUpdate);
  mainWindow.on('hide', mainWindowUpdate);
  mainWindow.on('restore', mainWindowUpdate);
  mainWindow.on('enter-full-screen', mainWindowUpdate);
  mainWindow.on('leave-full-screen', mainWindowUpdate);

  // LR: IPC Channels
  ipcMain.on('ipc-window-minimize', () => {
    mainWindow.minimize();
  });

  ipcMain.on('ipc-window-maximize', () => {
    mainWindow.maximize();
  });

  ipcMain.on('ipc-window-unmaximize', () => {
    mainWindow.unmaximize();
  });

  ipcMain.on('ipc-window-hide', () => {
    mainWindow.hide();
  });

  ipcMain.on('ipc-window-pinned', () => {
    if (mainWindow.isAlwaysOnTop()) {
      mainWindow.setAlwaysOnTop(false);
    } else {
      mainWindow.setAlwaysOnTop(true);
    }
  });

  // LR: Tray
  tray = new AppTray(appIcon, mainWindow);

  // LR: Setup Global Shortcut
  globalShortcut.register('Super+N', () => {
    const windowBounds = mainWindow.getBounds();

    if (isAppOffScreen(windowBounds)) {
      const resetBounds = getPrimaryScreenCenterBounds(windowBounds);
      mainWindow.setBounds(resetBounds);
    }

    let bCanHideWindow = true;

    // If the window is in the tray - Show
    if (!mainWindow.isVisible()) {
      bCanHideWindow = false;
      mainWindow.show();
    }

    // If the window is behind apps - Focus
    if (!mainWindow.isFocused()) {
      bCanHideWindow = false;
      mainWindow.focus();
    }

    // If the window is visible - Hide
    if (mainWindow.isVisible() && bCanHideWindow) {
      mainWindow.hide();
    }
  });

  // LR: Make external links open in browser
  mainWindow.webContents.on('new-window', (e, url) => {
    e.preventDefault();
    electron.shell.openExternal(url);
  });

  // LR: Hide for now...
  // const menuBuilder = new MenuBuilder(mainWindow);
  // menuBuilder.buildMenu();

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */
app.on('window-all-closed', () => {
  // Unregister all shortcuts.
  globalShortcut.unregisterAll();

  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});

// Single Instance Lock
if (!singleInstanceLock) {
  app.quit();
} else {
  // eslint-disable-next-line no-unused-vars
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();

      if (!mainWindow.isVisible()) mainWindow.show();

      mainWindow.focus();
    }
  });

  app.on('ready', createWindow);
}
