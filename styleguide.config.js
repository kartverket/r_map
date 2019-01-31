const path = require('path');
const fs = require('fs');
const webpackCommonConf = require('./webpack.common.config.js');

module.exports = {
  title: 'rMapComponent',
  styleguideDir: './dist/styleguide',
  ignore: [
    '**/__tests__/**',
    '**/*.test.{js,jsx,ts,tsx}',
    '**/*.spec.{js,jsx,ts,tsx}',
    '**/*.d.ts',
    '**/src/**/*.example.jsx'
  ],
  usageMode: 'expand',
  theme: {
    sidebarWidth: 300
  },
  getExampleFilename(componentPath) {
    return componentPath.replace(/\.jsx?$/, '.example.md')
  },
  getComponentPathLine(componentPath) {
    const name = path.basename(componentPath, '.jsx')
    const dir = path.dirname(componentPath).replace('src', 'dist');
    return `import ${name} from 'r_map/${dir}/${name}';`
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
