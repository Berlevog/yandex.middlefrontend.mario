"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildCommonConfig = void 0;
var path_1 = __importDefault(require("path"));
var webpack_1 = __importDefault(require("webpack"));
var autoprefixer_1 = __importDefault(require("autoprefixer"));
var mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
var buildCommonConfig = function (_a) {
    var isProduction = _a.isProduction, srcPath = _a.srcPath, rootPath = _a.rootPath, devServer = _a.devServer;
    var cssLoader = function (withModules) {
        if (withModules === void 0) { withModules = false; }
        return [
            isProduction
                ? {
                    loader: mini_css_extract_plugin_1.default.loader,
                }
                : {
                    loader: 'style-loader',
                },
            {
                loader: 'css-loader',
                options: {
                    importLoaders: 2,
                    modules: withModules
                        ? { localIdentName: '[name]__[local]__[contenthash:base64:5]' }
                        : false,
                },
            },
            {
                loader: 'postcss-loader',
                options: {
                    plugins: function () { return [autoprefixer_1.default()]; },
                },
            },
            {
                loader: 'sass-loader',
            },
        ];
    };
    return {
        target: 'web',
        context: rootPath,
        mode: isProduction ? 'production' : 'development',
        devtool: isProduction ? 'source-map' : 'eval-source-map',
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx'],
            alias: {
                // 'react-dom': '@hot-loader/react-dom',
                components: path_1.default.join(srcPath, 'components'),
                config: path_1.default.join(srcPath, 'config'),
                img: path_1.default.join(srcPath, 'img'),
                pages: path_1.default.join(srcPath, 'pages'),
                styles: path_1.default.join(srcPath, 'styles'),
                utils: path_1.default.join(srcPath, 'utils'),
            },
        },
        module: {
            rules: [
                {
                    test: /\.(ts|js)x?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    require('@babel/preset-env'),
                                    {
                                        useBuiltIns: 'entry',
                                        corejs: 3,
                                    },
                                ],
                                require('@babel/preset-react'),
                                require('@babel/preset-typescript'),
                            ],
                            plugins: [
                                devServer && require.resolve('react-refresh/babel'),
                                require('@loadable/babel-plugin'),
                                require('@babel/plugin-proposal-export-default-from'),
                                require('@babel/plugin-proposal-class-properties'),
                                require('@babel/plugin-transform-async-to-generator'),
                            ].filter(Boolean),
                        },
                    },
                },
                {
                    test: /\.(png|jpg)$/,
                    // exclude: /\.(component|c)\.svg$/,
                    type: 'asset',
                    generator: {
                        filename: 'static/img/[name].[contenthash].[ext]',
                    },
                    parser: {
                        dataUrlCondition: {
                            maxSize: 8192,
                        },
                    },
                },
                {
                    test: /\.svg$/,
                    use: [
                        {
                            loader: '@svgr/webpack',
                            options: {
                                memo: true,
                                svgoConfig: {
                                    plugins: {
                                        removeViewBox: false,
                                    },
                                },
                            },
                        },
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 8192,
                                publicPath: '/static/',
                                outputPath: 'static/',
                                name: 'img/[name].[contenthash].[ext]',
                            },
                        },
                    ],
                },
                {
                    test: /\.(eot|woff2|woff|ttf?)$/,
                    type: 'asset',
                    generator: {
                        filename: 'static/fonts/[name].[contenthash].[ext]',
                    },
                },
                {
                    test: /\.s?css$/,
                    exclude: /\.modules\.(s?css|sass)$/,
                    use: cssLoader(),
                },
                {
                    test: /\.modules\.(s?css|sass)$/,
                    use: cssLoader(true),
                },
            ],
        },
        plugins: [
            new webpack_1.default.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                },
                isProduction: JSON.stringify(isProduction),
            }),
        ].filter(Boolean),
    };
};
exports.buildCommonConfig = buildCommonConfig;
