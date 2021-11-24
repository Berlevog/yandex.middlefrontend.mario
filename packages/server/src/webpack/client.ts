import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
// import autoprefixer from "autoprefixer";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import * as path from "path";
// import { resolve } from "path";
// @ts-ignore
import RobotstxtPlugin from "robotstxt-webpack-plugin";
import { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin";
import webpack from "webpack";
// @ts-ignore
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import nodeExternals from "webpack-node-externals";
// import PwaManifest from "webpack-pwa-manifest";
import { GenerateSW } from "workbox-webpack-plugin";
import { WebpackBuildConfigOptionsType } from "./types";

export const buildClientConfig = (options: WebpackBuildConfigOptionsType) => {
	const { srcPath, buildPath, target, isProduction, devServer } = options;

	const isDevelopment = !isProduction;
	const externals = []; //["react", "react-dom", "react-router", "react-router-dom", "redux", "react-redux"];

	const tsConfigPath = path.resolve(srcPath, "../", "tsconfig.web.json");
	const indexPath = path.resolve(srcPath, `main-${target}.tsx`);

	if (target === "node") {
		// @ts-ignore
		externals.push(nodeExternals());
	}
	const cssLoader = (withModules = false) => {
		return [
			isProduction
				? {
					loader: MiniCssExtractPlugin.loader
				}
				: {
					loader: "style-loader"
				},
			{
				loader: "css-loader",
				options: {
					importLoaders: 2,
					modules: withModules
						? { localIdentName: "[name]__[local]__[contenthash:base64:5]" }
						: false
				}
			},
			{
				loader: "postcss-loader"
			}
		];
	};
	return {
		name: target,
		mode: isDevelopment ? "development" : "production",
		target,
		devtool: "source-map",

		entry: [
			isDevelopment && "webpack-hot-middleware/client",
			indexPath
		].filter(Boolean),
		externals: [],
		module: {
			rules: [
				{
					test: /\.(ts|js)x?$/,
					exclude: /node_modules/,
					use: {
						loader: "babel-loader",
						options: {
							presets: [
								[
									require("@babel/preset-env"),
									{
										useBuiltIns: "entry",
										corejs: 3
									}
								],
								require("@babel/preset-react"),
								require("@babel/preset-typescript")
							],
							plugins: [
								devServer && require.resolve("react-refresh/babel"),
								require("@loadable/babel-plugin"),
								require("@babel/plugin-proposal-export-default-from"),
								require("@babel/plugin-proposal-class-properties"),
								require("@babel/plugin-transform-async-to-generator")
							].filter(Boolean)
						}
					}
				},
				{
					test: /\.(png|jpg)$/,
					// exclude: /\.(component|c)\.svg$/,
					type: "asset",
					generator: {
						filename: "static/img/[name].[contenthash].[ext]"
					},
					parser: {
						dataUrlCondition: {
							maxSize: 8192
						}
					}
				},
				{
					test: /\.svg$/,
					use: [
						{
							loader: "@svgr/webpack",
							options: {
								memo: true,
								svgoConfig: {
									plugins: {
										removeViewBox: false
									}
								}
							}
						},
						{
							loader: "url-loader",
							options: {
								limit: 8192,
								publicPath: "/static/",
								outputPath: "static/",
								name: "img/[name].[contenthash].[ext]"
							}
						}
					]
				},
				{
					test: /\.(eot|woff2|woff|ttf?)$/,
					type: "asset",
					generator: {
						filename: "static/fonts/[name].[contenthash].[ext]"
					}
				},
				{
					test: /\.s?css$/,
					exclude: /\.modules\.(s?css|sass)$/,
					use: cssLoader()
				},
				{
					test: /\.modules\.(s?css|sass)$/,
					use: cssLoader(true)
				}
			]
		},
		optimization: {
			runtimeChunk: target !== "node"
		},
		resolve: {
			modules: ["src", "node_modules"],
			// alias: { "react-dom": "@hot-loader/react-dom" },
			extensions: ["*", ".js", ".jsx", ".json", ".ts", ".tsx"],
			plugins: [
				new TsconfigPathsPlugin({ configFile: tsConfigPath })]
		},

		output: {
			path: path.join(options.buildPath, target),
			filename: isProduction ? "[name]-bundle-[chunkhash:8].js" : "[name].js",
			publicPath: `/`,
			libraryTarget: target === "node" ? "commonjs2" : undefined
		},

		plugins: [
			new CopyPlugin({
				patterns: [
					{ from: "public/images", to: "images" },
					{ from: "public/assets", to: "assets" },
					{ from: "public/music", to: "music" },
					{
						from: "public/*",
						to: "[name][ext]",
						globOptions: {
							dot: true,
							gitignore: true,
							ignore: ["**/index.html"]
						}
					}
				]
			}),
			new HtmlWebpackPlugin({
				template: "public/index.html",
				publicPath: "/",
				inject: "body",
				window: {
					devMode: isDevelopment
				}
			}),
			new MiniCssExtractPlugin({
				filename: "static/css/bundle.[name].[contenthash].css"
			}),
			// isProduction && new PwaManifest({
			// 	filename: "manifest.webmanifest",
			// 	name: "super-mario",
			// 	short_name: "mario",
			// 	theme_color: "#3498db",
			// 	description: "Yandex Praktikum Education Project",
			// 	background_color: "#f5f5f5",
			// 	crossorigin: "use-credentials",
			// 	icons: [
			// 		{
			// 			src: resolve("./assets/avatar.png"),
			// 			sizes: [96, 128, 192, 256, 384, 512]
			// 		}
			// 	]
			// }),
			isProduction && new GenerateSW({
				clientsClaim: true,
				skipWaiting: true,
				include: [/\.js$/],
				runtimeCaching: [
					{
						urlPattern: new RegExp("."), // for start_url
						handler: "StaleWhileRevalidate"
					},
					{
						urlPattern: new RegExp("api|graphql"),
						handler: "NetworkFirst"
					},
					{
						urlPattern: new RegExp("https://fonts.googleapis.com|https://fonts.gstatic.com"),
						handler: "CacheFirst"
					}
				]
			}),
			new RobotstxtPlugin(),
			new BundleAnalyzerPlugin({
				analyzerMode: "static",
				openAnalyzer: false
			}),
			!isProduction && new webpack.HotModuleReplacementPlugin(),
			!isProduction &&
			new ReactRefreshWebpackPlugin({
				overlay: {
					sockIntegration: "whm"
				}
			})
		].filter(Boolean)
	};
};
