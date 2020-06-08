/* eslint-disable import/prefer-default-export */
import { screen } from 'electron';

// TODO: Flips the logic in the loop so that we can break out of the loop once condition is true
export const isAppOffScreen = windowBounds => {
  const displays = screen.getAllDisplays();
  let isNotOffScreen = false;

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < displays.length; i++) {
    const display = displays[i];
    const { workArea } = display;

    if (
      windowBounds.x >= workArea.x &&
      windowBounds.y >= workArea.y &&
      windowBounds.x <= workArea.width &&
      windowBounds.y <= workArea.height
    ) {
      isNotOffScreen = true;
    }
  }

  return !isNotOffScreen;
};

export const getPrimaryScreenCenterBounds = windowBounds => {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;

  const halfWindowWidth = windowBounds.width / 2;
  const halfWindowHeight = windowBounds.height / 2;

  return {
    x: width / 2 - halfWindowWidth,
    y: height / 2 - halfWindowHeight,
    width: windowBounds.width,
    height: windowBounds.height
  };
};
