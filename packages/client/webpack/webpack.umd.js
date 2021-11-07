const path = require("path");
const rootDir = path.join(__dirname, "../");

const cssLoader = "style-loader";
module.exports = async (env, argv) => ({
  mode: argv.mode,
  entry: {
    main: path.join(rootDir, "src", "main.ts")
  },
  target: "node",
  resolve: {
    modules: [
      'node_modules',
    ],
    extensions: ['.ts', '.tsx', '.js', '.json'],
    symlinks: true,
  },
  output: {
    clean: true,
    path: path.join(rootDir, "dist"),
    filename: "main.js",
    library: {
      name: '@mario/client',
      type: "umd",
    },
  },

  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use:[
          {
            loader: 'ts-loader',
            options: {
            },
          },

        ],
      },
      {
        test: /\.css$/i,
        use: [
          cssLoader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true,
            },
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
                    },
                  ],
                ],
              },
            },
          },
        ],
      },
    ]
  },

});
