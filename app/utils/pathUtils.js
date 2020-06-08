import path from 'path';

// LR: Path Utility
// eslint-disable-next-line import/prefer-default-export
export function uriFromPath(_path) {
  let pathName = path.resolve(_path).replace(/\\/g, '/');

  if (pathName.length > 0 && pathName.charAt(0) !== '/') {
    pathName = `/${pathName}`;
  }
  return encodeURI(`file://${pathName}`);
}
