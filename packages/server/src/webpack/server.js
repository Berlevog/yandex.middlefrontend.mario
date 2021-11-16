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
exports.buildServerConfig = void 0;
var path = __importStar(require("path"));
var webpack_merge_1 = require("webpack-merge");
var webpack_node_externals_1 = __importDefault(require("webpack-node-externals"));
var common_1 = require("./common");
var buildServerConfig = function (options) {
    var srcPath = options.srcPath, buildPath = options.buildPath;
    return webpack_merge_1.merge(common_1.buildCommonConfig(options), {
        name: 'server',
        target: 'node',
        devtool: 'source-map',
        entry: path.resolve(srcPath, './App.tsx'),
        output: {
            path: path.join(buildPath, 'server'),
            filename: 'server.js',
            library: {
                type: 'commonjs',
            },
        },
        externals: [
            webpack_node_externals_1.default(),
        ],
        node: {
            __dirname: false,
            __filename: false,
        },
    });
};
exports.buildServerConfig = buildServerConfig;
