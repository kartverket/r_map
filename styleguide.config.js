const path = require('path');
const fs = require('fs');
const webpackCommonConf = require('./webpack.common.config.js');

module.exports = {
  title: 'react-geo',
  styleguideDir: './dist/styleguide',
  ignore: [
    '**/__tests__/**',
    '**/*.test.{js,jsx,ts,tsx}',
    '**/*.spec.{js,jsx,ts,tsx}',
    '**/*.d.ts',
    '**/src/**/*.example.jsx'
  ],
  showUsage: true,
  getExampleFilename(componentPath) {
    return componentPath.replace(/\.jsx?$/, '.example.md')
  },
  getComponentPathLine(componentPath) {
    const name = path.basename(componentPath, '.jsx')
    return `import { ${name} } from 'r_map';`
  },
  require: [
    'babel-polyfill',
    'whatwg-fetch',
    'ol/ol.css'
  ],
  webpackConfig: webpackCommonConf,
  sections: [{
    name: 'Introduction',
    content: 'README.md'
  }, {
    name: 'Components',
    sections: [{
      name: 'AddWmsPanel',
      components: 'src/components/AddWmsPanel/**/*.jsx'
    }, {
      name: 'BackgroundChooser',
      components: 'src/components/BackgroundChooser/**/*.jsx'
    }, {
      name: 'MapComponent',
      components: 'src/components/MapComponent/**/*.jsx'
    }]
  }]
};
