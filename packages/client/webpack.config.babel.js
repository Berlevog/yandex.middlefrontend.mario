import path from 'path'
import nodeExternals from 'webpack-node-externals'
import LoadablePlugin from '@loadable/webpack-plugin'
// import MiniCssExtractPlugin from 'mini-css-extract-plugin'

const DIST_PATH = path.resolve(__dirname, 'dist')
const production = process.env.NODE_ENV === 'production'
const development = !production
const externals = ['react', 'react-dom', 'react-router', 'react-router-dom', 'redux', 'react-redux'];


const getConfig = target => {

  if (target === 'node') {
    externals.push('@loadable/component', nodeExternals());
  }

  return {
    name: target,
    mode: development ? 'development' : 'production',
    target,
    entry: `./src/main-${target}.tsx`,
    module: {
      rules: [
        {
          test: /\.([jt])sx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              caller: {target},
            },
          },
        },

      ],
    },
    externals,


    optimization: {
      runtimeChunk: target !== 'node',
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.css'],
    },

    output: {
      path: path.join(DIST_PATH, target),
      filename: production ? '[name]-bundle-[chunkhash:8].js' : '[name].js',
      publicPath: `/dist/${target}/`,
      libraryTarget: target === 'node' ? 'commonjs2' : undefined,
    },
    plugins: [new LoadablePlugin()]
  }
}

export default [getConfig('web'), getConfig('node')]
