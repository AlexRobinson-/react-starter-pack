import path from 'path';
import nodeExternals from 'webpack-node-externals';

/* Paths */
const appPath = path.resolve('app');
const clientPath = path.resolve(appPath, 'client');
const serverPath = path.resolve(appPath, 'server');
const sharedPath = path.resolve(appPath, 'shared');
const baseOutputPath = path.resolve('build');

export default (SERVER, PROD) => {
  console.log('Creating webpack config', 'server:', SERVER, 'prod:', PROD);

  const CLIENT = !SERVER;
  const DEV = !PROD;

  /* Entry */
  const serverEntry = [path.resolve(serverPath, 'index.js')];
  const clientEntry = [path.resolve(clientPath, 'index.js')];

  const entry = SERVER ? serverEntry : clientEntry;

  /* Output */
  const serverOutput = {
    path: path.resolve(baseOutputPath),
    filename: 'bundle.server.js'
  };
  const clientOutput = {
    path: path.resolve(baseOutputPath, 'assets'),
    filename: 'bundle.client.js',
    publicPath: '/assets/'
  };
  const output = SERVER ? serverOutput : clientOutput;

  /* Rules */
  const rules = [];

  const js = {
    test: /\.js$/,
    include: [
      sharedPath,
      SERVER ? serverPath : clientPath
    ],
    loaders: ['babel-loader']
  };
  rules.push(js);

  const sass = {
    test: /\.scss/,
    include: [
      sharedPath
    ],
    loaders: [
      `${SERVER ? 'fake-' : ''}style-loader`,
      'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
      'sass-loader'
    ]
  };
  rules.push(sass);

  const pug = {
    test: /\.pug/,
    include: serverPath,
    loaders: ['pug-loader']
  };
  if (SERVER) {
    rules.push(pug);
  }

  /* Config */
  const serverConfig = {
    target: 'node',
    node: {
      __dirname: true,
      __filename: true
    },
    externals: [nodeExternals({
      whitelist: ['webpack/hot/poll?1000']
    })]
  };
  const clientConfig = {};

  const config = {
    entry,
    output,
    devtool: 'eval',
    module: {
      rules
    },
    plugins: [],
    ...(SERVER ? serverConfig : clientConfig)
  };

  return config;
}
