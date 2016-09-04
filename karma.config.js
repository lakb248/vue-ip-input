var baseConfig = require('./webpack.base.config');
var merge = require('webpack-merge');
delete baseConfig.entry;

var webpackConfig = merge(baseConfig, {
    vue: {
        loaders: {
            js: 'isparta'
        }
    }
});

module.exports = function(config) {
    config.set({
        browsers: ['PhantomJS'],
        frameworks: ['jasmine'],
        reporters: ['progress', 'coverage', 'verbose'],
        // this is the entry file for all our tests.
        files: ['./test/index.js'],
        // we will pass the entry file to webpack for bundling.
        preprocessors: {
            './test/index.js': ['webpack']
        },
        coverageReporter: {
            dir: './coverage',
            reporters: [
                {type: 'html'},
                {type: 'text-summary'},
                {type: 'cobertura', subdir: '.'}
            ]
        },
        webpack: webpackConfig,
        webpackMiddleware: {
            noInfo: true
        },
        singleRun: true
    });
};
