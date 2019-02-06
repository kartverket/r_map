const path = require('path')
module.exports = {
    title: "rMapComponent",
    styleguideDir: "docs",
   
    webpackConfig: require('react-scripts/config/webpack.config.js'),
    contextDependencies: [path.resolve(__dirname, 'src/components')],
    require: [
        path.join(__dirname, 'src/styleguide/styleguide.js'),
        'babel-polyfill',
        'whatwg-fetch',
        'ol/ol.css'
    ],
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
    }],
    template: {
        head: {
            links: [
                {
                    rel: 'stylesheet',
                    href: 'src/styleguide/styleguide.css'
                }
            ]
        },
        favicon: 'src/styleguide/favicon.ico'
    },
    theme: {
        fontFamily: {
            sidebarWidth: 300,
            base: '"Open Sans", sans-serif'
        }
    }
};