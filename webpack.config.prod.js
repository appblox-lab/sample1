/* eslint-disable global-require */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const path = require('path');

// adds all your dependencies as shared modules
// version is inferred from package.json in the dependencies
// requiredVersion is used from your package.json
// dependencies will automatically use the highest available package
// in the federated app, based on version requirement in package.json
// multiple different versions might coexist in the federated app
// Note that this will not affect nested paths like "lodash/pluck"
// Note that this will disable some optimization on these packages
// with might lead the bundle size problems
const deps = require('./package.json').dependencies;

console.log('deps === ', deps);
module.exports = {
    entry: './src/index',
    mode: 'production',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 3004,
    },
    output: {
        publicPath: 'https://appblox-house.web.app/_acui_bill_create/',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-react'],
                },
            },
            {
                test: /\.(jpg|png|svg)$/,
                use: {
                    loader: 'url-loader',
                },
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            // Prefer `dart-sass`
                            implementation: require('sass'),
                        },
                    },
                ],
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'billCreate',
            // library: { type: "var", name: "layout" },
            filename: 'remoteEntry.js',
            exposes: {
                './BillCreate': './src/App',
            },
            shared: {
                ...deps,
                react: {
                    import: 'react', // the "react" package will be used a provided and fallback module
                    shareKey: 'react', // under this name the shared module will be placed in the share scope
                    shareScope: 'default', // share scope with this name will be used
                    singleton: true, // only a single version of the shared module is allowed
                    version: '^16.13.1',
                },
                'react-redux': {
                    import: 'react-redux',
                    shareKey: 'react-redux',
                    shareScope: 'default',
                    singleton: true,
                    version: '^7.2.0',
                },
                'react-router-dom': {
                    import: 'react-router-dom',
                    shareKey: 'react-router-dom',
                    shareScope: 'default',
                    singleton: true,
                    version: '^5.2.0',
                },
                'accounts-store': {
                    import: 'accounts-store',
                    shareKey: 'accounts-store',
                    shareScope: 'default',
                    singleton: true,
                },
            },
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
    ],
};
