/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/prefer-default-export */
import React from 'react';

import styles from './ScrollableContentComponent.css';

// eslint-disable-next-line no-unused-vars
export const ScrollableContentComponent = props => {
  // eslint-disable-next-line react/prop-types
  return <div className={styles.scrollableContent}>{props.children}</div>;
};
