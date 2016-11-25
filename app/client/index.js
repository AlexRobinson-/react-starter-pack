import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';
import createStore from './../shared/create-store';

const renderApp = () => {
  const NextApp = require('./../shared').default;
  render(
    <AppContainer errorReporter={x => console.log(x)}>
      <BrowserRouter>
        <Provider store={createStore()}>
          <NextApp/>
        </Provider>
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
