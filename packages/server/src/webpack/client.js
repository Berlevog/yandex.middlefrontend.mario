"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildClientConfig = void 0;
var path = __importStar(require("path"));
var webpack_1 = __importDefault(require("webpack"));
var webpack_merge_1 = require("webpack-merge");
var mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
var react_refresh_webpack_plugin_1 = __importDefault(require("@pmmmwh/react-refresh-webpack-plugin"));
var common_1 = require("./common");
var buildClientConfig = function (options) {
    var srcPath = options.srcPath, buildPath = options.buildPath;
    var tsConfigPath = path.resolve(srcPath, '../', 'tsconfig.json');
    var indexPath = path.resolve(srcPath, 'index.tsx');
    return webpack_merge_1.merge(common_1.buildCommonConfig(options), {
        name: 'client',
        target: 'web',
        devtool: 'source-map',
        entry: [
            indexPath,
            !options.isProduction && 'webpack-hot-middleware/client',
        ].filter(Boolean),
        output: {
            path: path.join(buildPath, 'client'),
            publicPath: '/',
            filename: 'static/js/bundle.[contenthash].js',
        },
        plugins: [
            new mini_css_extract_plugin_1.default({
                filename: 'static/css/bundle.[name].[contenthash].css',
            }),
            !options.isProduction && new webpack_1.default.HotModuleReplacementPlugin(),
            !options.isProduction &&
                new react_refresh_webpack_plugin_1.default({
                    overlay: {
                        sockIntegration: 'whm',
                    },
                }),
        ].filter(Boolean),
    });
};
exports.buildClientConfig = buildClientConfig;
