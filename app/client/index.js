import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router';

const renderApp = () => {
  const NextApp = require('./../shared').default;
  render(
    <AppContainer errorReporter={x => console.log(x)}>
      <BrowserRouter>
        <NextApp/>
      </BrowserRouter>
    </AppContainer>,
    document.getElementById('entry')
  );
};

renderApp();

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./../shared', () => {
    renderApp();
  });
}
