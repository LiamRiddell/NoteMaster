/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// @flow
import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { TooltipComponent } from '../Tooltip/TooltipComponent';
import { windowUpdate } from '../../redux/actions/window';

// LR: Import styles
import styles from './TitlebarSimpleComponent.css';

const { ipcRenderer } = require('electron');

const TitlebarSimpleComponent = (props: Object) => {
  const togglePinned = () => {
    // LR: Send to ipcMain to handle window functions
    ipcRenderer.send('ipc-window-pinned');

    // LR: Calculate what the state will be
    const isPinned = !props.window.isPinned;

    // LR: Dispatch our state isPinned state to redux
    props.windowUpdate({
      isPinned
    });
  };

  const toggleFullscreen = () => {
    if (props.window.isMaximized) {
      ipcRenderer.send('ipc-window-unmaximize');
    } else {
      ipcRenderer.send('ipc-window-maximize');
    }
  };

  return (
    <div className={styles.titlebar} data-tid="titlebar">
      <div className={styles.menu}>
        <div className={styles.logo}>
          <img
            src="./static/icon.png"
            alt="NoteMaster Logo"
            width="18"
            height="18"
          />
        </div>
      </div>

      <div className={styles.brand}>NoteMaster</div>

      <div className={styles.actions}>
        <TooltipComponent content={props.window.isPinned ? 'Unpin' : 'Pin'}>
          <div className={styles.action} onClick={togglePinned} role="button">
            {props.window.isPinned ? (
              <i className="ri-pushpin-fill" />
            ) : (
              <i className="ri-pushpin-line" />
            )}
          </div>
        </TooltipComponent>

        <TooltipComponent
          content={props.window.isMaximized ? 'Exit Fullscreen' : 'Fullscreen'}
        >
          <div
            className={styles.action}
            onClick={toggleFullscreen}
            role="button"
          >
            {props.window.isMaximized ? (
              <i className="ri-fullscreen-exit-line" />
            ) : (
              <i className="ri-fullscreen-line" />
            )}
          </div>
        </TooltipComponent>

        <TooltipComponent content="Close">
          <NavLink exact to="/" className={styles.action}>
            <i className="ri-close-line" />
          </NavLink>
        </TooltipComponent>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  window: state.window
});

const mapDispatchToProps = dispatch => ({
  windowUpdate: payload => dispatch(windowUpdate(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TitlebarSimpleComponent);
