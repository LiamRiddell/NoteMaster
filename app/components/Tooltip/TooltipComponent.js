/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/prefer-default-export */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import Tippy from '@tippyjs/react';

export const TooltipComponent = props => {
  // eslint-disable-next-line react/prop-types
  return <Tippy {...props}>{props.children}</Tippy>;
};
