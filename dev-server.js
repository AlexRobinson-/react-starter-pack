import path from 'path';
import pm2 from 'pm2';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import configCreator from './webpack.config.creator';

const server = true;
const prod = false;

const serverConfig = configCreator(server, prod);
const clientConfig = configCreator(!server, prod);

const serverHotConfig = {
  ...serverConfig,
  entry: [
    'webpack/hot/poll?1000',
    ...serverConfig.entry
  ],
  plugins: [
    ...serverConfig.plugins,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.NamedModulesPlugin()
  ]
};

const clientHotConfig = {
  ...clientConfig,
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080/',
    'webpack/hot/only-dev-server',
    ...clientConfig.entry
  ],
  plugins: [
    ...clientConfig.plugins,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.NamedModulesPlugin()
  ]
};


const serverCompiler = webpack({ ...serverHotConfig });
const clientCompiler = webpack({ ...clientHotConfig });

const clientDevServer = new WebpackDevServer(clientCompiler, {
  hot: true,
  inline: true,
  proxy: {
    '/': 'http://localhost:3000',
  },
  publicPath: clientConfig.output.publicPath
});

clientDevServer.listen(8080);

serverCompiler.run((err, stats) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Server compiled');

  pm2.connect(err => {
    if (err) {
      console.error('Error:', err);
      process.exit(2);
    }

    pm2.start(path.resolve('pm2.json'), err => {
      pm2.disconnect();
      if (err) throw err
    });
  });

  serverCompiler.watch({hot: true, inline: true}, (err, stats) => undefined);
});


