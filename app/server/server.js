import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { ServerRouter, createServerRenderContext } from 'react-router';
import indexPage from './views/index.pug';
let createStore = require('./../shared/create-store').default;
let App = require('./../shared').default;

if (module.hot) {
  module.hot.accept('./../shared', () => {
    App = require('./../shared').default;
  });

  module.hot.accept('./../shared', () => {
    createStore = require('./../shared/create-store').default;
  });
}

const app = express();

app.use('/assets', express.static('build/assets'));

app.get('*', (req, res) => {

  const context = createServerRenderContext();

  let initialHtml = renderToString(
    <ServerRouter
      location={req.url}
      context={context}
    >
      <Provider store={createStore()}>
        <App/>
      </Provider>
    </ServerRouter>
  );

  // get the result
  const result = context.getResult();

  // the result will tell you if it redirected, if so, we ignore
  // the markup and send a proper redirect.
  if (result.redirect) {
    res.writeHead(301, {
      Location: result.redirect.pathname
    });
    res.end();
  } else {

    // the result will tell you if there were any misses, if so
    // we can send a 404 and then do a second render pass with
    // the context to clue the <Miss> components into rendering
    // this time (on the client they know from componentDidMount)
    if (result.missed) {
      res.writeHead(404);
      initialHtml = renderToString(
        <ServerRouter
          location={req.url}
          context={context}
        >
          <App/>
        </ServerRouter>
      );
    }
  }

  res.send(indexPage({
    initialHtml
  }));
});

app.listen(3000);

export default app;
