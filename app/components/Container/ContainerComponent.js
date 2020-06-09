/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/prefer-default-export */
/** @jsx jsx */
import { jsx } from 'theme-ui';

// eslint-disable-next-line no-unused-vars
export const ContainerComponent = (props: object) => {
  return (
    <div
      sx={{
        width: '100%',
        padding: props.padding || '0',
        margin: '0 auto',
        maxWidth: '720px'
      }}
    >
      {props.children}
    </div>
  );
};
