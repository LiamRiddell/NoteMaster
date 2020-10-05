module.exports = {
  extends: 'erb',
  rules: {
    'import/no-extraneous-dependencies': 'off',
    'react/display-name': 'off',
    'react/jsx-filename-extension': 'off'
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: require.resolve('./configs/webpack.config.eslint.js')
      }
    }
  }
}
