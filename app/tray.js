const { app, Tray, Menu } = require('electron');

class AppTray extends Tray {
  constructor(iconPath, mainWindow) {
    super(iconPath);
    this.iconPath = iconPath;
    this.mainWindow = mainWindow;
    this.on('click', this.onClick.bind(this));
    this.on('right-click', this.onRightClick.bind(this));
    this.setToolTip('NoteMaster');
  }

  // eslint-disable-next-line no-unused-vars
  onClick(evt, bounds) {
    const { x, y, width, height } = this.mainWindow.getBounds();
    const windowBounds = {
      x,
      y,
      width,
      height
    };

    if (this.mainWindow.isVisible()) {
      this.mainWindow.hide();
    } else {
      this.mainWindow.setBounds(windowBounds);
      this.mainWindow.show();
    }
  }

  onRightClick() {
    const menuConfig = Menu.buildFromTemplate([
      {
        label: 'Quit',
        click: () => app.quit()
      }
    ]);
    this.popUpContextMenu(menuConfig);
  }
}

export default AppTray;
