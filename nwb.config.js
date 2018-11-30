module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'MapComponent',
      externals: {
        react: 'React'
      }
    }
  }
}
