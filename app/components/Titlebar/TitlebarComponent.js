/* eslint-disable flowtype/no-weak-types */
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
import styles from './TitlebarComponent.css';

const { ipcRenderer } = require('electron');
const { dialog } = require('electron').remote;
const fs = require('fs');

// LR: Menu Dropdown Content
const NoteMasterDropdown = (props: Object) => {
  return (
    <nav className={styles.navigation}>
      <ul>
        <li>
          <a onClick={props.exportNote} role="button">
            <i className="ri-folder-upload-line" />
            Export note
          </a>
        </li>
        <li>
          <NavLink exact to="/preferences">
            <i className="ri-settings-3-line" />
            Preferences
          </NavLink>
        </li>
        <li>
          <a
            href="https://github.com/LiamRiddell/NoteMaster"
            // eslint-disable-next-line react/jsx-no-target-blank
            target="_blank"
            rel="noreferer"
          >
            <i className="ri-github-fill" />
            GitHub
          </a>
        </li>
        <li>
          <a
            href="https://github.com/LiamRiddell/NoteMaster/issues"
            // eslint-disable-next-line react/jsx-no-target-blank
            target="_blank"
            rel="noreferer"
          >
            <i className="ri-bug-line" />
            Bug report
          </a>
        </li>
      </ul>
    </nav>
  );
};

const TitlebarComponent = (props: Object) => {
  // eslint-disable-next-line no-unused-vars
  const toggleMenu = () => {
    console.log('toggle menu');
  };

  // eslint-disable-next-line no-unused-vars
  const exportNote = () => {
    dialog
      .showSaveDialog({
        title: 'Export Note',
        filters: [
          {
            name: 'Text File',
            extensions: ['txt']
          }
        ]
      })
      .then(result => {
        // eslint-disable-next-line promise/always-return
        if (result.canceled) return;

        return fs.writeFileSync(
          result.filePath,
          props.preferences.autosaveContent,
          'utf8'
        );
      })
      .catch(err => {
        console.log(err);
      });
  };

  // eslint-disable-next-line no-unused-vars
  const minimize = () => {
    ipcRenderer.send('ipc-window-minimize');
  };

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

  const hide = () => {
    ipcRenderer.send('ipc-window-hide');
  };

  return (
    <div className={styles.titlebar} data-tid="titlebar">
      <TooltipComponent
        content={
          <NoteMasterDropdown save={toggleMenu} exportNote={exportNote} />
        }
        interactive
        theme="dropdown"
        trigger="mouseenter focus click"
      >
        <div className={styles.menu}>
          <div className={styles.action} role="button">
            <img
              src="./static/icon.png"
              alt="NoteMaster Logo"
              width="18"
              height="18"
            />
          </div>
        </div>
      </TooltipComponent>

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
          <div className={styles.action} onClick={hide} role="button">
            <i className="ri-close-line" />
          </div>
        </TooltipComponent>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  window: state.window,
  preferences: state.preferences
});

const mapDispatchToProps = dispatch => ({
  windowUpdate: (payload: Object) => dispatch(windowUpdate(payload))
});

export default connect(
  (mapStateToProps: OP),
  (mapDispatchToProps: OP)
)(TitlebarComponent);
