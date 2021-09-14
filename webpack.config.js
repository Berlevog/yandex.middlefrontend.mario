const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => {
	const cssLoader = argv.mode === "production" ? MiniCssExtractPlugin.loader : "style-loader";
	return {
		mode: argv.mode,
		entry: {
			main: path.join(__dirname, "src", "index.tsx")
		},
		target: "web",
		resolve: {
			extensions: [".ts", ".tsx", ".js"]
		},
		output: {
			clean: true,
			path: path.join(__dirname, "/build"),
			filename: "[name].[contenthash:5].js"
		},

		module: {
			rules: [
				{
					test: /\.(ts|js)x?$/,
					exclude: /node_modules/,
					use: {
						loader: "babel-loader",
						options: {
							presets: [
								"@babel/preset-env",
								"@babel/preset-react",
								"@babel/preset-typescript"
							]
						}
				},
			},
				{
					test: /\.css$/i,
					use: [
						cssLoader,
						{
							loader: "css-loader",
							options: {
								importLoaders: 1,
								modules: true
							}
						},
						{
							loader: "postcss-loader",
							options: {
								postcssOptions: {
									plugins: [
										[
											"autoprefixer",
											{
												// Options
											}
										]
									]
								}
							}
						}
					]
				}
			]
		},
		devServer: {
			port: 3000,
			open: "chrome",
			historyApiFallback: true
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: "./public/index.html"
			}),
			new MiniCssExtractPlugin({
				filename: "[name].[contenthash:5].css"
			})
		]
	}
};