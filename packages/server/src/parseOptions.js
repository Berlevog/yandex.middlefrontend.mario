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
exports.parseOptions = exports.parseCommand = void 0;
var path_1 = __importDefault(require("path"));
var yargs = __importStar(require("yargs"));
var conf_1 = require("./conf");
var parseCommand = function (_a) {
    var startDevServer = _a.startDevServer, startProdServer = _a.startProdServer, buildProd = _a.buildProd;
    var argv = yargs
        .command('dev [port]', 'start dev server', function (args) {
        args.positional('port', {
            describe: 'dev server port',
            default: 3000,
        });
    }, startDevServer)
        .command('build', 'build prod server', buildProd)
        .command('prod', 'start prod server', function (args) {
        args.option('port', {
            describe: 'server port',
            default: 3000,
        });
        args.option('host', {
            describe: 'server host',
            default: '127.0.0.1',
        });
    }, startProdServer)
        .help()
        .demandCommand()
        .alias('help', 'h').argv;
    return argv;
};
exports.parseCommand = parseCommand;
var parseOptions = function () {
    var rootPath = process.cwd();
    var srcPath = path_1.default.join(rootPath, conf_1.SRC_DIRNAME);
    var buildPath = path_1.default.join(rootPath, conf_1.BUILD_DIRNAME);
    return {
        srcPath: srcPath,
        buildPath: buildPath,
        rootPath: rootPath,
    };
};
exports.parseOptions = parseOptions;
