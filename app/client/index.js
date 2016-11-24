import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

const renderApp = () => {
  const NextApp = require('./../shared').default;
  render(
    <AppContainer errorReporter={x => console.log(x)}>
      <NextApp/>
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
