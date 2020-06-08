/* eslint-disable flowtype/no-weak-types */
/* eslint-disable no-unused-vars */
// @flow
import React, { Component } from 'react';

// LR: Import components
import TitlebarComponent from '../../components/Titlebar/TitlebarComponent';
import MonacoEditorComponent from '../../components/MonacoEditor/MonacoEditorComponent';

// LR: Import styles
import styles from './DefaultRoute.css';

export default (props: Object) => {
  return (
    <div className={styles.container} data-tid="container">
      <div className={styles.header}>
        <TitlebarComponent />
      </div>
      <div className={styles.editor}>
        <MonacoEditorComponent />
      </div>
    </div>
  );
};
