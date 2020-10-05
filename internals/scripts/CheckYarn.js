// @flow

if (!/yarn\.js$/.test(process.env.npm_execpath || '')) {
  // eslint-disable-next-line no-console
  console.warn(
    "\u001b[33mYou don't seem to be using yarn. This could produce unexpected results.\u001b[39m"
  );
}
