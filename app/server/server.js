import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import indexPage from './views/index.pug';
let App = require('./../shared').default;

if (module.hot) {
  console.log('has hot');
  module.hot.accept('./../shared', () => {
    console.log('getting update');
    App = require('./../shared').default;
  });
} else {
  console.log('does not have hot');
}

console.log('testing stuff');

const app = express();

app.use('/assets', express.static('build/assets'));

app.get('*', (req, res) => {

  const initialHtml = renderToString(<App/>);

  res.send(indexPage({
    initialHtml
  }));
});

app.listen(3000);

export default app;
